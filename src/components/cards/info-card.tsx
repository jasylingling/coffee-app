'use client';

import clsx from 'clsx';
import Image from 'next/legacy/image';
import { FC } from 'react';

export type Info = {
  title: string;
  description: string;
  ingredients: string[];
  image: string;
};

type InfoCardProps = {
  info: Info;
  type: 'hot' | 'cold';
  badgeText: 'hot' | 'cold';
  contentToShow: 'ingredients' | 'description';
};

const InfoCard: FC<InfoCardProps> = ({ info, type, badgeText, contentToShow }) => {
  return (
    <div className="cards-wrapper mb-8 w-full rounded-lg shadow-lg min-[500px]:mr-8 md:w-2/5 2xl:w-1/4">
      <div className="image-wrapper relative flex h-48">
        <Image src={info.image} layout="fill" objectFit="cover" alt="coffee beans" className="rounded-t-lg" />
      </div>
      <div className="p-6">
        <p
          className={clsx('inline rounded-full px-4 py-2 text-xs/relaxed font-bold uppercase', {
            'bg-red-hot': type === 'hot',
            'bg-blue-cold': type === 'cold',
          })}
        >
          {badgeText}
        </p>
        <h2 className="mb-2 mt-4 text-xl font-semibold capitalize">{info.title}</h2>
        {contentToShow === 'description' && <p className="text-sm">{info.description}</p>}
        {contentToShow === 'ingredients' && (
          <ul role="list" className="list-disc pl-5 text-sm/relaxed font-medium marker:text-beige-secondary">
            {info.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
