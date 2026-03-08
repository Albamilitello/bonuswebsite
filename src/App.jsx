import { useState, useEffect, useRef } from "react";

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap";

const NAV_ITEMS = ["Work", "About", "Services", "Contact"];

const PROJECTS = [
  { id: 1, title: "Meridian", category: "Branding", year: "2025", color: "#E8FF47" },
  { id: 2, title: "Vortex Labs", category: "Web Design", year: "2025", color: "#FF6B47" },
  { id: 3, title: "Noctis", category: "Identity", year: "2024", color: "#47D4FF" },
  { id: 4, title: "Solstice", category: "Campaign", year: "2024", color: "#C847FF" },
];

const SERVICES = [
  { num: "01", title: "Brand Strategy", desc: "Crafting narratives that resonate and endure." },
  { num: "02", title: "Web Design", desc: "Digital experiences that captivate and convert." },
  { num: "03", title: "Visual Identity", desc: "Systems that are unmistakably, unapologetically you." },
  { num: "04", title: "Creative Direction", desc: "Guiding vision from concept to reality." },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = () => setHover(true);
    const out = () => setHover(false);
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, .hoverable").forEach((el) => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });
    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, .hoverable").forEach((el) => {
        el.removeEventListener("mouseenter", over);
        el.removeEventListener("mouseleave", out);
      });
    };
  }, []);
  return (
    <div style={{
      position: "fixed", top: pos.y, left: pos.x, width: hover ? 56 : 16, height: hover ? 56 : 16,
      borderRadius: "50%", border: "2px solid #E8FF47", pointerEvents: "none", zIndex: 9999,
      transform: "translate(-50%, -50%)", transition: "width 0.3s cubic-bezier(.22,1,.36,1), height 0.3s cubic-bezier(.22,1,.36,1)",
      mixBlendMode: "difference",
    }} />
  );
}

