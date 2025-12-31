// import TimeSelect from "./TimeSelect";
// import { CLOSE_TIME_OPTIONS, OPEN_TIME_OPTIONS } from "../utils/timeOptions";
// import { useFormContext, useWatch } from "react-hook-form";
// import type {
//   Day,
//   IOwnerOnBoardingStep3Form,
// } from "../pages/types/OwnerOnBoardingStep3Location.type";

// export const DayHoursRow = ({ day }: { day: Day }) => {
//   const {
//     register,
//     setValue,
//     formState: { errors },
//   } = useFormContext<IOwnerOnBoardingStep3Form>();

//   const open24 = useWatch({
//     name: `hours.${day}.open24`,
//   });
//   const closed = useWatch({
//     name: `hours.${day}.closed`,
//   });

//   const open24Field = register(`hours.${day}.open24`);
//   const closedField = register(`hours.${day}.closed`);

//   const disabled = open24 || closed;

//   const baseKey = `${day}-${open24 ? "o24" : ""}${closed ? "cl" : ""}`;

//   return (
//     <>
//       <div className="md:col-span-1 text-slate-600">{day}</div>

//       {/* Open */}
//       <div className="md:col-span-3">
//         <TimeSelect
//           name={`hours.${day}.open`}
//           placeholder="Open time"
//           disabled={disabled}
//           options={OPEN_TIME_OPTIONS}
//           selectKey={`${baseKey}-open`}
//           rules={{
//             validate: (v) => open24 || closed || !!v || "Open time is required",
//           }}
//         />
//         {errors.hours?.[day]?.open?.message && (
//           <p className="mt-1 text-xs text-red-500">
//             {errors.hours[day]!.open!.message as string}
//           </p>
//         )}
//       </div>
//       <div className="md:col-span-3">
//         {/* Close */}
//         <div className="md:col-span-3">
//           <TimeSelect
//             name={`hours.${day}.close`}
//             placeholder="Close time"
//             disabled={disabled}
//             options={CLOSE_TIME_OPTIONS}
//             selectKey={`${baseKey}-close`}
//             rules={{
//               validate: (v) =>
//                 open24 || closed || !!v || "Close time is required",
//             }}
//           />
//           {errors.hours?.[day]?.close?.message && (
//             <p className="mt-1 text-xs text-red-500">
//               {errors.hours[day]!.close!.message as string}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="md:col-span-2 flex items-center gap-3 justify-center">
//         <label className="inline-flex items-center gap-2 text-xs">
//           <input
//             type="checkbox"
//             {...open24Field}
//             checked={open24}
//             onChange={(e) => {
//               const v = e.target.checked;
//               setValue(`hours.${day}.open24`, v, {
//                 shouldValidate: true,
//                 shouldDirty: true,
//               });

//               if (v) {
//                 setValue(`hours.${day}.closed`, false, {
//                   shouldValidate: true,
//                 });
//                 setValue(`hours.${day}.open`, "00:00", {
//                   shouldValidate: true,
//                 });
//                 setValue(`hours.${day}.close`, "24:00", {
//                   shouldValidate: true,
//                 });
//               } else {
//                 // 끌 때: 사용자가 다시 고르게 비워주기
//                 setValue(`hours.${day}.open`, "", { shouldValidate: true });
//                 setValue(`hours.${day}.close`, "", { shouldValidate: true });
//               }
//             }}
//           />
//           Open 24 hours
//         </label>

//         <label className="inline-flex items-center gap-2 text-xs">
//           <input
//             type="checkbox"
//             {...closedField}
//             checked={closed}
//             onChange={(e) => {
//               const v = e.target.checked;
//               setValue(`hours.${day}.closed`, v, {
//                 shouldValidate: true,
//                 shouldDirty: true,
//               });

//               if (v) {
//                 setValue(`hours.${day}.open24`, false, {
//                   shouldValidate: true,
//                 });
//                 setValue(`hours.${day}.open`, "closed", {
//                   shouldValidate: true,
//                 });
//                 setValue(`hours.${day}.close`, "closed", {
//                   shouldValidate: true,
//                 });
//               } else {
//                 // 끌 때: 사용자가 다시 고르게 비워주기
//                 setValue(`hours.${day}.open`, "", { shouldValidate: true });
//                 setValue(`hours.${day}.close`, "", { shouldValidate: true });
//               }
//             }}
//           />
//           Closed
//         </label>
//       </div>
//     </>
//   );
// };
