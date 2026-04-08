import { useNavigate } from "react-router-dom";
import { clearDraft, loadDraft } from "../utils/localDraft";
import type { OwnerOnBoardingForm } from "../components/Layout/OwnerOnBoardLayout";
import { defaultHours } from "../pages/types/OwnerOnBoardingStep3Location.type";
import { OrderType } from "../constants/OrderType";
import { useState } from "react";
import { registerOwner } from "../api/registrationApi";
import type { RegisterOwnerForm } from "../formDataTypes/register/registerOwnerForm.type";
import { UserRole } from "../constants/UserRoleEnum";

export const useOwnerStep5Review = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const onBack = () => {
    navigate("/on-board/owner/step4");
  };

  const data = loadDraft<OwnerOnBoardingForm>("ownerAccount", {
    step1: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      profileImgUrl: "",
    },
    step2: {
      logoImgUrl: "",
      lbn: "",
      dba: "",
      cuisineType: "",
      storePhone: "",
      businessEmail: "",
      website: "",
      instagram: "",
      mainImgUrl: "",
      sub1ImgUrl: "",
      sub2ImgUrl: "",
      bannerImgUrl: "",
    },
    step3: {
      streetAddress: "",
      unit: "",
      city: "",
      state: "",
      zip: "",
      hours: defaultHours,
      deliveryRadius: 1,
      prepTime: 10,
      orderType: OrderType.DeliveryAndPickup,
    },
    step4: {
      items: [],
    },
  });

  const handleCreateOwnerSubmit = async (data: RegisterOwnerForm) => {
    try {
      await registerOwner(data);
      clearDraft("ownerAccount");
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  const onContinue = () => {
    handleCreateOwnerSubmit({
      user: {
        ...data.step1,
        role: UserRole.Owner,
      },
      restaurant: {
        restaurantSummary: {
          generalInfo: {
            logo: data.step2.logoImgUrl,
            lbn: data.step2.lbn,
            dba: data.step2.dba,
            cuisineType: data.step2.cuisineType,
            storePhone: data.step2.storePhone,
            businessEmail: data.step2.businessEmail,
            website: data.step2.website,
            instagram: data.step2.instagram,
            mainImgUrl: data.step2.mainImgUrl,
            sub1ImgUrl: data.step2.sub1ImgUrl,
            sub2ImgUrl: data.step2.sub2ImgUrl,
            bannerImgUrl: data.step2.bannerImgUrl,
            deliveryRadius: data.step3.deliveryRadius,
            prepTime: data.step3.prepTime,
            orderType: data.step3.orderType,
          },
          address: {
            streetAddress: data.step3.streetAddress,
            unit: data.step3.unit,
            state: data.step3.state,
            city: data.step3.city,
            zip: data.step3.zip,
          },
          operatingHours: {
            Mon: data.step3.hours.Mon,
            Tue: data.step3.hours.Tue,
            Wed: data.step3.hours.Wed,
            Thu: data.step3.hours.Thu,
            Fri: data.step3.hours.Fri,
            Sat: data.step3.hours.Sat,
            Sun: data.step3.hours.Sun,
          },
        },
        dishes: data.step4.items.map((item) => ({
          name: item.name,
          price: parseFloat(item.price),
          category: item.category,
          description: item.description,
          dishImgUrl: item.imagePreview,
        })),
      },
    });
  };

  return {
    data,
    onBack,
    showSuccess,
    onContinue,
  };
};
