import BrewCard from '@/components/cards/brew-card';
import Header from '@/components/header/header';
import Button from '@/elements/button/button';
import { fetchBrews } from '@/lib/data';
import Link from 'next/link';
import { FC } from 'react';
import { FaPlus } from 'react-icons/fa6';

const BrewsPage: FC = async () => {
  const brews = await fetchBrews();

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
        {brews.map((brew) => (
          <BrewCard key={brew.id} brew={brew} />
        ))}
      </div>
    </>
  );
};

export default BrewsPage;
