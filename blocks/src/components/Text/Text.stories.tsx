import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';
import { text } from './Text.css';

const meta: Meta<typeof Text> = {
	component: Text,
	argTypes: {
		children: {
			control: {
				type: 'text',
			},
		},
		size: {
			control: {
				type: 'select',
			},
			options: Object.keys(text.classNames.variants.size),
		},
	},
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Component: Story = {
	args: {
		children: 'Hello, world!',
		size: 'body',
	},
};
