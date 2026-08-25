import { useEffect, useState } from 'react'
import {
  Activity,
  ArrowRight,
  Blocks,
  Bot,
  Building2,
  ChevronRight,
  Database,
  FlaskConical,
  Github,
  LockKeyhole,
  Menu,
  Network,
  Radio,
  ShieldCheck,
  Waves,
  X,
} from 'lucide-react'

const capabilities = [
  { icon: Activity, title: 'Marine Automation', text: 'Continuous sensing, equipment control, scheduling, alerting, and operational workflows designed around living aquatic systems.' },
  { icon: Radio, title: 'Telemetry & Observability', text: 'Time-series telemetry turns water quality and equipment state into an operational picture that can be measured, analyzed, and acted on.' },
  { icon: ShieldCheck, title: 'Secure by Design', text: 'Security is treated as a system property: segmented trust, authenticated control, defensible interfaces, event logging, and resilient defaults.' },
  { icon: Network, title: 'Cyber-Physical Systems', text: 'Software, networks, sensors, actuators, and physical marine infrastructure engineered as one coordinated system rather than isolated products.' },
]

const applications = [
  { icon: Building2, title: 'Public Aquariums', text: 'Operational visibility, lifecycle monitoring, automation, and maintainable infrastructure for complex exhibits and life-support systems.', tag: 'LSS + OPERATIONS' },
  { icon: FlaskConical, title: 'Research & Field Systems', text: 'Instrumented platforms for controlled studies, long-duration telemetry, reproducible experiments, and resilient edge operation.', tag: 'SCIENCE + DATA' },
  { icon: Waves, title: 'Aquaculture & Advanced Systems', text: 'Scalable control and monitoring architectures for facilities where water quality, uptime, and coordinated equipment behavior are mission-critical.', tag: 'PRODUCTION + RESILIENCE' },
]

const stack = [
  ['FastAPI', 'API & control plane'],
  ['PostgreSQL + TimescaleDB', 'Telemetry persistence'],
  ['MQTT + mTLS', 'Event-driven device messaging'],
  ['React', 'Operator interface'],
]

