'use client';

import { FC, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import clsx from 'clsx';

type FavoriteHeartProps = {
  favorite: number;
  outline?: boolean;
  favText?: boolean;
  onFavoriteChange?: (favorite: number) => void;
};

const FavoriteHeart: FC<FavoriteHeartProps> = ({ favorite, outline, favText, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(favorite > 0);

  return (
    <label
      className={clsx('flex cursor-pointer items-center font-medium tracking-wide', {
        'rounded-full bg-white bg-opacity-75 p-2': outline,
      })}
    >
      <input
        type="checkbox"
        name="favorite"
        checked={isFavorite}
        onChange={(e) => {
          setIsFavorite(e.target.checked);
          onFavoriteChange?.(e.target.checked ? 1 : 0);
        }}
        value={1}
        className="hidden"
      />
      {!isFavorite ? (
        <FaRegHeart size={24} className={clsx('text-red-fav hover:opacity-80', { 'sm:mr-2': favText })} />
      ) : (
        <FaHeart size={24} className={clsx('text-red-fav hover:opacity-80', { 'sm:mr-2': favText })} />
      )}
      {favText && <span className="mr-0 hidden sm:inline">{isFavorite ? 'Remove from favs' : 'Add to favs'}</span>}
    </label>
  );
};

export default FavoriteHeart;
