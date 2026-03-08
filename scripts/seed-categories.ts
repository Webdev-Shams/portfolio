import { config } from "dotenv";
config({ path: ".env" });

import { db } from "../db/index";
import { categories } from "../db/schema";

async function main() {
    console.log("🌱 Seeding categories...");

    const initialCategories = [
        { name: "Next.js", slug: "next-js" },
        { name: "WordPress", slug: "wordpress" },
    ];

    for (const cat of initialCategories) {
        try {
            await db.insert(categories).values(cat).onConflictDoNothing();
            console.log(`✅ Category "${cat.name}" seeded.`);
        } catch (error) {
            console.error(`❌ Failed to seed "${cat.name}":`, error);
        }
    }
}

main();
