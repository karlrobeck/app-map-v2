import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import type { GeoJsonCoordinates } from "../app";
import type { TypedPocketBase } from "./pocketbase";
import PocketBase from "pocketbase";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return `${str}${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export function calculateDistance(coord1: GeoJsonCoordinates, coord2: GeoJsonCoordinates): number {
	const toRad = (value: number) => value * Math.PI / 180;

	const lat1 = toRad(coord1.lat);
	const lon1 = toRad(coord1.long);
	const lat2 = toRad(coord2.lat);
	const lon2 = toRad(coord2.long);

	const dLat = lat2 - lat1;
	const dLon = lon2 - lon1;

	const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	// Earth radius in kilometers
	const R = 6371;
	return R * c;
}

export function convertStringToCode(input: string) {
	// Split the input into an array of words
	const words = input.split(' ');

	// Initialize an array to store the result parts
	const result = [];

	// Iterate over the words
	for (const word of words) {
		if (word !== '' && !word.match(/^[0-9a-z]+$/)) {
			// If the word is alphabetic, take the first letter
			result.push(word.charAt(0));
		} else {
			// If the word is numeric, keep the number
			result.push(word);
		}
	}

	// Join the result with a hyphen
	return result.join('-');
}

export const pb = new PocketBase(import.meta.env.DEV ? 'http://localhost:8090' : '/') as TypedPocketBase;