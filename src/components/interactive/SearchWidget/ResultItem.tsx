import { For } from 'solid-js';
import type { SearchResult } from './hooks';

interface ResultItemProps {
  item: SearchResult;
}

export default function ResultItem(props: ResultItemProps) {
  return (
    <article class="border-b border-gray-200 dark:border-gray-800 pb-6 mb-6 last:border-b-0">
      <a href={`/posts/${props.item.slug}`} class="block group">
        <h2 class="text-2xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
          {props.item.title}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
          {props.item.description}
        </p>
      </a>
      <div class="flex flex-wrap gap-2">
        <a
          href={`/categories/${props.item.category.toLowerCase().replace(/\s+/g, '-')}`}
          class="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full text-sm font-semibold transition-colors"
        >
          {props.item.category}
        </a>
        <For each={props.item.tags || []}>
          {(tag) => (
            <a
              href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              class="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm transition-colors"
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
