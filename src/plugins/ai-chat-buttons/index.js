module.exports = function aiChatButtonsPlugin(context, options) {
  return {
    name: 'docusaurus-plugin-ai-chat-buttons',

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'style',
            innerHTML: `
              .ai-chat-buttons {
                position: fixed;
                bottom: 80px;
                right: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                z-index: 999;
              }

              .ai-chat-button {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px 16px;
                background: var(--ifm-background-surface-color);
                border: 1px solid var(--ifm-color-emphasis-300);
                border-radius: 8px;
                color: var(--ifm-font-color-base);
                text-decoration: none;
                font-size: 14px;
                font-weight: 500;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                transition: all 0.2s ease;
                cursor: pointer;
                white-space: nowrap;
              }

              .ai-chat-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                text-decoration: none;
                color: var(--ifm-font-color-base);
                border-color: var(--ifm-color-primary);
              }

              .ai-chat-button svg {
                width: 18px;
                height: 18px;
                flex-shrink: 0;
              }

              @media (max-width: 996px) {
                .ai-chat-buttons {
                  bottom: 60px;
                  right: 10px;
                }

                .ai-chat-button {
                  padding: 8px 12px;
                  font-size: 13px;
                }
              }
            `,
          },
        ],
        postBodyTags: [
          {
            tagName: 'script',
            innerHTML: `
              (function() {
                function createAIChatButtons() {
                  if (document.querySelector('.ai-chat-buttons')) return;

                  const container = document.createElement('div');
                  container.className = 'ai-chat-buttons';

                  const buttons = [
                    {
                      name: 'ChatGPT',
                      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>',
                      url: 'https://chatgpt.com'
                    },
                    {
                      name: 'Claude',
                      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.5 2.5h-5l-7 19h5l1.5-4h6l1.5 4h5l-7-19zm-3.5 11l1.5-4 1.5 4h-3z"/></svg>',
                      url: 'https://claude.ai'
                    },
                    {
                      name: 'Gemini',
                      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.82 8 12 11.82 4.18 8 12 4.18zM4 9.47l7 3.5v7.85l-7-3.5V9.47zm16 0v7.85l-7 3.5v-7.85l7-3.5z"/></svg>',
                      url: 'https://gemini.google.com'
                    }
                  ];

                  buttons.forEach(btn => {
                    const link = document.createElement('a');
                    link.className = 'ai-chat-button';
                    link.href = '#';
                    link.innerHTML = btn.icon + '<span>' + btn.name + '</span>';
                    link.onclick = function(e) {
                      e.preventDefault();
                      const currentUrl = window.location.href;
                      const pageTitle = document.title;

                      // Get the markdown source URL
                      const markdownUrl = currentUrl.replace(/\\/$/, '') + '.md';

                      let prompt = '';
                      if (btn.name === 'ChatGPT') {
                        prompt = \`I'm reading this page: "\${pageTitle}" at \${currentUrl}. Can you help me understand it better?\`;
                        window.open(\`\${btn.url}/?q=\${encodeURIComponent(prompt)}\`, '_blank');
                      } else if (btn.name === 'Claude') {
                        prompt = \`I'm reading this documentation page: "\${pageTitle}" at \${currentUrl}. Can you help me understand it better?\`;
                        window.open(\`\${btn.url}/new?q=\${encodeURIComponent(prompt)}\`, '_blank');
                      } else if (btn.name === 'Gemini') {
                        prompt = \`I'm reading this page: "\${pageTitle}" at \${currentUrl}. Can you help me understand it better?\`;
                        window.open(\`\${btn.url}/app?q=\${encodeURIComponent(prompt)}\`, '_blank');
                      }
                    };
                    container.appendChild(link);
                  });

                  document.body.appendChild(container);
                }

                // Create buttons when page loads
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', createAIChatButtons);
                } else {
                  createAIChatButtons();
                }

                // Recreate on navigation (for SPA routing)
                let lastPath = window.location.pathname;
                setInterval(function() {
                  if (window.location.pathname !== lastPath) {
                    lastPath = window.location.pathname;
                    const existing = document.querySelector('.ai-chat-buttons');
                    if (existing) existing.remove();
                    createAIChatButtons();
                  }
                }, 500);
              })();
            `,
          },
        ],
      };
    },
  };
};
