// WordLift MDX components (layer 2). Registered globally in
// src/theme/MDXComponents.js, so pages use them without imports:
//
//   <Cards cols={3}>
//     <Card title="Developer" href="/welcome/paths/developer/" eyebrow="Path" accent="sky">
//       Go straight to access, authentication and the APIs.
//     </Card>
//   </Cards>
//
//   <Tag type="enterprise" />   <Tag type="early-access" />   <Tag>Any label</Tag>
//
//   <Steps>
//     <Step title="Log in to the Dashboard">Sign in at my.wordlift.io.</Step>
//     <Step title="Configure SSO" tag="enterprise">Set up SAML single sign-on.</Step>
//   </Steps>
//
//   | Capability | Business+ | Enterprise |
//   | --- | --- | --- |
//   | SAML single sign-on | <No /> | <Yes /> |
//
//   <PlatformDiagram />

import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

const ACCENTS = ["sky", "moss", "berry", "leaf", "sand", "petal"];

export function Cards({ cols = 3, children }) {
    return (
        <div className={styles.cards} style={{ "--wl-cards-cols": cols }}>
            {children}
        </div>
    );
}

export function Card({ title, href, eyebrow, accent, tag, children }) {
    return (
        <div className={clsx(styles.card, ACCENTS.includes(accent) && styles[`accent_${accent}`])}>
            {(eyebrow || tag) && (
                <div className={styles.cardMeta}>
                    {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
                    {tag && <Tag type={tag} />}
                </div>
            )}
            <h3 className={styles.cardTitle}>
                {href ? (
                    <Link to={href} className={styles.cardLink}>
                        {title}
                    </Link>
                ) : (
                    title
                )}
            </h3>
            {children && <div className={styles.cardBody}>{children}</div>}
        </div>
    );
}

const TAGS = {
    enterprise: { label: "Enterprise", tone: "moss" },
    "business-plus": { label: "Business+", tone: "sky" },
    "early-access": { label: "Early Access", tone: "berry" },
};

export function Tag({ type, tone, children }) {
    const preset = TAGS[type] || {};
    const resolvedTone = tone || preset.tone || "neutral";
    return (
        <span className={clsx(styles.tag, styles[`tag_${resolvedTone}`])}>
            {children || preset.label || type}
        </span>
    );
}

export function Steps({ children }) {
    return <ol className={styles.steps}>{children}</ol>;
}

export function Step({ title, tag, children }) {
    const tags = Array.isArray(tag) ? tag : tag ? [tag] : [];
    return (
        <li className={styles.step}>
            <div className={styles.stepHead}>
                <span className={styles.stepTitle}>{title}</span>
                {tags.map((t) => (
                    <Tag key={t} type={t} />
                ))}
            </div>
            {children && <div className={styles.stepBody}>{children}</div>}
        </li>
    );
}

function Mark({ included, children }) {
    return (
        <span className={clsx(styles.mark, included ? styles.markYes : styles.markNo)}>
            <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.markIcon}>
                {included ? (
                    <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
                ) : (
                    <path d="M4 8h8" />
                )}
            </svg>
            <span>{children || (included ? "Included" : "Not included")}</span>
        </span>
    );
}

export function Yes({ children }) {
    return <Mark included>{children}</Mark>;
}

export function No({ children }) {
    return <Mark included={false}>{children}</Mark>;
}

export function PlatformDiagram() {
    return (
        <figure className={styles.diagram}>
            <svg
                viewBox="0 0 760 300"
                role="img"
                aria-label="Data Sources feed the Knowledge Graph, the memory. Agent WordLift, the agentic AI, works on the graph. The graph publishes structured data on your website. You reach everything through the Dashboard, interfaces and tools, integrations, and the APIs and SDKs."
            >
                <defs>
                    <marker id="wl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M0,0 L10,5 L0,10 z" className={styles.dHead} />
                    </marker>
                </defs>

                <rect x="0" y="40" width="180" height="76" rx="12" className={styles.dBox} />
                <text x="20" y="66" className={styles.dLabel}>INPUT</text>
                <text x="20" y="90" className={styles.dTitle}>Data Sources</text>
                <text x="20" y="107" className={styles.dSub}>site, search, analytics, products</text>

                <line x1="180" y1="78" x2="268" y2="78" className={styles.dLine} markerEnd="url(#wl-arrow)" />
                <text x="224" y="68" textAnchor="middle" className={styles.dEdge}>feed</text>

                <rect x="270" y="28" width="220" height="100" rx="12" className={styles.dSky} />
                <text x="290" y="56" className={clsx(styles.dLabel, styles.dLabelSky)}>MEMORY</text>
                <text x="290" y="82" className={styles.dTitle}>Knowledge Graph</text>
                <text x="290" y="100" className={styles.dSub}>entities, relationships,</text>
                <text x="290" y="116" className={styles.dSub}>structured data, context</text>

                <line x1="490" y1="78" x2="578" y2="78" className={styles.dLine} markerEnd="url(#wl-arrow)" />
                <text x="534" y="68" textAnchor="middle" className={styles.dEdge}>context</text>

                <rect x="580" y="40" width="180" height="76" rx="12" className={styles.dMoss} />
                <text x="600" y="66" className={clsx(styles.dLabel, styles.dLabelMoss)}>AGENTIC AI</text>
                <text x="600" y="90" className={styles.dTitle}>Agent WordLift</text>
                <text x="600" y="107" className={styles.dSub}>workflows and tools</text>

                <line x1="380" y1="128" x2="380" y2="172" className={styles.dLine} markerEnd="url(#wl-arrow)" />
                <text x="392" y="155" className={styles.dEdge}>publishes</text>

                <rect x="270" y="174" width="220" height="56" rx="12" className={styles.dBox} />
                <text x="290" y="198" className={styles.dTitle}>Your website</text>
                <text x="290" y="216" className={styles.dSub}>JSON-LD via WordLift Cloud or Data API</text>

                <line x1="0" y1="256" x2="760" y2="256" className={styles.dRule} />
                <text x="0" y="284" className={styles.dLabel}>ACCESS</text>
                <text x="90" y="284" className={styles.dSub}>Dashboard</text>
                <text x="200" y="284" className={styles.dSub}>Interfaces and tools</text>
                <text x="360" y="284" className={styles.dSub}>Integrations</text>
                <text x="480" y="284" className={styles.dSub}>APIs and SDKs</text>
            </svg>
        </figure>
    );
}
