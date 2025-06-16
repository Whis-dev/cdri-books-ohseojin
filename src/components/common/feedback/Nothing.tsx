interface INothingProps {
  icon: React.ReactNode;
  description: string;
}

export default function Nothing({ icon, description }: INothingProps) {
  return (
    <dl
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <dd>{icon}</dd>
      <dt>{description}</dt>
    </dl>
  );
}
