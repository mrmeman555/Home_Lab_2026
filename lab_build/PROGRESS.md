# Security Lab Build — Progress Tracker

## Current Phase: Build
## Last Updated: 2026-03-06

### Phase 1: Design
- [x] 1A: Topology & Zone Architecture
- [x] 1B: Addressing & Routing
- [x] 1C: Firewall Rule Matrix
- [x] 1D: Service Placement
- [x] 1E: Internet Access & Isolation Validation

**Design formalized in:** `lab_build/design_topology.md`

### Phase 2: Build
- [ ] 2A: Proxmox bridges/VLANs created
- [ ] 2B: Lab pfSense VM provisioned and interfaces configured
- [ ] 2C: Ubuntu Server VM provisioned with services
- [ ] 2D: Kali VM provisioned
- [ ] 2E: Windows VM provisioned (optional — defer if RAM constrained)
- [ ] 2F: Isolation validated (no production leakage)
- [ ] 2G: Default-deny firewall rules confirmed

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
| Default-deny policy | 2.5, 4.5 | Applying | Design | Least privilege at network level |
| DMZ as screened subnet | 3.2 | Applying | Design | Buffer zone for exposed services |
| Device placement (pfSense as chokepoint) | 3.2 | Analyzing | Design | Single policy enforcement point between all zones |
| Physical isolation / air gap | 3.1 | Applying | Design | Lab VLANs have no route to production |
| Attack surface analysis (flat vs segmented) | 2.2, 2.5, 3.2 | Analyzing | Design | Concept Bridge: ARP spoofing, L2 blast radius |
| Service placement per trust level | 3.2 | Analyzing | Design | Web in DMZ, workstation in Corporate, attacker in Untrusted |
| CIA triad as design driver | 1.2 | Understanding | Design | Confidentiality=isolation, Integrity=logging, Availability=service placement |
| Defense in depth (layered zones) | 3.1, 3.2 | Applying | Design | Multiple boundaries between attacker and target |
| IP scheme as documentation | 3.2 | Remembering | Design | VLAN ID embedded in second octet |

### Bloom's Gaps Targeted
| Gap (from blooms_lab_crossref.md) | Objective | Exercise Used | Status |
|-----------------------------------|-----------|---------------|--------|
| Zero Trust — no real exercise | 1.2 | | Pending — default-deny is foundation, full ZT exercise TBD |
| Indicator analysis — no lab | 2.4 | | Pending — will generate with Kali attack scenarios |
| Full IR lifecycle | 4.8 | | Pending — staged attack → detect → contain → eradicate → recover |
| Firewall/IPS log analysis | 4.9 | | Pending — pfSense logs + Suricata during attack exercises |
| Data classification — no exercise | 3.3 | | Pending — Concept Bridge discussion |
| Access control models (MAC/DAC/RBAC/ABAC) | 4.6 | | Pending — Ubuntu + Win11 permissions exercises |
| DNS filtering | 4.5 | | Pending — pfSense DNS + bind9 on Ubuntu |
| SELinux | 4.5 | | Pending — Ubuntu Server hardening exercise |

### Session Log
| Date | Activity | Outcome |
|------|----------|---------|
| 2026-03-06 | Concept Bridge: Zone Architecture deep dive | Covered flat network blast radius (ARP/L2/L3), three-zone rationale, containment boundaries |
| 2026-03-06 | Exam coverage mapping | Mapped all 28 SY0-701 objectives to lab. 13 Direct/Strong, 8 Partial/Conceptual, 3 outside scope |
| 2026-03-06 | Phase 1 formalization | Design doc created from task spec. All 5 design phases documented. Ready for Build Mode |
