import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router';

import Typography from '@/components/common/data-display/Typography';

type TTabItem = {
  key: string;
  label: React.ReactNode;
  to?: string;
};

interface ITabProps {
  isLinkTab?: boolean;
  fullWidth?: boolean;
  selectedTab: string;
  tabItems: Array<TTabItem>;
  onClickTabItem?: (key: string) => () => void;
}

const StyledTabItem = styled.button<{
  to?: string;
}>`
  padding: 0 0px 9px;
  margin: 0 28px;
  color: ${props => props.theme.color.text.primary};
`;

export default function Tab({
  isLinkTab,
  fullWidth = false,
  selectedTab,
  tabItems,
  onClickTabItem,
}: ITabProps) {
  const theme = useTheme();

  return (
    <ul
      css={{
        display: 'flex',
        flex: fullWidth ? 1 : 'none',
        justifyContent: 'center',
      }}
    >
      {tabItems.map(tabItem => (
        <li
          key={tabItem.key}
          css={{
            '> button, a': {
              borderBottom:
                selectedTab === tabItem.key
                  ? `1px solid ${theme.color.palette.primary}`
                  : 'none',
            },
          }}
        >
          <StyledTabItem
            as={isLinkTab ? Link : 'button'}
            to={tabItem.to}
            onClick={onClickTabItem && onClickTabItem(tabItem.key)}
          >
            <Typography variant="body1">{tabItem.label}</Typography>
          </StyledTabItem>
        </li>
      ))}
    </ul>
  );
}
