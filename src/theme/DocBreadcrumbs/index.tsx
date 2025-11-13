import React, {type ReactNode, useState, useRef, useEffect} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
import {useHomePageRoute} from '@docusaurus/theme-common/internal';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';

import styles from './styles.module.css';

// TODO move to design system folder
function BreadcrumbsItemLink({
  children,
  href,
  isLast,
}: {
  children: ReactNode;
  href: string | undefined;
  isLast: boolean;
}): ReactNode {
  const className = 'breadcrumbs__link';
  if (isLast) {
    return <span className={className}>{children}</span>;
  }
  return href ? (
    <Link className={className} href={href}>
      <span>{children}</span>
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}

// TODO move to design system folder
function BreadcrumbsItem({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}): ReactNode {
  return (
    <li
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}>
      {children}
    </li>
  );
}

function PageActionsDropdown(): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Get current URL from location - this will update when location changes
  const getCurrentUrl = () => {
    if (typeof window === 'undefined') return '';
    const origin = window.location.origin;
    return `${origin}${location.pathname}${location.search}${location.hash}`;
  };

  // Get the markdown file path from the current page
  const getMarkdownPath = () => {
    const pathname = location.pathname;
    // Convert URL path to markdown file path
    let mdPath = pathname.replace(/^\//, '').replace(/\/$/, '');

    if (!mdPath || mdPath === '') {
      return 'docs/introduction.md';
    }

    // For paths that look like directories
    if (!mdPath.includes('.')) {
      // Check if it has multiple segments (likely a directory with index.md)
      const segments = mdPath.split('/');
      if (segments.length > 1 || segments[0] === 'agent-wordlift' || segments[0] === 'pages') {
        // For directories, use index.md
        mdPath = `docs/${mdPath}/index.md`;
      } else {
        // For single-level paths under pages/, try .md first
        mdPath = `docs/${mdPath}.md`;
      }
    }

    return mdPath;
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText(getCurrentUrl());
    setIsOpen(false);
  };

  const viewMarkdown = () => {
    const mdPath = getMarkdownPath();
    const githubUrl = `https://raw.githubusercontent.com/wordlift/docs/refs/heads/main/${mdPath}`;
    window.open(githubUrl, '_blank');
    setIsOpen(false);
  };

  const openInChatGPT = () => {
    const currentPageUrl = getCurrentUrl();
    const pageTitle = typeof document !== 'undefined' ? document.title : '';
    const prompt = `I'm reading this page: "${pageTitle}" at ${currentPageUrl}. Can you help me understand it better?`;
    const chatGPTUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
    window.open(chatGPTUrl, '_blank');
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', marginLeft: 'auto' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: '#0073e6',
          border: '1px solid #0073e6',
          borderRadius: '4px',
          cursor: 'pointer',
          padding: '4px 12px',
          fontSize: '14px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: '#ffffff',
        }}
        aria-label="AI Actions"
      >
        AI ▾
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            marginTop: '4px',
            backgroundColor: 'var(--ifm-background-surface-color)',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            minWidth: '200px',
            zIndex: 1000,
          }}
        >
          <button
            onClick={copyPageLink}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: 'var(--ifm-font-color-base)',
            }}
          >
            🔗 Copy page link
          </button>
          <button
            onClick={viewMarkdown}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: 'var(--ifm-font-color-base)',
            }}
          >
            📄 View Page as Markdown
          </button>
          <button
            onClick={openInChatGPT}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: 'var(--ifm-font-color-base)',
              borderTop: '1px solid var(--ifm-color-emphasis-200)',
            }}
          >
            <img
              src="/img/chatgpt-logo.svg"
              alt="ChatGPT"
              style={{ width: '16px', height: '16px' }}
            />
            Open in ChatGPT
          </button>
        </div>
      )}
    </div>
  );
}

export default function DocBreadcrumbs(): ReactNode {
  const breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();

  if (!breadcrumbs) {
    return null;
  }

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
      <nav
        className={clsx(
          ThemeClassNames.docs.docBreadcrumbs,
          styles.breadcrumbsContainer,
        )}
        style={{ display: 'flex', alignItems: 'center' }}
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for the breadcrumbs',
        })}>
        <ul className="breadcrumbs" style={{ marginBottom: 0 }}>
          {homePageRoute && <HomeBreadcrumbItem />}
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            const href =
              item.type === 'category' && item.linkUnlisted
                ? undefined
                : item.href;
            return (
              <BreadcrumbsItem key={idx} active={isLast}>
                <BreadcrumbsItemLink href={href} isLast={isLast}>
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>
            );
          })}
        </ul>
        <PageActionsDropdown />
      </nav>
    </>
  );
}
