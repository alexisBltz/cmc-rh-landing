import { ArrowRight, QrCode, Users, FileSignature, ShieldCheck } from "lucide-react";
import { RosterDemo } from "./RosterDemo";
import { PricingCalculator } from "./PricingCalculator";
import { useReveal } from "./useReveal";

// Apunta esto a la URL donde esté desplegado Staff Harmony Hub (login del sistema).
const APP_URL = "https://cmcmin.vercel.app/";

const TICKER_ITEMS = ["V · VACACIONES", "LF · LIBRE", "DM · DESCANSO MÉDICO", "LP · LICENCIA", "PERM · PERMISO", "ET · EN TRÁNSITO"];

const MODULES = [
  {
    code: "PER",
    title: "Gestión de Personal",
    desc: "Tabla tipo Excel con filtros por antigüedad, saldo, área y campamento. Badges de saldo en vivo, verde o rojo, sin recargar la página.",
    icon: Users,
    color: "var(--moss)",
  },
  {
    code: "ROS",
    title: "Roster General",
    desc: "Calendario de turnos con selección arrastrable. Clic, arrastra y asigna el mismo concepto a todo un rango de días.",
    icon: ShieldCheck,
    color: "var(--amber)",
  },
  {
    code: "SOL",
    title: "Solicitudes & QR",
    desc: "El trabajador solicita, el sistema genera la carta de liberación en PDF y un QR que garita valida al toque en el ingreso.",
    icon: QrCode,
    color: "var(--red)",
  },
  {
    code: "ROL",
    title: "Roles & Permisos",
    desc: "Vista propia para trabajador, jefe, RRHH y gerencia. El jefe solo ve lo que tiene que aprobar y sellar.",
    icon: FileSignature,
    color: "var(--green)",
  },
];

