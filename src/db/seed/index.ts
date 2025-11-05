import "dotenv/config";
import db from "..";
import { advocates } from "../schema/advocates";
import { advocateData, specialtyData } from "./advocates";
import { specialties } from "../schema/specialties";
import { advocateSpecialties } from "../schema/advocateSpecialties";

async function main() {
  console.log("Seeding database with advocates...");

  try {
    // Optional: clear existing rows to keep the dataset stable between runs
    await db.delete(advocates);
    await db.delete(specialties);
    await db.delete(advocateSpecialties);

    const insertedSpecialties = await db
      .insert(specialties)
      .values(specialtyData)
      .returning();

    const inserted = await db
      .insert(advocates)
      .values(advocateData)
      .returning();

    for (const advocate of inserted) {
      const specialtyIndex = Math.floor(Math.random() * specialtyData.length);
      const specialtyIndex2 = Math.floor(Math.random() * specialtyData.length);

      await db.insert(advocateSpecialties).values({
        advocateId: advocate.id,
        specialtyId: insertedSpecialties[specialtyIndex].id,
      });

      await db.insert(advocateSpecialties).values({
        advocateId: advocate.id,
        specialtyId: insertedSpecialties[specialtyIndex2].id,
      });
    }

    console.log(`Inserted ${inserted.length} advocates.`);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }

  // Ensure process exits even if the connection pool remains open
  process.exit(0);
}

main();
