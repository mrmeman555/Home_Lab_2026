# Security Lab Build — Progress Tracker

## Current Phase: Build
## Last Updated: 2026-03-07
## Platform: Docker Compose (portable — runs on desktop, Proxmox VM, LXC, or cloud)

### Phase 1: Design
- [x] 1A: Topology & Zone Architecture
- [x] 1B: Addressing & Routing
- [x] 1C: Firewall Rule Matrix
- [x] 1D: Service Placement
- [x] 1E: Internet Access & Isolation Validation

**Design formalized in:** `lab_build/design_topology.md`
**Docker lab source:** `lab_build/docker-lab/`

### Phase 2: Build
- [x] 2A: Docker Compose topology defined (three networks + router + dmz + kali)
- [x] 2B: Router container built (Alpine + iptables, default-deny, logging)
- [x] 2C: Ubuntu DMZ container built (Apache, SSH, bind9, rsyslog — intentionally insecure)
- [x] 2D: Kali container configured (kali-rolling + nmap, hping3, hydra, tcpdump)
- [ ] 2E: `docker compose up -d` executed and all containers running
- [ ] 2F: Isolation validated (default-deny confirmed, no cross-zone traffic without rules)
- [ ] 2G: Corporate zone target added (optional — extend when needed)

### Phase 3: Exercises
- [ ] Firewall ACL scenario
- [ ] Log analysis scenario
- [ ] Incident response walkthrough
- [ ] Hardening exercise
- [ ] Recon/scanning exercise

### Sec+ Concepts Covered
| Concept | Objective | Bloom's Depth | Phase | Notes |
|---------|-----------|---------------|-------|-------|
| Zone segmentation (three-zone model) | 1.2, 2.5, 3.1, 3.2 | Applying | Design | Why three zones, blast radius containment |
| Default-deny policy | 2.5, 4.5 | Applying | Design | Least privilege at network level — iptables FORWARD DROP |
| DMZ as screened subnet | 3.2 | Applying | Design | Buffer zone for exposed services |
| Device placement (router as chokepoint) | 3.2 | Analyzing | Design | Single policy enforcement point between all zones |
| Logical isolation (Docker networks) | 3.1 | Applying | Design | Each zone is a separate Docker bridge network — no cross-zone L2 |
| Attack surface analysis (flat vs segmented) | 2.2, 2.5, 3.2 | Analyzing | Design | Concept Bridge: ARP spoofing, L2 blast radius |
| Service placement per trust level | 3.2 | Analyzing | Design | Web in DMZ, workstation in Corporate, attacker in Untrusted |
| CIA triad as design driver | 1.2 | Understanding | Design | Confidentiality=isolation, Integrity=logging, Availability=service placement |
| Defense in depth (layered zones) | 3.1, 3.2 | Applying | Design | Multiple boundaries between attacker and target |
| IP scheme as documentation | 3.2 | Remembering | Design | Zone ID embedded in third octet (172.16.5x.0/24) |
| Containerization as deployment model | 3.1 | Applying | Build | Lab as code — portable, reproducible, teardown/rebuild in seconds |
| Controls Lens | 1.1 | Analyzing | All | Every action classified by control category + type |

### Bloom's Gaps Targeted
| Gap (from blooms_lab_crossref.md) | Objective | Exercise Used | Status |
|-----------------------------------|-----------|---------------|--------|
| Zero Trust — no real exercise | 1.2 | | Pending — default-deny is foundation, full ZT exercise TBD |
| Indicator analysis — no lab | 2.4 | | Pending — will generate with Kali attack scenarios |
| Full IR lifecycle | 4.8 | | Pending — staged attack → detect → contain → eradicate → recover |
| Firewall/IPS log analysis | 4.9 | | Pending — iptables [FW-DENY] logs + Suricata during attack exercises |
| Data classification — no exercise | 3.3 | | Pending — Concept Bridge discussion |
| Access control models (MAC/DAC/RBAC/ABAC) | 4.6 | | Pending — Ubuntu permissions exercises |
| DNS filtering | 4.5 | | Pending — router iptables DNS rules + bind9 on Ubuntu |
| SELinux | 4.5 | | Pending — Ubuntu Server hardening exercise |

### Session Log
| Date | Activity | Outcome |
|------|----------|---------|
| 2026-03-06 | Concept Bridge: Zone Architecture deep dive | Covered flat network blast radius (ARP/L2/L3), three-zone rationale, containment boundaries |
| 2026-03-06 | Exam coverage mapping | Mapped all 28 SY0-701 objectives to lab. 13 Direct/Strong, 8 Partial/Conceptual, 3 outside scope |
| 2026-03-06 | Phase 1 formalization | Design doc created from task spec. All 5 design phases documented. Ready for Build Mode |
| 2026-03-07 | Architecture pivot to Docker | Containerized lab replaces Proxmox VM approach. iptables replaces pfSense. Portable — runs anywhere Docker runs |
| 2026-03-07 | Docker lab committed to repo | docker-compose.yml, router (Alpine+iptables), dmz (Ubuntu+Apache/SSH/DNS), Kali. Default-deny with logging |
| 2026-03-07 | Controls Lens directive added | 1.1 as meta-objective: every action tagged with control category + type |
| 2026-03-07 | Project docs updated for Docker | All 5 project files updated to reflect container architecture |
