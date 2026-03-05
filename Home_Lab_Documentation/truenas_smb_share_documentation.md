# TrueNAS SMB Share - Setup Documentation

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│      PHYSICAL SERVER (Proxmox Host: 192.168.20.5)           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Proxmox VE Hypervisor                     │   │
│  │                                                     │   │
│  │  ┌───────────────────────────────────────────┐     │   │
│  │  │  VM 100: TrueNAS (192.168.20.11)          │     │   │
│  │  │                                           │     │   │
│  │  │  OS Disk: 32GB virtual (scsi0)            │     │   │
│  │  │  Data Disk: WD Black (PCI passthrough)    │     │   │
│  │  │                                           │     │   │
│  │  │  ZFS Pool: TrueNAS-WDBlack                │     │   │
│  │  │  └─ Dataset: "Share" (548 MB)             │     │   │
│  │  │                                           │     │   │
│  │  │  SMB Service: RUNNING                     │     │   │
│  │  │  Share Name: Share                        │     │   │
│  │  │  Share Path: /mnt/TrueNAS-WDBlack/Share   │     │   │
│  │  └───────────────────────────────────────────┘     │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ VLAN 20 (Servers)
                         │ Protocol: SMB/CIFS
                         │ Port: 445
                         │
                         ▼
          ┌──────────────────────────────┐
          │  Ubuntu Desktop              │
          │  (VLAN 10: 192.168.10.x)     │
          │                              │
          │  Mount Point: /mnt/share     │
          │  Target: //192.168.20.11/Share│
          │  Auto-mount: fstab           │
          └──────────────────────────────┘
```

---

## Hardware Configuration (Proxmox VM 100)

| Component | Configuration | Notes |
|-----------|---------------|-------|
| **Memory** | 8 GB | Adequate for TrueNAS with light usage |
| **CPU** | 2 cores (1 socket) | x86-64-v2-AES |
| **OS Disk** | 32 GB virtual (scsi0) | TrueNAS system, stored on Proxmox local-lvm |
| **Data Disk** | PCI Passthrough (0000:01:00.0) | Physical WD Black drive |
| **Network** | virtio (vmbr0, VLAN 20) | 192.168.20.11 |
| **Boot Order** | scsi0, sata0, net0 | - |
| **Start at Boot** | **Yes** | VM auto-starts with Proxmox |

---

## TrueNAS Configuration

### Storage

| Setting | Value |
|---------|-------|
| Pool Name | TrueNAS-WDBlack |
| Pool Status | Online, Healthy |
| Total Capacity | ~900 GB |
| Compression | LZ4 |
| Deduplication | OFF |

### Dataset: "Share"

| Setting | Value |
|---------|-------|
| Path | /mnt/TrueNAS-WDBlack/Share |
| Type | FILESYSTEM |
| Sync | STANDARD |
| Compression | LZ4 (inherited) |
| Case Sensitivity | ON |
| Atime | OFF |
| Current Usage | 548 MB |

### SMB Share Configuration

| Setting | Value |
|---------|-------|
| Share Name | Share |
| Path | /mnt/TrueNAS-WDBlack/Share |
| Enabled | **Yes** |
| Purpose | Default share parameters |
| Description | - |
| Audit Logging | No |

### SMB Service

| Setting | Value |
|---------|-------|
| Service | SMB (Windows Shares) |
| Status | **RUNNING** |
| Start Automatically | **Yes** |

---

## Ubuntu Client Configuration

### Mount Point

```bash
/mnt/share
```

### fstab Entry

**File:** `/etc/fstab`

```
//192.168.20.11/Share /mnt/share cifs credentials=/home/aaron/.smbcredentials,uid=1000,gid=1000,_netdev,x-systemd.automount,nofail 0 0
```

### fstab Options Explained

| Option | Purpose |
|--------|---------|
| `credentials=/home/aaron/.smbcredentials` | Stores username/password securely |
| `uid=1000,gid=1000` | Mounts as user aaron (UID 1000) |
| `_netdev` | Waits for network before mounting |
| `x-systemd.automount` | Mounts on first access (systemd auto-mount) |
| `nofail` | Allows boot to continue if mount fails |

### Credentials File

**File:** `/home/aaron/.smbcredentials`

```
username=YOUR_TRUENAS_USER
password=YOUR_TRUENAS_PASSWORD
```

**Permissions (CRITICAL):**
```bash
chmod 600 /home/aaron/.smbcredentials
```

Only the owner can read this file (security requirement).

---

## Network Configuration

| Device | VLAN | IP Address | Purpose |
|--------|------|------------|---------|
| TrueNAS VM | 20 (Servers) | 192.168.20.11 | SMB server |
| Ubuntu Desktop | 10 (Users) | 192.168.10.x (DHCP) | SMB client |
| Proxmox Host | 20 (Servers) | 192.168.20.5 | Hypervisor |

### Firewall Rules

- **LAN (VLAN 10) → SERVERS (VLAN 20):** ALLOWED
- Traffic flows through pfSense for inter-VLAN routing
- SMB uses TCP port 445

---

## Normal Operations

### Accessing the Share

From Ubuntu desktop, the share auto-mounts on first access:

```bash
# Navigate to share
cd /mnt/share

# Or open in file manager
xdg-open /mnt/share
```

### Manual Mount (if needed)

```bash
# Mount all fstab entries
sudo mount -a

# Or mount just the share
sudo mount /mnt/share
```

### Manual Unmount

```bash
sudo umount /mnt/share
```

### Check Mount Status

```bash
# See if share is mounted
mount | grep share

