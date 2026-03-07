import { JSX, useState } from "react";

export function useMultiStep({
  stepsComponents,
}: {
  stepsComponents: JSX.Element[];
}) {
  const [curOpenStep, setCurOpenStep] = useState(0);

  const stepsNumber = stepsComponents.length;
  const curStepComponent = stepsComponents[curOpenStep];
  const isFirstStep = curOpenStep === 0;
  const isLastStep = stepsNumber - 1 === curOpenStep;
  const handleGoNext = () =>
    setCurOpenStep((cur) => (isLastStep ? cur : cur + 1));
  const handleGoPrev = () =>
    setCurOpenStep((cur) => (isFirstStep ? cur : cur - 1));
  const handleGoToStep = (stepNumber: number) => {
    if (stepNumber < 0) stepNumber = 0;
    else if (stepNumber > stepsNumber) stepNumber = stepsNumber;
    setCurOpenStep(stepNumber);
  };

  return {
    curStep: curOpenStep,
    curStepComponent,
    isFirstStep,
    isLastStep,
    handleGoNext,
    handleGoPrev,
    handleGoToStep,
  };
}
