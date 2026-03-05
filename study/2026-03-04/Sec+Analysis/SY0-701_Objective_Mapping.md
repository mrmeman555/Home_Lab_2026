# Security+ SY0-701 — Objective Mapping Workbench

**Purpose:** Map every SY0-701 exam objective to Bloom's Taxonomy level and textbook sections — equivalent to the Cengage Appendix A that powered the Net+ analysis.

**Verb Cipher Key:**
| Level | Bloom's Label | Trigger Verbs | Study Action |
|-------|--------------|---------------|-------------|
| 🟢 L1 | Understand | Explain, Compare, Summarize, Identify | Flashcards only. No lab. |
| 🟡 L2 | Apply | Configure, Implement, Use, Apply, Modify | Config labs. Know syntax/clicks. |
| 🔴 L3 | Analyze | Troubleshoot, Analyze, Resolve | Break-Fix scenarios. |

**Notes:**
- "Given a scenario" prefix masks the true verb — classify by the ACTION verb after the prefix
- Bloom's column is INFERRED from verb until textbook confirms
- Textbook Section column is BLANK until we have a Sec+ textbook with cross-references

---

## Domain 1.0 — General Security Concepts (12%)

| Obj | Objective Title | Command Verb | Bloom's (Inferred) | Bloom's (Confirmed) | Textbook Sections | Notes |
|-----|----------------|-------------|--------------------|--------------------|-------------------|-------|
| 1.1 | Compare and contrast various types of security controls | Compare | 🟢 L1 Understand | | | Categories: Technical, Managerial, Operational, Physical. Types: Preventive, Deterrent, Detective, Corrective, Compensating, Directive |
| 1.2 | Summarize fundamental security concepts | Summarize | 🟢 L1 Understand | | | CIA, Non-repudiation, AAA, Gap analysis, Zero Trust (Control Plane/Data Plane), Physical security (bollards, vestibule, fencing, surveillance, sensors), Deception tech (honeypot/net/file/token) |
| 1.3 | Explain the importance of change management processes and the impact to security | Explain | 🟢 L1 Understand | | | Business processes (approval, ownership, stakeholders, impact analysis, backout plan, maintenance window, SOP), Technical implications (allow/deny lists, downtime, dependencies, legacy apps), Documentation, Version control |
| 1.4 | Explain the importance of using appropriate cryptographic solutions | Explain | 🟢 L1 Understand | | | PKI, Encryption (levels, transport, symmetric/asymmetric, key exchange, algorithms, key length), Tools (TPM, HSM, key mgmt, secure enclave), Obfuscation (stego, tokenization, masking), Hashing, Salting, Digital signatures, Key stretching, Blockchain, Certificates (CA, CRL, OCSP, self-signed, third-party, root of trust, CSR, wildcard) |

**Domain 1.0 Summary:** 4 objectives. All L1 (Understand). 0 labs expected.

---

## Domain 2.0 — Threats, Vulnerabilities, and Mitigations (22%)

| Obj | Objective Title | Command Verb | Bloom's (Inferred) | Bloom's (Confirmed) | Textbook Sections | Notes |
|-----|----------------|-------------|--------------------|--------------------|-------------------|-------|
| 2.1 | Compare and contrast common threat actors and motivations | Compare | 🟢 L1 Understand | | | Actors: Nation-state, Unskilled, Hacktivist, Insider, Organized crime, Shadow IT. Attributes: Internal/external, Resources, Sophistication. Motivations: Data exfil, Espionage, Disruption, Blackmail, Financial, Political, Ethical, Revenge, War |
| 2.2 | Explain common threat vectors and attack surfaces | Explain | 🟢 L1 Understand | | | Message-based (email, SMS, IM), Image/File-based, Voice, Removable device, Vulnerable software, Unsupported systems, Unsecure networks (wireless, wired, BT), Open ports, Default creds, Supply chain (MSP, vendors), Human vectors/social engineering (phishing, vishing, smishing, misinfo, impersonation, BEC, pretexting, watering hole, brand impersonation, typosquatting) |
| 2.3 | Explain various types of vulnerabilities | Explain | 🟢 L1 Understand | | | Application (memory injection, buffer overflow, race conditions TOC/TOU, malicious update), OS-based, Web-based (SQLi, XSS), Hardware (firmware, EOL, legacy), Virtualization (VM escape, resource reuse), Cloud-specific, Supply chain, Cryptographic, Misconfiguration, Mobile (side loading, jailbreaking), Zero-day |
| 2.4 | Given a scenario, analyze indicators of malicious activity | Analyze | 🔴 L3 Analyze | | | Malware (ransomware, trojan, worm, spyware, bloatware, virus, keylogger, logic bomb, rootkit), Physical attacks (brute force, RFID cloning, environmental), Network attacks (DDoS amplified/reflected, DNS, wireless, on-path, credential replay, malicious code), Application attacks (injection, buffer overflow, replay, privesc, forgery, directory traversal), Crypto attacks (downgrade, collision, birthday), Password attacks (spraying, brute force), Indicators (account lockout, concurrent sessions, blocked content, impossible travel, resource consumption/inaccessibility, out-of-cycle logging, published/documented, missing logs) |
| 2.5 | Explain the purpose of mitigation techniques used to secure the enterprise | Explain | 🟢 L1 Understand | | | Segmentation, Access control (ACL, permissions), Application allow list, Isolation, Patching, Encryption, Monitoring, Least privilege, Configuration enforcement, Decommissioning, Hardening (endpoint protection, host-based firewall, HIPS, disabling ports/protocols, default password changes, removal of unnecessary software) |

