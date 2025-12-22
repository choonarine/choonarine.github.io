import { createSignal } from 'solid-js';

interface TooltipProps {
  isMobile?: boolean;
  iconSize?: string;
  onCopy?: () => Promise<void>;
}

export default function Tooltip(props: TooltipProps) {
  const [isCopied, setIsCopied] = createSignal(false);
  const [showTooltip, setShowTooltip] = createSignal(false);

  const isMobile = props.isMobile ?? false;
  const iconSize = props.iconSize ?? (isMobile ? '16' : '14');

  const handleClick = async () => {
    try {
      if (props.onCopy) {
        await props.onCopy();
      }
      setIsCopied(true);
      setShowTooltip(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      class="copy-code-button"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        display: 'flex',
        'align-items': 'center',
        position: 'relative'
      }}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {isCopied() ? (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: '#10b981' }}>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}

      <span
        style={{
          position: 'absolute',
          bottom: '-32px',
          right: '0',
          background: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          padding: '4px 8px',
          'border-radius': '4px',
          'font-size': '12px',
          'white-space': 'nowrap',
          opacity: showTooltip() ? '1' : '0',
          'pointer-events': 'none',
          transition: 'opacity 0.2s'
        }}
      >
        {isCopied() ? 'Copied!' : 'Copy'}
      </span>
    </button>
  );
}

