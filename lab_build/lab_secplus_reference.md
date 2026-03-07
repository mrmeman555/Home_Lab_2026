# Lab Build — Sec+ Concept Reference

These are the exam objective sub-items you'll encounter during the lab design and build. Not the full objectives list — just the ones this project touches. Tag concepts as you go.

**Authoritative source for full objectives:** `io/inbox/CompTIA-Security-Plus-SY0-701-Exam-Objectives.pdf`
**Bloom's depth per sub-item:** `io/inbox/Cengage_Sec+_ExamObjectives.pdf` (visual reference) cross-referenced with `Sec+Analysis/blooms_lab_crossref.md` (extracted analysis)

---

## 1.1 — Security Control Types (12%)

Relevant sub-items:
- **Technical controls** — firewall rules, ACLs, encryption, IDS/IPS — the lab implements these directly
- **Control types: Preventive** — firewall deny rules prevent unauthorized traffic
- **Control types: Detective** — IDS/IPS, log monitoring detect anomalous activity
- **Control types: Corrective** — blocking an attacker IP after detection, restoring from snapshot
- **Control types: Compensating** — when a primary control isn't feasible, what's the alternative?

*Lab touch: Every firewall rule is a control. Exercises require identifying which type.*

## 1.2 — Fundamental Security Concepts (12%)

Relevant sub-items:
- **CIA triad** — Confidentiality (zone isolation prevents unauthorized access), Integrity (logging verifies no tampering), Availability (service placement ensures uptime)
- **AAA** — Authentication (SSH keys, password policy), Authorization (firewall rules = network-level authz), Accounting (logging)
- **Zero Trust**: Control plane (policy-driven access, secured zones, threat scope reduction), Data plane (subject/system, policy engine, policy enforcement point)
- **Deception technology** — honeypot, honeynet, honeyfile, honeytoken (the DMZ zone could host one)

*Lab touch: CIA drives every design decision. Default-deny IS Zero Trust at the network level. AAA maps to any auth config on Ubuntu/Windows.*
*Gap: Need a real Zero Trust exercise beyond default-deny.*

## 2.2 — Threat Vectors and Attack Surfaces (22%)

Relevant sub-items:
- **Vulnerable software** — unpatched services on Ubuntu, default configs
- **Unsupported systems** — exercises can simulate EOL scenarios
- **Unsecure networks** — flat network discussion (wired L2 attacks)
- **Open service ports** — Nmap scanning from Kali reveals these
- **Default credentials** — hardening exercises start with these

*Lab touch: The lab IS an attack surface. Kali scans expose it. Hardening reduces it.*

## 2.4 — Indicators of Malicious Activity (22%)

Relevant sub-items:
- **Network attacks** — DDoS simulation (hping3), on-path (ARP spoofing from Kali), DNS attacks
- **Application attacks** — brute force SSH, injection attempts against Apache
- **Password attacks** — spraying, brute force against SSH/RDP
- **Indicators** — account lockout (auth.log), blocked content (router iptables logs), resource consumption (top/htop during DDoS sim), missing logs (log tampering exercise)

*Lab touch: PRIMARY GAP FILLER. Cengage has no indicator analysis lab. Stage attacks from Kali → generate real indicators → analyze in logs. This is Analyzing-tier.*

## 2.5 — Mitigation Techniques (22%)

Relevant sub-items:
- **Segmentation** — why we split into three VLANs (blast radius reduction from 100% to ~33%)
- **Access control** (ACL, permissions) — router iptables rules, file permissions on Ubuntu/Windows
- **Application allow list** — what services are permitted per zone
- **Isolation** — attack network isolated from corporate; production air-gapped from lab
- **Patching** — keeping lab VMs updated
- **Encryption** — SSH, TLS for web, potential VPN between zones
- **Monitoring** — log collection across zones (router iptables logs, syslog, container logs)
- **Least privilege** — default deny, only open what's needed
- **Configuration enforcement** — baseline configs documented and enforced
- **Hardening techniques**: host-based firewall (iptables, Windows Firewall), disabling ports/protocols, default password changes, removal of unnecessary software

*Lab touch: THE LAB IS A MITIGATION TECHNIQUES SHOWCASE. Every design decision is a mitigation technique.*

## 3.1 — Security Architecture Models (18%)

Relevant sub-items:
- **Network infrastructure**: Physical isolation (air gap from production), logical segmentation (VLANs 50/51/52), SDN (Proxmox virtual switches)
- **On-premises** — the lab is entirely on-prem on Proxmox
- **Virtualization** — the lab runs on Proxmox VMs; VM escape is a discussion point
- **Considerations**: Availability (service placement), Resilience (snapshots), Cost (RAM constraints drove Docker pivot), Compute (lightweight — containers share host kernel), Ease of deployment (Docker Compose), Patch availability (Ubuntu LTS, container image updates)

