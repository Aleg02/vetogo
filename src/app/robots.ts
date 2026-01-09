import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://vetogo.app';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/mon-compte/',
                '/login/',
                '/signup/',
                '/auth/',
                '/api/',
                '/preview-login/',
                '/subscribe?*',
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
