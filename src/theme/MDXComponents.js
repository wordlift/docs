// Makes the WordLift components available in every MDX page without imports.
import MDXComponents from "@theme-original/MDXComponents";
import * as WordLift from "@site/src/components/wl";

export default {
    ...MDXComponents,
    ...WordLift,
};
