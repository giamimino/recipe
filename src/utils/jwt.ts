import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export function generateEmailToken(email: string) {
  return jwt.sign({ email }, secret, { expiresIn: "10m" });
}

export function verifyEmailToken(token: string) {
  try {
    return jwt.verify(token, secret) as { email: string };
  } catch {
    return null;
  }
}