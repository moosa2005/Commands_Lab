import type { YouTubeVideo } from '../types/youtube';

// Access API Key if available
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// Simple memory cache
const CACHE: Record<string, YouTubeVideo[]> = {};

export const TOPICS = [
  'CyberSecurity Fundamental',
  'Networking Basics',
  'Linux for hackers',
  'Information gathering',
  'Network scanning',
  'Web application security',
  'Vulnerability Analysis',
  'Sql injection',
  'Xss',
  'Password attack',
  'Social engineering',
  'Reverse engineering',
  'Malware analysis',
  'Wifi attack'
];

const CURRICULUM_VIDEOS: Record<string, YouTubeVideo> = {
  'CyberSecurity Fundamental': {
    id: '9HOpanT0GRs',
    title: 'Harvard CS50’s Intro to Cybersecurity – Full University Course',
    channelTitle: 'Harvard University / freeCodeCamp.org',
    thumbnailUrl: 'https://i.ytimg.com/vi/9HOpanT0GRs/hqdefault.jpg'
  },
  'Networking Basics': {
    id: 'J4Gx2mXbnZ4',
    title: 'Network Fundamentals – Full Course',
    channelTitle: 'freeCodeCamp.org',
    thumbnailUrl: 'https://i.ytimg.com/vi/J4Gx2mXbnZ4/hqdefault.jpg'
  },
  'Linux for hackers': {
    id: 'lZAoFs75_cs',
    title: 'Linux for Ethical Hackers – Full Course',
    channelTitle: 'The Cyber Mentor / freeCodeCamp.org',
    thumbnailUrl: 'https://i.ytimg.com/vi/lZAoFs75_cs/hqdefault.jpg'
  },
  'Information gathering': {
    id: 'qwA6MmbeGNo',
    title: 'Information Gathering (Reconnaissance) - Ethical Hacking',
    channelTitle: 'The Cyber Mentor',
    thumbnailUrl: 'https://i.ytimg.com/vi/qwA6MmbeGNo/hqdefault.jpg'
  },
  'Network scanning': {
    id: 'f6gwr333RZM',
    title: 'Network Scanning & Enumeration - Ethical Hacking',
    channelTitle: 'The Cyber Mentor',
    thumbnailUrl: 'https://i.ytimg.com/vi/f6gwr333RZM/hqdefault.jpg'
  },
  'Web application security': {
    id: '1GJ_LwNw6sc',
    title: 'Web Application Security & Bug Bounty - Full Course',
    channelTitle: 'The Cyber Mentor',
    thumbnailUrl: 'https://i.ytimg.com/vi/1GJ_LwNw6sc/hqdefault.jpg'
  },
  'Vulnerability Analysis': {
    id: 'iLdsCnpMnTg',
    title: 'Vulnerability Analysis & Assessment - Ethical Hacking',
    channelTitle: 'The Cyber Mentor',
    thumbnailUrl: 'https://i.ytimg.com/vi/iLdsCnpMnTg/hqdefault.jpg'
  },
  'Sql injection': {
    id: '1nJgupaUPEQ',
    title: 'SQL Injection Training – Learn everything about SQLi',
    channelTitle: 'Rana Khalil',
    thumbnailUrl: 'https://i.ytimg.com/vi/1nJgupaUPEQ/hqdefault.jpg'
  },
  'Xss': {
    id: '0GxLc2vsQVg',
    title: 'XSS Masterclass: Learn Cross-Site Scripting (XSS)',
    channelTitle: 'Chef Secure',
    thumbnailUrl: 'https://i.ytimg.com/vi/0GxLc2vsQVg/hqdefault.jpg'
  },
  'Password attack': {
    id: 'z4_oqTZJqCo',
    title: 'How to Crack Passwords – John the Ripper and Hashcat',
    channelTitle: 'NetworkChuck',
    thumbnailUrl: 'https://i.ytimg.com/vi/z4_oqTZJqCo/hqdefault.jpg'
  },
  'Social engineering': {
    id: 'lJGmYl8erPw',
    title: 'Social Engineering: The Human Element of Hacking',
    channelTitle: 'The Cyber Mentor',
    thumbnailUrl: 'https://i.ytimg.com/vi/lJGmYl8erPw/hqdefault.jpg'
  },
  'Reverse engineering': {
    id: '5FXrCHLAJZM',
    title: 'Reverse Engineering Full Course – For Beginners',
    channelTitle: 'David Bombal',
    thumbnailUrl: 'https://i.ytimg.com/vi/5FXrCHLAJZM/hqdefault.jpg'
  },
  'Malware analysis': {
    id: 'qA0YcYMRWyI',
    title: 'Practical Malware Analysis Full Course',
    channelTitle: 'HuskyHacks',
    thumbnailUrl: 'https://i.ytimg.com/vi/qA0YcYMRWyI/hqdefault.jpg'
  },
  'Wifi attack': {
    id: 'rYA_BbgqbP4',
    title: 'WiFi Hacking with Wifite – Full Course',
    channelTitle: 'David Bombal',
    thumbnailUrl: 'https://i.ytimg.com/vi/rYA_BbgqbP4/hqdefault.jpg'
  }
};

