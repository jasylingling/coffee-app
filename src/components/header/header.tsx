import { FC, ReactNode } from 'react';

type HeaderProps = {
  children: ReactNode;
};

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className="pb-8">
      <h1 className="text-3xl font-medium">{children}</h1>
    </header>
  );
};

export default Header;
