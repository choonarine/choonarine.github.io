interface CodeElementProps {
  code: string;
}

export default function CodeElement(props: CodeElementProps) {
  return <code>{props.code}</code>;
}
