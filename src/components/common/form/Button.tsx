import styled from '@emotion/styled';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import Typography from '@/components/common/data-display/Typography';

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: boolean;
  fullWidth?: boolean;
  variant?: 'contained' | 'outlined';
  color?: 'primary';
  size?: 'small' | 'medium';
  as?: React.ElementType;
  href?: string;
}

const StyledButton = styled.button<IButtonProps>`
  display: flex;
  width: ${props =>
    props.fullWidth
      ? '100%'
      : props.icon
      ? 'auto'
      : props.size === 'small'
      ? '72px'
      : '115px'};
  height: ${props =>
    props.icon ? 'auto' : props.size === 'small' ? '36px' : '48px'};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: ${props =>
    props.variant === 'outlined'
      ? `1px solid ${props.theme.color.text.subtitle}`
      : 'none'};
  color: ${props =>
    props.variant === 'outlined'
      ? props.theme.color.text.subtitle
      : props.color === 'primary'
      ? props.theme.color.palette.white
      : props.theme.color.text.secondary};
  background-color: ${props =>
    props.variant === 'outlined'
      ? props.theme.color.palette.white
      : props.color === 'primary'
      ? props.theme.color.palette.primary
      : props.theme.color.palette.lightGray};

  &:hover {
    opacity: 0.8;
  }
`;

export default function Button({ children, ...props }: IButtonProps) {
  return (
    <StyledButton {...props}>
      {props.icon ? (
        children
      ) : (
        <Typography variant={props.fullWidth ? 'body1' : 'caption'}>
          {children}
        </Typography>
      )}
    </StyledButton>
  );
}