// Fallback high-quality mock videos if API key is missing.
const FALLBACK_VIDEOS: Record<string, YouTubeVideo[]> = {
  'Cybersecurity Fundamentals': [
    {
      id: '9HOpanT0GRs',
      title: 'Harvard CS50’s Intro to Cybersecurity – Full University Course',
      channelTitle: 'freeCodeCamp.org',
      thumbnailUrl: 'https://i.ytimg.com/vi/9HOpanT0GRs/hqdefault.jpg'
    },
    {
      id: '5xWnmUEi1Qw',
      title: 'the hacker’s roadmap (how to get started in IT in 2025)',
      channelTitle: 'NetworkChuck',
      thumbnailUrl: 'https://i.ytimg.com/vi/5xWnmUEi1Qw/hqdefault.jpg'
    },
    {
      id: 'bPVaOlJ6ln0',
      title: 'Cybersecurity: Crash Course Computer Science #31',
      channelTitle: 'CrashCourse',
      thumbnailUrl: 'https://i.ytimg.com/vi/bPVaOlJ6ln0/hqdefault.jpg'
    },
    {
      id: 'U_P23SqJaDc',
      title: 'Day in the Life of a Cybersecurity Professional',
      channelTitle: 'NetworkChuck',
      thumbnailUrl: 'https://i.ytimg.com/vi/U_P23SqJaDc/hqdefault.jpg'
    }
  ],
  'Network Scanning': [
    {
      id: '4S9X2V_I90s',
      title: 'NMAP Course - Network Discovery and Vulnerability Scanning',
      channelTitle: 'freeCodeCamp.org',
      thumbnailUrl: 'https://i.ytimg.com/vi/4S9X2V_I90s/hqdefault.jpg'
    }
  ],
  'Web Application Security': [
    {
      id: '2_lUQ00S260',
      title: 'Web Security & Bug Bounty Course - Learn how to hack websites',
      channelTitle: 'freeCodeCamp.org',
      thumbnailUrl: 'https://i.ytimg.com/vi/2_lUQ00S260/hqdefault.jpg'
    }
  ],
  'Linux for Hackers': [
    {
      id: 'ro7yOshN2L4',
      title: 'Linux for Ethical Hackers (Full Course)',
      channelTitle: 'freeCodeCamp.org',
      thumbnailUrl: 'https://i.ytimg.com/vi/ro7yOshN2L4/hqdefault.jpg'
    }
  ],
  'Python for Pentesting': [
    {
      id: '7S_qAsV7D3Q',
      title: 'Python for Beginners - Full Course [Programming Tutorial]',
      channelTitle: 'freeCodeCamp.org',
      thumbnailUrl: 'https://i.ytimg.com/vi/7S_qAsV7D3Q/hqdefault.jpg'
    }
  ],
  'Exploitation Basics': [
    {
      id: 'ug8W0sFiVJo',
      title: 'Hands-On Cybersecurity and Ethical Hacking – Full Course',
      channelTitle: 'freeCodeCamp.org',
      thumbnailUrl: 'https://i.ytimg.com/vi/ug8W0sFiVJo/hqdefault.jpg'
    },
    {
      id: 'D_WPZP5MRoE',
      title: 'Ethical Hacking Full Course 2026 | Tutorial For Beginners',
      channelTitle: 'Simplilearn',
      thumbnailUrl: 'https://i.ytimg.com/vi/D_WPZP5MRoE/hqdefault.jpg'
    }
  ]
};

export async function fetchVideosForTopic(topic: string): Promise<YouTubeVideo[]> {
  // Check if it's part of our core curriculum
  if (CURRICULUM_VIDEOS[topic]) {
    return [CURRICULUM_VIDEOS[topic]];
  }

  if (CACHE[topic]) {
    return CACHE[topic];
  }

  // Optimize query to fetch high-quality tutorials in English
  const searchQuery = `"${topic}" tutorial OR course OR explained cybersecurity ethical hacking`;
  
  if (!API_KEY) {
    console.warn('NEXT_PUBLIC_YOUTUBE_API_KEY is missing. Using fallback videos.');
    // Simulated network delay
    await new Promise(r => setTimeout(r, 600));
    return FALLBACK_VIDEOS[topic] || [CURRICULUM_VIDEOS['CyberSecurity Fundamental']];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&relevanceLanguage=en&maxResults=6&key=${API_KEY}`
    );
    
    if (!response.ok) {
        if (response.status === 403) {
            console.warn('YouTube API Quota Exceeded or Invalid Key. Using fallbacks.');
            return FALLBACK_VIDEOS[topic] || [CURRICULUM_VIDEOS['CyberSecurity Fundamental']];
        }
      throw new Error('Failed to fetch from YouTube API');
    }

    const data = await response.json();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videos: YouTubeVideo[] = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
      channelTitle: item.snippet.channelTitle,
      thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url
    }));

    if (videos.length > 0) {
      CACHE[topic] = videos;
    }
    
    return videos.length > 0 ? videos : (FALLBACK_VIDEOS[topic] || [CURRICULUM_VIDEOS['CyberSecurity Fundamental']]);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return FALLBACK_VIDEOS[topic] || [CURRICULUM_VIDEOS['CyberSecurity Fundamental']];
  }
}
