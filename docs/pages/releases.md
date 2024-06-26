---
displayed_sidebar: wordpress-plugin
---

# Releases

This section is dedicated to the latest *versions* of the plugin. Here you can keep track of everything that is happening with the developemnt of the plugin: read the *changelog* and discover *fixes and enhancements*.

**WordLift** developement is **open source** and we love to have you as contributor to both source code and issues; with your help we can make WordLift even better 🎉. Here is the link to [GitHub](https://github.com/insideout10/wordlift-plugin) and here you can find [the guidelines for contributing](https://github.com/insideout10/wordlift-plugin/blob/develop/CONTRIBUTING) to the repository.

Just spotted any *creeping bug* or some *bothering issue*? Help us to smash it down: [report bugs and issues to us in detail on GitHub](https://github.com/insideout10/wordlift-plugin/issues/new). Thank you 💙

## WordLift 3.19 (2018-05-26)

The WordLift 3.19 release has been published in May 2018 and we had minor sub-releases since then. WordLift now works very well with *Accelerated Mobile Pages* and you can read all about it from our blog [AMP and Structured Data](https://wordlift.io/blog/en/amp-structured-data/). A lot has been done also to optimise the structured data for images and to keep in sync the knowledge graph.

[Download the latest release](https://wordpress.org/plugins/wordlift/) now from WordPress.org or update it automatically from the administration panel of your website.

## WordLift 3.18 (2018-03-20)

The WordLift 3.18 release is now available. We have introduced the new entity type for [Offer](/pages/edit-entity#edit-a-offer) and the support for the property `performer` on the entity type [Event](/pages/edit-entity#edit-an-event). The [glossary widget](/pages/discover#the-glossary-widget) has also been improved and it now supports a new option to let you display all the entities that belong to a specific WordPress Category. Above all, WordLift's Knowledge Graph got better 😉 the plugin now stores in RDF the link between entities and articles.

[Download the latest release](https://wordpress.org/plugins/wordlift/) now from WordPress.org or update it automatically from the administration panel of your website.

Have a look to the full [changelog on GitHub](https://github.com/insideout10/wordlift-plugin/issues?q=is%3Aopen+is%3Aissue+milestone%3A3.18) for this release.

Read the latest article on our blog on how a [smarter knowledge graph can improve SEO on your website](https://wordlift.io/blog/en/knowledge-graph-seo/).

## WordLift 3.13.3 (2017-07-12)

The WordLift 3.13.3 release is now available. The biggest news is that you can turn *on* and *off* WordLift’s analysis (and annotations) anytime you like. Say you are opening an article for a quick typo edit, you can now simply disable WordLift and avoid the analysis to run. Just click on the small arrow on the top-right corner of the WordLift’s widget. See how it works in the *.gif* below:

![image](./images/wl_toggle_3-13-3.gif)

[Download the latest release](https://wordpress.org/plugins/wordlift/) now from WordPress.org or update it automatically from the administration panel of your website.

Have a look to the full [changelog on GitHub](https://github.com/insideout10/wordlift-plugin/issues?utf8=%E2%9C%93&q=is%3Aclosed%20milestone%3A3.13.3%20) for this release:

- Enhancement: #558: Link to the settings page in the message about unset key.
- Enhancement: #412: Add a toggle to disable WordLift’s analysis on certain pages/post.

## WordLift 3.13.2 (2017-07-9)

The WordLift 3.13.2 release is now available. The biggest news is that now *cron* has been replaced and the synchronization between WordPress and the Linked Data cloud is more reliable for everyone! We used *cron* to execute SPARQL queries from WordPress to the Linked Data Platform of WordLift. To replace *cron* we used an open source component originally developed by the team at TechCrunch 🙌.

[Download the latest release](https://wordpress.org/plugins/wordlift/) now from WordPress.org or update it automatically from the administration panel of your website.

Have a look to the full [changelog on GitHub](https://github.com/insideout10/wordlift-plugin/issues?utf8=%E2%9C%93&q=is%3Aclosed%20milestone%3A3.13.2%20) for this release:

- Fix: #575: Cron is unreliable on some web sites.
- Fix: #576: Error 404 on a WooCommerce Product Page.
- Fix: #571: Faceted Search not displaying correctly.
- Fix: #568: Trying to get property of non-object in class-wordlift-sharethis-service.php.

## Helpful links

- [WordLift Plugin on GitHub](https://github.com/insideout10/wordlift-plugin)
- [Contributing guidelines of the repository](https://github.com/insideout10/wordlift-plugin/blob/develop/CONTRIBUTING)
- [WordLift official website](https://wordlift.io)
- [The Plugin in the WordPress repository](https://wordpress.org/plugins/wordlift/#developers)
- [Translate WordLift in other languages](https://translate.wordpress.org/projects/wp-plugins/wordlift)
