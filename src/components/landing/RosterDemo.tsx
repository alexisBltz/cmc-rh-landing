import { useEffect, useState, type CSSProperties } from "react";

type CellSpec = {
  code: string;
  color: string;
  delay: number;
};

const DAYS = Array.from({ length: 28 }, (_, i) => i + 1);

const PLAN: Record<number, CellSpec> = {
  3: { code: "V", color: "#5c8a3a", delay: 0 },
  4: { code: "V", color: "#5c8a3a", delay: 0.05 },
  5: { code: "V", color: "#5c8a3a", delay: 0.1 },
  6: { code: "V", color: "#5c8a3a", delay: 0.15 },
  11: { code: "LF", color: "#415a24", delay: 0.35 },
  12: { code: "LF", color: "#415a24", delay: 0.4 },
  18: { code: "DM", color: "#b23a2f", delay: 0.6 },
  22: { code: "T", color: "#d97b29", delay: 0.75 },
  23: { code: "T", color: "#d97b29", delay: 0.8 },
  24: { code: "T", color: "#d97b29", delay: 0.85 },
};

export function RosterDemo() {
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimKey((k) => k + 1), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: "var(--line)", background: "var(--chalk)" }}>
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="lg-mono text-[0.65rem] uppercase text-[color:var(--ink-soft)]">Roster · Octubre</span>
        <span className="lg-mono text-[0.65rem] uppercase px-2 py-0.5 rounded-full" style={{ background: "rgba(92,138,58,0.15)", color: "var(--green)" }}>
          Saldo +8
        </span>
      </div>
      <div key={animKey} className="rd-grid">
        {DAYS.map((day) => {
          const spec = PLAN[day];
          return (
            <div key={day} className={`rd-cell ${spec ? "is-anim" : ""}`} style={spec ? ({ "--rd-delay": `${spec.delay}s` } as CSSProperties) : undefined}>
              {spec ? (
                <>
                  <div className="rd-fill" style={{ background: spec.color }} />
                  <span className="rd-code">{spec.code}</span>
                </>
              ) : (
                <span className="absolute inset-0 flex items-center justify-center lg-mono text-[0.55rem] text-[color:var(--ink-soft)] opacity-50">
                  {day}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <p className="lg-mono text-[0.6rem] uppercase mt-3 px-1 text-[color:var(--ink-soft)]">
        Arrastra, suelta y asigna el concepto en lote.
      </p>
    </div>
  );
}
