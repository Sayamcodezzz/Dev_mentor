import nodemailer from 'nodemailer'

const email = process.env.NEXT_PUBLIC_EMAIL
const pass = process.env.NEXT_PUBLIC_EMAIL_PASS


const transpoter = nodemailer.createTransport({
    secure: true,
    port: 465,
    service: "gmail",
    auth: {
        user: email,
        pass: pass
    }
})


export async function sendOtp(usremail: string, otp: number) {
const mailOptions = {
      from: email,
      to: usremail,
      subject: "Advanced Bin - OTP Verification.",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure OTP Verification</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
        .container { background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 600px; margin: auto; }
        .header { text-align: center; margin-bottom: 20px; }
        .otp-box { background-color: black; border-radius: 5px; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; color: white; margin: 20px 0; }
        .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Secure OTP Verification</h1>
        </div>
        <p>Dear User,</p>
        <p>Your OTP code is:</p>
        <div class="otp-box">${otp}</div>
        <p>Please use this code to complete your verification process.</p>
        <div class="footer">
            <p>Thank you for choosing US!</p>
            <p>&copy; 2025 Advanded bin</p>
        </div>
    </div>
</body>
</html>
      `,
    };  
    
    await transpoter.sendMail(mailOptions)
    return true
}

export async function sendBugreport(name: string, email: string, id: string, subject: string, message: string, relatedTo: string) {
    const mailOptions = {
      from: email,
      to: "adarshpanditdev@gmail.com",
      subject: `Bug Report from Bin - ${relatedTo}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>🪲 Bug Report Submitted</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 20px;
      color: #333;
    }

    .container {
      max-width: 620px;
      margin: auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
      border-top: 6px solid #e74c3c;
    }

    h2 {
      color: #e74c3c;
      font-size: 24px;
      margin-bottom: 10px;
    }

    .info-section {
      margin: 15px 0;
    }

    .label {
      display: inline-block;
      width: 100px;
      font-weight: bold;
      color: #2c3e50;
    }

    .value {
      display: inline-block;
      color: #555;
    }

    .highlight-box {
      background-color: #fef6f6;
      border-left: 4px solid #e74c3c;
      padding: 15px;
      margin-top: 10px;
      border-radius: 5px;
      white-space: pre-line;
      color: #c0392b;
    }

    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #999;
      text-align: center;
    }


    .button {
      display: inline-block;
      background-color: cadetblue;
      color: white;
      padding: 6px 20px;
      border-radius: 8px;
      font-size: 20px;
      vertical-align: middle;
      margin-left: 6px;
      border: none;
      outline: none;
    }

  </style>
</head>
<body>
  <div class="container">
    <h2>🪲 Bug Report Submitted</h2>

    <div class="info-section">
      <span class="label">Report ID:</span>
      <span class="value">${id}</span>
    </div>

    <div class="info-section">
      <span class="label">Name:</span>
      <span class="value">${name}</span>
    </div>

    <div class="info-section">
      <span class="label">Email:</span>
      <span class="value">${email}</span>
    </div>

    <div class="info-section">
      <span class="label">Subject:</span>
      <span class="value">${subject}</span>
    </div>

    <div class="info-section">
      <span class="label">Related To:</span>
      <span class="value">${relatedTo}
    </div>

    <div class="info-section">
      <span class="label">Message:</span>
      <div class="highlight-box">${message}</div>
    </div>

    <a href="mailto:${email}" class="button">Reply</a>

    <div class="footer">
      This is an automated email. Please review the report and follow up as necessary.
    </div>
  </div>
</body>
</html>

      `,
    };  
    
    await transpoter.sendMail(mailOptions)
    return true
}