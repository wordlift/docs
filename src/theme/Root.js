import React from 'react';
import { Provider } from 'react-redux';
import { createStoreWithoutState } from 'docusaurus-theme-openapi-docs/lib/theme/ApiItem/store';
import { createPersistenceMiddleware } from 'docusaurus-theme-openapi-docs/lib/theme/ApiExplorer/persistenceMiddleware';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext();
  const themeConfig = siteConfig?.themeConfig || {};
  const options = themeConfig.api || {};

  const persistenceMiddleware = createPersistenceMiddleware(options);
  const store = createStoreWithoutState({}, [persistenceMiddleware]);

  return <Provider store={store}>{children}</Provider>;
}
