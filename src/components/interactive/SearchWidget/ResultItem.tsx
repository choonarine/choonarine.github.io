import { For } from 'solid-js';
import type { SearchResult } from './hooks';

interface ResultItemProps {
  item: SearchResult;
}

export default function ResultItem(props: ResultItemProps) {
  return (
    <article class="border-b border-zinc-200 pb-6 mb-6 last:border-b-0 dark:border-zinc-800">
      <a href={`/posts/${props.item.slug}`} class="block group">
        <h2 class="text-2xl font-semibold mb-3 group-hover:underline">
          {props.item.title}
        </h2>
        <p class="text-zinc-700 dark:text-zinc-300 mb-3 leading-relaxed">
          {props.item.description}
        </p>
      </a>
      <div class="flex flex-wrap gap-2">
        <a
          href={`/categories/${props.item.category.toLowerCase().replace(/\s+/g, '-')}`}
          class="inline-flex items-center border border-zinc-300 px-2 py-1 text-sm font-medium no-underline hover:underline dark:border-zinc-700"
        >
          {props.item.category}
        </a>
        <For each={props.item.tags || []}>
          {(tag) => (
            <a
              href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              class="inline-flex items-center gap-1 border border-zinc-300 px-2 py-1 text-sm text-zinc-700 no-underline hover:underline dark:border-zinc-700 dark:text-zinc-300"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              {tag}
            </a>
          )}
        </For>
      </div>
    </article>
  );
}