function Hero() {
  const [ref, vis] = useInView(0.05);
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  return (
    <section ref={ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "0 clamp(24px, 4vw, 64px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "15%", right: "8%", width: "clamp(200px, 35vw, 500px)", height: "clamp(200px, 35vw, 500px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,255,71,0.12) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ paddingTop: "clamp(100px, 15vh, 180px)", position: "relative", zIndex: 2 }}>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: "clamp(11px, 1.2vw, 14px)", letterSpacing: "0.25em",
          textTransform: "uppercase", color: "#E8FF47", marginBottom: 32,
          opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(.22,1,.36,1) 0.2s",
        }}>Creative Studio — Est. 2024</p>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontSize: "clamp(48px, 10vw, 140px)", fontWeight: 800,
          lineHeight: 0.92, letterSpacing: "-0.03em", color: "#FAFAF8", margin: 0,
        }}>
          {["We build", "what's", "next."].map((line, i) => (
            <span key={i} style={{
              display: "block",
              opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(60px)",
              transition: `all 0.9s cubic-bezier(.22,1,.36,1) ${0.3 + i * 0.12}s`,
            }}>{line}</span>
          ))}
        </h1>
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        paddingBottom: "clamp(32px, 5vh, 64px)", position: "relative", zIndex: 2,
        borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, marginTop: 40,
        opacity: vis ? 1 : 0, transition: "opacity 1s ease 0.8s",
      }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, letterSpacing: "0.1em" }}>
          {time.toLocaleTimeString("en-US", { hour12: false })} — LOCAL
        </p>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, letterSpacing: "0.1em" }}>SCROLL TO EXPLORE ↓</p>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, letterSpacing: "0.1em" }}>AVAILABLE FOR PROJECTS</p>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [ref, vis] = useInView(0.2);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} className="hoverable"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: "clamp(24px, 4vw, 48px) 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "clamp(16px, 3vw, 40px)",
        cursor: "pointer", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(.22,1,.36,1) ${index * 0.1}s`,
      }}>
      <div style={{
        width: "clamp(50px, 7vw, 80px)", height: "clamp(50px, 7vw, 80px)", borderRadius: "50%",
        background: project.color, transform: hovered ? "scale(1.15)" : "scale(1)",
        transition: "transform 0.5s cubic-bezier(.22,1,.36,1)", flexShrink: 0,
      }} />
      <div>
        <h3 style={{
          fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 5vw, 64px)", fontWeight: 700,
          color: "#FAFAF8", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.1,
          transform: hovered ? "translateX(16px)" : "translateX(0)",
          transition: "transform 0.5s cubic-bezier(.22,1,.36,1)",
        }}>{project.title}</h3>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(10px, 1vw, 13px)", color: "rgba(255,255,255,0.4)", margin: 0, letterSpacing: "0.15em", textTransform: "uppercase" }}>{project.category}</p>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(10px, 1vw, 12px)", color: "rgba(255,255,255,0.25)", margin: "4px 0 0", letterSpacing: "0.1em" }}>{project.year}</p>
      </div>
    </div>
  );
}

function Projects() {
  const [ref, vis] = useInView(0.1);
  return (
    <section style={{ padding: "clamp(80px, 12vh, 160px) clamp(24px, 4vw, 64px)" }}>
      <div ref={ref} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "clamp(40px, 6vh, 80px)" }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontSize: "clamp(12px, 1.3vw, 16px)", fontWeight: 600,
          color: "#E8FF47", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0,
          opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.1s",
        }}>Selected Work</h2>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0,
          opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.2s",
        }}>({PROJECTS.length.toString().padStart(2, "0")})</p>
      </div>
      {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
    </section>
  );
}

function Services() {
  return (
    <section style={{ padding: "clamp(80px, 12vh, 160px) clamp(24px, 4vw, 64px)", background: "rgba(255,255,255,0.015)" }}>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(12px, 1.3vw, 16px)", fontWeight: 600, color: "#E8FF47", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "clamp(48px, 8vh, 96px)" }}>What We Do</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "clamp(32px, 4vw, 56px)" }}>
        {SERVICES.map((s, i) => {
          const [ref, vis] = useInView(0.2);
          return (
            <div ref={ref} key={s.num} style={{
              opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.7s cubic-bezier(.22,1,.36,1) ${i * 0.1}s`,
            }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>{s.num}</span>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, color: "#FAFAF8", margin: "12px 0 8px", letterSpacing: "-0.01em" }}>{s.title}</h3>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(12px, 1.1vw, 14px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  const [ref, vis] = useInView(0.1);
  return (
    <footer ref={ref} style={{ padding: "clamp(80px, 12vh, 160px) clamp(24px, 4vw, 64px) clamp(32px, 5vh, 64px)", position: "relative" }}>
      <h2 style={{
        fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 8vw, 100px)", fontWeight: 800,
        color: "#FAFAF8", lineHeight: 1, letterSpacing: "-0.03em", margin: 0,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
      }}>Let's create<br />something <span style={{ color: "#E8FF47" }}>bold</span>.</h2>
      <a href="mailto:hello@studio.com" className="hoverable" style={{
        display: "inline-block", marginTop: "clamp(24px, 4vh, 48px)",
        fontFamily: "'Space Mono', monospace", fontSize: "clamp(12px, 1.2vw, 15px)",
        color: "#E8FF47", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase",
        padding: "16px 32px", border: "1px solid rgba(232,255,71,0.3)", borderRadius: 999,
        opacity: vis ? 1 : 0, transition: "all 0.6s ease 0.3s",
      }}>hello@studio.com →</a>
      <div style={{
        display: "flex", justifyContent: "space-between", marginTop: "clamp(64px, 10vh, 120px)",
        paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)",
        opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.5s",
      }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.25)", margin: 0, letterSpacing: "0.1em" }}>© 2025 STUDIO</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Twitter", "Instagram", "Dribbble"].map((s) => (
            <a key={s} href="#" className="hoverable" style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", textDecoration: "none", letterSpacing: "0.1em", transition: "color 0.3s" }}
              onMouseEnter={(e) => e.target.style.color = "#E8FF47"} onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.3)"}>{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <>
      <link href={FONT_LINK} rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0A0A0A; overflow-x: hidden; }
        ::selection { background: #E8FF47; color: #0A0A0A; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: rgba(232,255,71,0.3); border-radius: 4px; }
        @media (max-width: 640px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
      <Cursor />
      <div style={{
        background: "#0A0A0A", color: "#FAFAF8", minHeight: "100vh",
        opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease",
      }}>
        {/* Nav */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "clamp(16px, 2.5vh, 28px) clamp(24px, 4vw, 64px)",
          backdropFilter: "blur(12px)", background: "rgba(10,10,10,0.7)",
        }}>
          <span className="hoverable" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 800, color: "#FAFAF8", letterSpacing: "-0.02em", cursor: "pointer" }}>STUDIO<span style={{ color: "#E8FF47" }}>.</span></span>
          <div style={{ display: "flex", gap: "clamp(16px, 3vw, 40px)" }}>
            {NAV_ITEMS.map((item) => (
              <a key={item} href="#" className="hoverable" style={{
                fontFamily: "'Space Mono', monospace", fontSize: "clamp(10px, 1vw, 12px)",
                color: "rgba(255,255,255,0.5)", textDecoration: "none", letterSpacing: "0.15em",
                textTransform: "uppercase", transition: "color 0.3s",
              }} onMouseEnter={(e) => e.target.style.color = "#E8FF47"} onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.5)"}>{item}</a>
            ))}
          </div>
        </nav>
        <Hero />
        <Projects />
        <Services />
        <Footer />
      </div>
    </>
  );
}
