import React from "react";
import {Redirect} from "@docusaurus/router";

// The front door moved to /welcome/ in the docs v3 IA. Azure serves a 301 for
// "/" (static/staticwebapp.config.json); this covers local and preview builds.
export default function Home() {
    return <Redirect to="/welcome/" />;
}
