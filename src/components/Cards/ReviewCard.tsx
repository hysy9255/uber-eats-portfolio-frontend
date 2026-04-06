import React from "react";
import StarRating from "../StarRating";

type ReviewCardProps = {
  dishImgUrl?: string;
  review: string;
  rating: number;
  userName: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  dishImgUrl,
  review,
  rating,
  userName,
}) => {
  return (
    <div className="border border-gray-200 flex gap-2 p-3 bg-white rounded-md shadow-lg">
      <img className="w-20 h-20 object-cover rounded-md" src={dishImgUrl} />
      <div className="w-full">
        <div className="flex justify-between">
          <div className="text-xs text-gray-700">{userName}</div>
          <div className="text-xs text-gray-500">2026.02.23</div>
        </div>

        <div className="text-xs text-gray-700">{review}</div>
        <StarRating rating={rating} size={15} />
      </div>
    </div>
  );
};

export default ReviewCard;
