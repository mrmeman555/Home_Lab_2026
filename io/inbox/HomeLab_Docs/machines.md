# HomeLab Machines Reference

---

## pfSense

| Field | Value |
|-------|-------|
| **Role** | Router / Firewall / DHCP Server |
| **IPs** | 192.168.10.1 (LAN), 192.168.20.1 (SERVERS), 192.168.99.1 (MGMT) |
| **VLANs** | 10, 20, 99 |
| **OS** | pfSense (FreeBSD-based) |
| **NICs** | Intel igb (igb0 = WAN, igb1 = LAN trunk) |

**Services:**
- DHCP Server (all VLANs)
- DNS Resolver
- Firewall
- Inter-VLAN Routing

**Access:**
- Web UI: https://192.168.10.1 (from LAN) or https://192.168.99.1 (from MGMT)
- Console: Physical or serial

**Quirks:**
- ⚠️ Hardware Checksum Offloading: **MUST BE DISABLED**
- ⚠️ Hardware TCP Segmentation: **MUST BE DISABLED**
- ⚠️ Hardware LRO: **MUST BE DISABLED**
- Location: System → Advanced → Networking
- Reason: Intel igb driver corrupts 802.1Q VLAN tags

---

## Proxmox

| Field | Value |
|-------|-------|
| **Role** | Hypervisor |
| **IP** | 192.168.20.5 |
| **VLAN** | 20 (Servers) |
| **MAC** | dc:4a:3e:6b:8b:69 |
| **OS** | Proxmox VE 8.4.14 (Debian-based) |
| **CPU** | — |
| **RAM** | 16 GB (single stick) |
| **Storage** | Local LVM + WD Black (passed through to TrueNAS) |

**Services:**
- KVM Virtualization
- LXC Containers
- VM 100: TrueNAS

**Access:**
- Web UI: https://192.168.20.5:8006
- SSH: `ssh root@192.168.20.5`
- Console: VGA (physical)

**Quirks:**
- ⚠️ Static IP configured in `/etc/network/interfaces`, NOT DHCP
- ⚠️ Also has DHCP static mapping in pfSense (belt and suspenders)
- ⚠️ Mixed RAM causes POST failure — had 16GB + 4GB sticks, now runs single 16GB
- CMOS reset required during troubleshooting session

---

## TrueNAS VM

| Field | Value |
|-------|-------|
| **Role** | NAS / File Server |
| **IP** | 192.168.20.11 |
| **VLAN** | 20 (Servers) |
| **OS** | TrueNAS Community Edition |
| **Host** | Proxmox VM 100 |
| **CPU** | 2 cores |
| **RAM** | 8 GB |
| **OS Disk** | 32 GB virtual (scsi0 on local-lvm) |
| **Data Disk** | WD Black ~1TB (PCI passthrough 0000:01:00.0) |

**Storage:**
- ZFS Pool: TrueNAS-WDBlack
- Capacity: ~900 GB
- Compression: LZ4
- Datasets: Share, Proxmox-VMs

**Services:**
- SMB (Windows Shares): RUNNING
- NFS (Unix Shares): RUNNING

**Shares:**
| Name | Path | Protocol |
|------|------|----------|
| Share | /mnt/TrueNAS-WDBlack/Share | SMB |
| Proxmox-VMs | /mnt/TrueNAS-WDBlack/Proxmox-VMs | NFS |

**Access:**
- Web UI: http://192.168.20.11
- Console: Proxmox → VM 100 → Console

**Quirks:**
- ⚠️ Start at boot: **YES** (auto-starts with Proxmox)
- ⚠️ Uses PCI passthrough — WD Black is dedicated to this VM
- ⚠️ If Proxmox reboots, SMB clients need to remount (`sudo mount -a`)

---

## Desktop (Ubuntu)

| Field | Value |
|-------|-------|
| **Role** | Workstation |
| **IP** | DHCP (192.168.10.x) |
| **VLAN** | 10 (Users) |
| **OS** | Ubuntu |
| **Model** | ROG Strix G15CX |
| **Network Interface** | eno2 |

**Services:**
- Daily driver workstation

**Mounts:**
| Mount Point | Target | Protocol |
|-------------|--------|----------|
| /mnt/share | //192.168.20.11/Share | SMB/CIFS |

**Access:**
- Physical
- SSH (if enabled)

**Quirks:**
- ⚠️ SMB share configured in `/etc/fstab` with auto-mount
- ⚠️ Credentials stored in `/home/aaron/.smbcredentials` (chmod 600)
- ⚠️ After reboot, may need `sudo mount -a` if TrueNAS wasn't ready

---

## Laptop (Windows)

| Field | Value |
|-------|-------|
| **Role** | Crash Cart / Mobile Admin |
| **IP** | DHCP (192.168.99.x) |
| **VLAN** | 99 (MGMT) |
| **OS** | Windows |

**Services:**
- Administrative access to all VLANs

**Access:**
- Physical
- Plugs into switch port 8

**Quirks:**
- ⚠️ Disable WiFi when using for MGMT — Windows routes through WiFi if both connected
- ⚠️ Has full access to all networks (MGMT VLAN privilege)

---

## TP-Link TL-SG108E

| Field | Value |
|-------|-------|
| **Role** | Managed Switch |
| **IP** | 192.168.99.2 |
| **VLAN** | 99 (MGMT) |
| **Ports** | 8 × Gigabit |
| **Features** | 802.1Q VLANs, PVID, Port Statistics |

**Access:**
- Web UI: http://192.168.99.2 (from MGMT VLAN only)

**Quirks:**
- ⚠️ Management IP only reachable from VLAN 99
- ⚠️ Port 1 is trunk — do not change without understanding VLAN config
- ⚠️ Check Monitoring → Port Statistics for RxBadPkt errors (indicates VLAN tagging issues)

---

## WAP (Wireless Access Point)

| Field | Value |
|-------|-------|
| **Role** | WiFi Access |
| **IP** | DHCP (192.168.10.x) |
| **VLAN** | 10 (Users) |
| **Mode** | Bridge / WAP |

**Services:**
- WiFi for Users VLAN

**Access:**
- Web UI: http://[DHCP IP] (check pfSense leases)

**Quirks:**
- ⚠️ DHCP Server: **DISABLED** (critical — conflicts with pfSense if enabled)
- ⚠️ Operating in WAP/bridge mode, not router mode
- ⚠️ WiFi clients land on VLAN 10 (Users)

---

## Quick Access Reference

| Machine | URL / Command |
|---------|---------------|
| pfSense | https://192.168.99.1 |
| Proxmox | https://192.168.20.5:8006 |
| TrueNAS | http://192.168.20.11 |
| Switch | http://192.168.99.2 |
| Proxmox SSH | `ssh root@192.168.20.5` |
| Mount share | `sudo mount -a` |
