// @flow
import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import type { Node as ReactNode } from 'react';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode,
  title: string,
  description?: string,
  location: any,
};

const Layout = ({ children, title, description, location }: Props) => {
  useEffect(() => {
    window.Appcues.page();
  }, [location.pathname]);
  return (
    <div className={styles.layout}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <script src="//fast.appcues.com/53839.js" />
      </Helmet>
      {children}
    </div>
  );
};

export default Layout;
