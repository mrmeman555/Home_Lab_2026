#!/bin/bash
# DMZ Server entrypoint — start all services

echo "[*] DMZ server starting (172.16.51.10)..."

# Start rsyslog first (captures logs from other services)
echo "[*] Starting rsyslog..."
rsyslogd

# Start SSH
echo "[*] Starting SSH (port 22)..."
echo "[!] WARNING: Password auth enabled, root login enabled — this is INTENTIONALLY INSECURE"
echo "[!] Hardening exercise: disable root login, switch to key auth, enable fail2ban"
/usr/sbin/sshd

# Start Apache
echo "[*] Starting Apache (port 80)..."
apachectl start

# Start bind9 (DNS)
echo "[*] Starting bind9 (port 53)..."
named -g &

echo ""
echo "============================================"
echo "  DMZ SERVER ONLINE — INTENTIONALLY WEAK"
echo "============================================"
echo "  IP:       172.16.51.10"
echo "  Gateway:  172.16.51.1 (router)"
echo "  Services:"
echo "    SSH     — port 22  (root:labpassword) ← HARDEN THIS"
echo "    HTTP    — port 80  (Apache default)"
echo "    DNS     — port 53  (bind9)"
echo ""
echo "  Log locations:"
echo "    /var/log/auth.log       — SSH attempts"
echo "    /var/log/apache2/access.log  — HTTP requests"
echo "    /var/log/apache2/error.log   — HTTP errors"
echo "    /var/log/syslog         — System events"
echo ""
echo "  Users:"
echo "    root:labpassword"
echo "    labuser:labpassword"
echo "============================================"

# Keep container running
exec sleep infinity