**Domain 2.0 Summary:** 5 objectives. 4× L1, 1× L3 (2.4 Analyze). **2.4 is the critical one — needs scenario-based study.**

---

## Domain 3.0 — Security Architecture (18%)

| Obj | Objective Title | Command Verb | Bloom's (Inferred) | Bloom's (Confirmed) | Textbook Sections | Notes |
|-----|----------------|-------------|--------------------|--------------------|-------------------|-------|
| 3.1 | Compare and contrast security implications of different architecture models | Compare | 🟢 L1 Understand | | | Cloud (responsibility matrix, hybrid, third-party), IaC, Serverless, Microservices, Network infrastructure (air-gapped, logical segmentation, SDN), On-prem, Centralized/decentralized, Containerization, Virtualization, IoT, ICS/SCADA, RTOS, Embedded, HA. Considerations: Availability, Resilience, Cost, Responsiveness, Scalability, Ease of deployment, Risk transference, Ease of recovery, Patch availability, Power, Compute |
| 3.2 | Given a scenario, apply security principles to secure enterprise infrastructure | Apply | 🟡 L2 Apply | | | Infrastructure (device placement, security zones, attack surface, connectivity, failure modes fail-open/closed, device attributes active/passive inline/tap, network appliances: jump server, proxy, IPS/IDS, load balancer, sensors), Port security (802.1X, EAP), Firewall types (WAF, UTM, NGFW, L4/L7), Secure comms (VPN, remote access, tunneling TLS/IPSec, SD-WAN, SASE), Selection of effective controls |
| 3.3 | Compare and contrast concepts and strategies to protect data | Compare | 🟢 L1 Understand | | | Data types (regulated, trade secret, IP, legal, financial, human/non-human readable), Classifications (sensitive, confidential, public, restricted, private, critical), Data states (at rest, in transit, in use), Data sovereignty, Geolocation, Methods (geographic restrictions, encryption, hashing, masking, tokenization, obfuscation, segmentation, permission restrictions) |
| 3.4 | Explain the importance of resilience and recovery in security architecture | Explain | 🟢 L1 Understand | | | HA (load balancing vs clustering), Sites (hot/cold/warm, geographic dispersion), Platform diversity, Multi-cloud, Continuity of operations, Capacity planning (people, technology, infrastructure), Testing (tabletop, failover, simulation, parallel processing), Backups (onsite/offsite, frequency, encryption, snapshots, recovery, replication, journaling), Power (generators, UPS) |

**Domain 3.0 Summary:** 4 objectives. 3× L1, 1× L2 (3.2 Apply). **3.2 is the lab objective.**

---

## Domain 4.0 — Security Operations (28%)

