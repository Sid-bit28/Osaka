import Image from 'next/image';
import React from 'react';

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <section>
      <div className="">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary-300 dark:text-dark-primary-300 max-w-lg mx-auto mt-8 md:mt-15 mb-5 md:mb-10">
          Easiest{' '}
          <span className="relative inline-block">
            <span className="relative z-10 px-2">invoicing</span>
            <span
              className="absolute inset-0 bg-primary-100/20 -rotate-2 rounded-lg transform -skew-y-1"
              aria-hidden="true"
            ></span>
          </span>{' '}
          for freelancers and small businesses
        </h1>
        <p className="text-lg md:text-xl text-center text-primary-200 dark:text-dark-primary-200 max-w-2xl mx-auto mb-2 md:mb-4">
          Create and send invoices in seconds, track payments, and manage your
          finances effortlessly.
        </p>
        <Image src="/banner.png" alt="banner" height={1500} width={1500} />
      </div>
    </section>
  );
};

export default HeroSection;
