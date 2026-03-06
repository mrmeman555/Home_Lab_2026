# Security Lab — Design Document

## Overview

This document formalizes all design decisions for the Security+ lab environment. Every decision maps to a SY0-701 exam objective and was made with a security-first rationale. This is the reference Build Mode implements against — no improvising.

**Design Authority:** Mimir
**Last Updated:** 2026-03-06

---

## 1A: Topology & Zone Architecture

### Zone Model: Three-Zone Segmented Network

| Zone | VLAN | Subnet | Trust Level | Purpose |
|------|------|--------|-------------|---------|
| Corporate (LAN) | 50 | 10.50.0.0/24 | Trusted | Internal workstations — what we're defending |
| DMZ | 51 | 10.51.0.0/24 | Semi-Trusted | Internet-facing services — the sacrificial buffer |
| Attack Net | 52 | 10.52.0.0/24 | Untrusted | Attacker simulation — where threats originate |

### Why Three Zones?

A flat network gives an attacker three things for free upon compromising one host: **visibility** (broadcast traffic), **reachability** (every host on the subnet), and **interception** (ARP spoofing to become man-in-the-middle). No credentials required. Blast radius: 100%.

Three zones solve this by creating containment boundaries. Each VLAN is a separate L2 broadcast domain. Cross-zone traffic must traverse the firewall — the only device with interfaces in all three zones. This is the chokepoint. Blast radius of a single-zone compromise: ~33%, and any pivot attempt is detectable at the firewall.

