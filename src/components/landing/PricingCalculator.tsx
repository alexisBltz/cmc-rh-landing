import { useMemo, useState } from "react";
import { posthog } from "../../lib/analytics";

type Plan = {
  code: string;
  name: string;
  price: number;
  blurb: string;
  features: string[];
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    code: "OPERATIVO",
    name: "Operativo",
    price: 5.9,
    blurb: "Para un campamento único con roster y personal al día.",
    features: [
      "Ficha de personal tipo Excel",
      "Roster general con selección arrastrable",
      "Saldos de días libres y vacaciones",
      "Exportación a Excel",
    ],
  },
  {
    code: "CAMPAMENTO",
    name: "Campamento",
    price: 8.9,
    blurb: "El más elegido: suma control de acceso y documentos firmados.",
    features: [
      "Todo lo de Operativo",
      "QR de validación en garita",
      "Cartas de liberación en PDF",
      "Aprobación y sello del jefe directo",
      "Notas internas a RRHH",
    ],
    highlight: true,
  },
  {
    code: "CORPORATIVO",
    name: "Corporativo",
    price: 0,
    blurb: "Varios campamentos bajo una sola gerencia.",
    features: [
      "Todo lo de Campamento",
      "Multi-campamento y multi-centro de costo",
      "Soporte prioritario",
      "Onboarding de migración de datos",
    ],
  },
];

const formatSoles = (n: number) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", maximumFractionDigits: 0 }).format(n);

const WHATSAPP_NUMBER = "51936224203";

const whatsappUrl = (plan: Plan, count: number) => {
  const message =
    plan.price > 0
      ? `Hola, quiero cotizar el plan ${plan.name} de CMC HUMANCORE para ${count} colaboradores.`
      : `Hola, quiero cotizar el plan Corporativo de CMC HUMANCORE.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export function PricingCalculator() {
  const [count, setCount] = useState(80);

  const totals = useMemo(
    () => PLANS.map((p) => (p.price > 0 ? p.price * count : null)),
    [count]
  );

  return (
    <div>
      <div
        className="rounded-2xl border p-5 sm:p-6 mb-10 flex flex-col sm:flex-row sm:items-center gap-5"
        style={{ borderColor: "var(--line)", background: "var(--chalk)" }}
      >
        <div className="sm:w-64 shrink-0">
          <p className="lg-mono text-[0.65rem] uppercase text-[color:var(--ink-soft)] mb-1">Simula tu costo</p>
          <p className="lg-display text-lg font-semibold">
            {count} colaborador{count === 1 ? "" : "es"} activos
          </p>
        </div>
        <input
          type="range"
          min={10}
          max={400}
          step={5}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          onMouseUp={(e) => posthog.capture("pricing_slider_changed", { colaboradores: Number(e.currentTarget.value) })}
          onTouchEnd={(e) => posthog.capture("pricing_slider_changed", { colaboradores: Number(e.currentTarget.value) })}
          className="w-full accent-[#d97b29]"
          aria-label="Número de colaboradores activos"
        />
        <p className="lg-mono text-[0.62rem] uppercase text-[color:var(--ink-soft)] sm:w-40 sm:text-right">
          10 a 400+ colaboradores
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((plan, i) => (
          <div
            key={plan.code}
            className="lg-card rounded-2xl border p-6 sm:p-7 flex flex-col"
            style={{
              borderColor: plan.highlight ? "var(--moss)" : "var(--line)",
              background: plan.highlight ? "var(--moss)" : "var(--chalk)",
              color: plan.highlight ? "var(--chalk)" : "var(--ink)",
            }}
          >
            {plan.highlight && (
              <span className="lg-mono text-[0.6rem] uppercase mb-4 inline-block w-fit px-2 py-1 rounded-full" style={{ background: "var(--amber)", color: "var(--ink)" }}>
                Más elegido
              </span>
            )}
            <span className="lg-mono text-[0.62rem] uppercase opacity-70">{plan.code}</span>
            <h3 className="lg-display text-2xl font-semibold mt-1 mb-2">{plan.name}</h3>
            <p className={`text-sm mb-5 ${plan.highlight ? "opacity-90" : "text-[color:var(--ink-soft)]"}`}>{plan.blurb}</p>

            <div className="mb-6">
              {plan.price > 0 ? (
                <>
                  <span className="lg-display text-3xl font-bold">{formatSoles(plan.price)}</span>
                  <span className="lg-mono text-xs opacity-70"> /colaborador/mes</span>
                  <p className="lg-mono text-[0.65rem] uppercase mt-2 opacity-70">
                    ≈ {formatSoles(totals[i] ?? 0)} /mes para {count}
                  </p>
                </>
              ) : (
                <>
                  <span className="lg-display text-3xl font-bold">A medida</span>
                  <p className="lg-mono text-[0.65rem] uppercase mt-2 opacity-70">Cotización según campamentos</p>
                </>
              )}
            </div>

            <ul className="space-y-2.5 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: plan.highlight ? "var(--amber)" : "var(--moss)" }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={whatsappUrl(plan, count)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("pricing_plan_click", { plan: plan.code, colaboradores: count })}
              className="block lg-mono text-xs uppercase rounded-full px-5 py-3 text-center transition-colors"
              style={
                plan.highlight
                  ? { background: "var(--amber)", color: "var(--ink)" }
                  : { background: "var(--ink)", color: "var(--chalk)" }
              }
            >
              {plan.price > 0 ? "Elegir plan" : "Hablar con ventas"}
            </a>
          </div>
        ))}
      </div>

      <p className="lg-mono text-[0.62rem] uppercase text-center mt-8 text-[color:var(--ink-soft)]">
        Precio por colaborador activo en el sistema, no por licencia de usuario · Facturación mensual, sin permanencia
      </p>
    </div>
  );
}
