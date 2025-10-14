// components/ReviewCard.tsx
import { Star, User } from "lucide-react";
import React from "react";

// Mock Review interface
interface Review {
  id: number;
  rating: number;
  title: string;
  body: string;
  reviewerName: string;
  reviewerAvatar: string;
  date: string;
  destinationName: string;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const golden = "#D4A853";

  return (
    <div className="bg-[#1A2E4C] rounded-xl p-6 shadow-lg border border-gray-700">
      <div className="flex items-center mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className="h-5 w-5"
            style={{
              color: golden,
              fill: i < review.rating ? golden : "transparent",
            }}
          />
        ))}
        <span className="ml-2 text-white font-semibold">
          {review.rating.toFixed(1)}
        </span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{review.title}</h3>
      <p className="text-gray-400 mb-4 line-clamp-3">{review.body}</p>

      <div className="flex items-center space-x-3 border-t border-gray-700 pt-4">
        <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center">
          {review.reviewerAvatar ? (
            <User className="h-5 w-5 text-gray-300" />
          ) : (
            <User className="h-5 w-5 text-gray-300" />
          )}
        </div>
        <div>
          <p className="text-white font-medium">{review.reviewerName}</p>
          <p className="text-xs text-gray-500">
            {review.date} - {review.destinationName}
          </p>
        </div>
      </div>
    </div>
  );
}
