import FactCards from '@/components/cards/fact-cards';
import Header from '@/components/header/header';
import {
  fetchAverageRating,
  fetchBrewsLastWeek,
  fetchBrewsThisWeek,
  fetchHighestRating,
  fetchLowestRating,
  fetchTotalBeans,
  fetchTotalFavs,
} from '@/lib/data';
import { FC } from 'react';

const StatisticsPage: FC = async () => {
  const [brewsThisWeek, brewsLastWeek, totalBeans, totalFavs, averageRating, lowestRating, highestRating] =
    await Promise.all([
      fetchBrewsThisWeek(),
      fetchBrewsLastWeek(),
      fetchTotalBeans(),
      fetchTotalFavs(),
      fetchAverageRating(),
      fetchLowestRating(),
      fetchHighestRating(),
    ]);

  return (
    <>
      <Header>Statistik</Header>
      <div className="brews-wrapper mt-6 flex flex-wrap 2xl:flex-nowrap">
        <FactCards
          brewsThisWeek={brewsThisWeek}
          brewsLastWeek={brewsLastWeek}
          totalBeans={totalBeans}
          totalFavs={totalFavs}
          averageRating={averageRating}
          lowestRating={lowestRating}
          highestRating={highestRating}
        />
      </div>
    </>
  );
};

export default StatisticsPage;
