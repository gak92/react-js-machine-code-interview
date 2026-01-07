import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { type StepFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import { Card, CardContent, CardHeader } from "./ui/card";
import ProgressSteps from "./ProgressSteps";
import {
  BillingInfoStep,
  PersonalInfoStep,
  ProfessionalInfoStep,
} from "./steps";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

function MultiStepForm() {
  // custom hook
  const {
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
  } = useMultiStepForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    reset,
  } = useForm<StepFormData>({
    resolver: zodResolver(getCurrentStepSchema()),
    mode: "onChange",
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [currentStep, formData, reset]);

  const onNext = async (data: StepFormData) => {
    // manual validation check
    const isValid = await trigger();
    if (!isValid) return; // stop if validation fails
    console.log("Validated Data", data, formData);

    const updatedData = { ...formData, ...data };
    updateFormData(updatedData);

    // merge current step data with all previous steps data
    if (!isLastStep) {
      goToNextStep();
    } else {
      try {
        submitForm(updatedData);
      } catch (error) {
        console.error("Form submission failed", error);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <ProgressSteps steps={steps} currentStep={currentStep} />
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 0 && (
              <PersonalInfoStep register={register} errors={errors} />
            )}
            {currentStep === 1 && (
              <ProfessionalInfoStep
                register={register}
                errors={errors}
                setValue={setValue}
              />
            )}
            {currentStep === 2 && (
              <BillingInfoStep register={register} errors={errors} />
            )}
          </CardContent>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant={"outline"}
              onClick={goToPreviousStep}
              disabled={isFirstStep}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              type="button"
              variant={"default"}
              onClick={handleSubmit(onNext)}
            >
              {isLastStep ? "Submit" : "Next"}
              {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

export default MultiStepForm;
