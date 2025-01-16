import { z } from "zod";

export const AddReviewsSchema = z.object({
  comment: z.string().min(20),
});
