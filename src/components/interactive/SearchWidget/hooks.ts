import { createSignal, onMount } from 'solid-js';
import Fuse from 'fuse.js';

export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

export function useSearch() {
  const [query, setQuery] = createSignal('');
  const [results, setResults] = createSignal<SearchResult[]>([]);
  const [fuse, setFuse] = createSignal<Fuse<SearchResult> | null>(null);
  const [showInitial, setShowInitial] = createSignal(true);

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');

    try {
      const response = await fetch('/search-index.json');
      const searchIndex: SearchResult[] = await response.json();

      const fuseInstance = new Fuse<SearchResult>(searchIndex, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'description', weight: 2 },
          { name: 'tags', weight: 1.5 },
          { name: 'category', weight: 1.5 },
          { name: 'content', weight: 1 }
        ],
        threshold: 0.3,
        includeScore: true,
        minMatchCharLength: 2
      });

      setFuse(fuseInstance);

      if (initialQuery && initialQuery.length >= 2) {
        setQuery(initialQuery);
        performSearch(initialQuery, fuseInstance);
      }
    } catch (error) {
      console.error('Failed to load search index:', error);
    }
  });

  const performSearch = (q: string, fuseInstance?: Fuse<SearchResult> | null) => {
    const instance = fuseInstance || fuse();

    if (!q || q.trim().length < 2) {
      setShowInitial(true);
      setResults([]);
      return;
    }

    if (!instance) {
      setResults([]);
      return;
    }

    setShowInitial(false);
    const searchResults = instance.search(q).map(r => r.item);
    setResults(searchResults);

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('q', q);
    window.history.replaceState({}, '', newUrl);
  };

  let debounceTimer: number | undefined;
  const handleSearch = (value: string) => {
    setQuery(value);
    clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  return {
    query,
    results,
    showInitial,
    handleSearch
  };
}
