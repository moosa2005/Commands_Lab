import { Suspense } from "react";
import type { Metadata } from 'next';
import GeneratorsList from "@/pages/GeneratorsList";

export const metadata: Metadata = {
  title: 'All Kali Linux Tools - Command Generator Directory',
  description: 'Browse our full list of Kali Linux command generators. Tools for network scanning, web testing, exploitation, password attacks, and more.',
  alternates: {
    canonical: '/generators',
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GeneratorsList />
    </Suspense>
  );
}
