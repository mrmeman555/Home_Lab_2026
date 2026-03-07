# Task: Build Sec+ Security Lab on Proxmox

## Context

Operator is studying for CompTIA Security+ SY0-701. Needs an isolated lab environment on the existing Proxmox hypervisor for practicing:
1. Firewall/ACL rule configuration (confirmed PBQ topic)
2. Log analysis — tracing attacks through firewall/endpoint logs (confirmed PBQ topic)
3. Network appliance placement / zone-based security (confirmed PBQ topic)
4. Scanning, hardening, and attack/defense scenarios

Lab MUST be isolated from production network. Operator's production infra uses VLANs 10 (Users), 20 (Servers), 99 (MGMT) with a production pfSense.

## Resource Constraints

- **Proxmox host:** Single 16GB RAM stick
- **TrueNAS VM (VM 100):** Already running with PCI passthrough for WD Black drive — do NOT touch
- **Available RAM for lab:** Estimate ~8-10GB after Proxmox overhead and TrueNAS. Lab VMs must be lean.
- **Storage:** Use Proxmox local storage or a dedicated lab datastore — not the TrueNAS share

## Lab Topology Design

```
                    ┌─────────────────────────────────┐
                    │         PROXMOX HOST             │
                    │                                  │
   PRODUCTION       │    SECURITY LAB (Isolated)       │
   (Don't touch)    │                                  │
                    │    VLAN 50 — Lab LAN (Corporate) │
   VLAN 10 ─────    │    VLAN 51 — Lab DMZ             │
   VLAN 20 ─────    │    VLAN 52 — Lab Attack Net      │
   VLAN 99 ─────    │                                  │
                    │    ┌──────────────┐               │
                    │    │ Lab pfSense  │               │
                    │    │ (Router/FW)  │               │
                    │    │ VLAN 50,51,52│               │
                    │    └──────┬───────┘               │
                    │           │                       │
                    │    ┌──────┴───────┐               │
                    │    │              │               │
                    │  VLAN 50      VLAN 51             │
                    │  (Corporate)  (DMZ)               │
                    │    │              │               │
                    │  ┌─┴──┐      ┌───┴──┐            │
                    │  │Win │      │Ubuntu│            │
                    │  │ 11 │      │Server│            │
                    │  └────┘      └──────┘            │
                    │                                  │
                    │  VLAN 52 (Attack)                 │
                    │    │                             │
                    │  ┌─┴──┐                          │
                    │  │Kali│                          │
                    │  └────┘                          │
                    └─────────────────────────────────┘
```

### Network Design Rationale

- **VLAN 50 (Lab Corporate):** Simulates an internal corporate network. Windows 11 workstation lives here. This is the "inside" zone.
- **VLAN 51 (Lab DMZ):** Simulates a DMZ. Ubuntu Server lives here running web/DNS/SSH services. This is the "semi-trusted" zone.
- **VLAN 52 (Lab Attack):** Kali Linux lives here. Simulates an external attacker or pen test network. This is the "outside/untrusted" zone.
- **Lab pfSense:** Routes between all three VLANs. Firewall rules control what crosses zones. This is where ACL/firewall PBQ practice happens.
- **No uplink to production:** Lab VLANs (50/51/52) have NO route or trunk to production VLANs (10/20/99). Air-gapped at the virtual switch level.

### Internet Access Decision
The lab pfSense can optionally have a WAN interface for internet access (needed for Kali package updates, Windows updates). Options:
- **Option A:** Give lab pfSense a NATed WAN through Proxmox's bridge to the physical NIC — provides internet but is a potential leak path
- **Option B:** Fully air-gapped, manually transfer packages via ISO/USB — most secure but painful
- **Recommended:** Option A with strict outbound-only rules on the lab pfSense WAN. No inbound, no access to production subnets.

## VM Specifications (Lean)

| VM | OS | RAM | Disk | VLAN | Purpose |
|----|----|-----|------|------|---------|
| Lab-pfSense | pfSense CE (latest) | 1GB | 8GB | WAN + 50 + 51 + 52 | Firewall/router — ACL practice, zone management, log generation |
| Lab-Win11 | Windows 11 (or 10) | 4GB | 40GB | 50 | Target — Event Viewer logs, Group Policy, security templates, AD if needed later |
| Lab-Ubuntu | Ubuntu Server 24.04 | 1GB | 15GB | 51 | Target — syslog, Apache/Nginx, SSH, iptables, service hardening |
| Lab-Kali | Kali Linux (latest) | 2GB | 25GB | 52 | Attacker — Nmap, Wireshark, Hping3, LEGION, Metasploit |

**Total lab RAM: ~8GB** — tight but workable with 16GB host total. TrueNAS and Proxmox overhead take ~6-7GB. If too tight, drop Win11 to 3GB or use Windows 10 LTSC (lighter).

## Provisioning Steps

