import { z } from "zod";

const getCurrentDate = () => {
  const today = new Date();

  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["M", "F"]).optional(),
  dateOfBirth: z.string().optional().refine(
    (date) => {
      if (!date) return true;
      const inputDate = new Date(date);
      const maxDate = new Date(getCurrentDate());
      // 設置時間為午夜以確保純日期比較
      inputDate.setHours(0, 0, 0, 0);
      maxDate.setHours(0, 0, 0, 0);
      return inputDate <= maxDate;
    },
    { message: "Date cannot be later than today" }
  ),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().optional()
    .refine(
      (phone) => {
        if (!phone) return true;
        return /^\+852\d{8}$/.test(phone);
      },
      { message: "Phone number must start with +852 followed by 8 digits" }
    ),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => data.email || data.phone, {
  message: "Either email or phone number is required",
  path: ["email"],
});

export type UserFormData = z.infer<typeof userSchema>;