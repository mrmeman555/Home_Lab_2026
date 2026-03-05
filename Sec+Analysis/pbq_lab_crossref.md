# PBQ Topics × Cengage Lab Coverage

**Sources:** Confirmed PBQ topics from Reddit candidate reports (2024-2026) × Cengage Lab TOC (74 labs)

---

## Confirmed PBQ Topics → Lab Coverage

### 1. Firewall/ACL Configuration (MOST REPORTED PBQ)
**What the exam tests:** Given a scenario and a firewall interface, configure rules (allow/deny, source/dest IP, port, protocol).

| Lab | What It Does | Direct Match? |
|-----|-------------|---------------|
| Lab09-1 | Set up pfSense firewall in VM | ✅ Yes — builds the environment |
| Lab09-2 | Configure iptables rules in Kali Linux | ✅ Yes — direct ACL configuration |
| Lab09-4 | Set up WAF rules | ✅ Yes — Layer 7 firewall rules |
| Lab12-1 | Configure filesystem ACL on Windows folder | ⚠️ Partial — filesystem ACL, not network firewall |
| Lab08-3 | Hping3 + Wireshark for testing firewall rules | ✅ Yes — testing/validating rules |

**Verdict: GOOD COVERAGE.** Module 9 directly prepares for this PBQ. Do all three real labs (09-1, 09-2, 09-4).

---

### 2. Log Analysis + Malware Identification (SECOND MOST REPORTED)
**What the exam tests:** Given log files (firewall, endpoint, CLI output) and a network diagram, identify infected hosts, attack source, and malware type from behavior.

| Lab | What It Does | Direct Match? |
|-----|-------------|---------------|
| Lab13-1 | Examine Windows logs via Event Viewer | ⚠️ Partial — OS logs, not firewall/IPS logs |
| Lab13-3 | Examine Linux log files | ⚠️ Partial — Linux logs, not security-specific analysis |
| Lab13-5 | Examine default accounts (integrity validation) | ⚠️ Tangential — account audit, not log analysis |
| Lab08-3 | Hping3 + Wireshark packet capture | ⚠️ Partial — packet analysis, not log analysis |
| Lab05-1 | Research malware types | ❌ Trap — internet research only |
| Lab05-2 | Install and run Avast AV | ❌ Low value — running a scan isn't analyzing logs |

**Verdict: GAP.** Cengage teaches you to *look at* logs but not to *analyze logs to trace an attack across a network*. The PBQ reportedly gives you CLI output showing ports/services and asks you to follow the infection path across multiple hosts. No Cengage lab simulates this. **This needs a custom lab or supplemental resource.**

---

### 3. Incident Response Ordering (COMMONLY REPORTED)
**What the exam tests:** Drag-and-drop the IR steps (Preparation → Detection → Analysis → Containment → Eradication → Recovery → Lessons Learned) into correct order for a given scenario.

| Lab | What It Does | Direct Match? |
|-----|-------------|---------------|
| Lab14-1 | Threat hunting simulator (game-based) | ⚠️ Tangential — threat hunting, not IR ordering |

**Verdict: GAP.** No Cengage lab drills the IR lifecycle ordering. This is a pure memorization + scenario application task. **Study method: flashcards for the sequence + practice questions that give you a scenario and ask "what step comes next?"** Messer and Dion practice exams cover this.

---

### 4. Network Diagram / Appliance Placement (COMMONLY REPORTED)
**What the exam tests:** Given a network diagram, place security appliances (firewall, IDS/IPS, SIEM, VPN concentrator) in correct locations or configure a secure connection.

| Lab | What It Does | Direct Match? |
|-----|-------------|---------------|
| Lab08-4 | Set up VPN connection in Windows 11 | ⚠️ Partial — configures VPN client, not network design |
| Lab09-1 | Set up pfSense firewall | ⚠️ Partial — builds one appliance, not placement on a diagram |

**Verdict: GAP.** No Cengage lab has you look at a network diagram and decide where to place appliances. **This needs practice with network topology exercises.** Dion's PBQ simulations reportedly cover this type. Your home lab experience with Proxmox/pfSense/VLANs gives you real-world context here — you know where a firewall sits relative to a DMZ because you've built it.

---

### 5. Cryptographic Tool/Algorithm Selection (LESS COMMON PBQ)
**What the exam tests:** Select the correct crypto algorithm or auth method from a dropdown for a described scenario.

| Lab | What It Does | Direct Match? |
|-----|-------------|---------------|
| Lab03-1 | Encrypt/decrypt with substitution cipher | ❌ Too basic — toy cipher, not real algorithm selection |
| Lab03-2 | Create and verify hashes | ✅ Yes — demonstrates integrity verification |
| Lab03-3 | Evaluate symmetric cipher process | ⚠️ Partial — conceptual, not selection-based |
| Lab03-4 | Configure BitLocker To Go | ✅ Yes — real encryption tool usage |
| Lab04-1/02/03 | Examine certificates, CAs, CRLs | ✅ Yes — PKI concepts in practice |
| Lab04-4 | Create digital signature | ✅ Yes — directly applicable |

