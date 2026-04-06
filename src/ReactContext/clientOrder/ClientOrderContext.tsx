import { createContext } from "react";
import type { GetOrderForClientDTO } from "../../dto/GetOrderForClient.dto";

type ClientOrderContextValue = {
  order?: GetOrderForClientDTO;
};

export const ClientOrderContext = createContext<ClientOrderContextValue | null>(
  null
);
