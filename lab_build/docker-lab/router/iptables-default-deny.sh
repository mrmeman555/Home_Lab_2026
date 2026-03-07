#!/bin/bash
# ============================================================================
# DEFAULT-DENY FIREWALL RULES — The Starting Point
# ============================================================================
# This script establishes the baseline: DENY ALL between zones.
# The operator builds rules FROM SCRATCH during lab exercises.
#
# Sec+ Mapping:
#   2.5  — Least privilege (default deny)
#   4.5  — Firewall rules, access lists, ports/protocols (PBQ CONFIRMED)
#   1.1  — Technical Preventive Control
#
# Zone Layout:
#   172.16.50.0/24 (Corporate / Trusted)    — eth0
#   172.16.51.0/24 (DMZ / Semi-Trusted)     — eth1
#   172.16.52.0/24 (Attack / Untrusted)     — eth2
#
# To add rules during exercises, exec into the router:
#   docker exec -it router bash
#   iptables -A FORWARD -s 172.16.50.0/24 -d 172.16.51.10 -p tcp --dport 80 -j ACCEPT
#   iptables -L FORWARD -v -n --line-numbers
# ============================================================================

set -e

echo "[*] Flushing existing rules..."
iptables -F
iptables -t nat -F
iptables -X

# --------------------------------------------------------------------------
# DEFAULT POLICIES
# --------------------------------------------------------------------------
# INPUT/OUTPUT: Allow (this is the router itself, it needs to function)
# FORWARD: DROP (nothing crosses zones unless explicitly permitted)
# --------------------------------------------------------------------------
iptables -P INPUT ACCEPT
iptables -P OUTPUT ACCEPT
iptables -P FORWARD DROP

echo "[*] Default FORWARD policy: DROP"

# --------------------------------------------------------------------------
# STATEFUL TRACKING — Allow established/related connections back
# --------------------------------------------------------------------------
# If we allow a connection in one direction, the return traffic should flow.
# This is how stateful firewalls work — exam tests this concept.
# Sec+ 3.2: Stateful inspection, Layer 4 firewall behavior
# --------------------------------------------------------------------------
iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

echo "[*] Stateful tracking: ESTABLISHED,RELATED allowed"

# --------------------------------------------------------------------------
# LOGGING — Log all dropped FORWARD packets
# --------------------------------------------------------------------------
# Every denied cross-zone attempt gets logged.
# This is the data source for 4.9 exercises (firewall log analysis).
# Control classification: Technical Detective (1.1)
# --------------------------------------------------------------------------
iptables -A FORWARD -j LOG \
    --log-prefix "[FW-DENY] " \
    --log-level 4 \
    --log-tcp-options \
    --log-ip-options

echo "[*] Logging enabled: all denied FORWARD traffic → [FW-DENY]"

# --------------------------------------------------------------------------
# ALLOW ICMP (ping) to the router itself from all zones
# --------------------------------------------------------------------------
# So you can verify gateway reachability within each zone.
# The router should always be pingable — this is a diagnostic baseline.
# --------------------------------------------------------------------------
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
iptables -A OUTPUT -p icmp --icmp-type echo-reply -j ACCEPT

echo "[*] ICMP to router: allowed (diagnostic baseline)"

# --------------------------------------------------------------------------
# SUMMARY
# --------------------------------------------------------------------------
echo ""
echo "============================================"
echo "  FIREWALL BASELINE: DEFAULT-DENY ACTIVE"
echo "============================================"
echo "  Corporate (172.16.50.0/24) ←X→ DMZ (172.16.51.0/24)"
echo "  Corporate (172.16.50.0/24) ←X→ Attack (172.16.52.0/24)"
echo "  DMZ (172.16.51.0/24)       ←X→ Attack (172.16.52.0/24)"
echo ""
echo "  All cross-zone traffic BLOCKED."
echo "  All denied packets LOGGED with prefix [FW-DENY]"
echo "  Stateful return traffic ALLOWED."
echo ""
echo "  To add rules:"
echo "    iptables -A FORWARD -s <src> -d <dst> -p <proto> --dport <port> -j ACCEPT"
echo "  To view rules:"
echo "    iptables -L FORWARD -v -n --line-numbers"
echo "  To view logs:"
echo "    dmesg | grep FW-DENY"
echo "============================================"
