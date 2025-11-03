import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema/advocates";
import { asc, desc, ilike } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

const orderMap: Record<string, PgColumn<any>> = {
  id: advocates.id,
  firstName: advocates.firstName,
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("search");
  const orderBy = searchParams.get("orderBy");
  const direction = searchParams.get("direction");

  const baseQuery = db.select().from(advocates);

  if (orderBy && direction) {
    console.log(orderBy, direction);
    const directionFunc = direction === "asc" ? asc : desc;
    baseQuery.orderBy(directionFunc(orderMap[orderBy]));
  }

  if (searchParams.has("search")) {
    baseQuery.where(ilike(advocates.search, `%${searchTerm}%`));
  }

  // In a real system we would probably have a promoted flag and we would default to the promoted advocates for an area
  const data = await baseQuery;

  return Response.json({ data });
}