### Step 1: Create Lab Virtual Switches
On Proxmox, create three new Linux bridges (or use VLAN-aware bridge with tags):
- `vmbr50` — VLAN 50 (Lab Corporate)
- `vmbr51` — VLAN 51 (Lab DMZ)  
- `vmbr52` — VLAN 52 (Lab Attack)

Alternatively, if using a single VLAN-aware bridge, just assign VLAN tags 50/51/52 to VM NICs.

**Critical:** These bridges must NOT be trunked or routed to the production bridges (vmbr0 or whatever carries VLANs 10/20/99).

### Step 2: Download ISOs
- pfSense CE ISO: https://www.pfsense.org/download/
- Kali Linux ISO: https://www.kali.org/get-kali/
- Ubuntu Server 24.04 ISO: https://ubuntu.com/download/server
- Windows 11 ISO: https://www.microsoft.com/software-download/windows11 (or use existing if available)

### Step 3: Create and Install VMs
Create each VM per the specs table. Install OS on each. Assign NICs to correct VLANs/bridges.

### Step 4: Configure Lab pfSense
- WAN: Optional internet-facing interface (NATed through Proxmox)
- LAN (VLAN 50): 10.50.0.1/24
- DMZ (VLAN 51): 10.51.0.1/24
- ATTACK (VLAN 52): 10.52.0.1/24
- Default firewall rules: BLOCK ALL between zones initially. Operator will build rules from scratch as lab exercises.
- Enable logging on all interfaces.

### Step 5: Configure Lab Clients
- **Win11:** Static IP 10.50.0.10/24, gateway 10.50.0.1, DNS 10.51.0.10 (point to Ubuntu for DNS lab)
- **Ubuntu:** Static IP 10.51.0.10/24, gateway 10.51.0.1. Install: Apache2, OpenSSH, rsyslog, bind9 (DNS)
- **Kali:** Static IP 10.52.0.10/24, gateway 10.52.0.1

### Step 6: Validate Isolation
- From Kali, verify you CANNOT reach production subnets (10.10.0.0/24, 10.20.0.0/24, 192.168.x.x)
- From Kali, verify you CANNOT reach lab VLANs until pfSense rules allow it
- From any lab VM, verify production TrueNAS share is NOT accessible

## Lab Exercise Mapping

Once built, this lab supports:

| PBQ Topic | How to Practice |
|-----------|----------------|
| Firewall ACL config | Write pfSense rules to allow/deny specific traffic between zones. E.g., "Allow VLAN 50 to reach web on VLAN 51 (port 80/443 only), block everything else." |
| Log analysis | Generate traffic from Kali → Ubuntu, read pfSense firewall logs + Ubuntu auth.log + Apache access.log to trace the activity |
| Network appliance placement | The three-zone topology IS the diagram. Practice explaining why pfSense sits between zones, where you'd add IDS/IPS inline, where a SIEM collects from |
| Incident response | Stage an "attack" from Kali (port scan, brute force SSH), then follow IR steps: detect in logs, analyze, contain with firewall rule, eradicate, document |
| Hardening | Start with default configs, progressively harden: disable unnecessary services, change default passwords, configure host firewalls (iptables on Ubuntu, Windows Firewall on Win11) |

## Notes for Claude Code

- Check available Proxmox resources BEFORE creating VMs (`pvesh get /nodes/{node}/status`)
- Check existing bridges/VLANs to avoid conflicts (`cat /etc/network/interfaces`)
- The operator's Proxmox web UI is accessible via the MGMT VLAN (192.168.x.x/VLAN 99)
- Do NOT modify VM 100 (TrueNAS) or any production network config
- If RAM is too tight, prioritize pfSense + Kali + Ubuntu. Windows can be added later.

---

## Architecture Pivot: Docker Containers (2026-03-07)

The original design above targeted Proxmox VMs with pfSense. This was replaced with a Docker Compose topology for the following reasons:

1. **RAM constraint** — 16GB host with TrueNAS taking 8GB left insufficient room for 8GB of lab VMs
2. **Portability** — Docker lab runs on any machine (desktop, Proxmox VM, LXC, cloud) without infrastructure dependencies
3. **Speed** — `docker compose up -d` vs. hours of VM provisioning. Tear down and rebuild in seconds.
4. **No production risk** — Docker bridge networks are internal to the host. No VLANs, bridges, or routes to configure on Proxmox.

**What changed:**
- pfSense → Alpine container with iptables (same firewall concepts, different tool)
- Proxmox VMs → Docker containers (same OS images, shared kernel)
- Proxmox bridges/VLANs → Docker bridge networks (same segmentation, different implementation)
- 8GB RAM requirement → ~1-2GB active memory

**What didn't change:**
- Three-zone architecture (Corporate / DMZ / Attack)
- Default-deny firewall policy
- Security rationale and Sec+ objective mappings
- Exercise workflows (attack → detect → respond)

**Implementation:** `lab_build/docker-lab/`
