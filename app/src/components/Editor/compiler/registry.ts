import { CodeBlock } from "~/components/CodeBlock";
import { Link } from "~/components/Link";

/**
 * A component registry that maps component names to components.
 * Components must be registered here to be used in MDX content.
 */
const componentRegistry = {
	CodeBlock,
	Link,
};

export { componentRegistry };
