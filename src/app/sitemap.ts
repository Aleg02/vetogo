import { MetadataRoute } from 'next';
import { PROTOCOLS } from '@/data/protocols';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://vetogo.app';

    // Static routes
    const routes = [
        '',
        '/a-propos',
        '/subscribe',
        '/support-contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic protocol routes
    const protocols = PROTOCOLS.map((protocol) => ({
        url: `${baseUrl}/protocols/${protocol.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [...routes, ...protocols];
}
