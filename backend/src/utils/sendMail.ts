import resend from "../config/resend";
import { EMAIL_SENDER, NODE_ENV } from "../constants/env";

type MailProps = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};
export const sendMail = async ({ to, subject, text, html }: MailProps) =>
  await resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  });

export const getFromEmail = () =>
  NODE_ENV === "development" ? "onboarding@resend.dev" : EMAIL_SENDER;

export const getToEmail = (to: string) =>
  NODE_ENV === "development" ? "delivered@resend.dev" : to;
