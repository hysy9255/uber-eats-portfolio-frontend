import { io } from "socket.io-client";
import { API_BASE_URL } from "./api/baseUrl";

// export const socket = io("http://localhost:3002", {
//   autoConnect: false,
//   transports: ["websocket"],
// });

export const socket = io(`${API_BASE_URL}`, {
  withCredentials: true,
  // autoConnect: false,
  // transports: ["websocket"],
});
