const Bill = () => {
  return (
    <div className=" w-full p-3 rounded-lg flex flex-col gap-y-3 sticky top-30 bg-white border border-gray-100 shadow-md">
      <div className="text-2xl font-bold ">Your cart</div>
      <div className="">3 items</div>
      <div className="">
        <div className="flex gap-3 justify-between">
          <div>Boat Noodles</div>
          <div>11.80</div>
        </div>
        <div className="flex gap-3 justify-between">
          <div>Pad Thaid</div>
          <div>16.80</div>
        </div>
        <div className="flex gap-3 justify-between">
          <div>Boat Noodles</div>
          <div>11.80</div>
        </div>
      </div>

      <div className="flex gap-3 justify-between">
        <div>Subtotal</div>
        <div>$40.43</div>
      </div>

      <div className="">
        <div className="bg-black text-gray-200 py-3 rounded-md flex items-center justify-center">
          Checkout
        </div>
      </div>
    </div>
  );
};

export default Bill;
