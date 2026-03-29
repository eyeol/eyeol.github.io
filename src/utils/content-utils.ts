import { type CollectionEntry, getCollection } from "astro:content";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getCategoryUrl } from "@utils/url-utils.ts";

// // Retrieve posts and sort them by publication date
async function getRawSortedPosts() {
	const allBlogPosts = await getCollection("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const sorted = allBlogPosts.sort((a, b) => {
		const dateA = new Date(a.data.published);
		const dateB = new Date(b.data.published);
		return dateA > dateB ? -1 : 1;
	});
	return sorted;
}

export async function getSortedPosts() {
	const sorted = await getRawSortedPosts();

	for (let i = 1; i < sorted.length; i++) {
		sorted[i].data.nextSlug = sorted[i - 1].slug;
		sorted[i].data.nextTitle = sorted[i - 1].data.title;
	}
	for (let i = 0; i < sorted.length - 1; i++) {
		sorted[i].data.prevSlug = sorted[i + 1].slug;
		sorted[i].data.prevTitle = sorted[i + 1].data.title;
	}

	return sorted;
}
export type PostForList = {
	slug: string;
	data: CollectionEntry<"posts">["data"];
};
export async function getSortedPostsList(): Promise<PostForList[]> {
	const sortedFullPosts = await getRawSortedPosts();

	// delete post.body
	const sortedPostsList = sortedFullPosts.map((post) => ({
		slug: post.slug,
		data: post.data,
	}));

	return sortedPostsList;
}
export type Tag = {
	name: string;
	count: number;
};

export async function getTagList(): Promise<Tag[]> {
	const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const countMap: { [key: string]: number } = {};
	allBlogPosts.forEach((post: { data: { tags: string[] } }) => {
		post.data.tags.forEach((tag: string) => {
			if (!countMap[tag]) countMap[tag] = 0;
			countMap[tag]++;
		});
	});

	// sort tags
	const keys: string[] = Object.keys(countMap).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	return keys.map((key) => ({ name: key, count: countMap[key] }));
}

export type Category = {
	name: string;
	count: number;
	url: string;
};

export type CategoryNode = {
	name: string;
	count: number;
	url: string;
	children: CategoryNode[];
};

export async function getCategoryList(): Promise<Category[]> {
	const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
	const count: { [key: string]: number } = {};
	allBlogPosts.forEach((post: { data: { category: string | null } }) => {
		if (!post.data.category) {
			const ucKey = i18n(I18nKey.uncategorized);
			count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1;
			return;
		}

		const categoryName =
			typeof post.data.category === "string"
				? post.data.category.trim()
				: String(post.data.category).trim();

		count[categoryName] = count[categoryName] ? count[categoryName] + 1 : 1;
	});

	const lst = Object.keys(count).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	const ret: Category[] = [];
	for (const c of lst) {
		ret.push({
			name: c,
			count: count[c],
			url: getCategoryUrl(c),
		});
	}
	return ret;
}

export async function getCategoryTree(): Promise<CategoryNode[]> {
	const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const tree = new Map<
		string,
		{ count: number; children: Map<string, number> }
	>();

	for (const post of allBlogPosts) {
		const category = post.data.category?.trim();
		if (!category) continue;

		if (!tree.has(category)) {
			tree.set(category, { count: 0, children: new Map() });
		}

		const node = tree.get(category);
		if (!node) continue;
		node.count++;

		const sub = post.data.subcategory?.trim();
		if (sub) {
			node.children.set(sub, (node.children.get(sub) || 0) + 1);
		}
	}

	const CATEGORY_ORDER: Record<string, number> = {
		Diary: 0,
		CS: 1,
		DSA: 2,
		AI: 3,
		Dev: 4,
	};

	const SUBCATEGORY_ORDER: Record<string, Record<string, number>> = {
		AI: { Foundation: 0, NLP: 1, CV: 2 },
		CS: { OS: 0, CA: 1, DB: 2, Network: 3 },
		Dev: { frontend: 0, backend: 1, study: 2 },
	};

	const sorted = [...tree.keys()].sort((a, b) => {
		const orderA = CATEGORY_ORDER[a] ?? 999;
		const orderB = CATEGORY_ORDER[b] ?? 999;
		if (orderA !== orderB) return orderA - orderB;
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	return sorted.flatMap((cat) => {
		const node = tree.get(cat);
		if (!node) return [];
		const subOrder = SUBCATEGORY_ORDER[cat] ?? {};
		const children = [...node.children.keys()]
			.sort((a, b) => {
				const oA = subOrder[a] ?? 999;
				const oB = subOrder[b] ?? 999;
				if (oA !== oB) return oA - oB;
				return a.toLowerCase().localeCompare(b.toLowerCase());
			})
			.map((sub) => ({
				name: sub,
				count: node.children.get(sub) ?? 0,
				url: getCategoryUrl(cat, sub),
				children: [],
			}));

		return {
			name: cat,
			count: node.count,
			url: getCategoryUrl(cat),
			children,
		};
	});
}
