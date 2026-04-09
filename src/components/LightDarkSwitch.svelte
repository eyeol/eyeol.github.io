<script lang="ts">
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants.ts";
import Icon from "@iconify/svelte";
import {
	applyThemeToDocument,
	getStoredTheme,
	setTheme,
} from "@utils/setting-utils.ts";
import { onMount } from "svelte";
import type { LIGHT_DARK_MODE } from "@/types/config.ts";

const seq: LIGHT_DARK_MODE[] = [LIGHT_MODE, DARK_MODE];
let mode: LIGHT_DARK_MODE = $state(AUTO_MODE);
let systemDark: boolean = $state(false);
const icons: Record<LIGHT_DARK_MODE, string> = {
	[LIGHT_MODE]: "line-md:moon-alt-to-sunny-outline-loop-transition",
	[DARK_MODE]: "line-md:sunny-outline-to-moon-alt-loop-transition",
	[AUTO_MODE]: "line-md:computer-twotone",
};

let displayMode = $derived(mode === AUTO_MODE ? (systemDark ? DARK_MODE : LIGHT_MODE) : mode);

onMount(() => {
	mode = getStoredTheme();
	const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
	systemDark = darkModePreference.matches;
	const changeThemeWhenSchemeChanged: Parameters<
		typeof darkModePreference.addEventListener<"change">
	>[1] = (_e) => {
		systemDark = darkModePreference.matches;
		applyThemeToDocument(mode);
	};
	darkModePreference.addEventListener("change", changeThemeWhenSchemeChanged);
	return () => {
		darkModePreference.removeEventListener(
			"change",
			changeThemeWhenSchemeChanged,
		);
	};
});

function switchScheme(newMode: LIGHT_DARK_MODE) {
	mode = newMode;
	setTheme(newMode);
}

function toggleScheme() {
	let i = 0;
	for (; i < seq.length; i++) {
		if (seq[i] === mode) {
			break;
		}
	}
	switchScheme(seq[(i + 1) % seq.length]);
}

</script>

<button aria-label="Light/Dark Mode" class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" id="scheme-switch" onclick={toggleScheme}>
    <div class="absolute inset-0 flex items-center justify-center">
        <Icon icon={icons[displayMode]} class="block text-[1.25rem]" />
    </div>
</button>
