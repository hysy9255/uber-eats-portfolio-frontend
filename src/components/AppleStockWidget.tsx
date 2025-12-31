import { useEffect, useRef } from "react";

const AppleStockWidget = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: "NASDAQ:AAPL",
      width: "100%",
      height: 220,
      locale: "en",
      dateRange: "1M",
      colorTheme: "light",
      isTransparent: false,
      autosize: true,
      largeChartUrl: "",
    });

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full rounded-md border border-gray-300 bg-white p-3">
      <div className="tradingview-widget-container" ref={containerRef} />
    </div>
  );
};

export default AppleStockWidget;
