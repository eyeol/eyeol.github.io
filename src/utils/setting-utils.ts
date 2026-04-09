import {
	AUTO_MODE,
	DARK_MODE,
	DEFAULT_THEME,
	LIGHT_MODE,
} from "@constants/constants.ts";
import { expressiveCodeConfig, siteConfig } from "@/config";
import type { LIGHT_DARK_MODE } from "@/types/config";

function readStorage(key: string): string | null {
	if (typeof localStorage === "undefined") {
		return null;
	}
	return localStorage.getItem(key);
}

export function getDefaultHue(): number {
	const fallback = String(siteConfig.themeColor.hue);
	if (typeof document === "undefined") {
		return Number.parseInt(fallback, 10);
	}
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback, 10);
}

export function getHue(): number {
	if (siteConfig.themeColor.fixed) {
		return getDefaultHue();
	}
	const stored = readStorage("hue");
	return stored ? Number.parseInt(stored, 10) : getDefaultHue();
}

export function setHue(hue: number): void {
	if (typeof document === "undefined") {
		return;
	}

	const nextHue = siteConfig.themeColor.fixed ? getDefaultHue() : hue;

	if (typeof localStorage !== "undefined") {
		if (siteConfig.themeColor.fixed) {
			localStorage.removeItem("hue");
		} else {
			localStorage.setItem("hue", String(nextHue));
		}
	}

	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--hue", String(nextHue));
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
	if (typeof document === "undefined") {
		return;
	}

	switch (theme) {
		case LIGHT_MODE:
			document.documentElement.classList.remove("dark");
			break;
		case DARK_MODE:
			document.documentElement.classList.add("dark");
			break;
		case AUTO_MODE:
			if (typeof window === "undefined") {
				return;
			}
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			break;
	}

	// Set the theme for Expressive Code
	document.documentElement.setAttribute(
		"data-theme",
		expressiveCodeConfig.theme,
	);
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
	if (typeof localStorage !== "undefined") {
		localStorage.setItem("theme", theme);
	}
	applyThemeToDocument(theme);
}

export function getStoredTheme(): LIGHT_DARK_MODE {
	return (readStorage("theme") as LIGHT_DARK_MODE) || DEFAULT_THEME;
}

export function syncThemeAndHue(): void {
	applyThemeToDocument(getStoredTheme());
	setHue(getHue());
}
