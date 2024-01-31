import Header from '@/components/header/header';
import EditForm from '@/components/forms/edit-form';
import { fetchBrewById } from '@/lib/data';
import { FC } from 'react';

type BrewPageProps = {
  params: { id: number };
};

const BrewPage: FC<BrewPageProps> = async ({ params }) => {
  const id = params.id;
  const brew = await fetchBrewById(id);

  return (
    <>
      <Header>Edit Brew</Header>
      <EditForm brew={brew} />
    </>
  );
};

export default BrewPage;
