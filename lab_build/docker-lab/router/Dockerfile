FROM alpine:3.19

# Router/Firewall container — the chokepoint between all three zones
# Sec+ Mapping: 3.2 (firewall, device placement), 4.5 (rules, ACLs)

RUN apk add --no-cache \
    iptables \
    ip6tables \
    iproute2 \
    iputils \
    tcpdump \
    curl \
    bind-tools \
    bash \
    rsyslog \
    nftables \
    conntrack-tools \
    && mkdir -p /var/log/firewall

COPY iptables-default-deny.sh /opt/iptables-default-deny.sh
COPY entrypoint.sh /opt/entrypoint.sh
RUN chmod +x /opt/iptables-default-deny.sh /opt/entrypoint.sh

ENTRYPOINT ["/opt/entrypoint.sh"]
