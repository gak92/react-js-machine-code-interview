import { useState } from "react";
import {
  billingInfoSchema,
  personalInfoSchema,
  professionalInfoSchema,
  type Step,
  type StepFormData,
} from "@/types";
import { User, Briefcase, CreditCard } from "lucide-react";

const stepSchemas = [
  personalInfoSchema,
  professionalInfoSchema,
  billingInfoSchema,
];

export const steps: Step[] = [
  { id: "personal", name: "Personal Info", icon: User },
  { id: "professional", name: "Professional Info", icon: Briefcase },
  { id: "billing", name: "Billing Info", icon: CreditCard },
];

export function useMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<StepFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const getCurrentStepSchema = () => stepSchemas[currentStep];

  const goToNextStep = () => {
    if (!isLastStep) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  // Merge and update form data
  const updateFormData = (newData: Partial<StepFormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  // handle Final form submission
  const submitForm = (data: StepFormData) => {
    console.log("Final Form Data", data);
    setIsSubmitted(true);
  };

  // reset form
  const resetForm = () => {
    setCurrentStep(0);
    setFormData({});
    setIsSubmitted(false);
  };

  return {
    currentStep,
    formData,
    isFirstStep,
    isLastStep,
    isSubmitted,
    steps,
    goToNextStep,
    goToPreviousStep,
    updateFormData,
    submitForm,
    resetForm,
    getCurrentStepSchema,
  };
}
