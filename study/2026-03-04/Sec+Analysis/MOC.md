# Sec+ Analysis — Map of Content (MOC)

**Created:** 2026-03-04  
**Exam:** CompTIA Security+ SY0-701  
**Method:** Reapply the Net+ Cognitive Protocol analysis framework  

---

## 1. Reference: The Net+ Framework (What We're Replicating)

Everything below is from `../net+Analysis/` — the completed Net+ analysis that defines our methodology.

### 1.1 The Case Study (What Happened & Why It Worked)


| File                                                                               | Purpose                                                  | Key Takeaway                                                                                           |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `../net+Analysis/001_NetPlus_Autonomous_Grounding/CASE_STUDY.md`                   | Forensic documentation of the autonomous grounding event | Proves the methodology is reproducible: deep grounding → plan → single-pass execution                  |
| `../net+Analysis/001_NetPlus_Autonomous_Grounding/Evidence/06_Grounding_Prompt.md` | The 100-line Runtime Grounding Sequence prompt           | **Template** for the Sec+ grounding prompt — 5-step boot: Identity → State → History → Artifacts → Gap |


### 1.2 The Canonical State Tracker


| File                                        | Purpose                                                         | Key Takeaway                                                                                                   |
| ------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `../net+Analysis/Sprint_NetPlus/PROBLEM.md` | Sprint state definition — goal, roadmap phases, asset inventory | **Template** for our Sec+ PROBLEM.md — same structure: phases with checkboxes, strategy notes, asset inventory |


### 1.3 The Strategic Blueprints (The Analysis Methodology)

These five files ARE the methodology. They were distilled from a 4,473-line Logos transcript.


