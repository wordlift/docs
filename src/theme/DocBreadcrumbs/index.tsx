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

  const copyPageLink = () => {
    navigator.clipboard.writeText(getCurrentUrl());
    setIsOpen(false);
  };

  const viewMarkdown = () => {
    const pathname = location.pathname.replace(/^\//, '').replace(/\/$/, '');

    // Homepage or empty path - link to root tree view
    if (!pathname) {
      window.open('https://github.com/wordlift/docs/tree/main/docs', '_blank');
      setIsOpen(false);
      return;
    }

    // Skip generated/category pages and API pages - link to tree view
    if (pathname.startsWith('category/') || pathname.includes('/category/') || pathname.startsWith('api/')) {
      // For API pages, show the specific directory
      const githubUrl = pathname.startsWith('api/')
        ? `https://github.com/wordlift/docs/tree/main/docs/${pathname.split('/').slice(0, -1).join('/')}`
        : 'https://github.com/wordlift/docs/tree/main/docs';
      window.open(githubUrl, '_blank');
      setIsOpen(false);
      return;
    }

    // Try to build raw markdown URL
    // Most docs follow the pattern: /path/to/page/ -> docs/path/to/page.md or docs/path/to/page/index.md
    const segments = pathname.split('/');
    let mdPath = '';

    if (segments.length === 1) {
      // Single segment like 'agent-wordlift' -> try index.md
      mdPath = `docs/${pathname}/index.md`;
    } else {
      // Multi-segment - try direct .md first
      mdPath = `docs/${pathname}.md`;
    }

    const githubUrl = `https://raw.githubusercontent.com/wordlift/docs/refs/heads/main/${mdPath}`;
    window.open(githubUrl, '_blank');
    setIsOpen(false);
  };  const openInChatGPT = () => {
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
        aria-label="AI Actions menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        AI ▾
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="AI Actions"
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
            role="menuitem"
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
            role="menuitem"
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
            <img
              src="/img/github-logo.svg"
              alt="GitHub"
              style={{ width: '16px', height: '16px' }}
            />
            View Markdown
          </button>
          <button
            role="menuitem"
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
