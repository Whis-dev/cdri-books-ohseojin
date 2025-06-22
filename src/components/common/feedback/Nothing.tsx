import { useTheme } from '@emotion/react';

import Typography from '@/components/common/data-display/Typography';

interface INothingProps {
  icon: React.ReactNode;
  description: string;
}

export default function Nothing({ icon, description, ...rest }: INothingProps) {
  const theme = useTheme();

  return (
    <dl
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        '> *': {
          display: 'inline-flex',
        },

        dt: {
          marginTop: '24px',
          color: theme.color.text.secondary,
        },
      }}
      {...rest}
    >
      <dd>{icon}</dd>
      <dt>
        <Typography variant="caption">{description}</Typography>
      </dt>
    </dl>
  );
}
