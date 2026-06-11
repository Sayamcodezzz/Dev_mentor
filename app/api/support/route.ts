import { sendBugreport } from "@/lib/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, id, subject, message, relatedTo } = await req.json();

    const send = await sendBugreport(name, email, id, subject, message, relatedTo)
    if (send) {
      return NextResponse.json({ message: "sent" }, { status: 200 });   
    }

    
  } catch (error) {
    return NextResponse.json(
      { data: `Server Error: ${error}` },
      { status: 500 }
    );
  }
}