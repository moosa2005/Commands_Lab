import type { Metadata } from 'next';
import Learning from "@/pages/Learning";

export const metadata: Metadata = {
  title: 'Learn Ethical Hacking - Cybersecurity Video Tutorials',
  description: 'Watch top-rated cybersecurity tutorials and ethical hacking courses. Learn Nmap, SQL injection, WiFi hacking, and more through interactive video learning.',
  alternates: {
    canonical: '/learning',
  },
};

export default function Page() {
  return <Learning />;
}
