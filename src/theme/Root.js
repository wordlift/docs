import React from 'react';
import { Provider } from 'react-redux';
import { createStoreWithoutState } from 'docusaurus-theme-openapi-docs/lib/theme/ApiItem/store';
import { createPersistanceMiddleware } from 'docusaurus-theme-openapi-docs/lib/theme/ApiExplorer/persistanceMiddleware';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext();
  const themeConfig = siteConfig?.themeConfig || {};
  const options = themeConfig.api || {};

  const persistanceMiddleware = createPersistanceMiddleware(options);
  const store = createStoreWithoutState({}, [persistanceMiddleware]);

  return <Provider store={store}>{children}</Provider>;
}
