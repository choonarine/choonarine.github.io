import Tooltip from './Tooltip';

interface ToolbarProps {
  language: string;
  isMobile: boolean;
  iconSize: string;
  onCopy: () => Promise<void>;
}

export default function Toolbar(props: ToolbarProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        padding: props.isMobile ? '8px 12px' : '6px 8px',
        background: 'rgba(0, 0, 0, 0.6)',
        'backdrop-filter': 'blur(8px)',
        'z-index': '10'
      }}
    >
      <span
        style={{
          'font-size': props.isMobile ? '12px' : '10px',
          'font-weight': '500',
          color: 'rgba(255, 255, 255, 0.8)',
          'text-transform': 'uppercase',
          'letter-spacing': '0.5px'
        }}
      >
        {props.language}
      </span>
      <Tooltip isMobile={props.isMobile} iconSize={props.iconSize} onCopy={props.onCopy} />
    </div>
  );
}
