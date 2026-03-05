# HomeLab VPN Reference

## Overview

```
Phone/Laptop (anywhere)
       │
       │ Tailscale (WireGuard encrypted)
       ▼
   pfSense (subnet router)
       │
       ├── 192.168.10.0/24 (Users)
       ├── 192.168.20.0/24 (Servers)
       └── 192.168.99.0/24 (MGMT)
```

---

## Tailscale Configuration

| Setting | Value |
|---------|-------|
| Account | aaron.reveley65@gmail.com |
| Subnet Router | pfSense |
| Exit Node | pfSense (optional) |
| Login Server | https://controlplane.tailscale.com |

---

## Advertised Routes

| Route | VLAN | Access To |
|-------|------|-----------|
| 192.168.10.0/24 | 10 (Users) | Desktop, WAP |
| 192.168.20.0/24 | 20 (Servers) | Proxmox, TrueNAS |
| 192.168.99.0/24 | 99 (MGMT) | Switch, full admin |

---

## Connected Devices

| Device | Tailscale IP | Notes |
|--------|--------------|-------|
| pfSense | (check admin) | Subnet router + exit node |
| samsung-sm-s908u1 | 100.83.160.73 | Phone |

---

## How It Works

| Direction | What Happens |
|-----------|--------------|
| **Remote → Home** | Phone/laptop connects via Tailscale, reaches all VLANs through pfSense |
| **Home → Internet** | Local devices go direct to ISP (unchanged) |
| **Exit Node enabled** | Remote device routes ALL traffic through pfSense (use on public WiFi) |

---

## Access URLs (via Tailscale)

From any Tailscale-connected device, anywhere:

| Service | URL |
|---------|-----|
| pfSense | https://192.168.10.1 or https://192.168.99.1 |
| Proxmox | https://192.168.20.5:8006 |
| TrueNAS | http://192.168.20.11 |
| Switch | http://192.168.99.2 |

---

## Admin Console

| Task | Location |
|------|----------|
| Manage devices | https://login.tailscale.com → Machines |
| Approve routes | Machines → pfSense → Edit route settings |
| Generate auth keys | Settings → Keys |
| View connected devices | Settings → Machines |

---

## pfSense Tailscale Settings

| Location | Setting |
|----------|---------|
| VPN → Tailscale → Authentication | Auth key |
| VPN → Tailscale → Settings | Enable, Exit node, Advertised routes |
| VPN → Tailscale → Status | Connection status |

---

## Troubleshooting

| Issue | Check |
|-------|-------|
| Can't reach home network | Routes approved in Tailscale admin? |
| pfSense not showing in Machines | Auth key valid? Tailscale enabled? |
| Slow connection | Using DERP relay? Check Tailscale status |
| Exit node not working | Approved in admin console? |

---

## Security Notes

- Tailscale uses WireGuard encryption (peer-to-peer)
- Traffic goes direct when possible, DERP relay when NAT blocks direct
- Tailscale coordination server only brokers connections, doesn't see traffic
- Auth keys can be set to expire
- Disable key expiry for pfSense (trusted device)

---

## Quick Test (from remote device)

```bash
# With Tailscale connected on phone/laptop
ping 192.168.10.1   # pfSense
ping 192.168.20.5   # Proxmox
ping 192.168.99.2   # Switch

# Open in browser
https://192.168.20.5:8006  # Proxmox UI
```
