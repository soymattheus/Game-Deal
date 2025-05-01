import { Star, StarHalf, StarOff } from 'lucide-react';

interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  const normalized = Math.max(0, Math.min(10, rating));
  const stars = Math.round(normalized) / 2;
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-500" title={`${rating} out of 10`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={20} fill="currentColor" stroke="none" />
      ))}
      {hasHalfStar && <StarHalf size={20} />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOff key={`empty-${i}`} size={20} />
      ))}
    </div>
  );
}
