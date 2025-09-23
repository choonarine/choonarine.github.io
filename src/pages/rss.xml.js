import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: "choonarine.github.io",
		description: "This is the blog of choo narine.",
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}