| Obj | Objective Title | Command Verb | Bloom's (Inferred) | Bloom's (Confirmed) | Textbook Sections | Notes |
|-----|----------------|-------------|--------------------|--------------------|-------------------|-------|
| 4.1 | Given a scenario, apply common security techniques to computing resources | Apply | 🟡 L2 Apply | | | Secure baselines (establish, deploy, maintain), Hardening targets (mobile, workstations, switches, routers, cloud, servers, ICS/SCADA, embedded, RTOS, IoT), Wireless (site surveys, heat maps), Mobile solutions (MDM, BYOD/COPE/CYOD, cellular/Wi-Fi/BT), Wireless security (WPA3, AAA/RADIUS, crypto protocols, auth protocols), Application security (input validation, secure cookies, static code analysis, code signing), Sandboxing, Monitoring |
| 4.2 | Explain the security implications of proper hardware, software, and data asset management | Explain | 🟢 L1 Understand | | | Acquisition/procurement, Assignment/accounting (ownership, classification), Monitoring/tracking (inventory, enumeration), Disposal/decommissioning (sanitization, destruction, certification, data retention) |
| 4.3 | Explain various activities associated with vulnerability management | Explain | 🟢 L1 Understand | | | Identification (vuln scan, app security static/dynamic/package monitoring, threat feed OSINT/proprietary/info-sharing/dark web, pen testing, responsible disclosure/bug bounty, system audit), Analysis (confirmation false pos/neg, prioritize, CVSS, CVE, classification, exposure factor, environmental variables, industry impact, risk tolerance), Response (patching, insurance, segmentation, compensating controls, exceptions), Validation (rescanning, audit, verification), Reporting |
| 4.4 | Explain security alerting and monitoring concepts and tools | Explain | 🟢 L1 Understand | | | Monitoring (systems, applications, infrastructure), Activities (log aggregation, alerting, scanning, reporting, archiving, alert response/remediation: quarantine, alert tuning), Tools (SCAP, benchmarks, agents/agentless, SIEM, antivirus, DLP, SNMP traps, NetFlow, vulnerability scanners) |
| 4.5 | Given a scenario, modify enterprise capabilities to enhance security | Modify | 🟡 L2 Apply | | | Firewall (rules, access lists, ports/protocols, screened subnets), IDS/IPS (trends, signatures), Web filter (agent-based, centralized proxy, URL scanning, content categorization, block rules, reputation), OS security (Group Policy, SELinux), Secure protocols (protocol/port selection, transport method), DNS filtering, Email security (DMARC, DKIM, SPF, gateway), File integrity monitoring, DLP, NAC, EDR/XDR, User behavior analytics |
| 4.6 | Given a scenario, implement and maintain identity and access management | Implement | 🟡 L2 Apply | | | Provisioning/de-provisioning, Permission assignments, Identity proofing, Federation, SSO (LDAP, OAuth, SAML), Interoperability, Attestation, Access controls (mandatory, discretionary, role-based, rule-based, attribute-based, time-of-day, least privilege), MFA (biometrics, hard/soft tokens, security keys; factors: know/have/are/where), Password concepts (length, complexity, reuse, expiration, age, managers, passwordless), PAM tools (JIT permissions, password vaulting, ephemeral credentials) |
| 4.7 | Explain the importance of automation and orchestration related to secure operations | Explain | 🟢 L1 Understand | | | Use cases (user/resource provisioning, guard rails, security groups, ticket creation, escalation, enabling/disabling services, CI/CD, integrations/APIs), Benefits (efficiency, enforcing baselines, standard configs, scaling, retention, reaction time, workforce multiplier), Considerations (complexity, cost, single point of failure, technical debt, supportability) |
| 4.8 | Explain appropriate incident response activities | Explain | 🟢 L1 Understand | | | Process (Preparation, Detection, Analysis, Containment, Eradication, Recovery, Lessons learned), Training, Testing (tabletop, simulation), Root cause analysis, Threat hunting, Digital forensics (legal hold, chain of custody, acquisition, reporting, preservation, e-discovery) |
| 4.9 | Given a scenario, use data sources to support an investigation | Use | 🟡 L2 Apply | | | Log data (firewall, application, endpoint, OS-specific security, IPS/IDS, network, metadata), Data sources (vulnerability scans, automated reports, dashboards, packet captures) |

**Domain 4.0 Summary:** 9 objectives. 4× L1, 4× L2 (4.1, 4.5, 4.6, 4.9), 1× L3 (none — but 2.4 from Domain 2 is the L3). **Heaviest domain at 28%. Four "Given a scenario" objectives need lab/hands-on work.**

---

## Domain 5.0 — Security Program Management and Oversight (20%)

