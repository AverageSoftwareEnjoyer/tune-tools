export interface Feature {
    title: string;
    icon: string;
    description: string;
    comingSoon: boolean;
}

export const FEATURES: Feature[] = [
    {
        title: "Your Stats",
        icon: "query_stats",
        description: "Get detailed insights into your music trends",
        comingSoon: false,
    },
    {
        title: "Playlist Personalization",
        icon: "music_note",
        description: "Automatically sort and save playlists",
        comingSoon: true,
    },
    {
        title: "Recently Played",
        icon: "access_time",
        description: "View your recently played tracks",
        comingSoon: true,
    },
    {
        title: "Your Spotify Profile",
        icon: "account_circle",
        description: "Quickly check your profile info",
        comingSoon: false,
    },
] as const;

export interface Faq {
    question: string;
    answer: string;
}

export const FAQS: Faq[] = [
    {
        question: "How do I connect my Spotify account?",
        answer: 'Simply click on the "Connect to Spotify" button and follow the prompts.',
    },
    {
        question: "Is this service free?",
        answer: "Yes, this service is completely free.",
    },
    {
        question: "Is connecting my account safe?",
        answer: "Yes, we do not store any of your information on our servers and we do not track you.",
    },
] as const;
