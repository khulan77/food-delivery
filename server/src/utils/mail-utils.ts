import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

const { AUTH_EMAIL, AUTH_PASS } = process.env;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});

export const verfiyUserEmail = async (receiver: string, verifyLink: string) => {
  await transport.sendMail({
    from: `"Food delivery" ${AUTH_EMAIL}`,
    to: receiver,
    subject: "Verify user",
    html: `<div style=" width: 250px; height: 250px; border-radius: 6px; background-color: gray;">
    <a href="${verifyLink}" target="_blank" style="font-size: 20px; color:black"></a>
    </div>
    `,
  });
};
