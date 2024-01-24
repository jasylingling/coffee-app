import Header from '@/components/header/header';
import { FC } from 'react';

type BrewPageProps = {
  params: { id: string };
};

const BrewPage: FC<BrewPageProps> = ({ params }) => {
  return <Header>This is single Brew Page ID: {params.id}</Header>;
};

export default BrewPage;
