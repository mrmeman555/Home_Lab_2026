FROM ubuntu:24.04

# DMZ Target Server — exposed services in the buffer zone
# Sec+ Mapping: 3.2 (device placement in DMZ), 4.1 (hardening target), 4.9 (log source)

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    apache2 \
    openssh-server \
    bind9 \
    bind9-utils \
    rsyslog \
    iptables \
    iproute2 \
    iputils-ping \
    curl \
    net-tools \
    tcpdump \
    fail2ban \
    vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Configure SSH — intentionally use password auth (hardening exercise will fix this)
RUN mkdir -p /run/sshd && \
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config && \
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    echo "root:labpassword" | chpasswd

# Create a regular user for exercises
RUN useradd -m -s /bin/bash labuser && \
    echo "labuser:labpassword" | chpasswd

# Configure Apache — basic site
RUN echo '<html><head><title>DMZ Web Server</title></head><body><h1>Security Lab — DMZ Zone</h1><p>This server is in VLAN 51 (172.16.51.0/24).</p><p>If you can see this, your firewall rule worked.</p></body></html>' > /var/www/html/index.html

# Enable Apache logging (access.log + error.log are log analysis targets)
RUN a2enmod status

# Configure rsyslog to capture auth attempts
RUN echo 'auth,authpriv.*    /var/log/auth.log' >> /etc/rsyslog.d/50-default.conf

COPY entrypoint.sh /opt/entrypoint.sh
RUN chmod +x /opt/entrypoint.sh

EXPOSE 22 53 80 443

ENTRYPOINT ["/opt/entrypoint.sh"]
