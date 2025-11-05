import { NextRequest } from "next/server";
import db from "../../../db";
import { PgColumn } from "drizzle-orm/pg-core";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("search");
  const orderBy = searchParams.get("orderBy");
  const direction = searchParams.get("direction");

  const findParams: Parameters<typeof db.query.advocates.findMany>[0] = {};

  if (orderBy && direction) {
    console.log(orderBy, direction);
    findParams.orderBy = (advocates, { asc, desc }) => {
      const orderMap: Record<string, PgColumn<any>> = {
        id: advocates.id,
        firstName: advocates.firstName,
      };
      const directionFunc = direction === "asc" ? asc : desc;
      return [directionFunc(orderMap[orderBy])];
    };
  }

  if (searchTerm) {
    findParams.where = (advocates, { ilike }) =>
      ilike(advocates.search, `%${searchTerm}%`);
  }

  // In a real system we would probably have a promoted flag and we would default to the promoted advocates for an area
  const advocatesResults = await db.query.advocates.findMany({
    ...findParams,
    with: {
      advocateSpecialties: {
        with: {
          specialties: true,
        },
      },
    },
  });
  const data = advocatesResults.map(({ advocateSpecialties, ...rest }) => ({
    ...rest,
    specialties: advocateSpecialties.flatMap((as) => ({
      name: as.specialties?.name,
      color: as.specialties?.color,
    })),
  }));

  return Response.json({ data });
}
