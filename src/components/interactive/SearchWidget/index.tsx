import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import { useSearch } from './hooks';

export default function SearchWidget() {
  const { query, results, showInitial, handleSearch } = useSearch();

  return (
    <div>
      <h1 class="text-4xl font-bold mb-8">Search</h1>
      <SearchInput query={query()} onSearch={handleSearch} />
      <SearchResults results={results()} showInitial={showInitial()} />
    </div>
  );
}
