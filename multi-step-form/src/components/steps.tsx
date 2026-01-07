import { CardTitle } from "./ui/card";
import FormField from "./FormField";
import { useForm } from "react-hook-form";
import type { StepFormData } from "@/types";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

interface StepProps {
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  errors: Record<string, { message?: string }>;
  setValue?: ReturnType<typeof useForm<StepFormData>>["setValue"];
}

function PersonalInfoStep({ register, errors }: StepProps) {
  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">Personal Information</CardTitle>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="firstName"
          label="First Name"
          register={register}
          errors={errors}
        />
        <FormField
          id="lastName"
          label="Last Name"
          register={register}
          errors={errors}
        />
      </div>
      <FormField
        id="email"
        label="Email"
        register={register}
        errors={errors}
        type="email"
      />
      <FormField
        id="phoneNumber"
        label="Phone Number"
        register={register}
        errors={errors}
        type="tel"
      />
    </div>
  );
}

function ProfessionalInfoStep({ register, errors, setValue }: StepProps) {
  const [experience, setExperience] = useState<string>("");

  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">Professional Information</CardTitle>
      <FormField
        id="company"
        label="Company"
        register={register}
        errors={errors}
      />
      <FormField
        id="position"
        label="Position"
        register={register}
        errors={errors}
      />
      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience</Label>
        <Select
          onValueChange={(value) => {
            setValue?.(
              "experience",
              value as Extract<
                StepFormData,
                { experience: string }
              >["experience"],
              { shouldValidate: true }
            );
            setExperience(value);
          }}
          value={experience}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Experience</SelectLabel>
              <SelectItem value="0-2 years">0-2 years</SelectItem>
              <SelectItem value="2-5 years">2-5 years</SelectItem>
              <SelectItem value="5-10 years">5-10 years</SelectItem>
              <SelectItem value="10+ years">10+ years</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.experience && (
          <p className="text-sm text-destructive">
            {errors.experience.message}
          </p>
        )}
      </div>
      <FormField
        id="industry"
        label="Industry"
        register={register}
        errors={errors}
      />
    </div>
  );
}

function BillingInfoStep({ register, errors }: StepProps) {
  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">Billing Information</CardTitle>

      <FormField
        id="cardNumber"
        label="Card Number"
        register={register}
        errors={errors}
        maxLength={16}
      />
      <FormField
        id="cardHolderName"
        label="Card Holder Name"
        register={register}
        errors={errors}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="cardExpirationDate"
          label="Card Expiration Date"
          register={register}
          errors={errors}
          maxLength={5}
        />
        <FormField
          id="cardCvv"
          label="Card CVV"
          register={register}
          errors={errors}
          maxLength={4}
        />
      </div>
    </div>
  );
}

export { PersonalInfoStep, ProfessionalInfoStep, BillingInfoStep };
