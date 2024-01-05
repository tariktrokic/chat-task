import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import * as bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password } = data;
  const userEmail = email.trim().toLowerCase();

  if (!userEmail || !userEmail.includes("@")) {
    res.status(422).json({ message: "Invalid email" });
    return;
  }

  if (!password || password.length < 7) {
    res.status(422).json({
      message: "Password should be at least 7 characters long",
    });
    return;
  }

  const existingUser = await db.user.findFirst({
    where: {
      email: userEmail,
    },
  });

  if (existingUser) {
    const message: string =
      existingUser.email !== userEmail
        ? "Username already taken"
        : "Email address is already registered";

    return res.status(409).json({ message: message });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await db.user.create({
    data: {
      email: userEmail,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "Created user" });
}