const researchAreas = [
  'Anomaly detection and equipment-health analytics',
  'Water-quality forecasting and decision support',
  'Resilient edge automation for disconnected operations',
  'Human-centered interfaces for complex aquatic systems',
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand brand-legacy" href="#top" aria-label="BattleReef home">
          <img src="/brand/battlereef-wordmark.svg" alt="BattleReef" />
        </a>
        <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Primary navigation">
          <a href="#platform" onClick={() => setMenuOpen(false)}>Platform</a>
          <a href="#engineering" onClick={() => setMenuOpen(false)}>Engineering</a>
          <a href="#applications" onClick={() => setMenuOpen(false)}>Applications</a>
          <a href="#research" onClick={() => setMenuOpen(false)}>Research</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Collaborate</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" /><div className="hero-grid" />
          <div className="hero-copy">
            <p className="eyebrow"><span /> Marine systems. Engineered differently.</p>
            <h1>Intelligent infrastructure for the <em>living ocean.</em></h1>
            <p className="hero-lede">BattleReef develops secure marine automation, telemetry, and cyber-physical systems for aquariums, aquaculture, research, and demanding aquatic operations.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#platform">Explore the platform <ArrowRight size={17} /></a>
              <a className="button button-ghost" href="https://github.com/DCMedic/BattleReef-Marine-Controller" target="_blank" rel="noreferrer"><Github size={17} /> View on GitHub</a>
            </div>
            <div className="hero-proof" aria-label="BattleReef engineering principles">
              <span><ShieldCheck size={16} /> Secure architecture</span><span><Blocks size={16} /> Modular by design</span><span><Waves size={16} /> Built for aquatic systems</span>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orbital orbital-a" /><div className="orbital orbital-b" />
            <div className="visual-card telemetry-card"><div className="card-topline"><span>LIVE SYSTEM</span><span className="status-dot">ONLINE</span></div><div className="reading"><span>78.2</span><small>°F</small></div><div className="sparkline"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="telemetry-row"><span>Temperature</span><strong>Stable</strong></div></div>
            <div className="visual-card node-card"><Radio size={18} /><div><span>EDGE NODE</span><strong>BR-NODE-01</strong></div><span className="pulse" /></div>
            <img className="hero-mark hero-mark-original" src="/brand/battlereef-mark.svg" alt="" />
          </div>
        </section>

        <section className="signal-bar" aria-label="BattleReef disciplines"><div><span>01</span> AUTOMATION</div><div><span>02</span> TELEMETRY</div><div><span>03</span> CYBERSECURITY</div><div><span>04</span> RESEARCH</div></section>

        <section className="brand-story section-pad" id="about">
          <div className="brand-story-grid">
            <div className="brand-story-copy">
              <p className="eyebrow"><span /> BattleReef, Ltd.</p>
              <h2>Marine engineering where software meets seawater.</h2>
              <p>BattleReef exists to solve a difficult systems problem: living aquatic environments depend on physical infrastructure, sensing, networking, software, data, and human decisions all at once. We engineer those layers together.</p>
              <p>Our direction is toward secure, observable, open marine infrastructure that can support advanced aquaria, public institutions, aquaculture, and research without locking operators into opaque automation stacks.</p>
              <div className="home-section-nav"><a href="#platform">BRMC</a><a href="#engineering">Architecture</a><a href="#research">R&D</a><a href="#open-source">Open Source</a></div>
            </div>
            <div className="brand-art"><img src="/brand/battlereef-wordmark.svg" alt="BattleReef wave and wordmark design" /></div>
          </div>
        </section>

        <section className="section-pad capabilities" id="engineering">
          <div className="section-heading"><div><p className="eyebrow"><span /> Engineering philosophy</p><h2>One system, not a collection of gadgets.</h2></div><p>BattleReef approaches marine automation as critical infrastructure. Every sensor reading, control action, network path, interface, and failure mode belongs to the same system.</p></div>
          <div className="capability-grid">{capabilities.map(({ icon: Icon, title, text }, index) => <article className="capability-card" key={title}><div className="card-index">0{index + 1}</div><Icon size={27} strokeWidth={1.6} /><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="platform section-pad" id="platform">
          <div className="platform-panel">
            <div className="platform-copy"><p className="eyebrow"><span /> Flagship platform</p><h2>BattleReef Marine Controller</h2><p className="big-copy">An open, event-driven control platform built to observe, coordinate, and protect complex marine environments.</p><p>BRMC combines telemetry, device control, automation, alerts, schedules, and operator workflows behind an API-driven architecture. Current engineering emphasizes authenticated device identity, mutually authenticated MQTT transport, role-based operator access, telemetry plausibility checks, append-only audit history, device-health scoring, and independent physical verification.</p><p>The goal is not merely remote control. The goal is trustworthy automation with enough evidence to distinguish a command being sent, a device claiming success, and the physical system actually behaving as intended.</p><a className="text-link" href="https://github.com/DCMedic/BattleReef-Marine-Controller" target="_blank" rel="noreferrer">Explore the BRMC repository <ChevronRight size={17} /></a></div>
            <div className="architecture-card"><div className="arch-title"><Database size={18} /><span>BRMC CORE ARCHITECTURE</span></div><div className="arch-flow"><div className="arch-node"><Radio /><span>FIELD</span><strong>Sensors & Nodes</strong></div><div className="flow-line"><i /><i /><i /></div><div className="arch-node core"><Bot /><span>CONTROL</span><strong>Event Engine</strong></div><div className="flow-line"><i /><i /><i /></div><div className="arch-node"><Activity /><span>OPERATIONS</span><strong>UI & Telemetry</strong></div></div><div className="stack-list">{stack.map(([name, purpose]) => <div key={name}><strong>{name}</strong><span>{purpose}</span></div>)}</div></div>
          </div>
        </section>

        <section className="applications section-pad" id="applications">
          <div className="applications-head"><div><p className="eyebrow"><span /> Where the architecture applies</p><h2>Built for environments where water and uptime matter.</h2></div><p className="applications-intro">BattleReef is being designed around real operational demands: sustained telemetry, equipment coordination, maintainability, degraded-mode behavior, and the ability to understand what happened after an anomaly.</p></div>
          <div className="application-grid">{applications.map(({ icon: Icon, title, text, tag }, index) => <article className="application-card" key={title}><div className="card-index">A{index + 1}</div><Icon size={28} strokeWidth={1.6} /><h3>{title}</h3><p>{text}</p><strong>{tag}</strong></article>)}</div>
        </section>

        <section className="security section-pad">
          <div className="security-visual"><div className="lock-ring"><LockKeyhole size={48} strokeWidth={1.25} /></div><span className="security-label label-a">AUTHENTICATED CONTROL</span><span className="security-label label-b">SEGMENTED TRUST</span><span className="security-label label-c">AUDITABLE EVENTS</span></div>
          <div className="security-copy"><p className="eyebrow"><span /> Security as architecture</p><h2>Connected does not have to mean exposed.</h2><p>Marine automation increasingly depends on networks, APIs, remote access, and intelligent decision systems. BattleReef treats cybersecurity as part of engineering from the beginning, not as a feature added after deployment.</p><div className="principle-list"><div><strong>Minimize trust</strong><span>Constrain access and reduce unnecessary control paths.</span></div><div><strong>Observe everything important</strong><span>Operational telemetry and security events belong in the same picture.</span></div><div><strong>Verify physical outcomes</strong><span>Use independent evidence to challenge device self-reports when safety matters.</span></div><div><strong>Fail deliberately</strong><span>Design predictable fallback behavior when services, networks, or sensors fail.</span></div></div></div>
        </section>

        <section className="research section-pad" id="research"><div className="research-copy"><p className="eyebrow"><span /> Research & development</p><h2>From automation to marine intelligence.</h2><p>BattleReef is building the data foundation required for the next generation of aquatic operations: systems that can understand trends, recognize abnormal behavior, support human decisions, and eventually adapt to changing environments.</p></div><div className="research-list">{researchAreas.map((area, index) => <div key={area}><span>R{index + 1}</span><p>{area}</p><ArrowRight size={18} /></div>)}</div></section>

        <section className="mission section-pad">
          <div className="mission-grid"><div className="mission-mark"><img src="/brand/battlereef-mark.svg" alt="BattleReef B and wave emblem" /></div><div className="mission-copy"><p className="eyebrow"><span /> Long-term direction</p><h2>Infrastructure for better marine decisions.</h2><p>BattleReef is evolving toward an engineering and research platform where automation is explainable, telemetry is durable, device identity is explicit, and safety-critical state can be challenged by independent evidence.</p><div className="mission-points"><div><strong>Open architecture</strong><span>Interoperable services, documented interfaces, and inspectable engineering decisions.</span></div><div><strong>Operational evidence</strong><span>Telemetry, audit records, device health, and physical verification designed to support real diagnosis.</span></div><div><strong>Research-ready data</strong><span>A time-series foundation suitable for forecasting, anomaly detection, and controlled experimentation.</span></div></div></div></div>
        </section>

        <section className="open-source section-pad" id="open-source"><div className="oss-card"><Github size={34} /><div><p className="eyebrow"><span /> Open engineering</p><h2>Build in the open. Test the ideas. Improve the system.</h2><p>BattleReef uses open-source development to make architecture inspectable, encourage experimentation, and create a foundation that researchers, aquarists, engineers, and operators can extend.</p></div><a className="button button-primary" href="https://github.com/DCMedic" target="_blank" rel="noreferrer">BattleReef on GitHub <ArrowRight size={17} /></a></div></section>

        <section className="legacy-ribbon"><img src="/brand/battlereef-wordmark.svg" alt="BattleReef brand design" /><p>Original BattleReef visual identity retained as the foundation for the modern engineering brand.</p></section>

        <section className="contact section-pad" id="contact"><div><p className="eyebrow"><span /> Collaboration</p><h2>Have a marine system worth solving?</h2></div><div className="contact-copy"><p>BattleReef is interested in collaboration across public aquariums, aquaculture, marine science, research institutions, advanced hobbyist systems, and ocean technology.</p><a className="button button-light" href="mailto:contact@battlereef.com">Start a conversation <ArrowRight size={17} /></a></div></section>
      </main>

      <footer><div className="footer-brand"><img src="/brand/battlereef-wordmark.svg" alt="BattleReef" /><p>Marine Automation · Cyber-Physical Systems · Research Technology</p></div><div className="footer-links"><a href="#platform">Platform</a><a href="#applications">Applications</a><a href="#research">Research</a><a href="#about">About</a><a href="https://github.com/DCMedic" target="_blank" rel="noreferrer">GitHub</a></div><p className="copyright">© {new Date().getFullYear()} BattleReef, Ltd. All rights reserved.</p></footer>
    </div>
  )
}

export default App
