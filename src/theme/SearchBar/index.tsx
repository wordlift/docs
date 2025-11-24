import React, {type ReactNode} from 'react';
import OriginalSearchBar from '@theme-original/SearchBar';
import type SearchBarType from '@theme/SearchBar';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof SearchBarType>;

class SearchBarErrorBoundary extends React.Component<
  {children: ReactNode},
  {hasError: boolean}
> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: Error) {
    console.error('SearchBar Error:', error);
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('SearchBar crashed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null; // Hide search bar if it crashes
    }

    return this.props.children;
  }
}

export default function SearchBarWrapper(props: Props): JSX.Element {
  return (
    <SearchBarErrorBoundary>
      <OriginalSearchBar {...props} />
    </SearchBarErrorBoundary>
  );
}
