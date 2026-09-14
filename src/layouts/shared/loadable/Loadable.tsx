import { Suspense } from 'react';
import Spinner from '@/layouts/shared/spinner/Spinner.tsx'
const Loadable = (Component: any) => (props: any) => (
  <Suspense
    fallback={<Spinner/>}
  >
    <Component {...props} />
  </Suspense>
);

export default Loadable;
