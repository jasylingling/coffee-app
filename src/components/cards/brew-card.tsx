import Image from 'next/image';
import { FC, ReactNode } from 'react';
import coffeeBeansImg from '../../../public/img/coffee-beans.jpg';
import deleteBtn from '../../../public/svg/delete.svg';
import editBtn from '../../../public/svg/edit.svg';
import StarRating from '../../elements/star-rating/star-rating';
import FavoriteHeart from '@/elements/favorite-heart/favorite-heart';

type BrewCardProps = {
  date: ReactNode;
  coffeeBeanName: string;
  cupSize: 1 | 2;
  grindSize: number;
  grindAmount: number;
  additionalFacts?: string;
};

const BrewCard: FC<BrewCardProps> = ({ date, coffeeBeanName, cupSize, grindSize, grindAmount, additionalFacts }) => {
  return (
    <div className="cards-wrapper mb-8 w-full rounded-lg shadow-lg min-[500px]:mr-8 md:w-2/5 2xl:w-1/4">
      <div className="image-wrapper relative flex h-48">
        <Image src={coffeeBeansImg} fill objectFit="cover" alt="coffee beans" className="rounded-t-lg" />
        <div className="favheart-wrapper m2 z-10 m-2 flex w-full items-end justify-end">
          <FavoriteHeart outline />
        </div>
      </div>
      <div className="p-6">
        <p className="text-xs/relaxed font-bold">{date}</p>
        <h2 className="my-2 text-xl font-semibold capitalize">{coffeeBeanName}</h2>
        <p className="mb-4 text-sm/relaxed">
          {cupSize} Cup · Grind Size {grindSize} · Grind Amount {grindAmount} {additionalFacts && `· ${additionalFacts}`}
        </p>
        <div className="flex justify-between">
          <button className="flex">
            <StarRating />
          </button>
          <div className="delete-edit-wrapper flex">
            <button className="mr-1">
              <Image src={deleteBtn} width={24} height={24} alt="delete icon" />
            </button>
            <button>
              <Image src={editBtn} width={24} height={24} alt="edit icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrewCard;
