"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomeBreadcrumbItem;
var react_1 = require("react");
var Link_1 = require("@docusaurus/Link");
var useBaseUrl_1 = require("@docusaurus/useBaseUrl");
var Translate_1 = require("@docusaurus/Translate");
var Home_1 = require("@theme/Icon/Home");
var styles_module_css_1 = require("./styles.module.css");
function HomeBreadcrumbItem() {
    var homeHref = (0, useBaseUrl_1.default)('/');
    return (<li className="breadcrumbs__item">
      <Link_1.default aria-label={(0, Translate_1.translate)({
            id: 'theme.docs.breadcrumbs.home',
            message: 'Home page',
            description: 'The ARIA label for the home page in the breadcrumbs',
        })} className="breadcrumbs__link" href={homeHref}>
        <Home_1.default className={styles_module_css_1.default.breadcrumbHomeIcon}/>
      </Link_1.default>
    </li>);
}
