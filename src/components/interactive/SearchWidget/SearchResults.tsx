import { Show, For } from 'solid-js';
import ResultItem from './ResultItem';
import type { SearchResult } from './hooks';

interface SearchResultsProps {
  results: SearchResult[];
  showInitial: boolean;
}

export default function SearchResults(props: SearchResultsProps) {
  return (
    <div id="search-results">
      <Show
        when={props.showInitial}
        fallback={
          <Show
            when={props.results.length > 0}
            fallback={<p class="text-gray-600 dark:text-gray-400">No results found.</p>}
          >
            <For each={props.results}>
              {(item) => <ResultItem item={item} />}
            </For>
          </Show>
        }
      >
        <p class="text-gray-600 dark:text-gray-400">Enter a search query to see results.</p>
      </Show>
    </div>
  );
}
