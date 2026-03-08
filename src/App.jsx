const FONT_LINK = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";

const NAV_ITEMS = ["About", "Telegram", "Instagram"];

export default function App() {
  return (
    <>
      <link href={FONT_LINK} rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fff; font-family: 'Inter', sans-serif; color: #111; }
        a { color: #111; text-decoration: none; }
        a:hover { opacity: 0.6; }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#fff" }}>
        {/* Nav */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px clamp(24px, 4vw, 64px)",
          background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)",
          borderBottom: "1px solid #eee",
        }}>
          <span style={{ fontSize: 18, fontWeight: 700 }}>Bonus Italiani</span>
          <div style={{ display: "flex", gap: 32 }}>
            {NAV_ITEMS.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                fontSize: 14, fontWeight: 500, letterSpacing: "0.02em",
              }}>{item}</a>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section style={{
          paddingTop: 120, padding: "120px clamp(24px, 4vw, 64px) 80px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          flexWrap: "wrap", gap: 40,
        }}>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 500 }}>
            Bonus Italiani
          </h1>
          <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: 16 }}>
            {NAV_ITEMS.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                fontSize: 16, fontWeight: 500, padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}>{item} →</a>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" style={{ padding: "80px clamp(24px, 4vw, 64px)", borderTop: "1px solid #eee" }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#888", marginBottom: 24 }}>About</h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 600, color: "#333" }}>
            Placeholder per la sezione about.
          </p>
        </section>

        {/* Telegram */}
        <section id="telegram" style={{ padding: "80px clamp(24px, 4vw, 64px)", borderTop: "1px solid #eee" }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#888", marginBottom: 24 }}>Telegram</h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 600, color: "#333" }}>
            Placeholder per la sezione Telegram.
          </p>
        </section>

        {/* Instagram */}
        <section id="instagram" style={{ padding: "80px clamp(24px, 4vw, 64px)", borderTop: "1px solid #eee" }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#888", marginBottom: 24 }}>Instagram</h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 600, color: "#333" }}>
            Placeholder per la sezione Instagram.
          </p>
        </section>

        {/* Footer */}
        <footer style={{
          padding: "40px clamp(24px, 4vw, 64px)",
          borderTop: "1px solid #eee",
        }}>
          <span style={{ fontSize: 13, color: "#999" }}>© 2025 Bonus Italiani</span>
        </footer>
      </div>
    </>
  );
}
