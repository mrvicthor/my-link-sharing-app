import resend from "../config/resend";
import nodemailer from "nodemailer";
import {
  EMAIL_SENDER,
  GMAIL_ACCT,
  GMAIL_PASS,
  NODE_ENV,
} from "../constants/env";

type MailProps = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};
// export const sendMail = async ({ to, subject, text, html }: MailProps) => {
//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: "delivered@resend.dev",
//     subject,
//     text,
//     html,
//   });
// };

export const getFromEmail = () =>
  NODE_ENV === "development" ? "onboarding@resend.dev" : EMAIL_SENDER;

export const getToEmail = (to: string) =>
  NODE_ENV === "development" ? "victoreleanya07@gmail.com" : to;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_ACCT,
    pass: GMAIL_PASS,
  },
});
