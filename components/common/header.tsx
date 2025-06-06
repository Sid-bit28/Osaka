import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

type Props = {};

const Header = (props: Props) => {
  return (
    <nav className="container flex items-center justify-between py-2 lg:px-8 px-2 mx-auto mt-3">
      <div className="flex lg:flex-1">
        <Link
          href="/"
          className="flex items-center text-lg font-semibold gap-2"
        >
          <Image src="/logo.svg" width={100} height={100} alt="logo" />
        </Link>
      </div>

      <div>
        <Link href={ROUTES.SIGN_IN}>
          <Button className="text-white bg-primary-200/90 hover:bg-primary-100 font-medium text-sm text-center cursor-pointer me-2 mb-2 dark:bg-dark-primary-200/90 dark:hover:bg-dark-primary-200 dark:text-white my-auto">
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
