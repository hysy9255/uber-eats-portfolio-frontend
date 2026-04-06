import { useEffect } from "react";
import { socket } from "./socket";

export default function SocketBootstrap() {
  useEffect(() => {
    socket.connect();

    const onConnect = () => {
      console.log("socket connected:", socket.id);
    };

    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
      socket.disconnect();
    };
  }, []);

  return null;
}
