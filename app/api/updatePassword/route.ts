import org from "@/lib/connection";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";



export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const {password} = await req.json();
    if (!id) {
      return NextResponse.json({ data: "Provide all data" }, { status: 400 });
    }
    let hashedPassword = await bcrypt.hash(password, 10);

    const res = await org.usr.update({
      where: { id },
      data: {
        password: hashedPassword
      }
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { data: `Server Error: ${error}` },
      { status: 500 }
    );
  }
}