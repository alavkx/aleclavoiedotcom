// @flow
import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata, useCategoriesList } from '../hooks';

const CategoriesListTemplate = ({ location }) => {
  const { title, subtitle } = useSiteMetadata();
  const categories = useCategoriesList();

  return (
    <Layout
      title={`Categories - ${title}`}
      description={subtitle}
      location={location}
    >
      <Sidebar />
      <Page title="Categories">
        <ul>
          {categories.map(category => (
            <li key={category.fieldValue}>
              <Link to={`/category/${kebabCase(category.fieldValue)}/`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export default CategoriesListTemplate;
