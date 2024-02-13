'use client';

import InfoCard from '@/components/cards/info-card';
import Header from '@/components/header/header';
import { FC, useEffect, useState } from 'react';
import { APIENDPOINT_HOT, APIENDPOINT_COLD } from '@/lib/constants';
import { Info } from '@/components/cards/info-card';

const RezeptePage: FC = () => {
  const [hotBeverages, setHotBeverages] = useState<Info[]>([]);
  const [coldBeverages, setColdBeverages] = useState<Info[]>([]);

  const getHotBeverages = async () => {
    const response = await fetch(APIENDPOINT_HOT);
    const data = await response.json();
    setHotBeverages(data);
  };

  const getColdBeverages = async () => {
    const response = await fetch(APIENDPOINT_COLD);
    const data = await response.json();
    setColdBeverages(data);
  };

  useEffect(() => {
    getHotBeverages();
    getColdBeverages();
  }, []);

  return (
    <>
      <Header>Rezepte</Header>
      <div className="brews-wrapper mt-6 flex flex-wrap">
        {[...hotBeverages]
          .sort((a, b) => a.title.localeCompare(b.title)) // Sortierung
          .map((recipe, id) => (
            <InfoCard key={id} info={recipe} type="hot" badgeText="hot" contentToShow="ingredients" />
          ))}
        {[...coldBeverages]
          .sort((a, b) => a.title.localeCompare(b.title)) // Sortierung
          .map((recipe, id) => (
            <InfoCard key={id} info={recipe} type="cold" badgeText="cold" contentToShow="ingredients" />
          ))}
      </div>
    </>
  );
};

export default RezeptePage;
