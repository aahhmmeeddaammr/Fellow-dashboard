import z from "zod";
export const loginSchema = z.strictObject({
  email: z.email("Invalid email format"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{6,}$/,
      "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});
export type loginFormType = z.infer<typeof loginSchema>;