# Or
df -h | grep share
```

---

## Troubleshooting

### Issue: Share Shows Empty After Reboot

**Symptom:** `/mnt/share` exists but appears empty after system restart.

**Root Cause:** Share failed to auto-mount (usually timing—TrueNAS VM not ready when Ubuntu tried to mount).

**Fix:**
```bash
# Manually trigger mount
sudo mount -a

# Verify
ls -la /mnt/share
```

**Permanent Fix (if recurring):**
The fstab entry already has proper delay flags (`_netdev`, `x-systemd.automount`). If this happens frequently, consider:
1. Increasing network timeout in systemd
2. Adding a systemd mount unit with explicit delay
3. Ensuring TrueNAS VM starts first (already configured)

---

### Issue: "Permission Denied" on Share

**Check:**
1. **TrueNAS User Permissions:** Navigate to TrueNAS → Datasets → Share → Permissions
   - Owner should have Read/Write/Execute
   - Group should have appropriate access

2. **SMB User Credentials:** Verify `/home/aaron/.smbcredentials` has correct username/password

3. **File Ownership on Ubuntu:**
   ```bash
   ls -ld /mnt/share
   # Should show owner as aaron (uid 1000)
   ```

**Fix Wrong Ownership:**
Remount with correct UID:
```bash
sudo umount /mnt/share
sudo mount -a
```

---

### Issue: "Host is Down" or Connection Timeout

**Checks:**

1. **Is TrueNAS VM running?**
   ```bash
   ping 192.168.20.11
   ```
   If no response, check Proxmox web UI → VM 100 status

2. **Is SMB service running in TrueNAS?**
   - Access TrueNAS web UI: http://192.168.20.11
   - Navigate to System → Services
   - Verify SMB is **RUNNING**

3. **Firewall blocking?**
   ```bash
   # Test SMB port
   nc -zv 192.168.20.11 445
   ```
   Should show "succeeded" or "open"

4. **Check pfSense firewall logs:**
   - Status → System Logs → Firewall
   - Look for blocks on port 445 from 192.168.10.x to 192.168.20.11

---

### Issue: TrueNAS VM Won't Start

**Check Proxmox Console:**

1. Select VM 100 → Console
2. Look for error messages during boot
3. Common issues:
   - PCI passthrough device missing/changed
   - Disk corruption
   - Memory allocation failure

**Recovery:**
- Boot into TrueNAS console (if accessible)
- Check pool import status: `zpool status`
- If pool won't import, may need disk troubleshooting

---

### Issue: ZFS Pool Shows Degraded or Errors

**In TrueNAS Web UI:**

1. Navigate to **Storage → Dashboard**
2. Check **ZFS Health** status
3. If errors exist:
   - Click **"Scrub"** to run integrity check
   - Review **Last Scan Errors**

**Via Console:**
```bash
# Check pool status
zpool status -v

# Run scrub
zpool scrub TrueNAS-WDBlack

# Check scrub progress
zpool status TrueNAS-WDBlack
```

---

## Maintenance Tasks

### Regular Scrubs

**Recommended:** Monthly

**How:**
1. TrueNAS Web UI → Storage → Dashboard
2. Click **TrueNAS-WDBlack** pool
3. Click **"Scrub"** button
4. Or set up automatic scrubs in **Storage → Scrub Tasks**

---

### Monitoring Disk Health

**Check in TrueNAS:**
- Storage → Disks
- Click on WD Black drive
- Review SMART data

**Set up alerts:**
- System → Alert Settings
- Enable disk health alerts

---

### Backups

**Current Status:** No automated backups configured

**Recommendation:**
- Set up snapshots in TrueNAS (Storage → Snapshots)
- Or use external backup solution (rsync, Duplicati, etc.)

---

## Access URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| Proxmox Web UI | https://192.168.20.5:8006 | root / [password] |
| TrueNAS Web UI | http://192.168.20.11 | [truenas_user] / [password] |
| SMB Share Path | `//192.168.20.11/Share` | [truenas_user] / [password] |

---

## Quick Reference Commands

```bash
# Mount the share
sudo mount -a

# Unmount the share
sudo umount /mnt/share

# Check if mounted
mount | grep share

# Test connection to TrueNAS
ping 192.168.20.11

# Test SMB port
nc -zv 192.168.20.11 445

# View fstab
cat /etc/fstab

# Edit credentials (if password changes)
nano ~/.smbcredentials
chmod 600 ~/.smbcredentials
```

---

## Server+ Concepts Covered

- [x] Network File Sharing (SMB/CIFS protocol)
- [x] Virtual Machine configuration and management
- [x] PCI passthrough (hardware virtualization)
- [x] ZFS filesystem and storage pools
- [x] Linux fstab and auto-mounting
- [x] Network storage protocols
- [x] File permissions and ownership
- [x] Service management and monitoring
- [x] Inter-VLAN communication

---

## Change Log

| Date | Change | Reason |
|------|--------|--------|
| 2025-02-13 | Initial documentation | Post-reboot troubleshooting revealed need for reference |

---

## Notes

- The share uses **PCI passthrough** for the data disk—this means the physical WD Black drive is dedicated exclusively to the TrueNAS VM
- If you need to access the data from Proxmox host directly, you'd need to shut down TrueNAS first and remove the passthrough
- The `nofail` option in fstab ensures Ubuntu boots even if TrueNAS is down
- Auto-mount triggers on first access to `/mnt/share` thanks to `x-systemd.automount`
