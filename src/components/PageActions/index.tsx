import React, {type ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import {ICONS} from './icons';
import styles from './styles.module.css';

// Page actions, modeled on Linear's "Copy page" button: the primary action
// copies the page as Markdown for an AI assistant; the menu opens the
// Markdown copy, hands the page to an assistant, or copies the link.
// Markdown copies are published by src/plugins/page-markdown at the page URL
// plus ".md".

type IconName = keyof typeof ICONS;

function Icon({name, className}: {name: IconName; className?: string}): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={clsx(styles.icon, className)}>
      {ICONS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const GITHUB_RAW = 'https://raw.githubusercontent.com/wordlift/docs/main/';

type PageMetadata = {permalink: string; source: string; title: string};

export default function PageActions({metadata}: {metadata: PageMetadata}): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const markdownPath = `${metadata.permalink.replace(/\/$/, '')}.md`;
  const pageUrl = `${siteConfig.url}${metadata.permalink}`;
  const markdownUrl = `${siteConfig.url}${markdownPath}`;

  const flash = (next: 'copied' | 'failed') => {
    setStatus(next);
    window.setTimeout(() => setStatus('idle'), 2000);
  };

  const loadMarkdown = async (): Promise<string> => {
    const local = await fetch(markdownPath);
    if (local.ok) {
      return local.text();
    }
    // Local dev server: no Markdown copies; fall back to the source on main.
    const source = metadata.source.replace(/^@site\//, '');
    const remote = await fetch(`${GITHUB_RAW}${source}`);
    if (!remote.ok) {
      throw new Error(`Markdown not found for ${metadata.permalink}`);
    }
    return remote.text();
  };

  const copyPage = async () => {
    setOpen(false);
    try {
      await navigator.clipboard.writeText(await loadMarkdown());
      flash('copied');
    } catch {
      flash('failed');
    }
  };

  const copyLink = async () => {
    setOpen(false);
    try {
      await navigator.clipboard.writeText(pageUrl);
      flash('copied');
    } catch {
      flash('failed');
    }
  };

  const openExternal = (url: string) => {
    setOpen(false);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const prompt = `Read ${markdownUrl} so you can answer my questions about this WordLift documentation page: "${metadata.title}".`;

  const items: {
    key: string;
    icon: IconName;
    label: string;
    hint: string;
    run: () => void;
    divider?: boolean;
  }[] = [
    {key: 'copy', icon: 'copy', label: 'Copy page', hint: 'Copy as Markdown for AI assistants', run: copyPage},
    {key: 'view', icon: 'markdown', label: 'View as Markdown', hint: 'Open this page as plain text', run: () => openExternal(markdownPath)},
    {key: 'claude', icon: 'chat', label: 'Open in Claude', hint: 'Ask questions about this page', run: () => openExternal(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`), divider: true},
    {key: 'chatgpt', icon: 'chat', label: 'Open in ChatGPT', hint: 'Ask questions about this page', run: () => openExternal(`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`)},
    {key: 'link', icon: 'link', label: 'Copy link', hint: 'Copy the URL of this page', run: copyLink, divider: true},
  ];

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) {
      toggleRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onPointer = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        close(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close(true);
        return;
      }
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
        return;
      }
      event.preventDefault();
      const options = Array.from(
        rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? [],
      );
      const index = options.indexOf(document.activeElement as HTMLButtonElement);
      const step = event.key === 'ArrowDown' ? 1 : -1;
      options[(index + step + options.length) % options.length]?.focus();
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    rootRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus();
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const primaryLabel = status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy page';

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={clsx(styles.split, status === 'copied' && styles.splitCopied)}>
        <button type="button" className={styles.primary} onClick={copyPage} aria-live="polite">
          <Icon name={status === 'copied' ? 'check' : 'copy'} />
          <span>{primaryLabel}</span>
        </button>
        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          onClick={() => setOpen((value) => !value)}
          aria-label="More page actions"
          aria-haspopup="menu"
          aria-expanded={open}>
          <Icon name="chevron" className={clsx(styles.chevron, open && styles.chevronOpen)} />
        </button>
      </div>
      {open && (
        <div role="menu" aria-label="Page actions" className={styles.menu}>
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              role="menuitem"
              className={clsx(styles.item, item.divider && styles.itemDivider)}
              onClick={item.run}>
              <Icon name={item.icon} className={styles.itemIcon} />
              <span className={styles.itemText}>
                <span className={styles.itemLabel}>{item.label}</span>
                <span className={styles.itemHint}>{item.hint}</span>
              </span>
              {(item.key === 'view' || item.key === 'claude' || item.key === 'chatgpt') && (
                <Icon name="external" className={styles.itemExternal} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
