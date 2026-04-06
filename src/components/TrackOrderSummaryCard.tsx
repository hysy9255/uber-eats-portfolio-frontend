import type { GetOrderForClientDTO } from "../dto/GetOrderForClient.dto";
import DefaultProfileImg from "./Images/DefaultProfileImg/DefaultProfileImg";
import EmbedMapIframe from "./EmbedMapIframe";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";

interface TrackOrderSummaryCardProps {
  order?: GetOrderForClientDTO;
}

const TrackOrderSummaryCard: React.FC<TrackOrderSummaryCardProps> = ({
  order,
}) => {
  const navigate = useNavigate();

  if (!order) return;

  return (
    <Fragment>
      <div className=" border-gray-500 border rounded-md">
        <EmbedMapIframe
          address={`
            ${order.deliveryAddressInfo?.streetAddress} ${order.deliveryAddressInfo?.apt} ${order.deliveryAddressInfo?.city} ${order.deliveryAddressInfo?.state} ${order.deliveryAddressInfo?.zip}
          `}
        />
      </div>

      <section className="p-3 space-y-5 border border-gray-500 rounded-md">
        <article>
          <div className="font-semibold text-black/80 text-lg">
            Arriving in {order?.restaurantInfo.eta} -{" "}
            {order?.restaurantInfo.eta + 10} mins
          </div>
          <div className="text-gray-700 text-sm">
            Tom is heading to BBQ House to pick up your order.
          </div>
        </article>

        <article className="border border-gray-500 rounded-md p-3 flex items-center gap-3">
          <DefaultProfileImg className="w-10 h-10 border border-gray-400 rounded-full" />
          <div>
            <div className="font-semibold text-black/80 text-lg">Tom</div>
            <div className="text-gray-700 text-sm">Toyota Prius</div>
          </div>
        </article>

        <article>
          <div>Order #{order.orderInfo.orderId.split("-")[0]}</div>
          <div className="py-5 border-b border-slate-300">
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div className="grid grid-cols-[1fr_auto] gap-x-2">
                  <div className="">{item.quantity}x</div>
                  <div className="">{item.name}</div>
                </div>
                <div>$ {item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xl font-semibold text-black/80 pt-3">
            <div>Total: </div>
            <div>$ 29.00</div>
          </div>
        </article>
        <article className="space-x-2">
          <button className="py-2 px-7 bg-green-600 text-white rounded-md hover:cursor-pointer text-sm">
            Call Driver
          </button>
          <button
            onClick={() => navigate("/client/restaurants")}
            className="py-2 px-7 border border-slate-300 text-black/70 rounded-md hover:cursor-pointer text-sm"
          >
            Back to Home
          </button>
        </article>
      </section>
    </Fragment>
  );
};

export default TrackOrderSummaryCard;
