import { NextResponse, type NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  const { email, message } = await request.json();
  console.log(email, message);
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW
    }
  });

  const mailOptions: Mail.Options = {
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: `Message from (${email})`,
    text: message
  };

  try {
    await transport.sendMail(mailOptions);
    return NextResponse.json({ message: 'Success!', status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Failed!', status: 500 });
  }
}
