import "dotenv/config";
import db from "..";
import { advocates } from "../schema/advocates";
import { advocateData } from "./advocates";

async function main() {
	console.log("Seeding database with advocates...");

	try {
		// Optional: clear existing rows to keep the dataset stable between runs
		// await db.delete(advocates);

		const inserted = await db.insert(advocates).values(advocateData).returning();
		console.log(`Inserted ${inserted.length} advocates.`);
	} catch (err) {
		console.error("Seed failed:", err);
		process.exit(1);
	}

	// Ensure process exits even if the connection pool remains open
	process.exit(0);
}

main();

