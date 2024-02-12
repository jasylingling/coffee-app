import BrewCard from '@/components/cards/brew-card';
import Header from '@/components/header/header';
import { fetchBrewsByFavs } from '@/lib/data';
import { FC } from 'react';

const FavsPage: FC = async () => {
  const favBrews = await fetchBrewsByFavs();

  return (
    <>
      <Header>Favs</Header>
      <div className="brews-wrapper mt-6 flex flex-wrap">
        {favBrews.map((brew) => (
          <BrewCard key={brew.id} brew={brew} />
        ))}
      </div>
    </>
  );
};

export default FavsPage;
