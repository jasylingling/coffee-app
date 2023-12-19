import { FC, ReactNode } from 'react';

type HeaderProps = {
  children: ReactNode;
  additionalClasses?: string;
};

const Header: FC<HeaderProps> = ({ children, additionalClasses }) => {
  return (
    <header className="pb-10">
      <h1 className={`text-3xl font-medium ${additionalClasses}`}>{children}</h1>
    </header>
  );
};

export default Header;
