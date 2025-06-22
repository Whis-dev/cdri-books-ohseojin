import type { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

import { TYPOGRAPHY_VARIANT_STYLE } from '@/constants/theme';

interface ITypographyProps extends PropsWithChildren {
  variant?: keyof typeof TYPOGRAPHY_VARIANT_STYLE;
  [x: string]: unknown;
}

const StyledTypography = styled.span<{
  variant: keyof typeof TYPOGRAPHY_VARIANT_STYLE;
}>`
  font-size: ${props =>
    props.theme.typography.fontSize[
      TYPOGRAPHY_VARIANT_STYLE[props.variant].fontSize
    ]};
  font-weight: ${props =>
    props.theme.typography.fontWeight[
      TYPOGRAPHY_VARIANT_STYLE[props.variant].fontWeight
    ]};
  line-height: ${props =>
    props.theme.typography.lineHeight[
      TYPOGRAPHY_VARIANT_STYLE[props.variant].lineHeight
    ]};
  letter-spacing: 0;
`;

export default function Typography({
  variant = 'body1',
  children,
  ...rest
}: ITypographyProps) {
  return (
    <StyledTypography
      variant={variant}
      as={/title/.test(variant) ? 'h2' : 'span'}
      {...rest}
    >
      {children}
    </StyledTypography>
  );
}
