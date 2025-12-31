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
import { backendRoadmap } from "../data/backend";
import { appDevelopmentRoadmap } from "../data/apppdev";




async function seed() {
  await dbConnect();

  await Roadmap.deleteOne({ slug: frontendRoadmap.slug });
  await Roadmap.deleteOne({ slug: advancedUIAnimationRoadmap.slug });
  await Roadmap.deleteOne({ slug: appDevelopmentRoadmap.slug });
  await Roadmap.deleteOne({ slug: aiMlRoadmap.slug });
  await Roadmap.deleteOne({ slug: blockchainRoadmap.slug });
  await Roadmap.deleteOne({ slug: cybersecurityRoadmap.slug });
  await Roadmap.deleteOne({ slug: backendRoadmap.slug });


  await Roadmap.create(frontendRoadmap);
  await Roadmap.create(advancedUIAnimationRoadmap);
  await Roadmap.create(aiMlRoadmap);
  await Roadmap.create(blockchainRoadmap);
  await Roadmap.create(cybersecurityRoadmap);
  await Roadmap.create(backendRoadmap);
  await Roadmap.create(appDevelopmentRoadmap);



  console.log("✅ roadmap seeded successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
