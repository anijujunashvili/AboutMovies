import { z } from "zod";

export const UserFormSchema = z.object({
  email: z.string().email(),
  name_ka: z.string().min(6),
  name_en: z.string().min(6),
  phone: z.string().min(6),
});
