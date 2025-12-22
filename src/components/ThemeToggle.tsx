import { createSignal, createEffect, onMount, type Component } from 'solid-js';

type Theme = 'light' | 'dark';

export const ThemeToggle: Component = () => {
  const [theme, setTheme] = createSignal<Theme>('light');
  const [mounted, setMounted] = createSignal(false);

  // Get theme preference
  const getThemePreference = (): Theme => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null;
      if (stored) return stored;
    }
    
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return 'light';
  };

  // Initialize theme on mount
  onMount(() => {
    const initialTheme = getThemePreference();
    setTheme(initialTheme);
    setMounted(true);
  });

  // Update DOM when theme changes
  createEffect(() => {
    if (!mounted()) return;
    
    const currentTheme = theme();
    const html = document.documentElement;
    
    if (currentTheme === 'dark') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {/* Sun icon (light mode) */}
      <svg
        class={`w-5 h-5 transition-opacity duration-200 ${theme() === 'dark' ? 'opacity-0 absolute' : 'opacity-100'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon (dark mode) */}
      <svg
        class={`w-5 h-5 transition-opacity duration-200 ${theme() === 'light' ? 'opacity-0 absolute' : 'opacity-100'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
};
