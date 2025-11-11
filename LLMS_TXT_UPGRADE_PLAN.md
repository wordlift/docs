# llms.txt & AI Chatbot Integration - Analysis & Implementation Plan

## Executive Summary

This document analyzes options for adding `llms.txt`/`llms-full.txt` generation and AI chatbot integration to the WordLift documentation site. We'll evaluate three main plugins and recommend an implementation strategy.

---

## 1. Plugin Options Analysis

### Option A: `docusaurus-plugin-llms-builder` (kingsword09)
**npm**: `docusaurus-plugin-llms-builder`
**Version**: 0.1.13 (latest)
**License**: MIT
**GitHub**: https://github.com/kingsword09/docusaurus-plugin-llms-builder

#### ✅ Pros
- **Most feature-rich**: Generates both `llms.txt` AND `llms-full.txt`
- **Comprehensive documentation**: Well-documented with detailed API reference
- **Flexible configuration**:
  - Multiple session support (docs + blog)
  - Pattern-based file filtering (include/exclude/order)
  - Custom hooks for build process customization
  - Extra session support for external links
- **Active development**: Latest commit Nov 2024
- **Full content support**: `llms-full.txt` includes complete markdown content, not just summaries
- **CLI command**: `npx docusaurus llms` for manual generation
- **Tested**: Has working examples and comprehensive test cases

#### ❌ Cons
- More complex configuration
- Newer plugin (less battle-tested)

#### Configuration Example
```js
plugins: [
  [
    "docusaurus-plugin-llms-builder",
    {
      version: "1.0.0",
      llmConfigs: [
        {
          title: "WordLift Developer Documentation",
          description: "Complete API and developer documentation for WordLift platform",
          summary: "Build SEO-winning applications with WordLift APIs, Knowledge Graphs, and AI integrations",
          sessions: [
            {
              type: "docs",
              docsDir: "docs",
              sessionName: "Documentation",
              sitemap: "sitemap.xml",
              patterns: {
                ignorePatterns: ["**/images/**", "**/downloads/**"],
                orderPatterns: [
                  "**/introduction.md",
                  "**/agent-wordlift/**",
                  "**/api/**"
                ]
              }
            }
          ],
          generateLLMsTxt: true,
          generateLLMsFullTxt: true,
          extraSession: {
            sessionName: "External Resources",
            extraLinks: [
              { title: "WordLift Homepage", link: "https://wordlift.io" },
              { title: "GitHub", link: "https://github.com/wordlift" }
            ]
          }
        }
      ]
    }
  ]
]
```

---

### Option B: `docusaurus-plugin-generate-llms-txt` (din0s)
**npm**: `docusaurus-plugin-generate-llms-txt`
**Version**: 0.0.1
**License**: MIT
**GitHub**: https://github.com/din0s/docusaurus-plugin-llms-txt

#### ✅ Pros
- **Simple**: Minimal configuration required
- **Lightweight**: Focused on single task
- **Automatic generation**: Runs on dev/build
- **Manual trigger**: Can run `yarn docusaurus generate-llms-txt`

#### ❌ Cons
- **Limited features**: Only generates `llms.txt` (no full version)
- **Assumptions about structure**: Requires `_category_.yml` files
- **Less flexible**: Limited filtering/ordering options
- **Very new**: Only released Nov 2024, less proven
- **Minimal documentation**: Basic README only

#### Configuration Example
```js
plugins: [
  [
    "docusaurus-plugin-generate-llms-txt",
    {
      outputFile: "llms.txt"
    }
  ]
]
```

---

### Option C: `@signalwire/docusaurus-plugin-llms-txt`
**npm**: `@signalwire/docusaurus-plugin-llms-txt`
**Version**: 1.2.2
**License**: MIT
**GitHub**: https://github.com/signalwire/docusaurus-plugins

#### ✅ Pros
- **Backed by SignalWire**: Established company support
- **Markdown conversion**: Converts HTML pages to Markdown
- **Index file**: Generates `llms.txt` index

#### ❌ Cons
- **Minimal public documentation**: Limited details on jsDelivr
- **Uncertain feature set**: Need to investigate source code
- **Less community feedback**: Fewer visible users/examples

