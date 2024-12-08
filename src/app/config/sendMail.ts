import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate";
import { mailTrapClient, sender } from "./mailtrap";

export const sendVerificationEmail = async (email: string, url: string) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replaceAll("{{VERIFICATION_URL}}", url),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(error);
    throw new Error(
      `Error sending verification email: `,
      error as ErrorOptions
    );
  }
};
