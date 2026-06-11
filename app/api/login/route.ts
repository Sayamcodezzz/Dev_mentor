import org from "@/lib/connection";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { generateToken } from "@/lib/jwt";


const SECRET_KEY = process.env.JWT_SECRET_KEY


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email && !password) {
      return NextResponse.json({ data: "Provide all data" }, { status: 400 });
    }
    const available = await org.usr.findFirst({
        where: { email: email },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
          authType: true
        }
    })
    if (!available) {
      return NextResponse.json({error: "user not found"}, {status: 404})
    }
    if (available.authType !== "JWT") {
      return NextResponse.json({error: `This email is being used with ${available.authType}, please use ${available.authType}`}, {status: 400})
    }
      const pass = await bcrypt.compare(password, available.password as string);
      if (!pass) {
        return NextResponse.json({error: "wrong password"}, {status: 401})
      }
      const token = generateToken({id: available.id, email: available.email, name: available.name}, SECRET_KEY as string)
      // const token = jwt.sign()
    
    return NextResponse.json({ token: token, user: {id: available.id, email: available.email, name: available.name} }, { status: 200 });
  } catch (error) {
    console.error(error);
    
    return NextResponse.json(
      { data: `Server Error: ${error}` },
      { status: 500 }
    );
  }
}