The three zones model the standard enterprise pattern:
- **Corporate** = the assets being protected (confidentiality, integrity)
- **DMZ** = the controlled exposure point (services that must be reachable get isolated here so a compromise doesn't reach Corporate)
- **Attack Net** = the threat source (in production this is "the internet"; in the lab we simulate it with Kali)

### Architecture Diagram

```
                    ┌─────────────────────────────────┐
                    │         PROXMOX HOST             │
                    │                                  │
   PRODUCTION       │    SECURITY LAB (Isolated)       │
   (DO NOT TOUCH)   │                                  │
                    │    VLAN 50 — Corporate (Trusted)  │
   VLAN 10 ─────    │    VLAN 51 — DMZ (Semi-Trusted)  │
   VLAN 20 ─────    │    VLAN 52 — Attack (Untrusted)  │
   VLAN 99 ─────    │                                  │
                    │    ┌──────────────┐               │
                    │    │ Lab pfSense  │               │
                    │    │ (Router/FW)  │               │
                    │    │ 3 LAN + WAN  │               │
                    │    └──────┬───────┘               │
                    │      ┌────┼────┐                  │
                    │      │    │    │                   │
                    │   VLAN50 VLAN51 VLAN52             │
                    │      │    │    │                   │
                    │   Win11  Ubuntu  Kali              │
                    └─────────────────────────────────┘
```

### Production Isolation

⚠️ Lab VLANs 50/51/52 exist ONLY as Proxmox virtual bridges with NO trunk, route, or bridge to production infrastructure. Air-gapped at the virtual switch level.

**Never touch:** VLANs 10, 20, 99 | VM 100 (TrueNAS) | Production pfSense

**Sec+ Mapping:** 1.2 (CIA, Zero Trust), 2.5 (segmentation, isolation), 3.1 (physical isolation, logical segmentation, virtualization), 3.2 (security zones, device placement, attack surface)

---

## 1B: Addressing & Routing

### IP Scheme

| Zone | Network | Gateway | DHCP | Rationale |
|------|---------|---------|------|-----------|
| Corporate | 10.50.0.0/24 | 10.50.0.1 | Off (static only) | /24 gives 254 hosts — overkill for lab but matches enterprise convention. 10.x.x.x avoids any collision with production 192.168.x.x space. |
| DMZ | 10.51.0.0/24 | 10.51.0.1 | Off (static only) | Same rationale. Second octet mirrors VLAN ID for readability. |
| Attack Net | 10.52.0.0/24 | 10.52.0.1 | Off (static only) | Same rationale. |
| WAN (optional) | DHCP from production pfSense or Proxmox NAT | — | Yes | Internet access for updates only. |

### Why 10.x.x.x and not 192.168.x.x?

Production uses 192.168.10/20/99.x. Using the same RFC1918 space risks accidental routing or confusion. The 10.x.x.x space is completely unused in production, creating an addressing-level isolation layer on top of the VLAN isolation.

### Why VLAN ID in the Second Octet?

10.**50**.0.x for VLAN **50**, 10.**51**.0.x for VLAN **51**, 10.**52**.0.x for VLAN **52**. This makes every IP self-documenting — you can read the zone from the address without checking a table.

### Static Host Assignments

| Host | IP | VLAN | Gateway | DNS |
|------|----|------|---------|-----|
| Lab pfSense (Corporate) | 10.50.0.1 | 50 | — | — |
| Lab pfSense (DMZ) | 10.51.0.1 | 51 | — | — |
| Lab pfSense (Attack) | 10.52.0.1 | 52 | — | — |
| Win11 Workstation | 10.50.0.10 | 50 | 10.50.0.1 | 10.51.0.10 |
| Ubuntu Server | 10.51.0.10 | 51 | 10.51.0.1 | 10.51.0.1 |
| Kali Linux | 10.52.0.10 | 52 | 10.52.0.1 | 10.52.0.1 |

**Note:** Win11 DNS points to Ubuntu Server (10.51.0.10) intentionally — this enables DNS lab exercises where Ubuntu runs bind9.

**Sec+ Mapping:** 3.1 (network infrastructure), 3.2 (connectivity, device placement), 2.5 (segmentation)

---

## 1C: Firewall Rule Matrix

### Default Policy: DENY ALL

Every zone-to-zone path starts blocked. Rules are added explicitly with justification. This is least privilege at the network level.

### Zone-to-Zone Policy Intent

| Source → Dest | Default | Rationale |
|---------------|---------|-----------|
| Attack → DMZ | DENY | Attacker must not reach services unless explicitly allowed for exercises |
| Attack → Corporate | DENY | Attacker must NEVER reach Corporate directly |
| DMZ → Corporate | DENY | DMZ compromise must not pivot to Corporate — this is the whole point of a DMZ |
| DMZ → Attack | DENY | Services don't initiate connections to untrusted |
| Corporate → DMZ | DENY | Opened selectively (e.g., HTTP/HTTPS to web server) |
| Corporate → Attack | DENY | Internal users don't talk to attacker network |
| Any → WAN (outbound) | DENY | Opened selectively for updates only |
| WAN → Any (inbound) | DENY | No inbound from internet. Ever. |
| Any → Production | DENY | ⚠️ No route exists. This is enforced at the virtual switch level, not just firewall. |

### Exercise Model

Rules are NOT pre-configured. The default-deny state IS the starting point. During Lab Exercises (Engine 3), Mimir writes rules from scratch to meet scenario requirements — this is the PBQ practice.

Example exercise: "Allow Corporate to reach the web server in the DMZ on ports 80 and 443 only. Verify with curl from Win11. Verify that SSH from Corporate to DMZ is still blocked."

**Sec+ Mapping:** 2.5 (ACL, least privilege), 3.2 (firewall types, failure modes, selection of effective controls), 4.5 (firewall rules, access lists, ports/protocols, screened subnets — PBQ CONFIRMED)

---

## 1D: Service Placement

### What Runs Where and Why

| VM | Zone | OS | RAM | Disk | Services | Security Rationale |
|----|------|----|-----|------|----------|--------------------|
| Lab-pfSense | All zones (gateway) | pfSense CE | 1 GB | 8 GB | Firewall, Router, DHCP (off), DNS forwarder, Logging | The chokepoint. Every cross-zone packet passes through it. All policy, all visibility. |
| Lab-Win11 | Corporate (VLAN 50) | Windows 11 | 4 GB | 40 GB | Event Viewer, Group Policy, Windows Firewall | Defender's workstation. Represents the asset being protected. Hardening target. |
| Lab-Ubuntu | DMZ (VLAN 51) | Ubuntu Server 24.04 | 1 GB | 15 GB | Apache2, OpenSSH, rsyslog, bind9 (DNS) | Exposed services in the buffer zone. Attack target. Log source. Hardening target. |
| Lab-Kali | Attack (VLAN 52) | Kali Linux | 2 GB | 25 GB | Nmap, Wireshark, Hping3, LEGION, Metasploit | The threat. Simulates external attacker. Generates traffic for log analysis. |

**Total Lab RAM: ~8 GB**

### Resource Constraints

Proxmox host has 16 GB (single stick). TrueNAS VM 100 takes ~8 GB. Proxmox overhead ~1 GB. Leaves ~7-8 GB for lab.

**If RAM is too tight:**
1. Drop Win11 to 3 GB or use Windows 10 LTSC
2. If still tight, defer Win11 entirely — pfSense + Kali + Ubuntu is the minimum viable lab
3. Never reduce TrueNAS allocation — that's production ⚠️

**Sec+ Mapping:** 3.2 (device placement, security zones, network appliances), 4.1 (hardening targets — workstations, servers, routers), 4.5 (IDS/IPS placement, OS security)

---

## 1E: Internet Access & Isolation Validation

### Internet Access Decision: Option A — NATed WAN with Strict Outbound Rules

Lab pfSense gets a WAN interface through a Proxmox bridge to the physical NIC (NATed through production pfSense or direct Proxmox NAT). This provides internet for package updates on Kali, Ubuntu, and Windows.

**Restrictions:**
- Outbound only — no inbound rules on WAN
- No access to production subnets (192.168.10.0/24, 192.168.20.0/24, 192.168.99.0/24) from lab WAN
- WAN rules are NOT part of lab exercises — they exist solely for maintenance
- Can be disabled entirely when running attack exercises for full air-gap

### Isolation Validation Criteria

These tests MUST pass before the lab is considered built:

| Test | From | To | Expected Result | Method |
|------|------|----|-----------------|--------|
| No production reach (VLAN 10) | Kali (10.52.0.10) | 192.168.10.0/24 | No response | `ping 192.168.10.1` — timeout |
| No production reach (VLAN 20) | Kali (10.52.0.10) | 192.168.20.0/24 | No response | `ping 192.168.20.5` (Proxmox) — timeout |
| No production reach (VLAN 99) | Kali (10.52.0.10) | 192.168.99.0/24 | No response | `ping 192.168.99.1` — timeout |
| No TrueNAS access | Any lab VM | 192.168.20.11 | No response | `ping` + `smbclient` — both fail |
| Default deny between zones | Kali (10.52.0.10) | 10.51.0.10 (Ubuntu) | Blocked | `nmap 10.51.0.10` — filtered/no response |
| Default deny between zones | Kali (10.52.0.10) | 10.50.0.10 (Win11) | Blocked | `ping` — timeout |
| Gateway reachable within zone | Kali (10.52.0.10) | 10.52.0.1 | Success | `ping 10.52.0.1` — reply |

**Sec+ Mapping:** 3.1 (physical isolation, air gap), 3.2 (security zones, connectivity), 2.5 (isolation, segmentation)

---

## Summary: Design Decisions → Sec+ Objectives

| Decision | Sec+ Objective | Bloom's Depth |
|----------|---------------|---------------|
| Three-zone architecture | 1.2, 3.1, 3.2 | Applying |
| VLAN segmentation | 2.5, 3.1 | Applying |
| Default-deny firewall policy | 2.5, 4.5 | Applying |
| pfSense as chokepoint | 3.2 | Analyzing |
| DMZ for exposed services | 3.2 (screened subnets) | Applying |
| Production air-gap | 3.1 (physical isolation) | Applying |
| Service placement per zone | 3.2 (device placement) | Analyzing |
| 10.x.x.x addressing | 3.2 (connectivity) | Remembering |
| Log-everything policy | 4.4, 4.9 | Applying |
| Hardening from default configs | 4.1 | Applying |
| Attack staging from Kali | 2.4, 4.8 | Analyzing |
