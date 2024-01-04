import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="px-10 py-16 pb-10 text-center text-sm lg:pl-80">
      <p>&copy; {new Date().getFullYear()} made with ❤️ and lots of ☕ by Jasmin Fischli. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
