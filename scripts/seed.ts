import dotenv from "dotenv";
import path from "path";

// Explicitly load .env.local from project root
dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

import dbConnect from "../lib/db";
import Roadmap from "../models/Roadmap";
import Resource from "../models/Resource";

async function seed() {
  try {
    console.log("🌱 Seeding database...");
    console.log("Using DB:", process.env.MONGODB_URI);
    console.log("ENV CHECK:", process.env.MONGODB_URI);


    await dbConnect();

    await Roadmap.deleteMany({});
    await Resource.deleteMany({});

    console.log("🧹 Cleared existing data");

    await Roadmap.create({
      slug: "web-development",
      title: "Web Development",
      domain: "Frontend & Backend",
      steps: [
        {
          title: "HTML Basics",
          description: "Learn the structure of the web",
          resources: [
            "https://developer.mozilla.org/en-US/docs/Web/HTML",
          ],
        },
        {
          title: "CSS Fundamentals",
          description: "Learn layout, flexbox, and responsive design",
          resources: [
            "https://developer.mozilla.org/en-US/docs/Web/CSS",
          ],
        },
        {
          title: "JavaScript Essentials",
          description: "Understand the language of the web",
          resources: [
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
          ],
        },
      ],
    });

    await Resource.insertMany([
      {
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org/",
        category: "Documentation",
        tags: ["html", "css", "javascript"],
        featured: true,
      },
      {
        title: "JavaScript.info",
        url: "https://javascript.info/",
        category: "Tutorial",
        tags: ["javascript"],
        featured: false,
      },
    ]);

    console.log("🎉 Seeding complete");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
