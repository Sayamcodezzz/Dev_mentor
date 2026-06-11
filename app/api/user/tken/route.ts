import org from "@/lib/connection";
import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET_KEY

export async function GET(req: Request) {
  try {
    const header = req.headers.get("Authorization")
    const token = header?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ data: "Token" }, { status: 401 })
    }
    const {id} = verifyToken(token as string, SECRET_KEY as string)
    if (!id) {
      return NextResponse.json({ data: "ID IS REQUIREED" }, { status: 400 });
    }
    const res = await org.usr.findUnique({
      where: { id: id },
      select: {
        email: true,
        id: true,
        name: true       
      }
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ data: e }, { status: 500 });
  }
}
