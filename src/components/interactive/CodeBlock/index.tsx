import Toolbar from './Toolbar';
import { useCodeBlock } from './hooks';

interface CodeBlockProps {
  children?: any;
  class?: string;
  'data-language'?: string;
}

export default function CodeBlock(props: CodeBlockProps) {
  let preRef: HTMLPreElement | undefined;
  const { isMobile, iconSize, handleCopy } = useCodeBlock(() => preRef);
  
  // Extract language from class or data attribute
  const language = props['data-language'] || 
                   props.class?.match(/language-(\w+)/)?.[1] || 
                   'code';

  const initialPaddingTop = typeof window === 'undefined' ? '40px' : (isMobile() ? '48px' : '40px');

  return (
    <pre
      ref={preRef}
      class={props.class || 'astro-code'}
      style={{ position: 'relative', 'padding-top': initialPaddingTop }}
    >
      <Toolbar language={language} isMobile={isMobile()} iconSize={iconSize()} onCopy={handleCopy} />
      {props.children}
    </pre>
  );
}
