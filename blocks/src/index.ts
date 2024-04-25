// Import CSS reset as a side effect.
import "~/styles/reset.css";

import { colors } from "~/styles/themes/contract.css";
import { spacing } from "~/styles/tokens/spacing";
import { experimentalTypeScale } from "~/styles/tokens/typography";

import { Button } from "~/atoms/Button";
import { Chibi } from "~/atoms/Chibi";
import { Image } from "~/atoms/Image";
import { ListItem, OrderedList, UnorderedList } from "~/atoms/List";
import { Logo } from "~/atoms/Logo";
import { Marquee } from "~/atoms/Marquee";
import { Text } from "~/atoms/Text";

import { ChibiButton } from "~/molecules/ChibiButton";
import { Introduction } from "~/molecules/Introduction";
import { MessageOfTheDay } from "./molecules/MessageOfTheDay";

import { Header } from "~/organisms/Header";
import { Singularity } from "~/organisms/Singularity";

import { useThemeSwitcher } from "~/styles/themes/contract";

export {
	// Tokens
	colors,
	spacing,
	experimentalTypeScale,

	// Atoms
	Button,
	Chibi,
	Image,
	ListItem,
	OrderedList,
	UnorderedList,
	Logo,
	Marquee,
	Text,

	// Molecules
	ChibiButton,
	Introduction,
	MessageOfTheDay,

	// Organisms
	Header,
	Singularity,

	// Utilities
	useThemeSwitcher,
};
