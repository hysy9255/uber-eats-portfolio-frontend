import React from "react";

type ReviewCardProps = {
  dishImgUrl?: string;
  review: string;
  star: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  dishImgUrl,
  review,
  star,
}) => {
  return (
    <div className="border border-gray-200 flex gap-2 p-3 bg-white rounded-md shadow-lg">
      <img className="w-20 h-20 object-cover rounded-md" src={dishImgUrl} />
      <div className="w-80">
        <div>{review}</div>
        <div>{star}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
