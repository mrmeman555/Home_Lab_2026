# CLAUDE.md — Home Lab 2026 Boot Sequence

You are entering Mimir's infrastructure and security workspace. Before doing anything, orient yourself.

---

## Repository

- **Remote:** `https://github.com/mrmeman555/Home_Lab_2026.git`
- **Auth:** GitHub PAT stored in `.secrets` (gitignored, local only). To push: `git remote set-url origin https://<user>:<pat>@github.com/mrmeman555/Home_Lab_2026.git`
- **Branch:** `main`
- **Pull before anything:** `git pull origin main`

---

## Step 1: Know Who You're Working With

Mimir is a systems thinker who learns by understanding WHY before deriving the HOW.

- **Networking:** Deep CCNA knowledge — ARP mechanics, Three-Table Forwarding Chain, VLAN/trunking, subnetting, PDU minimalism. Don't re-teach networking. Extend it into security context.
- **Security:** Currently studying CompTIA Security+ SY0-701. Building a hands-on lab to practice PBQ topics (firewall ACLs, log analysis, network appliance placement, incident response).
- **Cognitive approach:** Experimental psychology background (near-PhD). Applies Bloom's Taxonomy to calibrate study depth per sub-item, not per objective. Has identified specific gaps where Cengage labs don't meet exam cognitive demands — the home lab fills those gaps.
- **Heuristic — "Crab in the Bucket":** Subnetting is for building walls. Zone boundaries are containment boundaries. The gateway is the chokepoint. Firewalls are guards at chokepoints.
- **Production network is SACRED.** VLANs 10 (Users), 20 (Servers), 99 (MGMT), VM 100 (TrueNAS) — never touch these. Lab work lives in Docker containers with isolated bridge networks.

## Step 2: Understand the Workspace

This repo serves two purposes: **infrastructure documentation** for Mimir's production home lab, and **the Security+ lab build project**.

### File Sorting Logic

| Category | Location | What's Here |
|----------|----------|-------------|
| **Project Files** | `lab_build/` | Active project — design docs, Docker lab, progress tracker, Sec+ concept map |
| **Docker Lab** | `lab_build/docker-lab/` | The portable security lab — `docker-compose.yml`, Dockerfiles, firewall scripts |
| **Infrastructure Docs** | `lab_build/HomeLab_Docs/` | Production environment reference — VLANs, machines, network topology. READ ONLY context. |
| **Study Material** | `Sec+Analysis/` | Bloom's analysis, lab cross-references, PBQ mappings, daily notes |
| **Exam Objectives** | `io/inbox/Cengage_Sec+_ExamObjectives.pdf` | PRIMARY — Bloom's depth per sub-item (image-based, reference visually) |
| **Exam Objectives** | `io/inbox/CompTIA-Security-Plus-SY0-701-Exam-Objectives.pdf` | Official CompTIA — machine-readable, all 28 objectives + acronym list |
| **Net+ Reference** | `Docs/net+Analysis/` | Methodology framework (Verb Cipher, 3D Mapping) being adapted for Sec+ |
| **Session Artifacts** | Any file with `daily_note` or `transcript` | Historical session logs |

### Key Project Files (read these to ground yourself)

| File | Purpose | Read When |
|------|---------|-----------|
| `lab_build/PROGRESS.md` | **Current state.** Phase, build status, concepts covered, Bloom's gaps, session log. | Always — this is your first read. |
| `lab_build/design_topology.md` | **The blueprint.** Zone architecture, IPs, firewall matrix, service placement, isolation validation. | Before any Build Mode or Exercise work. |
| `lab_build/system_prompt_security_lab_v2.md` | **The engine.** Full protocol with 4 engines, core directives, Bloom's integration. | When an engine trigger is issued. |
| `lab_build/lab_secplus_reference.md` | **Living concept map.** 14 SY0-701 objectives mapped to lab activities with Bloom's depth. | During any Sec+ concept discussion. |
| `lab_build/docker-lab/README.md` | **Lab operations.** Start/stop, exec commands, exercise workflows, teardown. | When operating the Docker lab. |
| `lab_build/HomeLab_Docs/network.md` | **Production boundaries.** VLANs, IPs, firewall rules, switch ports. | When you need to confirm what NOT to touch. |
| `lab_build/HomeLab_Docs/machines.md` | **Production inventory.** Every device, its role, its quirks. | When production context is relevant. |

## Step 3: Ground Yourself

**Do not assume what Mimir wants to work on.** Instead:

1. **Read `lab_build/PROGRESS.md`.** What phase are we in? What's the last session log entry? What's pending?
2. **Check recent commits.** `git log --oneline -5` — what was the last thing worked on?
3. **Present what you found and ask:**

> *"Here's where the project stands: [phase, last activity, what's pending]. What are we working on today?"*

### If Mimir issues an engine trigger:

Load `lab_build/system_prompt_security_lab_v2.md` and follow its protocol, including Phase 0. The triggers are:

| Trigger | Engine | What Happens |
|---------|--------|-------------|
| **"Design Review"** | Engine 1 | Socratic design walkthrough with Sec+ concept mapping |
| **"Build Mode"** | Engine 2 | Docker lab build — containers, iptables, validation |
| **"Lab Exercise"** | Engine 3 | Attack/detect/respond scenarios on the running lab |
| **"Concept Bridge"** | Engine 4 | Open discussion connecting lab work to Sec+ exam content |

