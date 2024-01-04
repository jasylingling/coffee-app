'use client';

import { FC, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import clsx from 'clsx';

type FavoriteHeartProps = {
  outline?: boolean;
};

const FavoriteHeart: FC<FavoriteHeartProps> = ({ outline }) => {
  const [favorite, setFavorite] = useState(false);

  return (
    <>
      <button
        onClick={() => setFavorite(!favorite)}
        className={clsx('text-red-fav', {
          'rounded-full bg-white bg-opacity-50 p-2': outline,
        })}
      >
        {!favorite ? (
          <FaRegHeart size={24} className="hover:opacity-80" />
        ) : (
          <FaHeart size={24} className="hover:opacity-80" />
        )}
      </button>
    </>
  );
};

export default FavoriteHeart;