| Obj | Objective Title | Command Verb | Bloom's (Inferred) | Bloom's (Confirmed) | Textbook Sections | Notes |
|-----|----------------|-------------|--------------------|--------------------|-------------------|-------|
| 5.1 | Summarize elements of effective security governance | Summarize | 🟢 L1 Understand | | | Guidelines, Policies (AUP, infosec, BC, DR, IR, SDLC, change mgmt), Standards (password, access control, physical security, encryption), Procedures (change mgmt, onboarding/offboarding, playbooks), External considerations (regulatory, legal, industry, local/regional/national/global), Monitoring and revision, Governance structures (boards, committees, government, centralized/decentralized), Roles (owners, controllers, processors, custodians/stewards) |
| 5.2 | Explain elements of the risk management process | Explain | 🟢 L1 Understand | | | Risk identification, Assessment (ad hoc, recurring, one-time, continuous), Analysis (qualitative, quantitative, SLE, ALE, ARO, probability, likelihood, exposure factor, impact), Risk register (KRI, risk owners, risk threshold), Risk tolerance, Risk appetite (expansionary, conservative, neutral), Strategies (transfer, accept exemption/exception, avoid, mitigate), Risk reporting, BIA (RTO, RPO, MTTR, MTBF) |
| 5.3 | Explain the processes associated with third-party risk assessment and management | Explain | 🟢 L1 Understand | | | Vendor assessment (pen testing, right-to-audit, internal audits, independent assessments, supply chain analysis), Vendor selection (due diligence, conflict of interest), Agreement types (SLA, MOA, MOU, MSA, WO/SOW, NDA, BPA), Vendor monitoring, Questionnaires, Rules of engagement |
| 5.4 | Summarize elements of effective security compliance | Summarize | 🟢 L1 Understand | | | Compliance reporting (internal, external), Consequences of non-compliance (fines, sanctions, reputational damage, loss of license, contractual impacts), Compliance monitoring (due diligence/care, attestation, internal/external, automation), Privacy (legal implications local/regional/national/global, data subject, controller vs processor, ownership, data inventory/retention, right to be forgotten) |
| 5.5 | Explain types and purposes of audits and assessments | Explain | 🟢 L1 Understand | | | Attestation, Internal (compliance, audit committee, self-assessments), External (regulatory, examinations, assessment, independent third-party audit), Pen testing (physical, offensive, defensive, integrated, known/partially known/unknown environment, reconnaissance passive/active) |
| 5.6 | Given a scenario, implement security awareness practices | Implement | 🟡 L2 Apply | | | Phishing (campaigns, recognizing attempts, responding to suspicious messages), Anomalous behavior recognition (risky, unexpected, unintentional), User guidance/training (policy/handbooks, situational awareness, insider threat, password mgmt, removable media, social engineering, OPSEC, hybrid/remote work), Reporting and monitoring (initial, recurring), Development, Execution |

**Domain 5.0 Summary:** 6 objectives. 5× L1, 1× L2 (5.6 Implement). **Mostly governance/theory. One hands-on objective.**

---

## Exam-Wide Statistics

| Metric | Count | Percentage |
|--------|-------|-----------|
| Total Objectives | 28 | 100% |
| 🟢 L1 (Understand — Flashcards) | 21 | 75% |
| 🟡 L2 (Apply — Labs/Hands-on) | 6 | 21% |
| 🔴 L3 (Analyze — Scenario Analysis) | 1 | 4% |

### L2 Objectives (Need Labs)
| Obj | Domain | Title | Verb |
|-----|--------|-------|------|
| 3.2 | Security Architecture | Apply security principles to secure enterprise infrastructure | Apply |
| 4.1 | Security Operations | Apply common security techniques to computing resources | Apply |
| 4.5 | Security Operations | Modify enterprise capabilities to enhance security | Modify |
| 4.6 | Security Operations | Implement and maintain identity and access management | Implement |
| 4.9 | Security Operations | Use data sources to support an investigation | Use |
| 5.6 | Program Management | Implement security awareness practices | Implement |

### L3 Objectives (Need Scenario-Based Deep Study)
| Obj | Domain | Title | Verb |
|-----|--------|-------|------|
| 2.4 | Threats/Vulns | Analyze indicators of malicious activity | Analyze |

### Observations
- **Net+ had 60% L1 / 28% L2 / 12% L3.** Sec+ has **75% L1 / 21% L2 / 4% L3.**
- Sec+ is more knowledge-heavy, less hands-on than Net+
- Only ONE L3 objective (2.4) vs. Net+'s THREE (5.2, 5.3, 5.4)
- Domain 4 (Security Operations, 28%) contains 4 of the 6 L2 objectives — this is where the hands-on weight lives
- The "Given a scenario" prefix appears on 7 objectives total (6× L2 + 1× L3)

---

## Blocking: Textbook Section Mapping

The **Textbook Sections** column is blank for all objectives. This requires a Sec+ textbook with an Appendix A-style cross-reference (like the Cengage Net+ book provided). Until we have this:

- ✅ **CAN do:** Verb Cipher classification (done above), Dependency DAG, Domain Architecture analysis
- ❌ **BLOCKED:** Trap Lab Filter, Void Check, Objective-Centric Extraction, Faceted Matrices
