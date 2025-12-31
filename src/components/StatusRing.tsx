type OrderStatus = "Pending" | "Cooking" | "Delivering" | "Delivered";

const STATUS_COLOR: Record<OrderStatus, string> = {
  Pending: "#F59E0B", // amber
  Cooking: "#3B82F6", // blue
  Delivering: "#6366F1", // indigo
  Delivered: "#10B981", // green
};

type Props = {
  current: number; // e.g. 1
  total: number; // e.g. 4
  status: OrderStatus;
  size?: number; // px
  stroke?: number; // px
};

export function StatusRing({
  current,
  total,
  status,
  size = 44,
  stroke = 5,
}: Props) {
  const clampedTotal = Math.max(1, total);
  const clampedCurrent = Math.min(Math.max(0, current), clampedTotal);

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  const progress = clampedCurrent / clampedTotal; // 0..1
  const dash = c * progress;
  const gap = c - dash;

  return (
    <div
      className="inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#E5E7EB" // gray-200
          strokeWidth={stroke}
        />
        {/* progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={STATUS_COLOR[status]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
        />
      </svg>

      {/* center label */}
      <div className="absolute text-[12px] font-semibold text-gray-800">
        {clampedCurrent}/{clampedTotal}
      </div>
    </div>
  );
}
