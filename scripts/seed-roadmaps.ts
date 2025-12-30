import dotenv from "dotenv";
import path from "path";

// Explicitly load .env.local from project root
dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});// 👈 THIS LINE FIXES EVERYTHING
import dbConnect from "../lib/db";
import Roadmap from "../models/Roadmap";
import { frontendRoadmap } from "../data/frontend-roadmap";
import { advancedUIAnimationRoadmap } from "../data/advanced-ui-animation-roadmap";
import { aiMlRoadmap } from "../data/ai-ml";
import { blockchainRoadmap } from "../data/blockchain";
import { cybersecurityRoadmap } from "../data/cybersec";


async function seed() {
  await dbConnect();

  await Roadmap.deleteOne({ slug: frontendRoadmap.slug });

  await Roadmap.create(frontendRoadmap);
  await Roadmap.create(advancedUIAnimationRoadmap);
  await Roadmap.create(aiMlRoadmap);
  await Roadmap.create(blockchainRoadmap);
  await Roadmap.create(cybersecurityRoadmap);



  console.log("✅ Frontend roadmap seeded successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
