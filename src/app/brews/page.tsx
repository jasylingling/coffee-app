import BrewCard from '@/components/cards/brew-card';
import Header from '@/components/header/header';
import Button from '@/elements/button/button';
import Link from 'next/link';
import { FC } from 'react';
import { FaPlus } from 'react-icons/fa6';

const BrewsPage: FC = () => {
  return (
    <>
      <Header>Last Brews</Header>
      <Link href="/brews/create-brew">
        <Button variant="primary">
          <FaPlus className="mr-2" size={16} />
          Add new brew
        </Button>
      </Link>
      <div className="brews-wrapper mt-6 flex flex-wrap">
        <BrewCard date="08.12.2023" coffeeBeanName="coffee bean name" cupSize={2} grindSize={8} grindAmount={14}></BrewCard>
        <BrewCard date="07.11.2023" coffeeBeanName="coffee bean name" cupSize={2} grindSize={8} grindAmount={14}></BrewCard>
        <BrewCard date="06.10.2023" coffeeBeanName="coffee bean name" cupSize={2} grindSize={8} grindAmount={14}></BrewCard>
        <BrewCard date="05.09.2023" coffeeBeanName="coffee bean name" cupSize={2} grindSize={8} grindAmount={14}></BrewCard>
        <BrewCard
          date="04.08.2023"
          coffeeBeanName="coffee bean name"
          cupSize={2}
          grindSize={8}
          grindAmount={14}
          additionalFacts="sonstige Facts"
        ></BrewCard>
        <BrewCard
          date="03.07.2023"
          coffeeBeanName="coffee bean name"
          cupSize={2}
          grindSize={8}
          grindAmount={14}
          additionalFacts="sonstige Facts"
        ></BrewCard>
        <BrewCard
          date="02.06.2023"
          coffeeBeanName="coffee bean name"
          cupSize={2}
          grindSize={8}
          grindAmount={14}
          additionalFacts="sonstige Facts"
        ></BrewCard>
        <BrewCard
          date="01.05.2023"
          coffeeBeanName="coffee bean name"
          cupSize={2}
          grindSize={8}
          grindAmount={14}
          additionalFacts="sonstige Facts"
        ></BrewCard>
      </div>
    </>
  );
};

export default BrewsPage;
