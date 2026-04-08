import React from "react";
import { v4 as uuidv4 } from "uuid";

type StarRatingProps = {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
  fillColor?: string;
  emptyStrokeColor?: string;
  showText?: boolean;
};

type SingleStarProps = {
  fillPercent: number; // 0 ~ 100
  size: number;
  fillColor: string;
  emptyStrokeColor: string;
  id: string;
};

const STAR_PATH =
  "M12 2.75l2.84 5.76 6.36.92-4.6 4.48 1.09 6.33L12 17.27 6.31 20.24l1.09-6.33-4.6-4.48 6.36-.92L12 2.75z";

const SingleStar: React.FC<SingleStarProps> = ({
  fillPercent,
  size,
  fillColor,
  emptyStrokeColor,
  id,
}) => {
  const safeFill = Math.max(0, Math.min(fillPercent, 100));

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset={`${safeFill}%`} stopColor={fillColor} />
          <stop offset={`${safeFill}%`} stopColor="white" />
        </linearGradient>
      </defs>

      {/* 채움 */}
      <path d={STAR_PATH} fill={`url(#${id})`} />

      {/* 외곽선 */}
      <path
        d={STAR_PATH}
        fill="none"
        stroke={emptyStrokeColor}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  max = 5,
  size = 20,
  className = "",
  fillColor = "black",
  //   emptyStrokeColor = "#d1d5db",
  emptyStrokeColor = "#636569",
  showText = false,
}) => {
  const safeRating = Math.max(0, Math.min(rating, max));
  const id = uuidv4();

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="inline-flex">
        {Array.from({ length: max }).map((_, index) => {
          const diff = safeRating - index;

          let fillPercent = 0;
          if (diff >= 1) fillPercent = 100;
          else if (diff > 0) fillPercent = diff * 100;

          return (
            <SingleStar
              key={index}
              id={`star-fill-${index}-${safeRating}-${id}`}
              fillPercent={fillPercent}
              size={size}
              fillColor={fillColor}
              emptyStrokeColor={emptyStrokeColor}
            />
          );
        })}
      </div>

      {showText && (
        <span className="text-sm text-gray-700">({safeRating.toFixed(1)})</span>
      )}
    </div>
  );
};

export default StarRating;
