export const cybersecurityRoadmap = {
  slug: "cybersec",
  title: "Cybersecurity",
  domain: "Security & Systems",

  steps: [
    /* =========================
       PHASE 1 — OPERATING SYSTEMS
    ========================== */

    {
      title: "Operating Systems — Linux Foundations",
      description:
        "Learn how operating systems work, with a strong focus on Linux command line usage.",

      resources: [
        {
          title: "Linux Journey (Beginner Friendly)",
          type: "tool",
          url: "https://linuxjourney.com/",
        },
        {
          title: "How Linux Works — Brian Ward",
          type: "article",
          url: "https://nostarch.com/howlinuxworks3",
        },
        {
          title: "Linux Bible — Christopher Negus",
          type: "article",
          url: "https://www.wiley.com/en-us/Linux+Bible%2C+9th+Edition-p-9781118999875",
        },
        {
          title: "Bread On Penguins (Linux Videos)",
          type: "video",
          url: "https://www.youtube.com/@BreadOnPenguins/",
        },
      ],
    },

    {
      title: "Operating Systems — Windows Basics (Optional)",
      description:
        "Learn basic Windows administration concepts. Can be skipped initially.",

      resources: [
        {
          title: "Windows Administration Overview",
          type: "article",
          url: "https://learn.microsoft.com/en-us/windows-server/administration/",
        },
      ],
    },

    {
      title: "Programming Foundations — C & C++ (Recommended)",
      description:
        "Understanding low-level programming helps immensely in security and exploits.",

      resources: [
        {
          title: "C Programming Language (Book)",
          type: "article",
          url: "https://en.wikipedia.org/wiki/The_C_Programming_Language",
        },
        {
          title: "Learn C (Programiz)",
          type: "article",
          url: "https://www.programiz.com/c-programming",
        },
        {
          title: "Learn C++ (Programiz)",
          type: "article",
          url: "https://www.programiz.com/cpp-programming",
        },
      ],
    },

    /* =========================
       PHASE 2 — NETWORKING
    ========================== */

    {
      title: "Networking — Fundamentals",
      description:
        "Learn how computers communicate, which is essential for understanding attacks and defenses.",

      resources: [
        {
          title: "Computer Networking: A Top-Down Approach (Kurose & Ross)",
          type: "article",
          url: "https://gaia.cs.umass.edu/kurose_ross/index.php",
        },
        {
          title: "Computer Networks — Tanenbaum",
          type: "article",
          url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networks/P200000006265",
        },
        {
          title: "Networking Basics Explained",
          type: "article",
          url: "https://www.cloudflare.com/learning/network-layer/what-is-a-network/",
        },
      ],
    },

    /* =========================
       PHASE 3 — SECURITY FUNDAMENTALS
    ========================== */

    {
      title: "Security Fundamentals — Core Concepts",
      description:
        "Learn how data is protected and how security principles work at a fundamental level.",

      resources: [
        {
          title:
            "Computer Security: Principles and Practice — William Stallings",
          type: "article",
          url: "https://www.pearson.com/en-us/subject-catalog/p/computer-security/P200000003319",
        },
        {
          title: "Serious Cryptography — Jean-Philippe Aumasson",
          type: "article",
          url: "https://nostarch.com/seriouscrypto",
        },
        {
          title: "Cryptography Basics (Cloudflare)",
          type: "article",
          url: "https://www.cloudflare.com/learning/ssl/what-is-cryptography/",
        },
      ],
    },

    {
      title: "Security Fundamentals — Certification Path (Optional)",
      description:
        "Follow an entry-level certification path if you prefer structured learning.",

      resources: [
        {
          title: "CompTIA Security+ Overview",
          type: "article",
          url: "https://www.comptia.org/certifications/security",
        },
        {
          title: "Get Certified Get Ahead — Darril Gibson",
          type: "article",
          url: "https://getcertifiedgetahead.com/security/",
        },
      ],
    },

    /* =========================
       PHASE 4 — OFFENSIVE SECURITY
    ========================== */

    {
      title: "Offensive Security — Hands-on Practice",
      description:
        "Apply concepts by practicing attacks in safe, legal environments.",

      resources: [
        {
          title: "TryHackMe",
          type: "tool",
          url: "https://tryhackme.com/",
        },
        {
          title: "Introduction to Ethical Hacking",
          type: "article",
          url: "https://www.geeksforgeeks.org/ethical-hacking/",
        },
      ],
    },

    /* =========================
       PHASE 5 — CONTINUOUS LEARNING
    ========================== */

    {
      title: "Continuous Learning & Exploration",
      description:
        "Cybersecurity is a lifelong learning field. Stay curious and keep practicing.",

      resources: [
        {
          title: "OWASP Top 10",
          type: "article",
          url: "https://owasp.org/www-project-top-ten/",
        },
        {
          title: "Cybersecurity News (The Hacker News)",
          type: "article",
          url: "https://thehackernews.com/",
        },
      ],
    },
  ],
};
