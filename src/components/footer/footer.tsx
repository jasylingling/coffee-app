import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="pb-9 pl-10 pr-10 text-center lg:pl-80">
      <p>&copy; {new Date().getFullYear()} made with ❤️ and lots of ☕ by Jasmin Fischli. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
