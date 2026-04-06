import type { OwnerOnBoardingStep3Form } from "../formDataTypes/onBoarding/ownerOnBoardingForms.type";

// ---- 유틸: 주소/영업시간 포매팅
export function formatAddress(step3: OwnerOnBoardingStep3Form) {
  const line1 = [step3.streetAddress, step3.unit].filter(Boolean).join(", ");
  const line2 = [step3.city, step3.state, step3.zip].filter(Boolean).join(", ");
  return [line1, line2].filter(Boolean).join(" • ");
}
