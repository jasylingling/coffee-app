'use client';

import Image from 'next/legacy/image';
import { FC, useState } from 'react';
import deleteBtn from '../../../public/svg/delete.svg';
import editBtn from '../../../public/svg/edit.svg';
import StarRating from '../../elements/star-rating/star-rating';
import FavoriteHeart from '@/elements/favorite-heart/favorite-heart';
import { Brews } from '@/lib/definition';
import dayjs from 'dayjs';
import Link from 'next/link';
import { deleteBrew, updateFavBrew, updateRatingBrew } from '@/lib/actions';
import Modal from '../modal/modal';

type BrewCardProps = {
  brew: Brews;
};

const BrewCard: FC<BrewCardProps> = ({ brew }) => {
  const deleteBrewWithId = deleteBrew.bind(null, brew.id);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="cards-wrapper mb-8 w-full rounded-lg shadow-lg min-[500px]:mr-8 md:w-2/5 2xl:w-1/4">
      <div className="image-wrapper relative flex h-48">
        <Image src={brew.image_url} layout="fill" objectFit="cover" alt="coffee beans" className="rounded-t-lg" />
        <div className="favheart-wrapper z-10 m-3 flex w-full items-end justify-end">
          <FavoriteHeart
            favorite={brew.favorite}
            outline
            onFavoriteChange={(newFavorite) => updateFavBrew(brew.id, newFavorite)}
          />
        </div>
      </div>
      <div className="p-6">
        <p className="text-xs/relaxed font-medium">
          <span className="mr-1 text-sm">🗓️</span> Bearbeitet am {dayjs(brew.edited_at).format('DD.MM.YYYY | HH:mm:ss')}
        </p>
        <h2 className="my-3 truncate text-xl font-semibold capitalize">{brew.coffee_name}</h2>
        <ul className="mb-4 text-sm/relaxed font-medium">
          <li>
            <span className="mr-1">☕️</span> {brew.cup_size} Cup
          </li>
          <li>
            <span className="mr-1">📐</span> Grind Size: {brew.grind_size}
          </li>
          <li>
            <span className="mr-1">🗻</span> Grind Amount: {brew.grind_amount}
          </li>
        </ul>
        <div className="flex justify-between">
          <button className="flex">
            <StarRating rating={brew.rating} onRatingChange={(newRating) => updateRatingBrew(brew.id, newRating)} />
          </button>
          <div className="delete-edit-wrapper flex">
            <button className="mr-2" onClick={() => setIsOpen(true)}>
              <Image src={deleteBtn} width={24} height={24} alt="delete icon" />
            </button>
            <Modal
              title="Brew löschen"
              description={`Möchtest du den Brew "${brew.coffee_name}" wirklich löschen? Dieser Vorgang kann nicht rückgängig gemacht werden!`}
              isOpen={isOpen}
              cancelActionHandler={() => setIsOpen(false)}
              confirmActionHandler={() => {
                deleteBrewWithId();
              }}
            />
            <Link href={`/brews/${brew.id}/edit`}>
              <Image src={editBtn} width={24} height={24} alt="edit icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrewCard;
