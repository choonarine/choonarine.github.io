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
      {/* Hamburger Button */}
      <button
        onClick={openMenu}
        aria-label="Toggle navigation menu"
        class="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      {/* Mobile Nav Drawer */}
      <Show when={isOpen()}>
        <div class="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300">
          <div 
            class="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col shadow-lg animate-slide-in"
          >
            {/* Header with close button */}
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 class="text-lg font-semibold">Menu</h2>
              <button
                onClick={closeMenu}
                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Navigation items */}
            <nav class="flex-1 px-6 py-4 space-y-2 overflow-y-auto">
              <For each={props.items}>
                {(item, index) => (
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    class="block py-3 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium animate-slide-in-item"
                    style={`animation-delay: ${index() * 0.05}s;`}
                  >
                    {item.label}
                  </a>
                )}
              </For>
            </nav>

            {/* Search at bottom */}
            <div class="border-t border-gray-200 dark:border-gray-800 px-6 py-4">
              <form action="/search" method="get" class="flex items-center">
                <input
                  type="text"
                  name="q"
                  placeholder="Search..."
                  class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </form>
            </div>
          </div>
        </div>
      </Show>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-in-item {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .animate-slide-in-item {
          animation: slide-in-item 0.3s ease-out both;
        }
      `}</style>
    </>
  );
};
