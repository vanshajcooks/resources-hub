export const backendRoadmap = {
  slug: "backend",
  title: "Backend Development (Node.js)",
  domain: "Web Development",

  steps: [
    /* =========================
       PHASE 1 — FOUNDATIONS
    ========================== */

    {
      title: "Backend Foundations — How the Web Works",
      description:
        "Understand how the internet works, backend vs frontend, and request–response flow.",

      resources: [
        {
          title: "Client–Server Model Explained",
          type: "video",
          url: "https://youtu.be/tkfVQK6UxDI",
        },
        {
          title: "Backend vs Frontend",
          type: "article",
          url: "https://www.geeksforgeeks.org/frontend-vs-backend/",
        },
        {
          title: "What is an API?",
          type: "video",
          url: "https://youtu.be/XGa4onZP66Q",
        },
        {
          title: "JSON Explained",
          type: "video",
          url: "https://youtu.be/cj3h3Fb10QY",
        },
      ],
    },

    {
      title: "HTTP, HTTPS & Status Codes",
      description:
        "Learn how HTTP works, common status codes, and how servers communicate.",

      resources: [
        {
          title: "HTTP Requests & Responses",
          type: "video",
          url: "https://youtu.be/tkfVQK6UxDI",
        },
        {
          title: "HTTP Status Codes",
          type: "video",
          url: "https://youtu.be/qmpUfWN7hh4",
        },
        {
          title: "HTTP Status Codes (MDN)",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
        },
      ],
    },

    /* =========================
       PHASE 2 — JAVASCRIPT & NODE
    ========================== */

    {
      title: "JavaScript for Backend",
      description:
        "Learn JavaScript fundamentals required for server-side development.",

      resources: [
        {
          title: "JavaScript Crash Course",
          type: "video",
          url: "https://youtu.be/W6NZfCO5SIk",
        },
        {
          title: "JavaScript Basics (MDN)",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript",
        },
      ],
    },

    {
      title: "Node.js Fundamentals",
      description:
        "Learn how Node.js works and how to run JavaScript on the server.",

      resources: [
        {
          title: "Node.js Beginner Tutorial",
          type: "video",
          url: "https://youtu.be/TlB_eWDSMt4",
        },
        {
          title: "Node.js Documentation",
          type: "article",
          url: "https://nodejs.org/en/docs",
        },
      ],
    },

    /* =========================
       PHASE 3 — EXPRESS & APIs
    ========================== */

    {
      title: "Express.js — Building APIs",
      description:
        "Create REST APIs using Express and test them using Postman.",

      resources: [
        {
          title: "Express.js Full Tutorial",
          type: "video",
          url: "https://youtu.be/SccSCuHhOw0",
        },
        {
          title: "Express.js Docs",
          type: "article",
          url: "https://expressjs.com",
        },
        {
          title: "Postman API Testing",
          type: "video",
          url: "https://youtu.be/VywxIQ2ZXw4",
        },
      ],
    },

    /* =========================
       PHASE 4 — DATABASES
    ========================== */

    {
      title: "Databases — Core Concepts",
      description: "Understand how databases work and why they are needed.",

      resources: [
        {
          title: "What is a Database?",
          type: "article",
          url: "https://www.geeksforgeeks.org/dbms/what-is-database/",
        },
      ],
    },

    {
      title: "MongoDB & Mongoose",
      description:
        "Learn NoSQL databases and how to interact with MongoDB using Mongoose.",

      resources: [
        {
          title: "MongoDB Beginner Tutorial",
          type: "video",
          url: "https://youtu.be/ofme2o29ngU",
        },
        {
          title: "MongoDB Documentation",
          type: "article",
          url: "https://www.mongodb.com/docs",
        },
        {
          title: "Mongoose Documentation",
          type: "article",
          url: "https://mongoosejs.com/docs",
        },
      ],
    },

    /* =========================
       PHASE 5 — AUTH & SECURITY
    ========================== */

    {
      title: "Authentication & Security",
      description:
        "Secure your backend using authentication and authorization techniques.",

      resources: [
        {
          title: "Authentication Explained",
          type: "video",
          url: "https://youtu.be/OWeruyqhiTo",
        },
        {
          title: "JWT Authentication",
          type: "video",
          url: "https://youtu.be/mbsmsi7l3r4",
        },
      ],
    },

    /* =========================
       PHASE 6 — ADVANCED BACKEND
    ========================== */

    {
      title: "Advanced Backend Concepts",
      description: "Improve scalability, structure, and production readiness.",

      resources: [
        {
          title: "MVC Architecture",
          type: "article",
          url: "https://www.geeksforgeeks.org/mvc-design-pattern/",
        },
        {
          title: "CORS Explained",
          type: "article",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",
        },
      ],
    },

    /* =========================
       PHASE 7 — DEPLOYMENT
    ========================== */

    {
      title: "Deployment & DevOps Basics",
      description:
        "Deploy backend applications and connect production databases.",

      resources: [
        {
          title: "Backend Deployment Tutorial",
          type: "video",
          url: "https://youtu.be/rOpEN1JDaD0",
        },
        {
          title: "Render Deployment",
          type: "article",
          url: "https://render.com/docs",
        },
        {
          title: "Railway Deployment",
          type: "article",
          url: "https://railway.app",
        },
      ],
    },
  ],
};
