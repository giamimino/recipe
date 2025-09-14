"use server"
import { Resend } from 'resend';

export async function send(email: string, verifyUrl: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: 'noreply@greenmindmail.shop',
    to: email,
    subject: 'Recipe app verify',
    html: `<h1>${verifyUrl}</h1><p>Expires in 15 minutes</p>`,
  });

  if (error) {
    console.error("Failed to send email:", error);
    return { success: false, message: "Email not sent" };
  }

  return { success: true, message: "Verification email sent" };
}