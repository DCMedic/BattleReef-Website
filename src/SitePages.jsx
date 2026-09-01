import { useState } from 'react'
import {
  Activity, ArrowLeft, ArrowRight, Blocks, Bot, Building2, Database,
  FlaskConical, Github, LockKeyhole, Menu, Network, Radio, ShieldCheck,
  Waves, X, Mail, Gauge, Server, Waypoints, ChartNoAxesCombined
} from 'lucide-react'
import BrandLogo from './BrandLogo.jsx'

const pageData = {
  '/brmc': {
    eyebrow: 'Flagship platform',
    title: 'BattleReef Marine Controller',
    dek: 'A secure, event-driven marine automation platform designed to observe, coordinate, and protect complex aquatic environments.',
    icon: Bot,
    sections: [
      ['A control platform built around evidence', 'BRMC is designed to move beyond simple remote switching. The platform combines telemetry, device control, automation, schedules, alerts, and operator workflows while preserving enough evidence to understand what the system commanded, what a device reported, and what the physical environment actually did.'],
      ['Event-driven architecture', 'MQTT-based device messaging, a FastAPI control plane, PostgreSQL and TimescaleDB telemetry persistence, and a React operator interface create a modular architecture that can evolve without tying every subsystem to a single vendor or protocol.'],
      ['Trustworthy device control', 'Current engineering emphasizes authenticated device identity, mutually authenticated transport, role-based operator access, append-only audit history, telemetry plausibility checks, device-health scoring, and independent physical verification for safety-relevant state.'],
      ['Designed for growth', 'The architecture is intended to support increasingly complex automation, distributed edge nodes, resilient local behavior, forecasting, anomaly detection, and research-grade telemetry without requiring a wholesale redesign of the platform.']
    ],
    callouts: [['API & control plane','FastAPI'],['Telemetry','PostgreSQL + TimescaleDB'],['Messaging','MQTT + mTLS'],['Operator UI','React']],
    links: [['View BRMC on GitHub','https://github.com/DCMedic/BattleReef-Marine-Controller']]
  },
  '/marine-automation': {
    eyebrow: 'Marine automation', title: 'Engineering the whole aquatic system',
    dek: 'BattleReef treats sensors, pumps, lighting, life-support equipment, networks, software, and operators as one cyber-physical system.', icon: Waves,
    sections: [
      ['Continuous environmental awareness','Water temperature, pH, salinity, level, flow, and other measurements become continuous operational telemetry rather than isolated readings. That shared data layer supports automation, troubleshooting, historical analysis, and research.'],
      ['Coordinated equipment control','Return pumps, heaters, feeders, lighting, wavemakers, top-off systems, valves, and other equipment can be coordinated through schedules, rules, state machines, and event-driven workflows instead of disconnected timers and proprietary controllers.'],
      ['Resilient operations','Marine systems must behave predictably when a sensor fails, a network disappears, or a service becomes unavailable. BattleReef designs explicit fallback states, local edge behavior, alerting, and operator visibility into degraded modes.'],
      ['Maintainable by design','Open interfaces, modular services, documented events, and inspectable telemetry make the system easier to extend, diagnose, and maintain over its lifecycle.']
    ],
    callouts: [['Sense','Continuous telemetry'],['Decide','Rules + automation'],['Act','Coordinated control'],['Verify','Physical outcomes']]
  },
  '/research': {
    eyebrow: 'Research & engineering', title: 'From marine automation to marine intelligence',
    dek: 'A durable telemetry foundation creates the conditions for forecasting, anomaly detection, reproducible experimentation, and better operational decisions.', icon: FlaskConical,
    sections: [
      ['Research-ready telemetry','Time-series data should remain attributable, queryable, and useful after the moment of collection. BattleReef is structuring telemetry so trends, interventions, equipment behavior, and environmental response can be studied together.'],
      ['Anomaly detection','Equipment-health analytics and environmental anomaly detection can help identify developing problems before they become obvious failures. The objective is decision support grounded in observable evidence, not opaque automation.'],
      ['Forecasting and decision support','Longitudinal water-quality and equipment datasets can support forecasting models that help operators understand likely trajectories and evaluate whether intervention is warranted.'],
      ['Field and institutional research','Resilient edge operation, durable data collection, and open interfaces can support controlled experiments, public aquariums, aquaculture operations, and field deployments where connectivity and maintenance windows are constrained.']
    ],
    callouts: [['R1','Anomaly detection'],['R2','Water-quality forecasting'],['R3','Edge resilience'],['R4','Human-centered operations']]
  },
  '/cybersecurity': {
    eyebrow: 'Cybersecurity', title: 'Security is part of the control architecture',
    dek: 'Connected marine infrastructure deserves the same disciplined trust, identity, logging, segmentation, and failure planning expected of other cyber-physical systems.', icon: ShieldCheck,
    sections: [
      ['Minimize trust','Access should be explicit, scoped, authenticated, and limited to what a user, service, or device actually needs. BattleReef favors constrained trust relationships over broad implicit access.'],
      ['Authenticate devices and operators','Control commands have physical consequences. Device identity, operator identity, transport security, and role-based authorization are therefore engineering concerns, not optional administrative features.'],
      ['Make actions auditable','Commands, state changes, alerts, device reports, and security-relevant events should leave durable evidence. Auditability supports troubleshooting, incident analysis, accountability, and continuous improvement.'],
      ['Verify the physical system','A device reporting success is not always proof of a successful physical outcome. Where practical, BattleReef uses independent telemetry to challenge self-reported state and detect discrepancies between digital intent and physical behavior.']
    ],
    callouts: [['Identity','Explicit trust'],['Transport','mTLS'],['Control','RBAC'],['Evidence','Append-only audit']]
  },
  '/open-source': {
    eyebrow: 'Open engineering', title: 'Inspectable systems improve faster',
    dek: 'BattleReef uses open-source development to make architecture, interfaces, and engineering decisions easier to examine, test, extend, and improve.', icon: Github,
    sections: [
      ['Open architecture','Documented interfaces and modular services make it possible to integrate new sensors, devices, analytical services, and operator experiences without abandoning the core platform.'],
      ['Engineering in public','Repository history, issues, architecture decisions, and implementation changes provide a transparent record of how the system evolves and why.'],
      ['A platform for experimentation','Researchers, engineers, aquarists, and operators can use the codebase as a foundation for new control strategies, integrations, analytics, and deployment models.'],
      ['Interoperability over lock-in','The long-term objective is a marine technology ecosystem where operators own their data and can choose, replace, or extend components without surrendering the system to a closed vendor stack.']
    ],
    callouts: [['Source','Inspectable'],['Interfaces','Documented'],['Data','Operator-owned'],['Design','Extensible']],
    links: [['Explore BattleReef on GitHub','https://github.com/DCMedic']]
  },
  '/about': {
    eyebrow: 'BattleReef, Ltd.', title: 'Marine engineering where software meets seawater',
    dek: 'BattleReef develops secure marine automation and research technology for environments where water quality, uptime, data, and trustworthy control all matter.', icon: Building2,
    sections: [
      ['Why BattleReef exists','Living aquatic environments depend on physical infrastructure, sensing, networking, software, data, and human decisions at the same time. BattleReef exists to engineer those layers together instead of treating them as unrelated products.'],
      ['Engineering direction','The company is evolving toward secure, observable, open marine infrastructure that can support advanced aquaria, public institutions, aquaculture, marine research, and ocean-technology experimentation.'],
      ['Design philosophy','BattleReef favors modular architecture, durable telemetry, explicit trust, predictable failure behavior, and evidence-driven operations. The objective is infrastructure that remains understandable as it becomes more capable.'],
      ['Long-term vision','The larger goal is an engineering and research platform where automation can be explained, device identity is explicit, environmental history is durable, and advanced analytics can improve decisions without hiding how those decisions were reached.']
    ],
    callouts: [['Focus','Marine systems'],['Method','Systems engineering'],['Foundation','Open architecture'],['Direction','Research technology']]
  },
  '/contact': {
    eyebrow: 'Collaboration', title: 'Have a marine system worth solving?',
    dek: 'BattleReef is interested in technically serious collaborations involving marine automation, public aquariums, aquaculture, research systems, and ocean technology.', icon: Mail,
    sections: [
      ['Public aquariums and life-support systems','Explore opportunities around telemetry, operational visibility, maintainability, control architecture, and modernization of complex aquatic infrastructure.'],
      ['Research and field systems','Discuss instrumented platforms, controlled experiments, edge telemetry, long-duration data collection, and research-oriented automation.'],
      ['Aquaculture and advanced aquatic operations','Evaluate scalable monitoring and automation architectures where uptime, water quality, equipment coordination, and traceability are mission-critical.'],
      ['Open-source and technical collaboration','Contribute integrations, testing, architecture ideas, documentation, analytical capabilities, or deployment experience to the BattleReef ecosystem.']
    ],
    callouts: [['Aquariums','Operations'],['Research','Telemetry'],['Aquaculture','Automation'],['Open source','Engineering']],
    links: [['Start a conversation','mailto:contact@battlereef.com'],['GitHub','https://github.com/DCMedic']]
  }
}

