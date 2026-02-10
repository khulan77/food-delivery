import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
import { Resend } from "resend";

configDotenv();

// const { AUTH_EMAIL, AUTH_PASS } = process.env;

// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.AUTH_EMAIL,
//     pass: process.env.AUTH_PASS,
//   },
// });

const resend = new Resend(process.env.RESEND_API_KEY)
export const verfiyUserEmail = async (receiver: string, verifyLink: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: receiver,
    subject: "Email Verification",
    html: `
     <div style="font-family: sans-serif; text-align: center; padding: 30px">
      <h2 style="margin-bottom: 30px; margin-right: 10px">🍔 Food Delivery</h2>
      <p style="margin-bottom: 30px">Email-ээ баталгаажуулна уу 👇</p>

      <a
        href="${verifyLink}"
        target="_blank"
        style="
          display: inline-block;
          background: #28a745;
          color: white;
          padding: 14px 22px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          font-size: 16px;
        "
      >
        ✔ Email баталгаажуулах
      </a>
    </div>
    `,
  });
};
