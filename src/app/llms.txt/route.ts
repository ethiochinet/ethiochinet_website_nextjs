import { siteConfig } from '@/lib/siteConfig';

export const dynamic = 'force-static';

const base = siteConfig.url;

// Plain-text summary for AI assistants and answer engines (https://llmstxt.org).
const body = `# ${siteConfig.company}

> ${siteConfig.tagline}. ${siteConfig.name} is an AI-native freight logistics platform that intelligently connects freight owners with the most suitable available trucks and drivers while optimizing the entire transportation journey.

Also known as: ${siteConfig.alternateNames.join(', ')}. ${siteConfig.company} is an AI-enabled logistics service provider for cargo and freight transport.

${siteConfig.name} is based in ${siteConfig.address.city}, ${siteConfig.address.country}, and serves freight transportation across Ethiopia, including the Djibouti–Addis corridor. The platform runs on three integrated mobile apps:

- ${siteConfig.apps.freightOwner.name}: register freight, get matched with suitable available trucks and drivers, sign digital transport agreements, authorize transport, track cargo in real time, and confirm delivery.
- ${siteConfig.apps.driver.name}: set availability and location, accept freight orders, sign digital agreements, monitor shipments, and receive payment to a digital wallet after delivery.
- ${siteConfig.apps.vehicleOwner.name}: register vehicles, assign drivers, and monitor orders, agreements, and deliveries by plate number.

## Key pages

- [Home](${base}): overview of the platform and apps
- [About](${base}/about): mission, vision, and story
- [Download](${base}/download): App Store and Google Play links for each app
- [FAQ](${base}/faq): how registration, AI freight matching, digital agreements, payments, and tracking work
- [Media](${base}/media): TV, YouTube, and news coverage of Ethiochinet
- [Blog](${base}/blog): logistics news and guides
- [Contact](${base}/contact): get in touch with the team

## Apps

- ${siteConfig.apps.freightOwner.name} on the App Store: ${siteConfig.apps.freightOwner.appStore}
- ${siteConfig.apps.freightOwner.name} on Google Play: ${siteConfig.apps.freightOwner.googlePlay}
- ${siteConfig.apps.driver.name} on the App Store: ${siteConfig.apps.driver.appStore}
- ${siteConfig.apps.driver.name} on Google Play: ${siteConfig.apps.driver.googlePlay}

## Contact

- Email: ${siteConfig.email}
- Phone: ${siteConfig.phone}
- Address: ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.country}
`;

export function GET() {
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
