import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema/advocates";
import { ilike } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  if (searchParams.has("search")) {
    const searchTerm = searchParams.get("search");
    const data = await db
      .select()
      .from(advocates)
      .where(ilike(advocates.search,`%${searchTerm}%`))
      .limit(10);
      
    return Response.json({ data });
  }
  // In a real system we would probably have a promoted flag and we would default to the promoted advocates for an area
  const data = await db.select().from(advocates).limit(10);

  return Response.json({ data });
}
