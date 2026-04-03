<script lang="ts">
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants.ts";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
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

const icons = {
	[LIGHT_MODE]: "line-md:moon-alt-to-sunny-outline-loop-transition",
	[DARK_MODE]: "line-md:sunny-outline-to-moon-alt-loop-transition",
	[AUTO_MODE]: "line-md:computer-twotone",
};

onMount(() => {
	mode = getStoredTheme();
	const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
	const changeThemeWhenSchemeChanged: Parameters<
		typeof darkModePreference.addEventListener<"change">
	>[1] = (_e) => {
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
    <div class="absolute" class:opacity-0={mode !== LIGHT_MODE}>
        <Icon icon={icons[LIGHT_MODE]} class="text-[1.25rem]"></Icon>
    </div>
    <div class="absolute" class:opacity-0={mode !== DARK_MODE}>
        <Icon icon={icons[DARK_MODE]} class="text-[1.25rem]"></Icon>
    </div>
    <div class="absolute" class:opacity-0={mode !== AUTO_MODE}>
        <Icon icon={icons[AUTO_MODE]} class="text-[1.25rem]"></Icon>
    </div>
</button>
