import type { OperatingHours } from "../pages/RestaurantPage";
import {
  DAYS,
  type Day,
  type DayHours,
} from "../pages/types/OwnerOnBoardingStep3Location.type";

export const transformOperatingHoursToRecord = (
  hoursArray: OperatingHours[]
): Record<Day, DayHours> => {
  // 1. 초기값 정의: 모든 요일에 대한 기본 '닫힘' 상태를 가진 Map 생성
  // 이렇게 하면, hoursArray에 데이터가 없는 요일도 기본값이 보장됩니다.
  const hoursMap = new Map<Day, DayHours>(
    DAYS.map((day) => {
      return [day, { open: "", close: "", open24: false, closed: true }];
    })
  );

  // 2. 서버 데이터를 순회하며 Map의 값 업데이트 (Map 사용)
  hoursArray.forEach((hour) => {
    const day = hour.dayOfWeek as Day;

    // Day 타입에 정의된 요일만 처리
    if (DAYS.includes(day)) {
      hoursMap.set(day, {
        open: hour.openTime,
        close: hour.closeTime,
        open24: hour.open24Hours,
        closed: hour.closed,
      });
    }
  });

  // 3. Map을 Object.fromEntries()를 사용하여 최종 객체로 변환
  // Map의 [키, 값] 쌍을 객체로 변환하는 가장 깔끔하고 쉬운 방법입니다.
  const result = Object.fromEntries(hoursMap.entries()) as Record<
    Day,
    DayHours
  >;

  return result;
};
