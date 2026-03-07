# Security+ Lab — Docker Edition

A portable, containerized three-zone security lab for CompTIA Security+ SY0-701 exam prep.

## Quick Start

```bash
cd lab_build/docker-lab
docker compose up -d        # Build and start everything
docker compose ps           # Verify all containers are running
```

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Docker Host                        │
│                                                      │
│   lab-corporate (172.16.50.0/24)                     │
│     └── (empty — add targets as needed)              │
│                                                      │
│   lab-dmz (172.16.51.0/24)                           │
│     └── ubuntu-dmz (172.16.51.10)                    │
│         Apache, SSH, DNS, rsyslog                    │
│                                                      │
│   lab-attack (172.16.52.0/24)                        │
│     └── kali (172.16.52.10)                          │
│         Nmap, hping3, tcpdump, Hydra                 │
│                                                      │
│   router (172.16.50.1 / 51.1 / 52.1)                │
│     iptables — DEFAULT DENY between all zones        │
│     Connected to all three networks                  │
└─────────────────────────────────────────────────────┘
```

## Interacting with the Lab

```bash
# Enter the attacker (Kali)
docker exec -it kali bash

# Enter the DMZ target
docker exec -it ubuntu-dmz bash

# Enter the router/firewall
docker exec -it router bash

# View firewall rules
docker exec router iptables -L FORWARD -v -n --line-numbers

# View firewall deny logs
docker exec router dmesg | grep FW-DENY

# View SSH attempts on DMZ server
docker exec ubuntu-dmz cat /var/log/auth.log

# View Apache access log
docker exec ubuntu-dmz cat /var/log/apache2/access.log
```

## Exercise Workflow

### 1. Firewall ACL Practice (PBQ Prep — Objective 4.5)

The lab starts with DEFAULT DENY. Nothing crosses zones. You build rules:

```bash
# Exec into router
docker exec -it router bash

# Allow Kali to reach web server on port 80 only
iptables -A FORWARD -s 172.16.52.0/24 -d 172.16.51.10 -p tcp --dport 80 -j ACCEPT

# Verify from Kali
docker exec kali curl -s http://172.16.51.10

# Verify SSH is still blocked
docker exec kali bash -c "echo | nc -w 2 172.16.51.10 22"  # Should timeout

# View your rules
iptables -L FORWARD -v -n --line-numbers

# Delete a rule by number
iptables -D FORWARD 2
```

### 2. Attack → Detect → Respond (Objectives 2.4, 4.8, 4.9)

```bash
# First, allow Kali → DMZ SSH (so the attack can land)
docker exec router iptables -A FORWARD -s 172.16.52.0/24 -d 172.16.51.10 -p tcp --dport 22 -j ACCEPT

# From Kali: brute force SSH
docker exec kali hydra -l root -P /usr/share/wordlists/rockyou.txt 172.16.51.10 ssh -t 4

# From DMZ: check the logs (DETECTION)
docker exec ubuntu-dmz tail -20 /var/log/auth.log

# From router: check firewall logs
docker exec router dmesg | grep FW-DENY

# CONTAINMENT: block the attacker
docker exec router iptables -I FORWARD 1 -s 172.16.52.10 -d 172.16.51.10 -p tcp --dport 22 -j DROP

# Verify the block worked
docker exec kali bash -c "echo | nc -w 2 172.16.51.10 22"  # Timeout = contained
```

### 3. Hardening Exercise (Objective 4.1)

The DMZ server is intentionally insecure:
- Root SSH login enabled
- Password authentication (weak passwords)
- Default Apache config
- No host-based firewall

Harden it:
```bash
docker exec -it ubuntu-dmz bash

# Disable root SSH login
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
kill -HUP $(cat /var/run/sshd.pid)

# Enable fail2ban
systemctl enable fail2ban && systemctl start fail2ban

# Add iptables rules (host-based firewall)
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m recent --set
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m recent --update --seconds 60 --hitcount 4 -j DROP
```

### 4. Recon & Scanning (Objective 5.5)

```bash
# From Kali (need firewall rules allowing the traffic first)
docker exec -it kali bash

# Port scan the DMZ
nmap -sV -sC 172.16.51.10

# Service enumeration
nmap -p 22,80,53 --script=default 172.16.51.10

# Packet capture
tcpdump -i eth0 -w /tmp/capture.pcap &
```

## Teardown & Reset

```bash
# Stop everything (preserves container state)
docker compose stop

# Full teardown (clean slate)
docker compose down

# Full teardown including images (rebuild from scratch)
docker compose down --rmi all

# Rebuild after changing Dockerfiles
docker compose build --no-cache
docker compose up -d
```

## Adding to the Lab Later

### Add a Corporate workstation
Add to `docker-compose.yml`:
```yaml
  corporate-ws:
    image: ubuntu:24.04
    container_name: corporate-ws
    hostname: corporate-ws
    networks:
      lab-corporate:
        ipv4_address: 172.16.50.10
    tty: true
    command: sleep infinity
```

### Add IDS/IPS (Suricata)
Can be added to the router or as a separate container on the DMZ network in tap mode.

### Add a SIEM (Wazuh/ELK)
Add as a container on a management network for log aggregation across all zones.

## Portability

This lab runs anywhere Docker runs:
- Ubuntu desktop (direct)
- Proxmox VM running Docker
- Proxmox LXC running Docker
- Cloud VM (AWS, DigitalOcean, etc.)
- GitHub Codespaces

Just clone the repo and `docker compose up -d`.

## Sec+ Objective Coverage

| Objective | How This Lab Exercises It |
|-----------|--------------------------|
| 1.1 | Every rule is a control — classify it (Technical Preventive, Detective, etc.) |
| 2.4 | Stage attacks → analyze indicators in logs |
| 2.5 | Segmentation, ACLs, isolation, hardening, least privilege — all built in |
| 3.1 | Three-zone architecture with logical segmentation |
| 3.2 | Device placement, security zones, firewall types, failure modes |
| 4.1 | Secure baselines, hardening targets (server, router) |
| 4.4 | Log aggregation, alerting, scanning |
| 4.5 | Firewall rules, IDS/IPS, OS security, DNS filtering — PBQ CONFIRMED |
| 4.8 | Full IR lifecycle: detect → analyze → contain → eradicate → recover |
| 4.9 | Firewall logs, application logs, endpoint logs, packet captures — PBQ CONFIRMED |
| 5.5 | Penetration testing, reconnaissance (passive/active) |
