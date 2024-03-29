import { FC } from 'react';
import BrewsPage from './brews/page';

const HomePage: FC = () => {
  return (
    <>
      <p className="mb-8 text-2xl">📔 ☕️ Welcome to Boorista - a coffee tasting journal app ☕️ 📔</p>
      <BrewsPage />
    </>
  );
};

export default HomePage;
