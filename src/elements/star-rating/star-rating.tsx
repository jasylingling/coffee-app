'use client';

import { FC, useState } from 'react';
import { CiCoffeeBean } from 'react-icons/ci';
import { BiSolidCoffeeBean } from 'react-icons/bi';

const StarRating: FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => setRating(currentRating)}
              className="hidden"
            />
            <span className="cursor-pointer" onMouseEnter={() => setHover(currentRating)} onMouseLeave={() => setHover(0)}>
              {currentRating <= (hover || rating) ? (
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
