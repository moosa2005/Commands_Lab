import Home from "@/pages/Home";

export default function Page() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a Kali Linux command generator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Kali Linux command generator is a tool that helps you build complex penetration testing commands without memorizing syntax. You select options from a visual interface, and the tool generates the correct command for tools like Nmap, SQLMap, Hydra, Metasploit, and more."
        }
      },
      {
        "@type": "Question",
        "name": "Is CommandsLab free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, CommandsLab is 100% free to use. There are no signups, no ads, and no premium plans. All Kali Linux command generators are available at no cost."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need Kali Linux installed to use this?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you can use CommandsLab from any browser to generate commands. However, to actually run the generated commands, you'll need Kali Linux or another Linux distribution with the relevant tools installed."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <Home />
    </>
  );
}
