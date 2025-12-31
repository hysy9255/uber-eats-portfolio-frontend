export interface ICreateCustomer {
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  profileImgUrl: string | null;
  deliveryAddress: string;
  phoneNumber: string;
}

export const CustomerStep3RightPanel = (
  <div>
    <p className="text-sm font-medium text-slate-700">What happens next</p>
    <ul className="mt-3 space-y-2 text-sm text-slate-600">
      <li>• You can edit these details anytime from your profile</li>
      <li>• We’ll suggest nearby restaurants based on your address</li>
    </ul>
    <div className="mt-5 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-600">
      Tip: Turn on notifications to get order updates in real time.
    </div>
  </div>
);
