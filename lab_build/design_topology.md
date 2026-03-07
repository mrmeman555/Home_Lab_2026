# Security Lab — Design Document

## Overview

This document formalizes all design decisions for the Security+ lab environment. Every decision maps to a SY0-701 exam objective and was made with a security-first rationale. This is the reference Build Mode implements against — no improvising.

**Design Authority:** Mimir
**Last Updated:** 2026-03-07
**Platform:** Docker Compose (portable — desktop, Proxmox VM, LXC, or cloud)
**Implementation:** `lab_build/docker-lab/`

---

## 1A: Topology & Zone Architecture

### Zone Model: Three-Zone Segmented Network

| Zone | Docker Network | Subnet | Trust Level | Purpose |
|------|---------------|--------|-------------|---------|
| Corporate (LAN) | lab-corporate (br-corporate) | 172.16.50.0/24 | Trusted | Internal targets — what we're defending |
| DMZ | lab-dmz (br-dmz) | 172.16.51.0/24 | Semi-Trusted | Internet-facing services — the sacrificial buffer |
| Attack Net | lab-attack (br-attack) | 172.16.52.0/24 | Untrusted | Attacker simulation — where threats originate |

### Why Three Zones?

A flat network gives an attacker three things for free upon compromising one host: **visibility** (broadcast traffic), **reachability** (every host on the subnet), and **interception** (ARP spoofing to become man-in-the-middle). No credentials required. Blast radius: 100%.

Three zones solve this by creating containment boundaries. Each Docker bridge network is a separate L2 broadcast domain (functionally equivalent to a VLAN). Cross-zone traffic must traverse the router container — the only container with interfaces in all three networks. This is the chokepoint. Blast radius of a single-zone compromise: ~33%, and any pivot attempt is detectable at the firewall.