**Verdict: ADEQUATE.** Modules 3-4 cover crypto/PKI hands-on well enough. The PBQ is reportedly a dropdown selection, not deep implementation — understanding from these labs + flashcards for algorithm names/use cases should suffice.

---

## Commonly Reported MC Question Topics → Lab Coverage

Beyond PBQs, candidates report heavy multiple-choice coverage on:

### Access Control Models (MAC, DAC, RBAC, ABAC)
| Lab | Match? |
|-----|--------|
| Lab12-1 (filesystem ACL) | ⚠️ Covers ACL config but not model comparison |
| Lab07-1 (password policy) | ⚠️ Tangential |

**Verdict: No lab covers model comparison.** Flashcard tier — memorize the models + scenario practice for "which model fits this situation?"

### Social Engineering Identification
| Lab | Match? |
|-----|--------|
| Lab02-3 | ❌ Trap — internet research |

**Verdict: Flashcard tier.** Know the attack types, recognize them in scenarios.

### Zero Trust Principles
| Lab | Match? |
|-----|--------|
| Lab09-5 | ❌ Trap — internet research |

**Verdict: Flashcard tier.** Understand "never trust, always verify" + control plane/data plane concepts.

### GRC / Risk Management (Domain 5)
| Lab | Match? |
|-----|--------|
| Lab14-3 (NIST research) | ❌ Trap |
| Lab14-4 (laptop policy) | ⚠️ Marginal — writing a policy doc |
| Lab15-3 (risk matrix) | ✅ Useful — builds a risk register |
| Lab15-4 (evaluate controls) | ✅ Useful — classifies control types |

**Verdict: Lab15-3 and 15-4 are the only useful GRC labs.** The rest is practice exam territory — Dion and Messer questions are the real prep for Domain 5's "best answer" ambiguity.

---

## Summary: Lab Priority Tiers

### Tier 1: DO THESE — Direct PBQ Preparation
| Lab | PBQ Topic |
|-----|-----------|
| Lab09-1 | pfSense setup (Firewall) |
| Lab09-2 | iptables rules (Firewall/ACL) |
| Lab09-4 | WAF rules (Firewall) |
| Lab08-3 | Hping3 + Wireshark (packet analysis) |
| Lab13-1 | Windows Event Viewer logs (Log analysis) |
| Lab13-3 | Linux log files (Log analysis) |
| Lab03-2 | Hash algorithms (Crypto) |
| Lab03-4 | BitLocker (Encryption) |
| Lab04-1/02/03/04 | PKI/Certificates suite |

### Tier 2: USEFUL — Builds Relevant Skills
| Lab | Topic |
|-----|-------|
| Lab05-3 | HTTP headers / secure cookies |
| Lab05-4/05-5 | Security templates + secedit (Hardening) |
| Lab07-1 | Password policy config |
| Lab07-2 | Mimikatz hash extraction |
| Lab07-3 | MFA setup |
| Lab08-4 | VPN configuration |
| Lab10-3 | LEGION pen testing |
| Lab10-5 | Wireless packet capture |
| Lab12-3 | Nmap scanning |
| Lab12-4 | Greenbone/GVM vuln scanning |
| Lab15-3 | Risk assessment matrix |

### Tier 3: LOW VALUE — Do Only If You Have Time
| Lab | Why Low |
|-----|---------|
| Lab02-4 | Windows Sandbox — useful skill but not tested |
| Lab02-5 | Vuln scan — basic install exercise |
| Lab06-1/02/03 | Mobile device labs — niche topic |
| Lab08-5 | Windows Update — trivial |
| Lab11-2/03/05 | AWS labs — useful for career but exam is vendor-neutral |
| Lab13-4 | RAID config — resilience topic, rarely tested hands-on |

### Tier 4: SKIP — Trap Labs (Internet Research)
| Lab | Topic |
|-----|-------|
| Lab01-1, 01-2, 01-3, 01-4, 01-5 | All Module 1 |
| Lab02-1, 02-3 | Data vulns research, social engineering research |
| Lab05-1 | Malware research |
| Lab06-4 | Physical security research |
| Lab09-3 | FIM research |
| Lab09-5 | Zero Trust research |
| Lab10-2 | Wireless policy research |
| Lab12-2 | Vulnerability research |
| Lab14-2, 14-3 | AI tools, NIST research |
| Lab15-1, 15-2 | Data breach research, private browsing |

---

## Critical Gaps — No Cengage Lab Exists

| PBQ Topic | What's Missing | Recommended Fix |
|-----------|---------------|----------------|
| **Log analysis across network** | No lab traces an attack path through firewall/endpoint/IPS logs on a network diagram | Use TryHackMe or CyberDefenders blue team labs; or build a multi-VM scenario in your home lab with pfSense logs + Ubuntu syslog |
| **IR lifecycle ordering** | No lab drills the sequence | Flashcards + Dion/Messer practice questions |
| **Network appliance placement** | No lab has you place appliances on a topology diagram | Dion PBQ simulations; draw your own home lab topology and justify each placement |
| **"Best answer" GRC judgment** | No lab — this is a question-format problem, not a skills problem | Drill Domain 5 practice questions from Messer and Dion until you internalize CompTIA's logic |
