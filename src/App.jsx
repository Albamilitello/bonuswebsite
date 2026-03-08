import { useState, useEffect } from "react";

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";

const NAV_ITEMS = ["About", "Telegram", "Instagram"];

// Palette
const C = {
  bg: "#f8f9fa",
  card: "#ffffff",
  primary: "#2563eb",
  primaryHover: "#1d4ed8",
  text: "#1a1a2e",
  textSecondary: "#64748b",
  border: "#e2e8f0",
  codeBg: "#1e293b",
  badge: "#f1f5f9",
  badgeText: "#64748b",
  expired: "#ef4444",
  expiredBg: "#fef2f2",
};

function isScaduto(scadenza) {
  return new Date(scadenza) < new Date();
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function BonusCard({ bonus }) {
  const scaduto = isScaduto(bonus.scadenza);
  const [rivelato, setRivelato] = useState(false);
  const [copiato, setCopiato] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bonus.codice);
    setCopiato(true);
    setTimeout(() => setCopiato(false), 2000);
  };

  return (
    <div style={{
      padding: "20px 24px", borderRadius: 10, border: `1px solid ${C.border}`,
      background: C.card,
      opacity: scaduto ? 0.55 : 1,
      display: "flex", flexDirection: "column", gap: 12,
      transition: "box-shadow 0.2s ease",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}
      onMouseEnter={(e) => { if (!scaduto) e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.07)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: C.text }}>{bonus.titolo}</h3>
        <span style={{
          fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "4px 10px",
          whiteSpace: "nowrap", flexShrink: 0,
          ...(scaduto
            ? { color: C.expired, background: C.expiredBg }
            : { color: C.badgeText, background: C.badge }),
        }}>
          {scaduto ? "Scaduto" : formatDate(bonus.scadenza)}
        </span>
      </div>

      {bonus.descrizione && (
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: C.textSecondary, margin: 0 }}>
          {bonus.descrizione}
        </p>
      )}

      {(bonus.codice || bonus.link) && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
          {bonus.codice && (
            <>
              <div style={{
                position: "relative", display: "inline-flex", alignItems: "center",
                background: C.codeBg, padding: "9px 18px", borderRadius: 8,
                fontFamily: "monospace", fontSize: 14, fontWeight: 600, letterSpacing: "0.06em",
                color: "#fff", cursor: rivelato ? "text" : "default",
                userSelect: rivelato ? "auto" : "none",
                overflow: "hidden",
              }}>
                <span style={{
                  filter: rivelato ? "none" : "blur(7px)",
                  transition: "filter 0.3s ease",
                }}>
                  {bonus.codice}
                </span>
                {!rivelato && (
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(30,41,59,0.65)", cursor: "pointer",
                  }}
                    onClick={() => setRivelato(true)}
                  >
                    <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                      Rivela codice
                    </span>
                  </div>
                )}
              </div>
              {rivelato && (
                <button
                  onClick={handleCopy}
                  style={{
                    background: copiato ? "#ecfdf5" : C.badge,
                    border: `1px solid ${copiato ? "#a7f3d0" : C.border}`,
                    borderRadius: 8, padding: "9px 16px",
                    fontSize: 12, fontWeight: 600,
                    color: copiato ? "#059669" : C.textSecondary,
                    cursor: "pointer", fontFamily: "'Inter', sans-serif",
                    transition: "all 0.2s ease",
                  }}
                >
                  {copiato ? "Copiato!" : "Copia"}
                </button>
              )}
            </>
          )}
          {bonus.link && (
            <a href={bonus.link} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center",
              background: C.primary, color: "#fff", padding: "9px 18px", borderRadius: 8,
              fontSize: 12, fontWeight: 600, letterSpacing: "0.01em",
              textDecoration: "none", transition: "background 0.2s ease",
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = C.primaryHover}
              onMouseLeave={(e) => e.currentTarget.style.background = C.primary}
            >
              Vai all'offerta →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [bonusList, setBonusList] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "data.json")
      .then((res) => res.json())
      .then((data) => setBonusList(data))
      .catch((err) => console.error("Errore caricamento dati:", err));
  }, []);

  const attivi = bonusList.filter(b => !isScaduto(b.scadenza)).length;

  return (
    <>
      <link href={FONT_LINK} rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; font-family: 'Inter', sans-serif; color: ${C.text}; }
        a { color: ${C.text}; text-decoration: none; }
      `}</style>
      <div style={{ minHeight: "100vh", background: C.bg }}>
        {/* Nav */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", justifyContent: "center",
          padding: "0",
          background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${C.border}`,
        }}>
          <div style={{
            width: "100%", maxWidth: 720,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px clamp(16px, 4vw, 32px)",
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: C.text }}>
              Bonus Italiani
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <a href="#about" style={{
                fontSize: 13, fontWeight: 500, color: C.textSecondary,
                transition: "color 0.2s ease",
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = C.text}
                onMouseLeave={(e) => e.currentTarget.style.color = C.textSecondary}
              >About</a>
              <a href="#telegram" style={{ display: "flex", alignItems: "center", gap: 6, transition: "opacity 0.2s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#26A5E4">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.53 8.15l-1.79 8.42c-.13.6-.48.75-.98.47l-2.72-2-1.31 1.26c-.15.15-.27.27-.55.27l.2-2.77 5.05-4.56c.22-.2-.05-.3-.34-.12l-6.24 3.93-2.69-.84c-.58-.18-.6-.58.12-.86l10.52-4.06c.49-.18.91.12.73.86z"/>
                </svg>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#26A5E4" }}>Telegram</span>
              </a>
              <a href="#instagram" style={{ display: "flex", alignItems: "center", gap: 6, transition: "opacity 0.2s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFDC80"/>
                      <stop offset="25%" stopColor="#F77737"/>
                      <stop offset="50%" stopColor="#E1306C"/>
                      <stop offset="75%" stopColor="#C13584"/>
                      <stop offset="100%" stopColor="#833AB4"/>
                    </linearGradient>
                  </defs>
                  <path fill="url(#ig)" d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2.5a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#E1306C" }}>Instagram</span>
              </a>
            </div>
          </div>
        </nav>

        {/* Hero / Descrizione */}
        <section id="about" style={{
          maxWidth: 720, margin: "0 auto",
          padding: "96px clamp(16px, 4vw, 32px) 0",
        }}>
          <div style={{
            padding: "32px 0", borderBottom: `1px solid ${C.border}`,
          }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, marginBottom: 10 }}>
              Bonus Italiani
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: C.textSecondary, maxWidth: 560 }}>
              Raccogliamo i migliori codici sconto, bonus e offerte disponibili in Italia.
              Trova il tuo risparmio, rivela il codice e usalo subito. Aggiornato ogni giorno.
            </p>
          </div>
        </section>

        {/* Bonus List */}
        <section style={{
          maxWidth: 720, margin: "0 auto",
          padding: "32px clamp(16px, 4vw, 32px) 60px",
        }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>
              Offerte e Bonus
            </h2>
            <p style={{ fontSize: 13, color: C.textSecondary }}>
              {attivi} offert{attivi === 1 ? "a" : "e"} attiv{attivi === 1 ? "a" : "e"}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {bonusList.map((bonus) => (
              <BonusCard key={bonus.id} bonus={bonus} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: "32px clamp(24px, 4vw, 64px)",
          borderTop: `1px solid ${C.border}`,
          textAlign: "center",
        }}>
          <span style={{ fontSize: 12, color: C.textSecondary }}>© 2025 Bonus Italiani</span>
        </footer>
      </div>
    </>
  );
}
