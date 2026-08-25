import { ArrowRight, CheckCircle2, Github, Mail, ShieldCheck } from 'lucide-react'

const content = {
  '/brmc': {
    label: 'Current platform architecture',
    title: 'A command is not a physical outcome.',
    intro: 'BRMC is engineered around that distinction. The control path preserves evidence from authenticated intent through device acknowledgement and, where available, independent physical verification.',
    facts: [
      ['Identity & access', 'Argon2 credentials, short-lived bearer sessions, viewer/operator/engineer/administrator RBAC, and independently revocable device identities.'],
      ['Secure messaging', 'MQTT over TLS on port 8883 with X.509 client certificates, certificate identity enforcement, and topic-level ACLs.'],
      ['Trusted telemetry', 'Physical bounds, rate-of-change and correlation checks quarantine implausible readings while retaining them as suspect evidence for forensic review.'],
      ['Command evidence', 'Queued commands are correlated with authenticated device ACKs; independent power, flow, RPM, temperature, or level evidence can challenge self-reported state.'],
      ['Tamper evidence', 'Security, command, health, quarantine, and verification transitions are retained in an append-only SHA-256 hash-chained PostgreSQL audit journal.'],
      ['Health & resilience', 'Device-health scoring incorporates freshness, telemetry quality, command failures, ACK latency and physical-verification contradictions.']
    ],
    pipeline: ['Authenticated telemetry', 'Plausibility gate', 'Rules / schedules / safety', 'Queued command', 'mTLS dispatch', 'Correlated ACK', 'Physical verification'],
    note: 'The current repository also includes fault-injection tooling, a versioned independent-verification hardware contract, regression tests for fail-safe behavior, and CI gates covering backend, frontend, Compose, and live MQTT mTLS integration.',
    github: 'https://github.com/DCMedic/BattleReef-Marine-Controller'
  },
  '/research': {
    label: 'Research direction', title: 'Build the evidence layer first.',
    intro: 'BattleReef research is centered on trustworthy longitudinal data and observable cyber-physical behavior. Advanced analytics are useful only when the underlying measurements, interventions, device states, and provenance remain defensible.',
    facts: [
      ['Time-series provenance','Preserve attributable measurements, quality state, source identity, timestamps, interventions and operational context for reproducible analysis.'],
      ['Anomaly detection','Study multivariate environmental and equipment behavior to identify deviations that precede obvious operational failures.'],
      ['Forecasting','Use longitudinal water-quality and equipment data to estimate trajectories while keeping uncertainty and operator judgment visible.'],
      ['Edge resilience','Evaluate data continuity and safe local behavior when connectivity, cloud services, or upstream infrastructure become unavailable.'],
      ['Human factors','Design alerts and decision support around operator comprehension, workload and evidence rather than opaque automation.'],
      ['Reproducibility','Treat software versions, sensor contracts, thresholds and analytical assumptions as part of the research record.']
    ],
    note: 'The objective is not autonomous decision-making for its own sake. It is better evidence, earlier detection, clearer uncertainty, and more defensible intervention in living systems.'
  },
  '/cybersecurity': {
    label: 'Cyber-physical assurance', title: 'Trust must be earned at every boundary.',
    intro: 'A marine controller can change physical conditions. BattleReef therefore treats identity, authorization, telemetry integrity, command evidence and failure behavior as parts of the control system itself.',
    facts: [
      ['Least privilege','Separate human and service principals, explicit roles, constrained device namespaces and independently revocable credentials.'],
      ['Mutual authentication','X.509 client identity for MQTT nodes and devices rather than anonymous or shared-password broker access.'],
      ['Data integrity','Quarantine suspect telemetry instead of silently discarding it or allowing it to drive trusted automation.'],
      ['Complete mediation','Privileged HTTP actions require an authenticated principal and control commands follow a single auditable delivery path.'],
      ['Independent evidence','Critical physical state can be checked using evidence outside the actuator self-report, reducing blind trust in compromised or failed devices.'],
      ['Forensic continuity','Hash-chained append-only audit records preserve security-relevant transitions for incident analysis and accountability.']
    ],
    note: 'This is defense in depth for a living environment: prevent what can be prevented, constrain what must be trusted, detect contradictions, preserve evidence, and fail predictably.'
  }
}

function TechnicalAuthority({ data }) {
  return <section className="authority-section section-pad" aria-labelledby="authority-title">
    <div className="authority-heading"><p className="eyebrow"><span/>{data.label}</p><h2 id="authority-title">{data.title}</h2><p>{data.intro}</p></div>
    {data.pipeline && <div className="evidence-pipeline" aria-label="BRMC evidence pipeline">{data.pipeline.map((item,i)=><div key={item}><span>{String(i+1).padStart(2,'0')}</span><strong>{item}</strong>{i < data.pipeline.length-1 && <ArrowRight size={16}/>}</div>)}</div>}
    <div className="authority-grid">{data.facts.map(([title,text])=><article key={title}><CheckCircle2 size={20}/><h3>{title}</h3><p>{text}</p></article>)}</div>
    <div className="authority-note"><ShieldCheck size={24}/><p>{data.note}</p>{data.github && <a href={data.github} target="_blank" rel="noreferrer"><Github size={17}/> Inspect the implementation <ArrowRight size={16}/></a>}</div>
  </section>
}

function CollaborationPanel(){
  const tracks = [
    ['Public aquarium / institution','Discuss telemetry modernization, life-support visibility, control architecture, maintainability, or pilot deployments.','Public aquarium collaboration'],
    ['Marine research','Discuss instrumented experiments, field telemetry, edge systems, data provenance, or research collaboration.','Marine research collaboration'],
    ['Aquaculture / operations','Discuss scalable monitoring, automation, water-quality evidence, uptime, and equipment coordination.','Aquaculture collaboration'],
    ['Open-source engineering','Discuss integrations, testing, architecture, documentation, hardware interfaces, or contributions to BRMC.','Open-source engineering collaboration']
  ]
  return <section className="authority-section collaboration-section section-pad"><div className="authority-heading"><p className="eyebrow"><span/>Start with the problem</p><h2>A clearer path to collaboration.</h2><p>Choose the track closest to your work. Each link opens a pre-addressed message so the technical context can start with the first conversation.</p></div><div className="collaboration-grid">{tracks.map(([title,text,subject])=><article key={title}><Mail size={21}/><h3>{title}</h3><p>{text}</p><a href={`mailto:contact@battlereef.com?subject=${encodeURIComponent(subject)}`}>Start this conversation <ArrowRight size={16}/></a></article>)}</div><div className="authority-note"><Github size={24}/><p>Technical collaborators can also inspect the implementation, tests, architecture, and current engineering direction directly on GitHub.</p><a href="https://github.com/DCMedic" target="_blank" rel="noreferrer">BattleReef engineering on GitHub <ArrowRight size={16}/></a></div></section>
}

export default function AuthorityEnhancements({ path }) {
  if (path === '/contact') return <CollaborationPanel />
  const data = content[path]
  return data ? <TechnicalAuthority data={data}/> : null
}
