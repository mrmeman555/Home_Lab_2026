# Lab Build — Sec+ Concept Reference

These are the exam objective sub-items you'll encounter during the lab design and build. Not the full objectives list — just the ones this project touches. Tag concepts as you go.

---

## 1.2 — Fundamental Security Concepts (12%)

Relevant sub-items:
- **CIA triad** — Confidentiality, Integrity, Availability
- **Zero Trust**: Control plane (adaptive identity, threat scope reduction, policy-driven access, secured zones), Data plane (subject/system, policy engine, policy enforcement point)
- **Physical security** — we're doing logical, not physical, but the concepts parallel
- **Deception technology** — honeypot, honeynet, honeyfile, honeytoken (the DMZ zone could host one)

## 2.5 — Mitigation Techniques (22%)

Relevant sub-items:
- **Segmentation** — why we split into three VLANs
- **Access control** (ACL, permissions) — pfSense firewall rules
- **Application allow list** — what services are permitted per zone
- **Isolation** — attack network isolated from corporate
- **Patching** — keeping lab VMs updated
- **Monitoring** — log collection across zones
- **Least privilege** — default deny, only open what's needed
- **Hardening techniques**: host-based firewall, disabling ports/protocols, default password changes, removal of unnecessary software

## 3.1 — Security Architecture Models (18%)

Relevant sub-items:
- **Network infrastructure**: Physical isolation, logical segmentation, SDN
- **On-premises** vs cloud
- **Containerization / Virtualization** — the lab runs on Proxmox VMs
- **Considerations**: Availability, Resilience, Cost, Responsiveness, Scalability, Ease of deployment, Risk transference, Ease of recovery, Patch availability, Power, Compute

## 3.2 — Securing Enterprise Infrastructure (18%) ← HEAVIEST LAB MATCH

Relevant sub-items:
- **Infrastructure considerations**: Device placement, Security zones, Attack surface, Connectivity, Inline, Failure modes (fail-open / fail-closed), Device attributes (active/passive, inline/tap)
- **Network appliances**: Jump server, Proxy server, IPS/IDS, Load balancer, Sensors
- **Port security**: 802.1X, EAP
- **Firewall types**: WAF, UTM, NGFW, Layer 4 / Layer 7
- **Secure communications**: VPN, Remote access, Tunneling (TLS, IPSec), SD-WAN, SASE
- **Selection of effective controls**

## 4.1 — Security Techniques for Computing Resources (28%)

Relevant sub-items:
- **Secure baselines**: Establish, Deploy, Maintain
- **Hardening targets**: Workstations, Switches, Routers, Servers, ICS/SCADA, Embedded, RTOS, IoT
- **Application security**: Input validation, Secure cookies, Static code analysis, Code signing
- **Sandboxing**
- **Monitoring**

## 4.4 — Security Alerting and Monitoring (28%)

Relevant sub-items:
- **Monitoring computing resources**: Systems, Applications, Infrastructure
- **Activities**: Log aggregation, Alerting, Scanning, Reporting, Archiving, Alert response/remediation (quarantine, alert tuning)
- **Tools**: Benchmarks, Agents/agentless, SIEM, Antivirus, DLP, SNMP traps, NetFlow, Vulnerability scanners

## 4.5 — Modify Enterprise Capabilities (28%) ← PBQ CONFIRMED

Relevant sub-items:
- **Firewall**: Rules, Access lists, Ports/protocols, Screened subnets
- **IDS/IPS**: Trends, Signatures
- **Web filter**: Agent-based, Centralized proxy, URL scanning, Content categorization, Block rules, Reputation
- **Operating system security**: Group Policy, SELinux
- **Implementation of secure protocols**: Protocol selection, Port selection, Transport method
- **DNS filtering**
- **Email security**: DMARC, DKIM, SPF, Gateway
- **File integrity monitoring**
- **DLP, NAC, EDR/XDR**
- **User behavior analytics**

## 4.9 — Data Sources for Investigation (28%) ← PBQ CONFIRMED

Relevant sub-items:
- **Log data**: Firewall logs, Application logs, Endpoint logs, OS-specific security logs, IPS/IDS logs, Network logs, Metadata
- **Data sources**: Vulnerability scans, Automated reports, Dashboards, Packet captures

---

## Packt Reference: Attack Surface (OSI Layers)

- Layer 1/2 — attacker connects to ports/wireless, communicates within broadcast domain
- Layer 3 — attacker obtains valid address (possibly spoofed), communicates across zones
- Layer 4/7 — attacker establishes connections to TCP/UDP ports, talks to application services
- Each layer needs its own controls → **defense in depth**
- Network perimeter prevents external attacks at any layer
- Internal segmentation mitigates compromised/unauthorized internal hosts

## Packt Reference: Hardening Concepts

**Switches & Routers:** Change default creds, disable unnecessary services/interfaces, use SSH/HTTPS not Telnet/HTTP, implement ACLs, configure port security, enforce strong passwords

**Servers & OS:** Change default creds, disable unnecessary services, apply patches, use firewalls + IDS, secure configuration, enable logging/monitoring, AV/antimalware, physical security

## Packt Reference: Network Access Control

- NAC authenticates users/devices AND enforces compliance (OS version, patch level, AV status)
- Restricts access by user profile, device type, location
- **Dynamic VLAN assignment** — NAC assigns VLAN based on identity/device/health
- **Agent-based** — software on device, communicates with NAC, can auto-remediate
- **Agentless** — port-based control or network scans (DHCP fingerprinting, open port detection)
