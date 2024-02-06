import { FC } from 'react';
import CardItem from '@/elements/card-item/card-item';

type FactCardsProps = {
  brewsThisWeek: number;
  brewsLastWeek: number;
  totalBeans: number;
  totalFavs: number;
  averageRating: number;
  lowestRating: number;
  highestRating: number;
};

const FactCards: FC<FactCardsProps> = ({
  brewsThisWeek = 0,
  brewsLastWeek = 0,
  totalBeans = 0,
  totalFavs = 0,
  averageRating = 0,
  lowestRating = 0,
  highestRating = 0,
}) => {
  return (
    <>
      <CardItem
        number={brewsThisWeek}
        title={`${brewsThisWeek === 1 ? 'Brew' : 'Brews'} diese Woche ☕️`}
        description="...and more to go!"
        throwback={`Letzte Woche: ${brewsLastWeek}`}
      />
      <CardItem
        number={totalBeans}
        title={`Entdeckte ${totalBeans === 1 ? 'Kaffeebohne' : 'Kaffeebohnen'} 🫘`}
        description="You're rocking it!"
      />
      <CardItem
        number={totalFavs}
        title={`${totalFavs === 1 ? 'Favorite' : 'Favorites'} ❤️`}
        description="...es werden sicherlich mehr!"
      />
      <CardItem
        number={averageRating}
        average
        title="Ratings aller Brews ⭐️"
        description="Keep the rating up!"
        lowestRating={lowestRating}
        highestRating={highestRating}
      />
    </>
  );
};

export default FactCards;
