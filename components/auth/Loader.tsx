import React from 'react';
import { BeatLoader } from 'react-spinners';

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="flex items-center w-full justify-center">
      <BeatLoader />
    </div>
  );
};

export default Loader;
