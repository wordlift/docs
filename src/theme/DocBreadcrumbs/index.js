"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocBreadcrumbs;
var react_1 = require("react");
var clsx_1 = require("clsx");
var theme_common_1 = require("@docusaurus/theme-common");
var client_1 = require("@docusaurus/plugin-content-docs/client");
var internal_1 = require("@docusaurus/theme-common/internal");
var router_1 = require("@docusaurus/router");
var Link_1 = require("@docusaurus/Link");
var Translate_1 = require("@docusaurus/Translate");
var Home_1 = require("@theme/DocBreadcrumbs/Items/Home");
var StructuredData_1 = require("@theme/DocBreadcrumbs/StructuredData");
var styles_module_css_1 = require("./styles.module.css");
// TODO move to design system folder
function BreadcrumbsItemLink(_a) {
    var children = _a.children, href = _a.href, isLast = _a.isLast;
    var className = 'breadcrumbs__link';
    if (isLast) {
        return <span className={className}>{children}</span>;
    }
    return href ? (<Link_1.default className={className} href={href}>
      <span>{children}</span>
    </Link_1.default>) : (<span className={className}>{children}</span>);
}
// TODO move to design system folder
function BreadcrumbsItem(_a) {
    var children = _a.children, active = _a.active;
    return (<li className={(0, clsx_1.default)('breadcrumbs__item', {
            'breadcrumbs__item--active': active,
        })}>
      {children}
    </li>);
}
function PageActionsDropdown() {
    var _a = (0, react_1.useState)(false), isOpen = _a[0], setIsOpen = _a[1];
    var dropdownRef = (0, react_1.useRef)(null);
    var location = (0, router_1.useLocation)();
    // Safety check: don't render if location is not available
    if (!location) {
        return null;
    }
    // Get current URL from location - this will update when location changes
    var getCurrentUrl = function () {
        if (typeof window === 'undefined')
            return '';
        var origin = window.location.origin;
        var pathname = (location === null || location === void 0 ? void 0 : location.pathname) || '';
        var search = (location === null || location === void 0 ? void 0 : location.search) || '';
        var hash = (location === null || location === void 0 ? void 0 : location.hash) || '';
        return "".concat(origin).concat(pathname).concat(search).concat(hash);
    };
    var copyPageLink = function () {
        navigator.clipboard.writeText(getCurrentUrl());
        setIsOpen(false);
    };
    var viewMarkdown = function () {
        if (!(location === null || location === void 0 ? void 0 : location.pathname)) {
            window.open('https://github.com/wordlift/docs/tree/main/docs', '_blank');
            setIsOpen(false);
            return;
        }
        try {
            var pathname = location.pathname.replace(/^\//, '').replace(/\/$/, '');
            // Homepage or empty path - link to root tree view
            if (!pathname) {
                window.open('https://github.com/wordlift/docs/tree/main/docs', '_blank');
                setIsOpen(false);
                return;
            }
            // Skip generated/category pages and API pages - link to tree view
            if (pathname.startsWith('category/') || pathname.includes('/category/') || pathname.startsWith('api/')) {
                // For API pages, show the specific directory
                var githubUrl_1 = pathname.startsWith('api/')
                    ? "https://github.com/wordlift/docs/tree/main/docs/".concat(pathname.split('/').slice(0, -1).join('/'))
                    : 'https://github.com/wordlift/docs/tree/main/docs';
                window.open(githubUrl_1, '_blank');
                setIsOpen(false);
                return;
            }
            // Try to build raw markdown URL
            // Most docs follow the pattern: /path/to/page/ -> docs/path/to/page.md or docs/path/to/page/index.md
            var segments = pathname.split('/');
            var mdPath = '';
            if (segments.length === 1) {
                // Single segment like 'agent-wordlift' -> try index.md
                mdPath = "docs/".concat(pathname, "/index.md");
            }
            else {
                // Multi-segment - try direct .md first
                mdPath = "docs/".concat(pathname, ".md");
            }
            var githubUrl = "https://raw.githubusercontent.com/wordlift/docs/refs/heads/main/".concat(mdPath);
            window.open(githubUrl, '_blank');
            setIsOpen(false);
        }
        catch (error) {
            console.error('Error in viewMarkdown:', error);
            window.open('https://github.com/wordlift/docs/tree/main/docs', '_blank');
            setIsOpen(false);
        }
    };
    var openInChatGPT = function () {
        var currentPageUrl = getCurrentUrl();
        var pageTitle = typeof document !== 'undefined' ? document.title : '';
        var prompt = "I'm reading this page: \"".concat(pageTitle, "\" at ").concat(currentPageUrl, ". Can you help me understand it better?");
        var chatGPTUrl = "https://chatgpt.com/?q=".concat(encodeURIComponent(prompt));
        window.open(chatGPTUrl, '_blank');
        setIsOpen(false);
    };
    // Close dropdown when clicking outside
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (<div ref={dropdownRef} style={{ position: 'relative', marginLeft: 'auto' }}>
      <button onClick={function () { return setIsOpen(!isOpen); }} style={{
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
        }} aria-label="AI Actions menu" aria-expanded={isOpen} aria-haspopup="menu">
        AI ▾
      </button>

      {isOpen && (<div role="menu" aria-label="AI Actions" style={{
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
            }}>
          <button role="menuitem" onClick={copyPageLink} style={{
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
            }}>
            🔗 Copy page link
          </button>
          <button role="menuitem" onClick={viewMarkdown} style={{
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
            }}>
            <img src="/img/github-logo.svg" alt="GitHub" style={{ width: '16px', height: '16px' }}/>
            View Markdown
          </button>
          <button role="menuitem" onClick={openInChatGPT} style={{
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
            }}>
            <img src="/img/chatgpt-logo.svg" alt="ChatGPT" style={{ width: '16px', height: '16px' }}/>
            Open in ChatGPT
          </button>
        </div>)}
    </div>);
}
function DocBreadcrumbs() {
    var breadcrumbs = (0, client_1.useSidebarBreadcrumbs)();
    var homePageRoute = (0, internal_1.useHomePageRoute)();
    if (!breadcrumbs) {
        return null;
    }
    return (<>
      <StructuredData_1.default breadcrumbs={breadcrumbs}/>
      <nav className={(0, clsx_1.default)(theme_common_1.ThemeClassNames.docs.docBreadcrumbs, styles_module_css_1.default.breadcrumbsContainer)} style={{ display: 'flex', alignItems: 'center' }} aria-label={(0, Translate_1.translate)({
            id: 'theme.docs.breadcrumbs.navAriaLabel',
            message: 'Breadcrumbs',
            description: 'The ARIA label for the breadcrumbs',
        })}>
        <ul className="breadcrumbs" style={{ marginBottom: 0 }}>
          {homePageRoute && <Home_1.default />}
          {breadcrumbs.map(function (item, idx) {
            var isLast = idx === breadcrumbs.length - 1;
            var href = item.type === 'category' && item.linkUnlisted
                ? undefined
                : item.href;
            return (<BreadcrumbsItem key={idx} active={isLast}>
                <BreadcrumbsItemLink href={href} isLast={isLast}>
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>);
        })}
        </ul>
        <PageActionsDropdown />
      </nav>
    </>);
}
