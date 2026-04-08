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
        class="w-full border border-zinc-300 bg-white px-4 py-2 focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-zinc-100"
      />
    </div>
  );
}
