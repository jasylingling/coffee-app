import { FC } from 'react';

type CardItemProps = {
  number?: number;
  title: string;
  description: string;
  average?: boolean;
  throwback?: string;
  lowestRating?: number;
  highestRating?: number;
};

const CardItem: FC<CardItemProps> = ({ number, title, description, average, throwback, lowestRating, highestRating }) => {
  return (
    <div className="cards-wrapper mb-8 min-h-56 w-full rounded-lg border border-lightgrey-bg p-10 shadow-lg min-[500px]:mr-8 md:w-2/5 2xl:w-1/4">
      <h2 className="mb-4 truncate text-5xl font-semibold capitalize">
        {number} {average && 'ø'}
      </h2>
      <p className="text-sm">
        <span className="mb-1 block text-base font-bold">{title}</span>
        {description}
        {(throwback || lowestRating) && (
          <span className="mt-6 block text-xs font-medium">
            {throwback ? `🕥 ${throwback}` : `😕 Schlechtestest Rating: ${lowestRating}`}
          </span>
        )}
        {highestRating && <span className="mt-1 block text-xs font-medium">🤩 Bestes Rating: {highestRating}</span>}
      </p>
    </div>
  );
};

export default CardItem;