*Lab touch: Zone architecture design directly exercises this. "Why three zones?" is a 3.1 question.*

## 3.2 — Securing Enterprise Infrastructure (18%) ← HEAVIEST LAB MATCH

Relevant sub-items:
- **Infrastructure considerations**: Device placement (router container between zones), Security zones (Corporate/DMZ/Attack), Attack surface (what's exposed per zone), Connectivity (inter-zone routing only through firewall), Failure modes (fail-open = all traffic passes, fail-closed = all traffic blocked — default-deny is fail-closed)
- **Device attributes**: Active (firewall actively filters) vs passive (IDS in tap mode), Inline (firewall in traffic path) vs tap/monitor (span port for IDS)
- **Network appliances**: Jump server (could add one in DMZ), Proxy server, IPS/IDS (Suricata as additional container (stretch goal)), Load balancer, Sensors
- **Port security**: 802.1X, EAP — conceptual (not implemented in virtual lab)
- **Firewall types**: WAF (ModSecurity on Apache), UTM, NGFW, Layer 4 (port-based rules) / Layer 7 (application-aware rules)
- **Secure communications**: VPN (site-to-site between zones), Remote access, Tunneling (TLS, IPSec), SD-WAN, SASE
- **Selection of effective controls** — every rule choice is this

*Lab touch: This objective IS the lab. Device placement, zones, firewall policy, failure modes — all directly built and tested.*

## 4.1 — Security Techniques for Computing Resources (28%)

Relevant sub-items:
- **Secure baselines**: Establish (document default config), Deploy (apply hardened config), Maintain (verify config hasn't drifted)
- **Hardening targets**: Routers (router container — iptables rule management, reviewing default policies), Servers (Ubuntu — iptables, disable services, SSH key auth, remove unnecessary packages)
- **Application security**: Input validation (Apache config), Secure cookies (web server hardening)
- **Monitoring** — log review after every exercise

*Lab touch: Hardening exercises directly target workstations, servers, and routers. Establish baseline → harden → verify.*

## 4.3 — Vulnerability Management (28%)

Relevant sub-items:
- **Identification**: Vulnerability scanning (Nmap, Greenbone/GVM from Kali), penetration testing (Metasploit from Kali)
- **Analysis**: False positive/negative identification, CVSS scoring, CVE lookup
- **Response/remediation**: Patching, segmentation (already done), compensating controls
- **Validation**: Rescanning after remediation to confirm fix

*Lab touch: Full vuln management lifecycle exercisable. Scan → analyze → remediate → rescan.*

## 4.4 — Security Alerting and Monitoring (28%)

Relevant sub-items:
- **Monitoring computing resources**: Systems (container logs), Applications (Apache access.log, auth.log), Infrastructure (router container, interface stats)
- **Activities**: Log aggregation (syslog forwarding to central point), Alerting (iptables LOG alerts), Scanning (scheduled Nmap scans), Reporting, Archiving
- **Alert response/remediation**: Quarantine (block attacker IP with firewall rule), Alert tuning (reduce false positives in IDS rules)
- **Tools**: Benchmarks (CIS benchmarks for hardening), Agents/agentless, SNMP traps (container monitoring), NetFlow (iptables logging), Vulnerability scanners (GVM)

*Lab touch: Every attack exercise generates monitoring data. Log analysis is a confirmed PBQ topic.*

## 4.5 — Modify Enterprise Capabilities (28%) ← PBQ CONFIRMED

Relevant sub-items:
- **Firewall**: Rules, Access lists, Ports/protocols, Screened subnets (DMZ = screened subnet)
- **IDS/IPS**: Trends, Signatures — Suricata as additional container (stretch goal)
- **Web filter**: Agent-based, Centralized proxy, URL scanning, Content categorization, Block rules, Reputation — iptables rules or bind9 config
- **Operating system security**: Group Policy (Win11), SELinux/iptables (Ubuntu)
- **Implementation of secure protocols**: Protocol selection (SSH not Telnet, HTTPS not HTTP), Port selection, Transport method
- **DNS filtering** — iptables DNS filtering rules + bind9 on Ubuntu
- **Email security**: DMARC, DKIM, SPF, Gateway — outside lab scope unless mail server added
- **File integrity monitoring** — AIDE or tripwire on Ubuntu
- **DLP, NAC, EDR/XDR** — conceptual discussion, not implemented

*Lab touch: Firewall rules are the primary PBQ exercise. IDS/IPS, OS security, DNS filtering, and FIM are all configurable. This is where exam practice happens.*

## 4.6 — Identity and Access Management (28%)

Relevant sub-items:
- **Provisioning/de-provisioning** — create/remove users on Ubuntu and Windows
- **Permission assignments** — file/directory permissions, sudo, admin groups
- **Access controls**: DAC (Linux file permissions), RBAC (group-based access on Windows), Rule-based (firewall rules as network-level access control)
- **Password concepts** — Group Policy password requirements, PAM on Ubuntu
- **Privileged access management** — sudo configuration, admin account management

*Lab touch: User/permission management on both Ubuntu and Windows. Stretch goal: AD for full LDAP/SSO/MFA.*
*Gap: Full access control model comparison exercise needed.*

## 4.8 — Incident Response Activities (28%)

Relevant sub-items:
- **Process**: Preparation (the lab build itself), Detection (monitor logs during attack), Analysis (trace attack path through logs), Containment (add firewall rule to block), Eradication (remove compromised service/config), Recovery (restore from Proxmox snapshot), Lessons learned (debrief)
- **Testing**: Simulation (staged attacks from Kali)
- **Root cause analysis** — post-exercise analysis of how attack succeeded
- **Threat hunting** — proactive log review looking for indicators
- **Digital forensics** — packet captures (Wireshark), log preservation, timeline reconstruction

*Lab touch: PRIMARY GAP FILLER. Cengage has no full IR lifecycle lab. Stage real attacks → follow full IR process. This is Applying-tier.*

## 4.9 — Data Sources for Investigation (28%) ← PBQ CONFIRMED

Relevant sub-items:
- **Log data**: Firewall logs (router — iptables LOG with [FW-DENY] prefix, dmesg), Application logs (Apache access.log, error.log), Endpoint logs (add Windows container as stretch goal), OS-specific security logs (auth.log, syslog on Ubuntu, Security log on Windows), IPS/IDS logs (Suricata alerts), Network logs (router interface logs), Metadata (timestamps, source/dest IPs, ports)
- **Data sources**: Vulnerability scans (Nmap/GVM output), Automated reports (GVM reports), Dashboards (router container, Proxmox monitoring), Packet captures (tcpdump from Kali or router)

*Lab touch: PRIMARY GAP FILLER. Cengage covers Windows/Linux logs but NOT firewall/IPS logs. Every attack exercise in this lab generates firewall logs, application logs, and packet captures simultaneously. This is Analyzing-tier.*

## 5.5 — Audits and Assessments (20%)

Relevant sub-items:
- **Self-assessments** — validation exercises after each build step
- **Penetration testing**: Offensive (Kali attacking lab targets), known/partially known/unknown environment testing
- **Reconnaissance**: Passive (traffic sniffing from Kali), Active (Nmap scanning)

*Lab touch: Pen testing and recon exercises directly from Kali. Known environment = we designed it; unknown = pretend we didn't.*

---

## Packt Reference: Attack Surface (OSI Layers)

- Layer 1/2 — attacker connects to ports/wireless, communicates within broadcast domain. ARP spoofing, MAC flooding, VLAN hopping.
- Layer 3 — attacker obtains valid address (possibly spoofed), communicates across zones if firewall allows.
- Layer 4/7 — attacker establishes connections to TCP/UDP ports, talks to application services.
- Each layer needs its own controls → **defense in depth**
- Network perimeter prevents external attacks at any layer
- Internal segmentation mitigates compromised/unauthorized internal hosts
- **Flat network = 100% blast radius** because all three layers are exposed. Segmentation reduces blast radius by containing L2 and gatekeeping L3+.

## Packt Reference: Hardening Concepts

**Switches & Routers:** Change default creds, disable unnecessary services/interfaces, use SSH/HTTPS not Telnet/HTTP, implement ACLs, configure port security, enforce strong passwords

**Servers & OS:** Change default creds, disable unnecessary services, apply patches, use firewalls + IDS, secure configuration, enable logging/monitoring, AV/antimalware, physical security

## Packt Reference: Network Access Control

- NAC authenticates users/devices AND enforces compliance (OS version, patch level, AV status)
- Restricts access by user profile, device type, location
- **Dynamic VLAN assignment** — NAC assigns VLAN based on identity/device/health
- **Agent-based** — software on device, communicates with NAC, can auto-remediate
- **Agentless** — port-based control or network scans (DHCP fingerprinting, open port detection)