---

## 2. AI Chatbot Integration Solutions

### Current Implementation
Your site already has:
- Custom chat widget plugin (`chatWidgetPlugin` in `docusaurus.config.js`)
- Microsoft Copilot Studio integration
- Fixed position bottom-right button

### Recommended Enhancements

#### Option 1: Per-Page Markdown Source & Chat Buttons (Custom Implementation)

Create a Docusaurus swizzled component or custom plugin to add action buttons on each doc page:

**Features to add**:
1. **View Markdown Source** button → Links to GitHub raw markdown
2. **Chat about this page** buttons for multiple chatbots:
   - ChatGPT (with page content pre-filled)
   - Claude (with page content pre-filled)
   - Your existing Copilot Studio bot
   - Gemini

**Implementation approach**:
```jsx
// src/theme/DocItem/Footer/index.js (swizzled component)
import React from 'react';
import { useDoc } from '@docusaurus/theme-common/internal';

export default function DocItemFooter() {
  const { metadata } = useDoc();
  const { editUrl, source } = metadata;

  const pageContent = document.querySelector('article').innerText;
  const pageUrl = window.location.href;
  const pageTitle = metadata.title;

  const chatBots = [
    {
      name: 'ChatGPT',
      url: `https://chat.openai.com/?q=${encodeURIComponent(`About ${pageTitle}: ${pageUrl}\n\n${pageContent.substring(0, 2000)}`)}`
    },
    {
      name: 'Claude',
      url: `https://claude.ai/new?q=${encodeURIComponent(`About ${pageTitle}: ${pageUrl}\n\n${pageContent.substring(0, 2000)}`)}`
    },
    {
      name: 'Gemini',
      url: `https://gemini.google.com/?q=${encodeURIComponent(`About ${pageTitle}: ${pageUrl}\n\n${pageContent.substring(0, 2000)}`)}`
    }
  ];

  return (
    <div className="doc-item-footer">
      <div className="doc-actions">
        <a href={source} className="button button--secondary">
          📄 View Markdown Source
        </a>
        <div className="chat-buttons">
          <span>Chat about this page:</span>
          {chatBots.map(bot => (
            <a
              key={bot.name}
              href={bot.url}
              target="_blank"
              className="button button--outline button--sm"
            >
              💬 {bot.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
```

#### Option 2: Enhanced Chat Widget

Extend your existing `chatWidgetPlugin` to:
1. Pass current page context to the iframe
2. Add a "Share to AI" menu in the chat widget
3. Pre-populate conversations with page content

---

## 3. Recommended Implementation Plan

### Phase 1: llms.txt Generation (Week 1)

**Recommendation: Use `docusaurus-plugin-llms-builder`**

Reasons:
1. ✅ Generates BOTH `llms.txt` and `llms-full.txt`
2. ✅ Most flexible configuration
3. ✅ Best documentation
4. ✅ Actively maintained
5. ✅ Supports your existing structure (docs + API docs)

**Steps**:
1. Install plugin
   ```bash
   npm install -D docusaurus-plugin-llms-builder
   ```

2. Add to `docusaurus.config.js`:
   ```js
   plugins: [
     // ... existing plugins
     [
       "docusaurus-plugin-llms-builder",
       {
         version: "1.0.0",
         llmConfigs: [
           {
             title: "WordLift Developer Documentation",
             description: "Complete API and developer documentation for WordLift platform",
             summary: "Build SEO-winning applications with WordLift APIs, Knowledge Graphs, and AI integrations",
             sessions: [
               {
                 type: "docs",
                 docsDir: "docs",
                 sessionName: "Documentation",
                 sitemap: "sitemap.xml",
                 patterns: {
                   // Exclude non-content files
                   ignorePatterns: [
                     "**/images/**",
                     "**/downloads/**",
                     "**/*.png",
                     "**/*.jpg"
                   ],
                   // Order: intro → agent → APIs → integrations
                   orderPatterns: [
                     "**/introduction.md",
                     "**/agent-wordlift/**",
                     "**/api/**",
                     "**/knowledge-graph/**",
                     "**/wordpress-plugin/**"
                   ]
                 }
               }
             ],
             generateLLMsTxt: true,
             generateLLMsFullTxt: true,
             extraSession: {
               sessionName: "WordLift Resources",
               extraLinks: [
                 {
                   title: "WordLift Homepage",
                   link: "https://wordlift.io",
                   description: "Main WordLift website"
                 },
                 {
                   title: "GitHub Organization",
                   link: "https://github.com/wordlift",
                   description: "WordLift open source repositories"
                 },
                 {
                   title: "Agent WordLift",
                   link: "https://wordlift.io/agent/",
                   description: "AI-powered SEO agent"
                 }
               ]
             }
           }
         ]
       }
     ]
   ]
   ```

3. Build and test:
   ```bash
   npm run build
   # Check for llms.txt and llms-full.txt in build/
   ```

4. Verify files:
   - `build/llms.txt` - Summary with links
   - `build/llms-full.txt` - Full content

5. Test manual generation:
   ```bash
   npx docusaurus llms
   ```

### Phase 2: Per-Page Chat & Source Buttons (Week 2)

**Implementation**:

1. **Swizzle the DocItem Footer component**:
   ```bash
   npm run swizzle @docusaurus/theme-classic DocItem/Footer -- --eject
   ```

2. **Create custom component** (`src/theme/DocItem/Footer/index.js`):
   ```jsx
   import React from 'react';
   import { useDoc } from '@docusaurus/theme-common/internal';
   import './styles.module.css';

   export default function DocItemFooter() {
     const { metadata } = useDoc();
     const { editUrl, title, permalink } = metadata;

     // Construct GitHub raw source URL
     const sourceUrl = editUrl ?
       editUrl.replace('tree/main', 'raw/main').replace('/edit/', '/') :
       null;

     const pageUrl = `https://docs.wordlift.io${permalink}`;

     const chatBots = [
       {
         name: 'ChatGPT',
         icon: '🤖',
         url: `https://chat.openai.com/?q=${encodeURIComponent(`I have a question about this WordLift documentation page: ${pageUrl}\n\nPage title: ${title}`)}`
       },
       {
         name: 'Claude',
         icon: '🧠',
         url: `https://claude.ai/new?q=${encodeURIComponent(`I have a question about this WordLift documentation page: ${pageUrl}\n\nPage title: ${title}`)}`
       },
       {
         name: 'Gemini',
         icon: '✨',
         url: `https://gemini.google.com/?q=${encodeURIComponent(`I have a question about this WordLift documentation page: ${pageUrl}\n\nPage title: ${title}`)}`
       }
     ];

     return (
       <footer className="wordlift-doc-footer">
         <div className="doc-footer-actions">
           {sourceUrl && (
             <a
               href={sourceUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="button button--secondary button--sm"
             >
               📄 View Markdown Source
             </a>
           )}

           <div className="chat-with-ai">
             <span className="chat-label">💬 Chat about this page:</span>
             <div className="chat-buttons">
               {chatBots.map(bot => (
                 <a
                   key={bot.name}
                   href={bot.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="button button--outline button--sm"
                   title={`Chat with ${bot.name}`}
                 >
                   {bot.icon} {bot.name}
                 </a>
               ))}
             </div>
           </div>
         </div>
       </footer>
     );
   }
   ```

3. **Add styles** (`src/theme/DocItem/Footer/styles.module.css`):
   ```css
   .wordlift-doc-footer {
     margin-top: 3rem;
     padding-top: 2rem;
     border-top: 1px solid var(--ifm-color-emphasis-300);
   }

   .doc-footer-actions {
     display: flex;
     flex-direction: column;
     gap: 1rem;
   }

   .chat-with-ai {
     display: flex;
     flex-direction: column;
     gap: 0.5rem;
   }

   .chat-label {
     font-weight: 600;
     color: var(--ifm-color-emphasis-700);
   }

   .chat-buttons {
     display: flex;
     flex-wrap: wrap;
     gap: 0.5rem;
   }

   @media (max-width: 768px) {
     .chat-buttons {
       flex-direction: column;
     }
   }
   ```

### Phase 3: Testing & Validation (Week 3)

1. **Test llms.txt files**:
   - Verify completeness
   - Check ordering
   - Test with AI tools (ChatGPT, Claude)

2. **Test chat buttons**:
   - All chatbot links work
   - Page context passed correctly
   - Mobile responsive

3. **Test markdown source button**:
   - Links to correct GitHub file
   - Opens in new tab

### Phase 4: Documentation & Rollout (Week 4)

1. Document the new features in `README.md`
2. Add mention in site introduction
3. Create blog post announcing llms.txt availability
4. Submit to llms.txt directory: https://llmstxt.org/

---

## 4. Additional Recommendations

### A. Optimize llms.txt Content

Add `patterns` configuration to focus on valuable content:

```js
patterns: {
  ignorePatterns: [
    "**/images/**",
    "**/downloads/**",
    "**/*.png",
    "**/*.jpg",
    "**/*.svg",
    "**/build/**",
    "**/node_modules/**"
  ],
  orderPatterns: [
    "**/introduction.md",          // Start here
    "**/agent-wordlift/index.md",  // Core product
    "**/agent-wordlift/**",        // Agent docs
    "**/api/**",                   // API reference
    "**/knowledge-graph/**",       // KG features
    "**/content-generation/**",    // Content features
    "**/wordpress-plugin/**",      // Plugin docs
    "**/**"                        // Everything else
  ]
}
```

### B. Add llms.txt Link to Site

Update `docusaurus.config.js` navbar or footer:

```js
footer: {
  links: [
    // ... existing links
    {
      title: "For AI",
      items: [
        {
          label: "llms.txt",
          href: "/llms.txt"
        },
        {
          label: "llms-full.txt",
          href: "/llms-full.txt"
        }
      ]
    }
  ]
}
```

### C. Submit to llms.txt Directory

Once deployed, register at: https://llmstxt.org/

---

## 5. Cost-Benefit Analysis

| Feature | Effort | Impact | Priority |
|---------|--------|--------|----------|
| llms.txt generation | Low (1-2 days) | High | **P0** |
| llms-full.txt generation | Included | Medium | **P0** |
| Markdown source button | Medium (2-3 days) | Medium | **P1** |
| Chat buttons | Medium (2-3 days) | High | **P1** |
| Mobile optimization | Low (1 day) | Medium | **P2** |

---

## 6. Success Metrics

### Technical Metrics
- [ ] `llms.txt` file generated successfully
- [ ] `llms-full.txt` file generated successfully
- [ ] Files update automatically on build
- [ ] All doc pages included (verify count)
- [ ] Proper ordering maintained

### User Metrics
- [ ] Chat buttons clickthrough rate
- [ ] Markdown source views
- [ ] AI chatbot engagement
- [ ] Mobile usability score

---

## 7. Timeline Summary

- **Week 1**: Install and configure `docusaurus-plugin-llms-builder`
- **Week 2**: Implement per-page buttons (swizzle + component)
- **Week 3**: Testing and refinement
- **Week 4**: Documentation and rollout

**Total estimated effort**: 2-3 weeks for full implementation

---

## 8. Final Recommendation

**Primary choice**: `docusaurus-plugin-llms-builder`

**Reasoning**:
1. Most comprehensive feature set
2. Generates both llms.txt AND llms-full.txt
3. Excellent documentation
4. Active development
5. Flexible enough for WordLift's complex structure

**Backup option**: If `docusaurus-plugin-llms-builder` has issues, fall back to `@signalwire/docusaurus-plugin-llms-txt` (backed by established company).

---

## 9. Next Steps

1. **Decision**: Approve this plan ✅
2. **Action**: Begin Phase 1 implementation
3. **Review**: After Phase 1, validate llms.txt quality
4. **Continue**: Proceed to Phase 2 (chat buttons)

---

## Appendix: Alternative Solutions Considered

### DIY Approach
- **Pros**: Full control, no dependencies
- **Cons**: High effort, maintenance burden
- **Verdict**: Not recommended given good plugin options

### Other Plugins
- `docusaurus-plugin-llms` (rachfop): Mentioned in related projects but limited docs
- Custom scraping: Too fragile, breaks on structure changes

---

**Document Version**: 1.0
**Date**: November 11, 2025
**Author**: GitHub Copilot
**Status**: Proposal - Awaiting Approval
