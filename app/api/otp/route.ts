import { sendOtp } from "@/lib/nodemailer";
import { NextResponse } from "next/server";

function generateOTP(limit: number) {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < limit; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}


export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ data: "Provide all data" }, { status: 400 });
    }
    let otp = generateOTP(6)
    const otpStatus = await sendOtp(email, Number(otp))
    if (otpStatus) {
      return NextResponse.json({ OTP: Number(otp) }, { status: 200 });   
    }

    
  } catch (error) {
    return NextResponse.json(
      { data: `Server Error: ${error}` },
      { status: 500 }
    );
  }
}