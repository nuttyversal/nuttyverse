import { CodeBlock } from "~/components/CodeBlock";
import { Link } from "~/components/Link";
import { VimSpell } from "~/components/Editor/VimSpell";
import { Icon } from "~/components/Icon";

/**
 * A component registry that maps component names to components.
 * Components must be registered here to be used in MDX content.
 */
const componentRegistry = {
	CodeBlock,
	Icon,
	Link,
	VimSpell,
};

export { componentRegistry };
