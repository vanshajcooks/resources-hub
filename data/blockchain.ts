export const blockchainRoadmap = {
  slug: "blockchain",
  title: "Blockchain Development",
  domain: "Web3 & Distributed Systems",

  steps: [
    /* =========================
       PHASE 1 — BLOCKCHAIN BASICS
    ========================== */

    {
      title: "Blockchain Fundamentals — Core Concepts",
      description:
        "Understand what blockchain is, how it works, and where it is used.",

      resources: [
        {
          title: "Blockchain Basics (MIT – Gary Gensler)",
          type: "video",
          url: "https://ocw.mit.edu/courses/15-s12-blockchain-and-money-fall-2018/",
        },
        {
          title: "Blockchain & Distributed Ledgers — Moataz Elmasry",
          type: "article",
          url: "https://www.amazon.in/Blockchain-Distributed-Ledgers-Technology-Financial/dp/1617297570",
        },
        {
          title: "Blockchain: Massively Simplified (TEDx)",
          type: "video",
          url: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
        },
      ],
    },

    {
      title: "Consensus, Cryptography & Wallets",
      description:
        "Learn how blockchains achieve trust using cryptography and consensus.",

      resources: [
        {
          title: "Proof of Work vs Proof of Stake",
          type: "article",
          url: "https://ethereum.org/en/developers/docs/consensus-mechanisms/",
        },
        {
          title: "Digital Signatures & Hashing",
          type: "article",
          url: "https://www.cloudflare.com/learning/ssl/what-is-cryptography/",
        },
        {
          title: "MetaMask Wallet & Security",
          type: "article",
          url: "https://support.metamask.io/",
        },
      ],
    },

    /* =========================
       PHASE 2 — SMART CONTRACTS
    ========================== */

    {
      title: "Solidity — Smart Contract Development",
      description:
        "Learn Solidity and build your first smart contracts on Ethereum.",

      resources: [
        {
          title: "Cyfrin Updraft — Solidity Path",
          type: "tool",
          url: "https://updraft.cyfrin.io/",
        },
        {
          title: "Solidity Crash Course — Patrick Collins",
          type: "video",
          url: "https://www.youtube.com/watch?v=gyMwXuJrbJQ",
        },
        {
          title: "Simple Storage & Storage Factory",
          type: "article",
          url: "https://docs.soliditylang.org/",
        },
      ],
    },

    {
      title: "Chainlink — Oracles & Automation",
      description:
        "Connect smart contracts to real-world data using Chainlink.",

      resources: [
        {
          title: "Chainlink Documentation",
          type: "article",
          url: "https://docs.chain.link/",
        },
        {
          title: "Chainlink VRF & Proof of Reserve",
          type: "article",
          url: "https://chain.link/use-cases",
        },
        {
          title: "Chainlink CCIP Overview",
          type: "article",
          url: "https://chain.link/cross-chain",
        },
      ],
    },

    /* =========================
       PHASE 3 — ZERO KNOWLEDGE & PYTHON
    ========================== */

    {
      title: "Zero-Knowledge Proofs — Fundamentals",
      description:
        "Understand the theory behind ZK proofs and privacy-preserving systems.",

      resources: [
        {
          title: "Zero Knowledge Proofs Explained",
          type: "article",
          url: "https://zkp.science/",
        },
        {
          title: "ZKSync Overview",
          type: "article",
          url: "https://zksync.io/",
        },
      ],
    },

    {
      title: "Python & Vyper — Alternative Smart Contracts",
      description: "Explore smart contracts written in Python using Vyper.",

      resources: [
        {
          title: "Vyper Documentation",
          type: "article",
          url: "https://docs.vyperlang.org/",
        },
        {
          title: "Python for Blockchain (Intro)",
          type: "article",
          url: "https://www.python.org/",
        },
      ],
    },

    /* =========================
       PHASE 4 — WEB3 STACK
    ========================== */

    {
      title: "Web3 Stack — Frontend & Tooling",
      description: "Build decentralized applications using modern Web3 tools.",

      resources: [
        {
          title: "Node.js Basics",
          type: "article",
          url: "https://nodejs.org/en/docs",
        },
        {
          title: "TypeScript for JavaScript Developers",
          type: "article",
          url: "https://www.typescriptlang.org/docs/",
        },
        {
          title: "pnpm Package Manager",
          type: "article",
          url: "https://pnpm.io/",
        },
      ],
    },

    {
      title: "Foundry & DApp Interaction",
      description:
        "Test, deploy, and interact with smart contracts using Foundry.",

      resources: [
        {
          title: "Foundry Full Course (Cyfrin)",
          type: "tool",
          url: "https://github.com/Cyfrin/foundry-full-course-cu",
        },
        {
          title: "MetaMask DApp Interaction",
          type: "article",
          url: "https://docs.metamask.io/",
        },
      ],
    },

    /* =========================
       PHASE 5 — SOLANA & RUST
    ========================== */

    {
      title: "Rust — Programming Fundamentals",
      description: "Learn Rust basics and prepare for Solana development.",

      resources: [
        {
          title: "Rust Programming Language Book",
          type: "article",
          url: "https://doc.rust-lang.org/book/",
        },
        {
          title: "Rust Crash Course",
          type: "video",
          url: "https://www.youtube.com/watch?v=zF34dRivLOw",
        },
      ],
    },

    {
      title: "Solana — Blockchain Development",
      description:
        "Build fast, low-level blockchain programs using Rust on Solana.",

      resources: [
        {
          title: "Programming on Solana",
          type: "article",
          url: "https://docs.solana.com/developing",
        },
        {
          title: "Solana & Rust Roadmap (2025)",
          type: "video",
          url: "https://www.youtube.com/watch?v=Hc7E1yXzT0Y",
        },
      ],
    },

    /* =========================
       PHASE 6 — COMMUNITY & CONTINUOUS LEARNING
    ========================== */

    {
      title: "Community, Research & Growth",
      description:
        "Stay updated, network, and keep learning in the Web3 ecosystem.",

      resources: [
        {
          title: "Cyfrin Community",
          type: "tool",
          url: "https://updraft.cyfrin.io/",
        },
        {
          title: "Blockchain Articles on Medium",
          type: "article",
          url: "https://medium.com/techskill-brew",
        },
        {
          title: "Blockchain in India (TEDx)",
          type: "video",
          url: "https://www.youtube.com/watch?v=U_lKZkK3E9I",
        },
      ],
    },
  ],
};
