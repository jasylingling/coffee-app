'use client';

import { FC, useState } from 'react';
import { CiCoffeeBean } from 'react-icons/ci';
import { BiSolidCoffeeBean } from 'react-icons/bi';

type StarRatingProps = {
  rating: number;
  onRatingChange?: (rating: number) => void;
};

const StarRating: FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [ratingCount, setRatingCount] = useState(rating);
  const [hover, setHover] = useState(0);

  return (
    <>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              defaultChecked={currentRating === ratingCount}
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => {
                const newRating = currentRating === ratingCount ? 0 : currentRating;
                setRatingCount(newRating);
                onRatingChange && onRatingChange(newRating);
              }}
              className="hidden"
            />
            <span className="cursor-pointer" onMouseEnter={() => setHover(currentRating)} onMouseLeave={() => setHover(0)}>
              {currentRating <= (hover || ratingCount) ? (
                <BiSolidCoffeeBean size={24} />
              ) : (
                <CiCoffeeBean size={24} className="stroke-[0.5px]" />
              )}
            </span>
          </label>
        );
      })}
    </>
  );
};

export default StarRating;
