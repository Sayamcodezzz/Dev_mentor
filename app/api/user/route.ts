import org from "@/lib/connection";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken"
import { generateToken } from "@/lib/jwt";


const SECRET_KEY = process.env.JWT_SECRET_KEY

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const gmail = searchParams.get("gmail");
    if (id) {
      const res = await org.usr.findUnique({
        where: { id: id },
      });
      return NextResponse.json({ data: res }, { status: 200 });
    }
    if (gmail) {
      const res = await org.usr.findFirst({
        where: { email: gmail },
      });
      return NextResponse.json({ data: res }, { status: 200 });
    }
    else {
      return NextResponse.json({ data: "NO User Found" }, { status: 200 });
    }
  } catch (e) {
    return NextResponse.json({ data: e }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ data: "ID IS REQUIREED" }, { status: 400 });
    }
    await org.usr.delete({
      where: { id: id },
    });
    return NextResponse.json({ data: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();
    if (!id) {
      return NextResponse.json({ data: "Provide all data" }, { status: 400 });
    }
    const getDetails = await org.usr.findFirst({
      where: {id}
    })

    const res = await org.usr.update({
      where: { id },
      data: {
        name: body.name || getDetails?.name,
        email: body.email || getDetails?.email,
        password: body.password || getDetails?.password,

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

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();
    if (!email && !name) {
      return NextResponse.json({ data: "Provide all data" }, { status: 400 });
    }
    const pass = password ? await bcrypt.hash(password, 10) : null;
    const res = await org.usr.create({
      data: {
        email: email,
        name: name,
        password: pass,
        authType: "JWT"
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    const token = generateToken({id: res.id, email: res.email, name: res.name}, SECRET_KEY as string)
    return NextResponse.json({ token: token, user: {id: res.id, email: res.email, name: res.name} }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { data: `Server Error: ${error}` },
      { status: 500 }
    );
  }
}