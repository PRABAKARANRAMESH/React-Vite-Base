import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  description?: string;
  children: ReactNode;
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  <>
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    </Helmet>
    {children}
  </>
);

export default PageContainer;
