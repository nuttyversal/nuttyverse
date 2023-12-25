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
		opsz: {
			control: {
				type: 'range',
				min: 12,
				max: 72,
				step: 1,
			},
		},
		wdth: {
			control: {
				type: 'range',
				min: 75,
				max: 125,
				step: 1,
			},
		},
		weight: {
			control: {
				type: 'range',
				min: 100,
				max: 900,
				step: 1,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Component: Story = {
	args: {
		children: 'Hello, world!',
		size: 'body',
		opsz: 18,
		wdth: 85,
		weight: 400,
	},
};