### If Mimir wants free-form work:

Proceed naturally but with the core directives active in the background:
- **Security First** — "Why does this improve security?" before "How?"
- **Controls Lens** — Every action tagged: Technical/Managerial/Operational/Physical × Preventive/Detective/Corrective/Compensating/Deterrent/Directive
- **Exam Anchoring** — Map to SY0-701 objectives with Bloom's depth
- **Production Safety** — Docker containers only. No host networking, no masquerade on lab networks, no touching VLANs 10/20/99/VM 100

### If the task is trivial:

Just do it. Don't over-ceremonialize simple requests.

## Step 4: Work

### Operating the Docker Lab

The lab lives in `lab_build/docker-lab/`. It's a portable three-zone security topology:

```
lab-corporate (172.16.50.0/24) — Trusted      — add targets as needed
lab-dmz       (172.16.51.0/24) — Semi-Trusted  — ubuntu-dmz (Apache/SSH/DNS)
lab-attack    (172.16.52.0/24) — Untrusted     — kali (Nmap/Hydra/tcpdump)
router        (all three)      — Chokepoint    — Alpine + iptables, DEFAULT DENY
```

```bash
# Start
cd lab_build/docker-lab && docker compose up -d

# Stop
docker compose down

# Enter containers
docker exec -it kali bash
docker exec -it router bash
docker exec -it ubuntu-dmz bash

# Check firewall
docker exec router iptables -L FORWARD -v -n --line-numbers

# Check deny logs
docker exec router dmesg | grep FW-DENY

# Full rebuild
docker compose down && docker compose build --no-cache && docker compose up -d
```

### Regardless of mode:

- **Leave artifacts.** Sessions produce or update files — PROGRESS.md, design docs, exercise logs. Conversations that evaporate are wasted.
- **Track progress.** Keep `lab_build/PROGRESS.md` current. Log what was done, what Sec+ concepts were covered, what Bloom's gaps were targeted.
- **Tag controls.** Apply the Controls Lens (1.1) to every configuration action. This is always-on background processing, not a separate step.
- **Respect production.** The Docker lab is isolated. Keep it that way. If a step could leak into production, flag it with ⚠️.
- **Commit and push.** When meaningful work is done:
  ```bash
  git add -A && git commit -m "descriptive message" && git push origin main
  ```

## Step 5: Reflect

This runs **continuously in the background**, not as a separate phase.

- **Watch for Bloom's drift.** Is Mimir operating at a higher tier than the exercise targets? Are flashcard-tier concepts being over-labbed? Are Analyzing-tier concepts not getting enough scenario practice?
- **Watch for gap closure.** When a Bloom's gap from `blooms_lab_crossref.md` is filled by a lab exercise, note it in PROGRESS.md and flag it.
- **Watch for emerging patterns.** If Mimir develops new heuristics or frameworks during lab work, validate them, pressure-test them, and record them.
- **Watch for engine drift.** Is the system prompt's protocol still matching how sessions actually flow? Are steps being skipped consistently? Surface at natural breakpoints.
- **Flag concepts for the reference doc.** When a Sec+ concept comes up that ISN'T in `lab_secplus_reference.md`, flag it for addition.

---

## Quick Reference: Project State

| Item | Location | Current Status |
|------|----------|---------------|
| Progress Tracker | `lab_build/PROGRESS.md` | Phase 2 (Build) — Docker lab code complete, awaiting first `docker compose up` |
| Design Document | `lab_build/design_topology.md` | Complete — three-zone Docker architecture |
| Engine Prompt | `lab_build/system_prompt_security_lab_v2.md` | v2 — Bloom's integration, Controls Lens, Docker build path |
| Sec+ Concept Map | `lab_build/lab_secplus_reference.md` | 14 objectives mapped with lab touch annotations |
| Docker Lab | `lab_build/docker-lab/` | Built — compose + router + dmz + kali |
| Bloom's Cross-Ref | `Sec+Analysis/blooms_lab_crossref.md` | Complete — gaps identified, lab exercises targeting them |

## Quick Reference: Production Boundaries

| Resource | Network | Status |
|----------|---------|--------|
| pfSense (production) | 192.168.10.1 / 20.1 / 99.1 | ⚠️ DO NOT TOUCH |
| Proxmox | 192.168.20.5 (VLAN 20) | ⚠️ DO NOT TOUCH |
| TrueNAS (VM 100) | 192.168.20.11 (VLAN 20) | ⚠️ DO NOT TOUCH |
| TP-Link Switch | 192.168.99.2 (VLAN 99) | ⚠️ DO NOT TOUCH |
| Docker Lab | 172.16.50-52.0/24 (internal bridges) | ✅ Safe — isolated, no masquerade |

## Linked Workspaces

This workspace is part of a multi-repo system.

| Workspace | What Lives There |
|-----------|-----------------|
| **Home_Lab_2026** (this repo) | Infrastructure docs, Security+ lab build, Sec+ study analysis |
| **OpenClaw_Claude** | Shared workspace — engines, research, operator profile, reflexivity system |
| **Claude-Cowork-Vault** | Vault infrastructure — ingest CLI, API, vault browser, task tracking |
| **ClaudeTest** | ML OS visualization — boot sequence, dashboard, agent instantiation |
