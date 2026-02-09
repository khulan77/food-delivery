import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

const { AUTH_EMAIL, AUTH_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const verfiyUserEmail = async (receiver: string, verifyLink: string) => {
  await transporter.sendMail({
    from: `"Food Delivery" <${AUTH_EMAIL}>`,
    to: receiver,
    subject: "Email Verification",
    html: `
      <div style="font-family:sans-serif;text-align:center;padding:30px">
        <h2 style="margin-bottom:25px">🍔 Food Delivery</h2>
        <p style="margin-bottom:26px">Email-ээ баталгаажуулна уу 👇</p>

        <a href="${verifyLink}" target="_blank"
           style="
             display:inline-block;
             background:#28a745;
             color:white;
             padding:14px 22px;
             border-radius:8px;
             text-decoration:none;
             font-weight:bold;
             font-size:16px;
           ">
           ✔ Email баталгаажуулах
        </a>
      </div>
    `,
  });
};
