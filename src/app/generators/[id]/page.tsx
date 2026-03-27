import GeneratorDetail from "@/pages/GeneratorDetail";
import { allGenerators } from "@/data/generators";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const id = (await params).id;
  const generator = allGenerators.find((g: any) => g.id === id);

  if (!generator) {
    return {
      title: "Tool Not Found | CommandsLab",
    };
  }

  const title = generator.seo?.title || `${generator.name} Command Generator - CommandsLab`;
  const description = generator.seo?.description || `Generate ${generator.name} commands instantly. ${generator.description} Free online Kali Linux tool for ethical hackers.`;
  const keywords = [...(generator.seo?.keywords || []), generator.name.toLowerCase(), 'command generator', 'kali linux', 'pentesting'].join(", ");

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/generators/${generator.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://commandslab.com/generators/${generator.id}`,
      siteName: 'CommandsLab',
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${generator.name} Command Generator`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default function Page() {
  return <GeneratorDetail />;
}
