'use client';

import { FC, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import clsx from 'clsx';

type FavoriteHeartProps = {
  outline?: boolean;
  buttonText?: boolean;
};

const FavoriteHeart: FC<FavoriteHeartProps> = ({ outline, buttonText }) => {
  const [favorite, setFavorite] = useState(false);

  return (
    <>
      <button
        onClick={() => setFavorite(!favorite)}
        className={clsx('flex items-center font-medium tracking-wide', {
          'rounded-full bg-white bg-opacity-75 p-2': outline,
        })}
      >
        {!favorite ? (
          <FaRegHeart size={24} className={clsx('text-red-fav hover:opacity-80', { 'sm:mr-2': buttonText })} />
        ) : (
          <FaHeart size={24} className={clsx('text-red-fav hover:opacity-80', { 'sm:mr-2': buttonText })} />
        )}
        {buttonText && <span className="mr-0 hidden sm:inline">{favorite ? 'Remove from favs' : 'Add to favs'}</span>}
      </button>
    </>
  );
};

export default FavoriteHeart;
