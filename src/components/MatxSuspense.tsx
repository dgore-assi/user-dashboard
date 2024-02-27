import { Suspense } from 'react';
import Loading from './MatxLoading';

const MatxSuspenses = ({ children }: any) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default MatxSuspenses;