const STEPS = [
  { n: "01", title: "El trabajador solicita", desc: "Vacaciones o movimiento, con transporte propio o de la empresa, desde su panel." },
  { n: "02", title: "El jefe aprueba y sella", desc: "Un solo módulo, sin acceso al resto del sistema: aprobar o rechazar con su firma." },
  { n: "03", title: "El sistema arma el PDF", desc: "Carta de liberación si corresponde, y un código QR que apunta al documento." },
  { n: "04", title: "Garita valida al ingreso", desc: "Escanea el QR desde el celular y confirma la salida o el regreso al instante." },
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`lg-reveal ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: "rgba(238,241,228,0.85)", borderBottom: "1px solid var(--line)" }}>
        <div className="container mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="" className="h-7 w-7 object-contain" />
            <span className="lg-mono text-sm font-semibold tracking-tight">CMC HUMANCORE</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 lg-mono text-xs uppercase">
            <a href="#modulos" className="lg-underline">Módulos</a>
            <a href="#como-funciona" className="lg-underline">Cómo funciona</a>
            <a href="#precios" className="lg-underline">Precios</a>
          </nav>
          <a
            href={APP_URL}
            className="lg-mono text-xs uppercase rounded-full px-4 py-2"
            style={{ background: "var(--ink)", color: "var(--chalk)" }}
          >
            Acceder
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="lg-terrain" />
        <div className="container relative mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="lg-mono text-[0.68rem] uppercase inline-block px-3 py-1 rounded-full mb-6" style={{ background: "rgba(65,90,36,0.12)", color: "var(--moss-deep)" }}>
              Sistema RRHH · Operaciones de campamento
            </span>
            <h1 className="lg-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.05] tracking-tight mb-6">
              El roster, la garita<br />y la firma, en un<br />solo panel.
            </h1>
            <p className="text-lg leading-relaxed max-w-md mb-8" style={{ color: "var(--ink-soft)" }}>
              Staff Harmony Hub digitaliza la planilla de campo: personal, turnos, solicitudes y control de acceso por QR, sin salir de una sola pantalla.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={APP_URL}
                className="lg-btn-primary group inline-flex items-center gap-2 lg-mono text-xs uppercase rounded-full px-6 py-3.5"
                style={{ background: "var(--amber)", color: "var(--ink)" }}
              >
                Acceder a la plataforma
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 lg-mono text-xs uppercase rounded-full px-6 py-3.5 border"
                style={{ borderColor: "var(--line)" }}
              >
                Ver cómo funciona
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["QR en garita", "Firma en PDF", "Roster tipo Excel", "Saldos en tiempo real"].map((t) => (
                <span key={t} className="lg-mono text-[0.65rem] uppercase text-[color:var(--ink-soft)]">
                  · {t}
                </span>
              ))}
            </div>
          </div>
          <RosterDemo />
        </div>

        {/* ticker */}
        <div className="lg-ticker-wrap overflow-hidden py-3" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--canvas-dim)" }}>
          <div className="lg-ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="lg-mono text-xs uppercase px-6 whitespace-nowrap text-[color:var(--ink-soft)]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modulos" className="container mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <Reveal className="mb-14 max-w-xl">
          <span className="lg-mono text-[0.65rem] uppercase text-[color:var(--ink-soft)]">Módulos</span>
          <h2 className="lg-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">Cuatro tableros, un mismo sistema.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {MODULES.map((m, i) => (
            <Reveal key={m.code} className={i % 2 === 1 ? "sm:translate-y-6" : ""}>
              <div
                className="lg-card h-full rounded-2xl border p-6 sm:p-7"
                style={{ borderColor: "var(--line)", background: "var(--chalk)", borderLeft: `4px solid ${m.color}` }}
              >
                <div className="flex items-center justify-between mb-5">
                  <m.icon className="h-6 w-6" style={{ color: m.color }} />
                  <span className="lg-mono text-[0.65rem]" style={{ color: m.color }}>{m.code}</span>
                </div>
                <h3 className="lg-display text-xl font-semibold mb-2">{m.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-20 sm:py-28" style={{ background: "var(--ink)", color: "var(--chalk)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <Reveal className="mb-14 max-w-xl">
            <span className="lg-mono text-[0.65rem] uppercase opacity-60">Cómo funciona</span>
            <h2 className="lg-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">De la solicitud a la garita, en cuatro pasos.</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <Reveal key={s.n}>
                <div className="relative pt-6" style={{ borderTop: "2px solid rgba(251,250,245,0.2)" }}>
                  <span className="lg-mono text-sm absolute -top-[0.6rem] left-0 px-2" style={{ background: "var(--ink)", color: "var(--amber)" }}>
                    {s.n}
                  </span>
                  <h3 className="lg-display text-lg font-semibold mb-2 mt-2">{s.title}</h3>
                  <p className="text-sm opacity-75 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="precios" className="container mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <Reveal className="mb-14 max-w-xl">
          <span className="lg-mono text-[0.65rem] uppercase text-[color:var(--ink-soft)]">Precios</span>
          <h2 className="lg-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">Pagas por lo que usas.</h2>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            El precio se calcula por colaborador activo en el sistema, no por asiento de usuario ni por módulo.
          </p>
        </Reveal>
        <Reveal>
          <PricingCalculator />
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-24" style={{ background: "var(--moss-deep)", color: "var(--chalk)" }}>
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="lg-display text-3xl sm:text-4xl font-bold tracking-tight mb-6 max-w-xl mx-auto">
            Pon en orden tu campamento.
          </h2>
          <a
            href={APP_URL}
            className="lg-btn-primary inline-flex items-center gap-2 lg-mono text-xs uppercase rounded-full px-7 py-4"
            style={{ background: "var(--amber)", color: "var(--ink)" }}
          >
            Acceder a la plataforma
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="" className="h-6 w-6 object-contain" />
            <span className="lg-mono text-xs">CMC HUMANCORE</span>
          </div>
          <p className="lg-mono text-[0.65rem] uppercase text-[color:var(--ink-soft)]">
            Hecho para operaciones de campo en Perú · © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
