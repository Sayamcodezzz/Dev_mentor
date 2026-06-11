import org from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID not found" }, { status: 401 });
  }
  const res = await org.usr.findMany({
    where: { id },
    include: {
      analytics: {
        orderBy: {
          createdAt: "desc",
        },
      },
      snippets: {
        include: {
          analytics: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (res) {
    return NextResponse.json({ data: res }, { status: 200 });
  }
}
