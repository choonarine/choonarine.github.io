import { createSignal, createEffect, onMount, onCleanup, For, Show, type Component } from 'solid-js';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export const TableOfContents: Component<TableOfContentsProps> = (props) => {
  const [activeIndex, setActiveIndex] = createSignal(0);
  const [isVisible, setIsVisible] = createSignal(true);
  const [isMobileOpen, setIsMobileOpen] = createSignal(false);
  const [progressPercentage, setProgressPercentage] = createSignal(0);
  
  // Filter only h2 headings
  const h2Headings = () => props.headings.filter(h => h.depth === 2);

  // Position TOC in right margin
  const positionTOC = () => {
    if (typeof window === 'undefined') return;
    
    const article = document.querySelector('article');
    const tocWrapper = document.querySelector('aside');
    if (!article || !tocWrapper) return;
    
    const articleRect = article.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const rightMarginStart = articleRect.right;
    const rightMarginWidth = windowWidth - rightMarginStart;
    const tocWidth = 250;
    
    const rightPos = rightMarginWidth / 2 - tocWidth / 2;
    tocWrapper.style.right = Math.max(16, rightPos) + 'px';
  };

  // Scroll tracking
  const handleScroll = () => {
    if (typeof window === 'undefined') return;
    
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const percentage = Math.min((scrolled / docHeight) * 100, 100);
    
    setProgressPercentage(percentage);
  };

  // IntersectionObserver for active heading and article visibility
  onMount(() => {
    if (typeof window === 'undefined') return;
    
    const headingElements = document.querySelectorAll('article h2');
    const article = document.querySelector('article');
    if (headingElements.length === 0 || !article) return;

    // Track article visibility
    const articleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    
    articleObserver.observe(article);

    // Track active heading
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(headingElements).indexOf(entry.target as Element);
            if (index >= 0) {
              setActiveIndex(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    headingElements.forEach((heading) => headingObserver.observe(heading));

    // Position TOC
    positionTOC();
    window.addEventListener('resize', positionTOC);
    window.addEventListener('scroll', handleScroll);

    onCleanup(() => {
      articleObserver.disconnect();
      headingObserver.disconnect();
      window.removeEventListener('resize', positionTOC);
      window.removeEventListener('scroll', handleScroll);
    });
  });

  const scrollToHeading = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openMobileModal = () => {
    setIsMobileOpen(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMobileModal = () => {
    setIsMobileOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  const handleItemClick = (slug: string) => {
    scrollToHeading(slug);
    closeMobileModal();
  };

  return (
    <>
      {/* Desktop TOC */}
      <aside class="hidden lg:block fixed right-0 top-40" style={{ width: '250px', 'max-height': 'calc(100vh - 200px)' }}>
        <Show when={isVisible()}>
          <div class="pr-8">
            <div class="relative">
              {/* Progress indicator line (CSS-based) */}
              <div
                class="absolute left-0 top-0 w-0.5"
                style={{
                  height: `${progressPercentage()}%`,
                  'background-color': 'rgb(59, 130, 246)',
                  opacity: progressPercentage() > 5 ? '1' : '0',
                  transition: 'opacity 0.3s ease-out',
                }}
              />

              {/* TOC Items */}
              <nav class="pl-6 space-y-3 overflow-y-auto max-h-full transition-all duration-300">
                <For each={h2Headings()}>
                  {(heading, index) => (
                    <button
                      onClick={() => scrollToHeading(heading.slug)}
                      class="group flex items-center gap-4 text-sm transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer w-full text-left"
                    >
                      {/* Dot */}
                      <div class="flex-shrink-0">
                        <div
                          class={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index() === activeIndex()
                              ? 'scale-150 bg-blue-600 dark:bg-blue-400'
                              : index() < activeIndex()
                              ? 'bg-blue-600 dark:bg-blue-400'
                              : 'bg-gray-400 dark:bg-gray-600'
                          } group-hover:bg-blue-600 dark:group-hover:bg-blue-400`}
                        />
                      </div>
                      {/* Text */}
                      <span class="flex-1 text-gray-700 dark:text-gray-300 transition-colors duration-300 text-xs">
                        {heading.text}
                      </span>
                    </button>
                  )}
                </For>
              </nav>
            </div>
          </div>
        </Show>
      </aside>

      {/* Mobile TOC Button */}
      <button
        onClick={openMobileModal}
        aria-label="Table of Contents"
        class="lg:hidden fixed bottom-6 right-6 z-30 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      {/* Mobile TOC Modal */}
      <Show when={isMobileOpen()}>
        <div class="lg:hidden fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col">
          {/* Header */}
          <div class="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
            <h2 class="text-xl font-semibold">목차</h2>
            <button
              onClick={closeMobileModal}
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Content */}
          <nav class="flex-1 overflow-y-auto px-6 py-6 space-y-2">
            <For each={h2Headings()}>
              {(heading, index) => (
                <button
                  onClick={() => handleItemClick(heading.slug)}
                  class="block w-full text-left py-3 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium animate-slide-in-item"
                  style={`animation-delay: ${index() * 0.05}s;`}
                >
                  {heading.text}
                </button>
              )}
            </For>
          </nav>
        </div>
      </Show>

      <style>{`
        @keyframes slide-in-item {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in-item {
          animation: slide-in-item 0.3s ease-out both;
        }
      `}</style>
    </>
  );
};
