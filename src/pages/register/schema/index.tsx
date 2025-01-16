import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "parolebi ar emTxveva",
    path: ["confirm_password"],
  });