function PageHeader({ menuOpen, setMenuOpen }) {
  return <header className="site-header page-site-header">
    <a className="brand brand-legacy" href="/" aria-label="BattleReef home"><BrandLogo priority sizes="(max-width: 760px) 155px, 210px" /></a>
    <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(v=>!v)}>{menuOpen ? <X size={24}/> : <Menu size={24}/>}</button>
    <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Primary navigation">
      <a href="/brmc">BRMC</a><a href="/marine-automation">Automation</a><a href="/research">Research</a><a href="/cybersecurity">Cybersecurity</a><a href="/about">About</a><a className="nav-cta" href="/contact">Collaborate</a>
    </nav>
  </header>
}

export function SitePage({ path }) {
  const page = pageData[path]
  const [menuOpen, setMenuOpen] = useState(false)
  if (!page) return <NotFound />
  const Icon = page.icon
  return <div className="site-shell detail-page">
    <PageHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
    <main>
      <section className="detail-hero section-pad">
        <div className="detail-hero-copy"><a className="back-link" href="/"><ArrowLeft size={16}/> Home</a><p className="eyebrow"><span/>{page.eyebrow}</p><h1>{page.title}</h1><p className="detail-dek">{page.dek}</p>{page.links?.length ? <div className="hero-actions">{page.links.map(([label,url])=><a key={label} className="button button-primary" href={url} target={url.startsWith('http')?'_blank':undefined} rel={url.startsWith('http')?'noreferrer':undefined}>{label}<ArrowRight size={17}/></a>)}</div>:null}</div>
        <div className="detail-hero-art"><div className="detail-icon-ring"><Icon size={74} strokeWidth={1.15}/></div><BrandLogo variant="mark" decorative priority sizes="(max-width: 560px) 240px, 480px" /></div>
      </section>
      <section className="detail-callouts section-pad">{page.callouts.map(([k,v],i)=><article key={k}><span>0{i+1}</span><strong>{k}</strong><p>{v}</p></article>)}</section>
      <section className="detail-sections section-pad">{page.sections.map(([heading,text],i)=><article key={heading}><div className="detail-number">{String(i+1).padStart(2,'0')}</div><div><h2>{heading}</h2><p>{text}</p></div></article>)}</section>
      <section className="detail-cta section-pad"><div><p className="eyebrow"><span/>BattleReef</p><h2>Engineering for the living ocean.</h2></div><div><p>Explore the platform, research direction, and open engineering work behind BattleReef.</p><div className="detail-cta-links"><a href="/brmc">BRMC</a><a href="/research">Research</a><a href="/open-source">Open Source</a><a href="/contact">Collaborate</a></div></div></section>
    </main>
    <footer><div className="footer-brand"><BrandLogo sizes="230px"/><p>Marine Automation · Cyber-Physical Systems · Research Technology</p></div><div className="footer-links"><a href="/brmc">BRMC</a><a href="/marine-automation">Automation</a><a href="/research">Research</a><a href="/cybersecurity">Security</a><a href="/about">About</a></div><p className="copyright">© {new Date().getFullYear()} BattleReef, Ltd. All rights reserved.</p></footer>
  </div>
}

function NotFound(){return <div className="site-shell detail-page"><PageHeader menuOpen={false} setMenuOpen={()=>{}}/><main><section className="detail-hero section-pad"><div className="detail-hero-copy"><p className="eyebrow"><span/>404</p><h1>That route is beyond the reef.</h1><p className="detail-dek">The page you requested does not exist or has moved.</p><a className="button button-primary" href="/">Return home <ArrowRight size={17}/></a></div><div className="detail-hero-art"><div className="detail-icon-ring"><Waypoints size={74} strokeWidth={1.15}/></div></div></section></main></div>}

export const validSitePaths = Object.keys(pageData)
