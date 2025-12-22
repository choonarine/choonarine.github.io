import { onMount } from 'solid-js';

export function useCodeBlock(getPreRef: () => HTMLPreElement | undefined) {
  const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;
  const iconSize = () => (isMobile() ? '16' : '14');

  onMount(() => {
    const preRef = getPreRef();
    if (!preRef || preRef.querySelector('.code-toolbar')) return;

    preRef.style.position = 'relative';
    preRef.style.paddingTop = isMobile() ? '48px' : '40px';
  });

  const handleCopy = async () => {
    const preRef = getPreRef();
    const codeElement = preRef?.querySelector('code');
    const code = codeElement?.textContent || preRef?.textContent || '';
    await navigator.clipboard.writeText(code);
  };

  return {
    isMobile,
    iconSize,
    handleCopy
  };
}
