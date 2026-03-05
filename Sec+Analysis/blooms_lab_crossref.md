# Sec+ Bloom's × Lab Cross-Reference Analysis

**Source:** Cengage Appendix A (Bloom's labels) × Lab_TOC.md (74 labs)
**Key insight from Appendix A intro:** Cengage says their coverage "meets or **exceeds**" CompTIA's requirement. So Cengage Bloom's labels are a ceiling — CompTIA might require less.

---

## Finding 1: "Internet Research" Labs Are Trap Labs

These labs claim hands-on but are just web browsing exercises. Cross-referencing against Bloom's:

| Lab | Action | Bloom's of Referenced Objective | Verdict |
|-----|--------|-------------------------------|---------|
| Lab01-1 | Search Internet about the exam | N/A (meta) | TRAP — not even studying content |
| Lab01-3 | Search Internet for security resources | 1.2 Understanding | TRAP — Understanding doesn't need a lab |
| Lab01-4 | Search Internet about threat actors | 2.1 Understanding | TRAP — Understanding doesn't need a lab |
| Lab02-1 | Learn about data vulnerabilities online | 2.3 Understanding | TRAP — research ≠ hands-on |
| Lab02-3 | Search Internet about social engineering | 2.2 Creating* | SUSPICIOUS — Cengage says Creating but lab is just reading |
| Lab06-4 | Research physical security for mobile | 3.1 Understanding | TRAP |
| Lab08-1 | Research physical security methods | 3.2 Evaluating* | SUSPICIOUS — high Bloom's but lab is just browsing |
| Lab09-3 | Research FIM tools | 4.5 Analyzing | SUSPICIOUS — Analyzing-level topic with a reading exercise |
| Lab09-5 | Research Zero Trust model | 1.2 Applying | SUSPICIOUS — Applying-level but no actual application |
| Lab10-2 | Research SANS templates, create policy | 4.1 Applying | BORDERLINE — creating a policy doc is arguably Applying |
| Lab14-2 | Review AI tools | 4.7 Understanding | TRAP — Understanding doesn't need a lab |
| Lab14-3 | Research NIST frameworks | 5.1 Applying | SUSPICIOUS — Applying but lab is reading |

**Count: ~12 of 74 labs (16%) are research/browsing exercises, not real hands-on.**

---

## Finding 2: Real Hands-On Labs Cluster in Specific Modules

Labs that actually make you DO something map to higher Bloom's levels:

| Module | Real Hands-On Labs | Topics |
|--------|-------------------|--------|
| 3 (Crypto) | Lab03-1 (cipher), 03-2 (hash), 03-3 (symmetric), 03-4 (BitLocker) | Bloom's: Applying-Evaluating |
| 5 (Endpoint) | Lab05-2 (AV install), 05-3 (HTTP headers), 05-4/05-5 (security templates) | Bloom's: Applying |
| 7 (IAM) | Lab07-1 (password policy), 07-2 (Mimikatz), 07-3 (MFA), 07-4 (password vault) | Bloom's: Analyzing-Applying |
| 8 (Infrastructure) | Lab08-2 (Kali), 08-3 (Hping3+Wireshark), 08-4 (VPN) | Bloom's: Evaluating-Applying |
| 9 (Firewalls) | Lab09-1 (pfSense), 09-2 (iptables), 09-4 (WAF) | Bloom's: Analyzing-Applying |
| 10 (Wireless) | Lab10-3 (LEGION), 10-4 (NetSpot), 10-5 (packet capture) | Bloom's: Analyzing |
| 11 (Cloud) | Lab11-2/11-3 (AWS), 11-4 (Docker) | Bloom's: Applying |
| 12 (Vuln Assessment) | Lab12-3 (Nmap), 12-4 (Greenbone/GVM) | Bloom's: Analyzing |
| 13 (Monitoring) | Lab13-1/13-3 (log analysis), 13-4 (RAID) | Bloom's: Analyzing |

**The real lab density is in Modules 7-13.** Modules 1-2 and 14-15 are mostly reading exercises.

---

## Finding 3: Bloom's Levels That Have NO Lab Coverage (Void Check)

Cross-referencing Appendix A sub-items at Applying+ against the Lab TOC:

| Objective | Sub-item | Cengage Bloom's | Lab Coverage | Gap? |
|-----------|----------|----------------|-------------|------|
| 1.2 | Zero Trust (Control Plane/Data Plane) | Applying | Lab09-5 is just "research" | **GAP** — needs a real exercise |
| 1.4 | Digital signatures / Key stretching | Creating | Lab03 covers some, not key stretching | **PARTIAL GAP** |
| 1.4 | Encryption levels (full-disk, partition, etc.) | Evaluating | Lab03-4 covers BitLocker only | **PARTIAL GAP** — only FDE covered |
| 2.2 | Human vectors/social engineering | Creating | Lab02-3 is just research | **GAP** — Creating-level with no creation exercise |
| 2.4 | Indicators (account lockout, impossible travel, etc.) | Analyzing | No specific lab | **GAP** — no indicator analysis lab |
| 3.3 | Data types/classifications/methods to secure data | Analyzing | No lab | **GAP** — no data classification exercise |
| 4.3 | Vulnerability management (CVSS, CVE, prioritization) | Analyzing | Lab12 covers scanning but not analysis/prioritization | **PARTIAL GAP** |
| 4.5 | DNS filtering, OS security (Group Policy, SELinux) | Analyzing | Lab14-5 covers time restrictions via GP but not DNS filtering or SELinux | **PARTIAL GAP** |
| 4.6 | Access controls (MAC, DAC, RBAC, ABAC) | Analyzing | Lab12-1 covers filesystem ACLs but not the full model comparison | **PARTIAL GAP** |
| 4.8 | IR Process (full lifecycle) | Applying | Lab14-1 (threat hunting sim) is closest but doesn't cover full IR | **GAP** |
| 4.9 | Log data analysis (firewall, endpoint, IPS/IDS) | Analyzing | Lab13-1/13-3 cover Windows/Linux logs but not firewall/IPS/IDS logs | **PARTIAL GAP** |

---

## Finding 4: The "Exceeds" Problem — Where Cengage Overshoots

Since Cengage "meets or exceeds" CompTIA's level, some high Bloom's labels are Cengage being thorough, not CompTIA being demanding. Candidates report these areas as testing at lower depth than Cengage teaches:

| Sub-item | Cengage Bloom's | Likely Exam Depth | Evidence |
|----------|----------------|------------------|---------|
| 1.4 Digital signatures | Creating | Understanding/Applying | Exam asks "what does a digital signature provide?" not "create one from scratch" |
| 2.2 Social engineering | Creating | Understanding/Applying | Exam asks you to identify attack types, not design campaigns |
| 1.4 Encryption (levels) | Evaluating | Applying | Exam asks which encryption level fits a scenario, not evaluate tradeoffs |
| 5.2 Risk management | Analyzing | Applying | Exam gives scenario, asks for SLE/ALE calculation — formulaic, not analytical |

**Implication for study:** Don't over-prepare on "Creating/Evaluating" sub-items. The exam likely tests them at the "Applying" floor. Focus on: given a scenario, can you pick the right answer?

---

## Finding 5: Study Depth Tiers (Revised)

Based on cross-referencing Bloom's labels, lab coverage, and the "exceeds" caveat:

### Tier 1: Flashcards Only (Remembering/Understanding)
Sub-items where Cengage says Remembering or Understanding AND no real lab exists.
**Action:** Memorize definitions, recognize in a scenario. ~30% of sub-items.

### Tier 2: Conceptual Application (Applying, no hands-on needed)
Sub-items at Applying level that are conceptual — policies, frameworks, procedures.
**Action:** Understand the process well enough to answer "which step comes next?" or "what should you do first?" questions. Practice with scenario questions, not labs. ~25% of sub-items.
*Examples: IR process (4.8), governance (5.1), compliance (5.4), change management (1.3)*

### Tier 3: Tool/Config Labs (Applying with real tools)
Sub-items at Applying level that involve actual tools or configurations.
**Action:** Do the Cengage lab + build in your home lab. ~25% of sub-items.
*Examples: Firewall rules (4.5/9), Nmap/scanning (12), log analysis (13), crypto tools (3-4), IAM config (7)*

### Tier 4: Scenario Analysis (Analyzing/Evaluating)
Sub-items where you need to evaluate a situation and make a judgment call.
**Action:** Practice with scenario-based questions. Do the lab if one exists, but the real prep is working through "best answer" type questions. ~20% of sub-items.
*Examples: Indicators of malicious activity (2.4), vulnerability prioritization (4.3), monitoring/alerting (4.4)*

---

## Summary: Where to Spend Your Time

| Tier | Study Method | % of Exam | Time Allocation |
|------|-------------|-----------|----------------|
| 1 (Flashcards) | Anki/flashcards | ~30% | 15% of study time |
| 2 (Conceptual) | Scenario questions, process drills | ~25% | 25% of study time |
| 3 (Tool Labs) | Cengage labs + home lab | ~25% | 35% of study time |
| 4 (Scenario Analysis) | Practice exams, judgment-call questions | ~20% | 25% of study time |

**Key difference from Net+:** Net+ concentrated difficulty in 3 L3 troubleshooting objectives (24% of exam). Sec+ distributes difficulty across Tiers 2-4 through question FORMAT, not verb difficulty. You can't just "do more labs" — you need to practice making judgment calls under scenario pressure.
