import { useState } from "react";
import InvestmentAmountStep from "./steps/InvestmentAmountStep.jsx";

export default function App() {
  const [step, setStep] = useState(6);
  return (
    <InvestmentAmountStep
      currentStep={step}
      totalSteps={8}
      initialAmount={25000}
      minAmount={1000}
      presets={[5000, 10000, 25000, 50000]}
      onBack={() => setStep((s) => Math.max(1, s - 1))}
      onNext={(amount) => {
        console.log("Selected amount:", amount);
        setStep((s) => Math.min(8, s + 1));
      }}
    />
  );
}
