import { FC, ReactNode } from 'react';

type FieldsetProps = {
  legend: string;
  sectionName: string;
  children: ReactNode;
};

const Fieldset: FC<FieldsetProps> = ({ legend, sectionName, children }) => {
  return (
    <fieldset>
      <legend className="mb-1 font-semibold">{legend}</legend>
      <section className={`${sectionName} mb-6 rounded-lg bg-lightbeige-bg p-4 sm:px-5`}>{children}</section>
    </fieldset>
  );
};

export default Fieldset;
