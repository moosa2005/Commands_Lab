import { allGenerators } from "@/data/generators";

export default function sitemap() {
  const baseUrl = "https://commandslab.com";

  const generators = allGenerators.map((g) => ({
    url: `${baseUrl}/generators/${g.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/generators`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/wordlist-generator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/learning`,
      lastModified: new Date(),
    },
    ...generators,
  ];
}
