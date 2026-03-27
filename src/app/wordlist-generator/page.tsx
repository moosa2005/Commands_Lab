import type { Metadata } from 'next';
import WordlistGenerator from "@/pages/WordlistGenerator";

export const metadata: Metadata = {
  title: 'Custom Wordlist Generator - Crunch Password List Creator',
  description: 'Create custom wordlists for brute force attacks. Generate targeted password lists with specific character sets, patterns, and length ranges using Crunch.',
  alternates: {
    canonical: '/wordlist-generator',
  },
};

export default function Page() {
  return <WordlistGenerator />;
}
