// src/lib/units.ts

const UNIT_TOKENS: Record<string, string> = {
  mg: "mg",
  g: "g",
  kg: "kg",
  ml: "mL",
  l: "L",
  ui: "UI",
  meq: "mEq",
  mmol: "mmol",
  min: "min",
  h: "h",
  µg: "µg",
  ug: "µg",
  mcg: "µg",
  μg: "µg",
};

function normalizeToken(token: string) {
  const cleaned = token.trim();
  if (!cleaned) return cleaned;
  const key = cleaned.toLowerCase();
  return UNIT_TOKENS[key] ?? cleaned;
}

/** Affiche automatiquement en µg si < 1 mg, sinon en mg (1 ou 2 décimales). */
export function formatMg(mg: number) {
  if (mg < 1) return `${Math.round(mg * 1000)} µg`;
  return `${Number(mg.toFixed(mg < 10 ? 2 : 1))} mg`;
}

export function normalizeUnitLabel(unit?: string) {
  if (!unit) return unit;
  const trimmed = unit.trim();
  if (!trimmed) return unit;
  const [base, ...rest] = trimmed.split(/\s+/);
  const normalizedBase = base
    .split("/")
    .map(normalizeToken)
    .join("/");
  return rest.length ? `${normalizedBase} ${rest.join(" ")}` : normalizedBase;
}

export function formatPerKgUnit(unit?: string) {
  const normalized = normalizeUnitLabel(unit);
  if (!normalized) return normalized;
  return normalized.includes("/kg") ? normalized : `${normalized}/kg`;
}

type UnitFamily = "mEq" | "mmol" | null;

function extractUnitFamily(unit?: string): UnitFamily {
  const normalized = normalizeUnitLabel(unit) ?? "";
  if (normalized.includes("mEq")) return "mEq";
  if (normalized.includes("mmol")) return "mmol";
  return null;
}

export function validateUnitCompatibility(
  doseUnit?: string,
  concentrationUnitType?: string
) {
  const doseFamily = extractUnitFamily(doseUnit);
  const concentrationFamily = extractUnitFamily(concentrationUnitType);
  if (doseFamily && concentrationFamily && doseFamily !== concentrationFamily) {
    return `Incompatibilité d'unités : dose en ${doseFamily} vs concentration en ${concentrationFamily}. Conversion explicite requise.`;
  }
  return null;
}
