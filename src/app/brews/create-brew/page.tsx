import Header from '@/components/header/header';
import { FC } from 'react';
import CreateForm from '@/components/forms/create-form';

const CreateBrewPage: FC = () => {
  return (
    <>
      <Header>New Brew</Header>
      <CreateForm />
    </>
  );
};

export default CreateBrewPage;
