import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { PROTOCOLS } from "@/data/protocols";
import { PROTOCOL_DETAILS } from "@/data/protocolDetails";
import ProtocolClientPage from "./ProtocolClientPage";
import type { Protocol } from "@/data/protocols";
import type { ProtocolSection } from "@/data/protocolDetails";

// Types pour les données Supabase
type CardRow = {
  id: string;
  slug: string;
  protocol: string | null;
  title: string;
  version: string | null;
  tags: string[] | null;
  icon: string | null;
  accent_color: string | null;
  sources: { label: string; url?: string }[] | null;
  content: Record<string, unknown> | null;
  is_premium: boolean;
};

type SupabaseCardSectionRow = {
  id: string;
  title: string;
  body: string | null;
  content: { bullets?: unknown } | null;
  position: number | null;
};

type CardWithSectionsRow = CardRow & {
  card_sections?: SupabaseCardSectionRow[] | null;
};

// Mappers
function mapCardRow(row: CardRow): Protocol {
  return {
    slug: row.slug || row.protocol || row.id,
    title: row.title,
    version: row.version ?? undefined,
    tags: row.tags ?? undefined,
    icon: row.icon ?? "🩺",
    accentColor: row.accent_color ?? "#0ea5e9",
    accessLevel: row.is_premium ? "premium" : "free",
    sources: Array.isArray(row.sources) && row.sources.length > 0 ? row.sources : undefined,
  };
}

function mapSections(rows: SupabaseCardSectionRow[]): ProtocolSection[] {
  return rows
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((row) => ({
      title: row.title,
      bullets: extractBullets(row),
    }))
    .filter((section) => section.bullets.length > 0);
}

function extractBullets(row: SupabaseCardSectionRow): string[] {
  const fromContent = Array.isArray(row.content?.bullets)
    ? (row.content?.bullets as unknown[]).filter((item): item is string => typeof item === "string")
    : [];

  if (fromContent.length > 0) {
    return fromContent;
  }

  return row.body ? [row.body] : [];
}

// Shared Data Fetching Logic
async function getProtocolData(slug: string) {
  const adminClient = getSupabaseAdminClient();
  const { data: cards, error } = await adminClient
    .from("cards")
    .select("*, card_sections(*)")
    .eq("slug", slug)
    .limit(1);

  const cardRow = cards?.[0] as CardWithSectionsRow | undefined;

  // Fallback
  const fallbackProtocol = PROTOCOLS.find((p) => p.slug === slug);
  const fallbackSections = PROTOCOL_DETAILS[slug] ?? [];

  let protocol: Protocol | null = null;
  let sections: ProtocolSection[] = [];

  if (cardRow) {
    protocol = mapCardRow(cardRow);
    sections = mapSections(cardRow.card_sections ?? []);
  } else if (fallbackProtocol) {
    protocol = fallbackProtocol;
    sections = fallbackSections;
  }

  return { protocol, sections, error };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// SEO Metadata Generation
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const { protocol } = await getProtocolData(slug);

  if (!protocol) {
    return {
      title: "Protocole introuvable | VetoGo",
    };
  }

  const title = `${protocol.title} - Protocole Vétérinaire`;
  const description = `Protocole vétérinaire pour : ${protocol.title}. ${protocol.tags?.join(", ") || "Urgences et soins intensifs"}. Guide clinique complet sur VetoGo.`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      // images: protocol.icon ? [...] : [] // Future: dynamic OG image
    },
    keywords: protocol.tags,
  };
}

import { ProtocolJsonLd } from "@/components/ProtocolJsonLd";

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // 1. Fetch Protocol Data
  const { protocol, sections, error } = await getProtocolData(slug);

  // 2. Auth Check
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  // 3. Premium Access Check
  if (protocol?.accessLevel === "premium") {
    let canViewPremium = false;

    if (session?.user) {
      const adminClient = getSupabaseAdminClient();
      const { data } = await adminClient
        .from("user_entitlements")
        .select("can_view_premium")
        .eq("user_id", session.user.id)
        .maybeSingle();

      const entitlement = data as { can_view_premium: boolean | null } | null;
      canViewPremium = entitlement?.can_view_premium ?? false;
    }

    if (!canViewPremium) {
      const target = protocol.title ?? slug;
      redirect(`/subscribe?reason=premium&slug=${encodeURIComponent(target)}`);
    }
  }

  return (
    <>
      {protocol && <ProtocolJsonLd protocol={protocol} slug={slug} />}
      <ProtocolClientPage
        slug={slug}
        protocol={protocol}
        sections={sections}
        error={error?.message}
      />
    </>
  );
}
