import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN as string;

export const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Victor",
};
