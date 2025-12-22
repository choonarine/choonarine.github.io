interface SearchInputProps {
  query: string;
  onSearch: (value: string) => void;
}

export default function SearchInput(props: SearchInputProps) {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div class="mb-8">
      <input
        type="text"
        value={props.query}
        onInput={(e) => props.onSearch(e.currentTarget.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search posts..."
        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
