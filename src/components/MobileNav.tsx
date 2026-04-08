import { createSignal, For, Show, type Component } from 'solid-js';

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  items: NavItem[];
  pathname: string;
}

export const MobileNav: Component<MobileNavProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const openMenu = () => {
    setIsOpen(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  return (
    <>
      <button
        onClick={openMenu}
        aria-label="Toggle navigation menu"
        class="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 md:hidden"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <Show when={isOpen()}>
        <div class="fixed inset-0 z-40 bg-black/40 md:hidden">
          <div class="fixed bottom-0 right-0 top-0 flex w-64 flex-col border-l border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div class="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
              <h2 class="text-lg font-semibold">Menu</h2>
              <button
                onClick={closeMenu}
                aria-label="Close navigation menu"
                class="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <nav class="flex-1 space-y-2 overflow-y-auto px-6 py-4">
              <For each={props.items}>
                {(item) => {
                  const active = props.pathname === item.href || (item.href === '/posts' && props.pathname.startsWith('/posts'));

                  return (
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      class={`block px-1 py-2 no-underline hover:underline ${active ? 'underline' : ''}`}
                    >
                      {item.label}
                    </a>
                  );
                }}
              </For>
            </nav>

            <div class="border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
              <form action="/search" method="get" class="flex items-center">
                <input
                  type="text"
                  name="q"
                  placeholder="Search..."
                  class="w-full border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-zinc-100"
                />
              </form>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};