| File                                                                                                                              | What It Is                                                                                                                                                    | How It Applies to Sec+                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `../net+Analysis/Sprint_NetPlus/Phase_1_Roadmapping/RoadmapAnalysis/Strategic_Blueprints/00_Concept_Inventory.md`                 | Master index of 10 methodologies/theories/tactics — the "Strategic Arsenal"                                                                                   | Sec+ needs its own Concept Inventory. Some items port directly (Verb Cipher, Faceted Matrices). Others need rethinking (Three Trees → what's the Sec+ equivalent?)            |
| `../net+Analysis/Sprint_NetPlus/Phase_1_Roadmapping/RoadmapAnalysis/Strategic_Blueprints/01_Protocol_The_Verb_Cipher.md`          | The foundational filter: command verb → Bloom's Taxonomy cognitive tier (L1/L2/L3) + three extraction workflows (Trap Lab Filter, Void Check, Acronym Scrub)  | **Ports directly.** Same CompTIA verb structure. Same CTT+ Bloom's mapping. Apply as-is to SY0-701 objectives                                                                 |
| `../net+Analysis/Sprint_NetPlus/Phase_1_Roadmapping/RoadmapAnalysis/Strategic_Blueprints/Brainstorming_Analysis_Strategy.md`      | Full objective mapping workbench — domain tables with cognitive levels, Objective-Centric Extraction, Faceted Matrices, 3D Mapping Strategy, CTT+ definitions | Need Sec+ equivalent: new domain table, new entity extraction targets (e.g., "Firewall" across all domains vs. Net+'s "Router"), new matrix lenses                            |
| `../net+Analysis/Sprint_NetPlus/Phase_1_Roadmapping/RoadmapAnalysis/Strategic_Blueprints/Objective_Architecture_Brainstorming.md` | Pedagogical architecture — Domain Logic table, Skill Tree dependencies, "Three Trees" (PHY/LOG/PRF), 3D Coordinate Schema, Domain 5 as "Master Key"           | **Needs full rethink.** Sec+ has no single troubleshooting domain. Domain 4 (Security Operations, 28%) is the heaviest. Need to discover Sec+'s equivalent structural insight |
| `../net+Analysis/Sprint_NetPlus/Phase_1_Roadmapping/RoadmapAnalysis/Strategic_Blueprints/System_Integration_Brainstorm.md`        | The "Decision Workbench" — convergence document bridging analysis to execution                                                                                | Sec+ equivalent will be written after the blueprints are done                                                                                                                 |


#### 1.3.1 Verb Cipher + CTT+ (How they work together)

- **Source 1 — Verb Cipher Protocol:** `../net+Analysis/Sprint_NetPlus/Phase_1_Roadmapping/RoadmapAnalysis/Strategic_Blueprints/01_Protocol_The_Verb_Cipher.md` defines the rule (command verb → Bloom's cognitive level) and turns it into concrete study actions (L1 = flashcards only, L2 = config labs, L3 = break-fix scenarios).
- **Source 2 — CTT+ Reference:** `../net+Analysis/Sprint_NetPlus/Phase_1_Roadmapping/Materials/CTT/CTT_Reference_Materials.pdf` is CompTIA's own Bloom's Taxonomy guide; it validates which verbs really belong to Knowledge / Application / Analysis.
- **How they combine in this analysis:** For both Net+ and Sec+, we first strip boilerplate like "Given a scenario" from each exam objective, then: the **CTT+ doc** tells us the correct cognitive tier for the remaining verb, and the **Verb Cipher** converts that tier into the **depth and format of work** we schedule (flashcards vs. lab vs. scenario). This pairing is the core of our Sec+ analysis: it prevents over-studying (no unnecessary labs for pure "Explain" items) and forces us to build labs and scenarios anywhere the objectives genuinely require Application or Analysis depth.


### 1.4 The Execution Artifacts (What the Methodology Produced)


| File                                                                                          | What It Is                                                                                                                           | Sec+ Equivalent Needed                                                                                                                      |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `../net+Analysis/Sprint_NetPlus/Phase_1_Roadmapping/RoadmapAnalysis/MetaPrompt_3D_Mapping.md` | Adversarial Roundtable meta-prompt with 5 expert personas — designed to map all objectives into the 3D coordinate system             | Sec+ MetaPrompt — new personas appropriate for security domain (e.g., Threat Modeler, GRC Analyst, SOC Analyst, Pen Tester, Exam Architect) |
| `../net+Analysis/Sprint_NetPlus/Phase_1_Roadmapping/RoadmapAnalysis/3D_Mapping_Table.md`      | Complete 3D mapping of all 25 N10-009 objectives: Lens × Tool × Method, Dependency DAG, Multi-Lens Audit, Gap Report, Study Sequence | Sec+ 3D Mapping Table — all ~28 SY0-701 objectives mapped to the Sec+ coordinate system (whatever axes we define)                           |


### 1.5 The Public Repo Package (Reputation Engineering)


| File                                                                  | What It Is                                                                                     |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `../net+Analysis/Sprint_NetPlus/NetPlus-Cognitive-Protocol/`          | Sanitized public-facing GitHub repo — Verb Cipher, Dependency Maps, Matrices, Tools/Scripts    |
| `../net+Analysis/Sprint_NetPlus/NetPlus-Cognitive-Protocol/README.md` | Positioned as "Systems Engineering" not study notes — the "reverse-engineering the exam" angle |


Sec+ equivalent: `SecPlus-Cognitive-Protocol/` repo following same structure.

---

## 2. Source Materials (Sec+ SY0-701)


| Item                                     | Location                                                                                       | Status                                          |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Official Exam Objectives (SY0-701)**   | `./CompTIA-Security-Plus-SY0-701-Exam-Objectives.pdf`                                          | ✅ Have                                          |
| **Textbook (TBD)**                       | TBD                                                                                            | ❌ Need — equivalent to Cengage Net+ book        |
| **CTT+ Reference**                       | `../net+Analysis/Sprint_NetPlus/Phase_1_Roadmapping/Materials/CTT/CTT_Reference_Materials.pdf` | ✅ Same file — Bloom's Taxonomy is cert-agnostic |
| **Practice Exam / Question Bank**        | TBD                                                                                            | ❌ Need — equivalent to Appendix C               |
| **Supplemental Materials (Packt, etc.)** | TBD                                                                                            | ❌ Need                                          |


---

## 3. The SY0-701 Exam Structure (Quick Reference)

**5 Domains, ~28 Objectives, 90 questions, 90 minutes**


| Domain | Name                                      | Weight | Likely Role (Hypothesis)                                                                                                                             |
| ------ | ----------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0    | General Security Concepts                 | 12%    | **The Dictionary** — foundational vocabulary, CIA, AAA, Zero Trust, crypto. Mostly L1                                                                |
| 2.0    | Threats, Vulnerabilities, and Mitigations | 22%    | **The Threat Model** — know the enemy. Attack types, vuln types, indicators, mitigations                                                             |
| 3.0    | Security Architecture                     | 18%    | **The Build** — how to design secure systems. Architecture models, data protection, resilience                                                       |
| 4.0    | Security Operations                       | 28%    | **The Run & Fix** — heaviest domain. Hardening, monitoring, vuln management, IAM, incident response, forensics. This is the Net+ Domain 5 equivalent |
| 5.0    | Security Program Management and Oversight | 20%    | **The Govern** — GRC, risk management, compliance, third-party risk, audits, awareness                                                               |


---

## 4. Sec+ Deliverables Roadmap

Mirroring the Net+ sprint phases from PROBLEM.md:

### Phase 1.1 — Material Gathering (In Progress)

- Official SY0-701 Exam Objectives PDF
- Textbook / primary study resource
- Supplemental materials (video course, practice exams)

### Phase 1.2 — Analysis & Mapping (Pending)

> This is where the real work happens.

- **Verb Cipher Application:** Apply the existing protocol to all SY0-701 objectives — classify every objective as L1/L2/L3
- **Domain Architecture Analysis:** Discover the Sec+ equivalent of the "Three Trees" — what is the structural insight that organizes this exam? (Hypothesis: Domain 4 as composite skill, but needs validation)
- **Dependency Mapping:** Build the Skill Tree DAG for SY0-701 objectives
- **Concept Inventory:** Write the Sec+ Strategic Arsenal — which Net+ concepts port, which need reinvention
- **System Integration Brainstorm:** The convergence document

### Phase 1.3 — Execution (Pending)

- **Sec+ MetaPrompt:** Adversarial Roundtable with security-domain expert personas
- **Sec+ Mapping Table:** Full objective mapping to whatever coordinate system emerges
- **Gap Report:** Where do textbooks fail for L2/L3 objectives?
- **Study Sequence:** Dependency-ordered study plan

### Phase 1.4 — Reputation Engineering (Pending)

- `SecPlus-Cognitive-Protocol/` public repo package
- README positioning

---

## 5. Key Adaptation Questions (Net+ → Sec+)

These are the open problems we need to solve before Phase 1.2 can complete:

### Q1: What replaces the "Three Trees"?

Net+ had PHY/LOG/PRF failure mode lenses rooted in Domain 5 Troubleshooting. Sec+ doesn't have a clean troubleshooting domain. But Domain 4 (Security Operations) at 28% is the heaviest and contains the most "Given a scenario" objectives (4.1, 4.5, 4.6, 4.7, 4.8, 4.9). 

**Working hypothesis:** The Sec+ equivalent "lenses" might be organized around *security posture dimensions* rather than failure modes — something like:

- **[PREVENT]** — Controls, architecture, hardening (proactive)
- **[DETECT]** — Monitoring, alerting, indicators, analysis (reactive)
- **[RESPOND]** — Incident response, forensics, recovery (active)
- **[GOVERN]** — Policy, compliance, risk, oversight (managerial)

This needs validation against the actual objectives.

### Q2: What is the Sec+ "Master Key" domain?

Net+ used Domain 5 (Troubleshooting) as the integration test — "you can't fix what you don't understand." For Sec+, Domain 4 (Security Operations) is the strongest candidate: it requires knowledge from all other domains to execute. But Domain 5 (GRC/Oversight) could also be argued as a "meta-domain" that governs everything.

### Q3: What are the 3D axes?

Net+ used Lens × Tool × Method. For Sec+:

- **Axis 1 (Lens):** TBD — depends on Q1 answer
- **Axis 2 (Tool/Control):** Which security control or tool applies? (Maps to 2.5 mitigations, 4.4/4.5 monitoring tools, etc.)
- **Axis 3 (Lifecycle):** Where in the security lifecycle? Could map to incident response phases (Prep → Detect → Analyze → Contain → Eradicate → Recover → Lessons Learned) from 4.8

### Q4: How does the Tool Mapping work without a single "5.5" wrapper?

Net+ had Objective 5.5 as a dedicated "Wrapper Layer" — one objective that defined ALL the tools, which then got bound to every other objective via the 3D Mapping Table's "Primary Tool" and "Verification Tool" columns. The MetaPrompt's "Toolchain Mapper" persona enforced specificity (e.g., not "Wireshark" but `Wireshark — filter: bootp for DHCP lease analysis`).

**Sec+ has no single tool wrapper.** Tools are distributed across multiple objectives:


| Objective   | Tool Category                    | Examples                                                                                                                                                                                |
| ----------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **4.4**     | Monitoring & alerting tools      | SIEM, SCAP, benchmarks, agents/agentless, antivirus, DLP, SNMP traps, NetFlow, vulnerability scanners                                                                                   |
| **4.5**     | Security infrastructure controls | Firewall (rules, ACLs, ports, screened subnets), IDS/IPS (trends, signatures), web filter, DNS filtering, email security (DMARC/DKIM/SPF), EDR/XDR, NAC, file integrity monitoring, DLP |
| **2.5**     | Hardening/mitigation tools       | Endpoint protection, HIPS, host-based firewall, ACLs, application allow list                                                                                                            |
| **4.9**     | Investigation data sources       | Firewall logs, application logs, endpoint logs, OS security logs, IPS/IDS logs, network logs, metadata, vulnerability scans, packet captures, dashboards                                |
| **Page 21** | Hardware & Software List         | Kali Linux, packet capture software, pen testing software, static/dynamic analysis tools, vulnerability scanner, SIEM, keyloggers, MDM, VPN, network mapper, Wi-Fi analyzer             |


**Working hypothesis:** Instead of one Tool axis, we build a **distributed tool layer** — objectives 4.4 + 4.5 + 4.9 collectively form the "toolbar." Each Sec+ objective still gets a "Primary Tool" and "Verification Tool" binding, but those tools trace back to multiple source objectives instead of a single 5.5. The Toolchain Mapper persona still works; it just references the combined tool pool.

**Alternative hypothesis:** Maybe the Sec+ "wrapper layers" aren't Tool + Method like Net+. Maybe they're:

- **4.8 (Incident Response Process)** as the Method wrapper — Prep → Detect → Analyze → Contain → Eradicate → Recover → Lessons Learned (analogous to Net+'s 5.1 troubleshooting methodology)
- **4.4 + 4.5 + 4.9 (combined)** as the Tool wrapper — the distributed toolkit
- **2.5 (Mitigation Techniques)** as a Controls wrapper — the countermeasures

### Q5: What entities get Faceted Matrix treatment?

Net+ used entities like "Router" and "Switch" studied through multiple lenses. Sec+ equivalents might be: Firewall (across architecture, operations, hardening), Encryption (across crypto concepts, data protection, implementation), Identity/Access (across AAA, IAM, privileged access), Incident (across detection, response, forensics).

---

## 6. File Inventory (This Project)


| File                                                | Status      | Description                                    |
| --------------------------------------------------- | ----------- | ---------------------------------------------- |
| `MOC.md`                                            | ✅ This file | Map of Content — master index and project plan |
| `CompTIA-Security-Plus-SY0-701-Exam-Objectives.pdf` | ✅ Have      | Official exam objectives                       |
| `PROBLEM.md`                                        | ❌ To create | Canonical sprint state tracker                 |
| `Strategic_Blueprints/`                             | ❌ To create | Analysis methodology files                     |
| `MetaPrompt_SecPlus.md`                             | ❌ To create | Adversarial Roundtable for Sec+ mapping        |
| `SecPlus_Mapping_Table.md`                          | ❌ To create | Full objective mapping output                  |
| `SecPlus-Cognitive-Protocol/`                       | ❌ To create | Public repo package                            |


