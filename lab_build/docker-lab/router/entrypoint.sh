#!/bin/bash
# Router entrypoint — apply firewall rules and keep running

echo "[*] Router starting..."
echo "[*] Interfaces:"
ip -4 addr show | grep -E "inet " | grep -v "127.0.0.1"

echo ""
echo "[*] Applying default-deny firewall rules..."
/opt/iptables-default-deny.sh

echo ""
echo "[*] Router is online. Exec into this container to manage rules."
echo "[*]   docker exec -it router bash"
echo ""

# Keep container running
exec sleep infinity
