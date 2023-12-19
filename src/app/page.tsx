import Header from '@/components/header/header';
import { FC } from 'react';
import BrewsPage from './brews/page';

const HomePage: FC = () => {
  return (
    <>
      <Header additionalClasses="text-[1.375rem]">📔☕️ Welcome to Boorista - a coffee journal app ☕️📔</Header>
      <BrewsPage />
      <p>Brews Cards coming soon...</p>
    </>
  );
};

export default HomePage;
