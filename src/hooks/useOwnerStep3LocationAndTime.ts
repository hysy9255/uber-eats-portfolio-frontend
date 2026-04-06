import { useEffect } from "react";
import type { OwnerOnBoardingForm } from "../components/Layout/OwnerOnBoardLayout";
import { saveDraft } from "../utils/localDraft";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import type { Day } from "../pages/types/OwnerOnBoardingStep3Location.type";

export const useOwnerStep3LocationAndTime = () => {
  const navigate = useNavigate();

  const { register } = useFormContext<OwnerOnBoardingForm>();

  const onBack = () => {
    navigate("/on-board/owner/step2");
  };

  const onContinue = (data: OwnerOnBoardingForm) => {
    saveDraft("ownerAccount", data);
    navigate("/on-board/owner/step4");
  };

  useEffect(() => {
    register("step3.hours", {
      validate: (hours) => {
        for (const day of Object.keys(hours) as Day[]) {
          const h = hours[day];

          if (h.closed || h.open24) continue;

          if (!h.open || !h.close)
            return "Please set opening and closing hours";
        }
        return true;
      },
    });
  }, [register]);

  return {
    onBack,
    onContinue,
  };
};
