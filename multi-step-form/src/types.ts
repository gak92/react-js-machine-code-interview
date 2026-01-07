import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Invalid email"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters long"),
});

export const professionalInfoSchema = z.object({
  company: z.string().min(2, "Company name must be at least 2 characters long"),
  position: z.string().min(2, "Position must be at least 2 characters long"),
  experience: z.enum(["0-2 years", "2-5 years", "5-10 years", "10+ years"]),
  industry: z.string().min(2, "Industry must be at least 2 characters long"),
});

export const billingInfoSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be at least 16 characters long")
    .max(16, "Card number must be at most 16 characters long"),
  cardHolderName: z
    .string()
    .min(2, "Card holder name must be at least 2 characters long"),
  cardExpirationDate: z
    .string()
    .min(5, "Card expiration date must be at least 5 characters long"),
  cardCvv: z
    .string()
    .min(3, "Card CVV must be at least 3 characters long")
    .max(4, "Card CVV must be at most 4 characters long"),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type ProfessionalInfo = z.infer<typeof professionalInfoSchema>;
export type BillingInfo = z.infer<typeof billingInfoSchema>;

export type StepFormData = PersonalInfo | ProfessionalInfo | BillingInfo;

export type AllFormData = PersonalInfo & ProfessionalInfo & BillingInfo;

export interface Step {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}
