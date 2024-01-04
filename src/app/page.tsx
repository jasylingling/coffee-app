import Header from '@/components/header/header';
import { FC } from 'react';
import BrewsPage from './brews/page';

const HomePage: FC = () => {
  return (
    <>
      <p className="mb-8 text-2xl italic">📔☕️ Welcome to Boorista - a coffee tasting journal app ☕️📔</p>
      <BrewsPage />
    </>
  );
};

export default HomePage;
