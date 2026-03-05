# HomeLab Network Reference

## Topology

```
                              ┌─────────────┐
                              │  INTERNET   │
                              └──────┬──────┘
                                     │
                              ┌──────┴──────┐
                              │   pfSense   │
                              │             │
                              │  igb0 (WAN) │ DHCP from ISP
                              │  igb1 (LAN) │ 192.168.10.1  VLAN 10 (native)
                              │  igb1.20    │ 192.168.20.1  VLAN 20 (tagged)
                              │  igb1.99    │ 192.168.99.1  VLAN 99 (tagged)
                              └──────┬──────┘
                                     │
                                     │ Port 1 (Trunk)
                                     │
                        ┌────────────┴────────────┐
                        │   TP-Link TL-SG108E     │
                        │      192.168.99.2       │
                        └┬──┬──┬──┬──┬──┬──┬──┬───┘
                         1  2  3  4  5  6  7  8
                         │  │  │  │  │  │  │  │
                         │  │  │  │  │  │  │  └── Laptop (VLAN 99)
                         │  │  │  │  │  │  │
                         │  │  │  │  │  │  └───── Black Hole (VLAN 1)
                         │  │  │  │  │  │
                         │  │  │  │  │  └──────── Black Hole (VLAN 1)
                         │  │  │  │  │
                         │  │  │  │  └─────────── (unused, VLAN 10)
                         │  │  │  │
                         │  │  │  └────────────── Desktop (VLAN 10)
                         │  │  │
                         │  │  └───────────────── WAP (VLAN 10)
                         │  │
                         │  └──────────────────── Proxmox (VLAN 20)
                         │                        └── TrueNAS VM
                         │
                         └─────────────────────── pfSense Trunk
```

---

## VLANs

| VLAN | Name | Subnet | Gateway | DHCP Range |
|------|------|--------|---------|------------|
| 10 | Users | 192.168.10.0/24 | 192.168.10.1 | .10 - .200 |
| 20 | Servers | 192.168.20.0/24 | 192.168.20.1 | .10 - .200 |
| 99 | MGMT | 192.168.99.0/24 | 192.168.99.1 | .10 - .50 |
| 1 | Black Hole | — | — | — |

---

## IP Assignments

### Static

| Device | IP | VLAN | MAC |
|--------|-----|------|-----|
| pfSense LAN | 192.168.10.1 | 10 | — |
| pfSense SERVERS | 192.168.20.1 | 20 | — |
| pfSense MGMT | 192.168.99.1 | 99 | — |
| Switch | 192.168.99.2 | 99 | — |
| Proxmox | 192.168.20.5 | 20 | dc:4a:3e:6b:8b:69 |
| TrueNAS VM | 192.168.20.11 | 20 | — |

### DHCP

| Device | IP | VLAN |
|--------|-----|------|
| Desktop (Ubuntu) | DHCP (.10-.200) | 10 |
| WAP | DHCP (.10-.200) | 10 |
| Laptop (Windows) | DHCP (.10-.50) | 99 |

---

## Switch Port Assignments

| Port | VLAN | Mode | PVID | Device |
|------|------|------|------|--------|
| 1 | 10 (U), 20 (T), 99 (T) | Trunk | 10 | pfSense igb1 |
| 2 | 20 | Access | 20 | Proxmox |
| 3 | 10 | Access | 10 | WAP |
| 4 | 10 | Access | 10 | Desktop |
| 5 | 10 | Access | 10 | (unused) |
| 6 | 1 | Access | 1 | (black hole) |
| 7 | 1 | Access | 1 | (black hole) |
| 8 | 99 | Access | 99 | Laptop |

(U) = Untagged, (T) = Tagged

---

## Firewall Rules

### LAN (VLAN 10)

| # | Action | Source | Destination | Description |
|---|--------|--------|-------------|-------------|
| 1 | Block | LAN net | MGMT net | Block users from management |
| 2 | Pass | LAN net | * | Allow all other (internet + servers) |

### SERVERS (VLAN 20)

| # | Action | Source | Destination | Description |
|---|--------|--------|-------------|-------------|
| 1 | Block | SERVERS net | MGMT net | Block servers from management |
| 2 | Block | SERVERS net | LAN net | Block servers from users |
| 3 | Pass | SERVERS net | * | Allow internet |

### MGMT (VLAN 99)

| # | Action | Source | Destination | Description |
|---|--------|--------|-------------|-------------|
| 1 | Pass | MGMT net | * | Full access |

---

## DHCP / DNS

| Setting | Value |
|---------|-------|
| Domain | home.lab |
| DNS Servers | (pfSense default) |

---

## Critical Settings

| Setting | Value | Reason |
|---------|-------|--------|
| Hardware Checksum Offload | **DISABLED** | Intel igb corrupts VLAN tags |
| Hardware TCP Segmentation | **DISABLED** | — |
| Hardware LRO | **DISABLED** | — |

Location: pfSense → System → Advanced → Networking

---

## Access URLs

| Service | URL |
|---------|-----|
| pfSense | https://192.168.10.1 or https://192.168.99.1 |
| Switch | http://192.168.99.2 |
| Proxmox | https://192.168.20.5:8006 |
| TrueNAS | http://192.168.20.11 |

---

## Quick Diagnostics

```bash
# From MGMT VLAN (full access)
ping 192.168.10.1   # pfSense LAN
ping 192.168.20.1   # pfSense SERVERS
ping 192.168.99.1   # pfSense MGMT
ping 192.168.99.2   # Switch
ping 192.168.20.5   # Proxmox
ping 192.168.20.11  # TrueNAS
```
