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

// export const verfiyUserEmail = async (receiver: string, verifyLink: string) => {
//   await transport.sendMail({
//     from: `"Food Delivery" ${AUTH_EMAIL}`,
//     to: receiver,
//     subject: "Verify user",
//     html: `<div style=" width: 250px; height: 250px; border-radius: 6px; background-color: gray;">
//     <a href="${verifyLink}" target="_blank" style="font-size: 20px; color:black"></a>
//     </div>
//     `,
//   });
// };
export const verfiyUserEmail = async (receiver: string, verifyLink: string) => {
  try {
    await transport.sendMail({
      from: `"Food Delivery" <${AUTH_EMAIL}>`,
      to: receiver,
      subject: "Verify user",
      html: `
      <div style="width: 300px; padding: 20px; border-radius: 8px; background-color: #f3f4f6; text-align: center; font-family: sans-serif;">
        <h2 style="color: #333;">И-мэйл баталгаажуулалт</h2>
        <p style="color: #666;">Доорх товч дээр дарж бүртгэлээ идэвхжүүлнэ үү:</p>
        <a href="${verifyLink}" target="_blank" 
           style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
           ЭНД ДАРЖ БАТАЛГААЖУУЛАХ
        </a>
      </div>
      `,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Nodemailer error:", error);
    throw error; // Ингэснээр controller дээр 500 алдаа яг юунаас болсныг харж болно
  }
};