The three zones model the standard enterprise pattern:
- **Corporate** = the assets being protected (confidentiality, integrity)
- **DMZ** = the controlled exposure point (services that must be reachable get isolated here so a compromise doesn't reach Corporate)
- **Attack Net** = the threat source (in production this is "the internet"; in the lab we simulate it with Kali)

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   Docker Host                        │
│              (Desktop, VM, LXC, Cloud)               │
│                                                      │
│   lab-corporate (172.16.50.0/24)                     │
│     └── (add targets as needed)                      │
│                                                      │
│   lab-dmz (172.16.51.0/24)                           │
│     └── ubuntu-dmz (172.16.51.10)                    │
│         Apache, SSH, DNS, rsyslog                    │
│                                                      │
│   lab-attack (172.16.52.0/24)                        │
│     └── kali (172.16.52.10)                          │
│         Nmap, hping3, tcpdump, Hydra                 │
│                                                      │
│   router (172.16.50.1 / .51.1 / .52.1)              │
│     Alpine + iptables — DEFAULT DENY                 │
│     Connected to all three networks                  │
└─────────────────────────────────────────────────────┘
```

### Production Isolation

Docker bridge networks are internal to the Docker host — they have NO route to the host's physical network by default (IP masquerade is disabled in the compose file). The lab cannot reach production VLANs 10/20/99 or any production infrastructure.

**Never touch:** VLANs 10, 20, 99 | VM 100 (TrueNAS) | Production pfSense

**Portability:** The entire lab is defined in `docker-compose.yml`. Move it to any Docker host with `git clone && docker compose up -d`. No infrastructure dependencies.

**Sec+ Mapping:** 1.2 (CIA, Zero Trust), 2.5 (segmentation, isolation), 3.1 (physical isolation, logical segmentation, virtualization), 3.2 (security zones, device placement, attack surface)

---

## 1B: Addressing & Routing

### IP Scheme

| Zone | Network | Gateway | Rationale |
|------|---------|---------|-----------|
| Corporate | 172.16.50.0/24 | 172.16.50.1 | /24 matches enterprise convention. 172.16.x.x avoids collision with production 192.168.x.x space. |
| DMZ | 172.16.51.0/24 | 172.16.51.1 | Third octet mirrors zone number for readability. |
| Attack Net | 172.16.52.0/24 | 172.16.52.1 | Same rationale. |

### Why 172.16.x.x?

Production uses 192.168.10/20/99.x. Using the same RFC1918 space risks confusion. The 172.16.x.x space is completely unused in production, creating an addressing-level separation. Docker manages these subnets internally — no host routing table changes needed.

### Why Zone ID in the Third Octet?

172.16.**50**.x for Corporate, 172.16.**51**.x for DMZ, 172.16.**52**.x for Attack. Self-documenting — you can read the zone from any IP.

### Static Host Assignments

| Host | IP | Network | Role |
|------|----|---------|------|
| Router (Corporate interface) | 172.16.50.1 | lab-corporate | Gateway for Corporate zone |
| Router (DMZ interface) | 172.16.51.1 | lab-dmz | Gateway for DMZ zone |
| Router (Attack interface) | 172.16.52.1 | lab-attack | Gateway for Attack zone |
| Ubuntu DMZ Server | 172.16.51.10 | lab-dmz | Apache, SSH, bind9, rsyslog |
| Kali Linux | 172.16.52.10 | lab-attack | Attacker tools |
| Corporate target (future) | 172.16.50.10 | lab-corporate | Add when needed |

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

Rules are NOT pre-configured beyond the default-deny baseline. The default-deny state IS the starting point. During Lab Exercises (Engine 3), Mimir writes iptables rules from scratch to meet scenario requirements — this is the PBQ practice.

Example exercise: "Allow the Attack zone to reach the web server in the DMZ on port 80 only. Verify with `docker exec kali curl http://172.16.51.10`. Verify that SSH from Attack to DMZ is still blocked."

**Sec+ Mapping:** 2.5 (ACL, least privilege), 3.2 (firewall types, failure modes, selection of effective controls), 4.5 (firewall rules, access lists, ports/protocols, screened subnets — PBQ CONFIRMED)

---

## 1D: Service Placement

### What Runs Where and Why

| Container | Zone | Base Image | Services | Security Rationale |
|-----------|------|-----------|----------|--------------------|
| router | All zones (gateway) | Alpine 3.19 | iptables, conntrack, tcpdump, logging | The chokepoint. Every cross-zone packet passes through it. All policy, all visibility. |
| ubuntu-dmz | DMZ (lab-dmz) | Ubuntu 24.04 | Apache2, OpenSSH, rsyslog, bind9 (DNS) | Exposed services in the buffer zone. Attack target. Log source. Hardening target. Intentionally insecure at start. |
| kali | Attack (lab-attack) | kali-rolling | Nmap, hping3, Hydra, tcpdump, netcat | The threat. Simulates external attacker. Generates traffic for log analysis. |
| (future) | Corporate (lab-corporate) | Ubuntu or similar | Add as needed for exercises | Defender's workstation equivalent. Extend when Corporate-zone exercises require a target. |

### Resource Footprint

Containers share the host kernel — no hypervisor overhead, no dedicated RAM allocation per VM. The entire lab runs in roughly 1-2 GB of active memory depending on what's running. Compare to the original VM design that needed 8 GB.

**This is the reason for the Docker pivot.** The 16 GB Proxmox host with TrueNAS taking 8 GB left insufficient room for a full VM lab. Containers eliminate the RAM constraint entirely.

**Portability bonus:** `docker compose down` removes everything cleanly. No bridges to delete, no VLANs to clean up, no risk of production leakage. Move to any Docker host with `git clone && docker compose up -d`.

**Sec+ Mapping:** 3.2 (device placement, security zones, network appliances), 4.1 (hardening targets — workstations, servers, routers), 4.5 (IDS/IPS placement, OS security)

---

## 1E: Internet Access & Isolation Validation

### Internet Access Decision: Not Required

Docker containers can access the internet through the Docker host's network stack for package updates (`apt update`, etc.) during build time. The Dockerfiles handle all package installation at build. At runtime, the lab networks have IP masquerade disabled — containers cannot reach the internet or the host's physical network unless explicitly configured.

For post-build package updates, temporarily enable masquerade or rebuild the container image (`docker compose build --no-cache`).

### Isolation Validation Criteria

These tests MUST pass before the lab is considered built:

| Test | From | To | Expected Result | Method |
|------|------|----|-----------------|--------|
| Default deny between zones | kali (172.16.52.10) | 172.16.51.10 (ubuntu-dmz) | Blocked | `docker exec kali bash -c "curl -s --connect-timeout 2 http://172.16.51.10"` — timeout |
| Default deny between zones | kali (172.16.52.10) | 172.16.50.0/24 (Corporate) | Blocked | `docker exec kali ping -c 1 -W 2 172.16.50.1` — timeout |
| Gateway reachable within zone | kali (172.16.52.10) | 172.16.52.1 (router) | Success | `docker exec kali ping -c 1 172.16.52.1` — reply |
| No host network access | kali (172.16.52.10) | 192.168.x.x (production) | No route | `docker exec kali ping -c 1 -W 2 192.168.10.1` — network unreachable |
| Firewall logging active | kali → any cross-zone | — | Log entries | `docker exec router dmesg \| grep FW-DENY` — entries present |
| Stateful return traffic | router | — | ESTABLISHED,RELATED allowed | Add a FORWARD ACCEPT rule, verify bidirectional flow |

**Sec+ Mapping:** 3.1 (physical isolation, air gap), 3.2 (security zones, connectivity), 2.5 (isolation, segmentation)

---

## Summary: Design Decisions → Sec+ Objectives

| Decision | Sec+ Objective | Bloom's Depth |
|----------|---------------|---------------|
| Three-zone architecture | 1.2, 3.1, 3.2 | Applying |
| Network segmentation (Docker bridges) | 2.5, 3.1 | Applying |
| Default-deny firewall policy (iptables FORWARD DROP) | 2.5, 4.5 | Applying |
| Router container as chokepoint | 3.2 | Analyzing |
| DMZ for exposed services | 3.2 (screened subnets) | Applying |
| Production isolation (no masquerade, no host routing) | 3.1 (logical isolation) | Applying |
| Service placement per zone | 3.2 (device placement) | Analyzing |
| 172.16.5x.0/24 addressing | 3.2 (connectivity) | Remembering |
| Log-everything policy (iptables LOG on FORWARD) | 4.4, 4.9 | Applying |
| Intentionally insecure DMZ (hardening from defaults) | 4.1 | Applying |
| Attack staging from Kali container | 2.4, 4.8 | Analyzing |
| Lab as code (docker-compose.yml) | 3.1 (containerization) | Applying |
| Portability (runs anywhere Docker runs) | 3.1 (ease of deployment) | Remembering |
