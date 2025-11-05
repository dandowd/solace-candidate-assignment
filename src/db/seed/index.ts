import "dotenv/config";
import db from "..";
import { advocates } from "../schema/advocates";
import { advocateData, specialtyData } from "./advocates";
import { specialties } from "../schema/specialties";

async function main() {
  console.log("Seeding database with advocates...");

  try {
    // Optional: clear existing rows to keep the dataset stable between runs
    await db.delete(advocates);

    const insertedSpecialties = await db
      .insert(specialties)
      .values(specialtyData).returning();

    const inserted = await db
      .insert(advocates)
      .values(advocateData)
      .returning();

    console.log(`Inserted ${inserted.length} advocates.`);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }

  // Ensure process exits even if the connection pool remains open
  process.exit(0);
}

main();
