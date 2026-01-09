import { Protocol } from "@/data/protocols";

export function ProtocolJsonLd({ protocol, slug }: { protocol: Protocol; slug: string }) {
    const baseUrl = "https://vetogo.app";
    const url = `${baseUrl}/protocols/${slug}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": protocol.title,
        "description": `Protocole vétérinaire pour ${protocol.title}. ${protocol.tags?.join(", ")}`,
        "url": url,
        "audience": {
            "@type": "MedicalAudience",
            "name": "Veterinarians"
        },
        "specialty": {
            "@type": "VeterinaryCare",
            "name": protocol.category || "Emergency Medicine"
        },
        "lastReviewed": new Date().toISOString().split('T')[0], // Today as fallback
        "publisher": {
            "@type": "Organization",
            "name": "VetoGo",
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/logo.png`
            }
        },
        "isAccessibleForFree": protocol.accessLevel === "free",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
