import { useRef, useState } from 'react';
import { useTheme } from '@emotion/react';

import { ChevronDownIcon, ChevronUpIcon } from '@/assets/icons/index';
import Typography from '@/components/common/data-display/Typography';
import Popover from '@/components/common/surface/Popover';
import Button from '@/components/common/form/Button';

export type TSelectOption = {
  label: string;
  value: string;
};

interface ISelectProps {
  selectedOption: TSelectOption;
  options: Array<TSelectOption>;
  onClickSelectValue: (option: TSelectOption) => void;
}

export default function Select({
  selectedOption,
  options,
  onClickSelectValue,
}: ISelectProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(prev => !prev);
  };

  const handleClickSelectOption = (option: TSelectOption) => () => {
    onClickSelectValue(option);
    setOpen(prev => !prev);
  };

  return (
    <Popover
      isOpen={isOpen}
      trigger={
        <button
          onClick={handleClickOpen}
          ref={triggerRef}
          css={{
            display: 'flex',
            padding: '0px 4px 0px 8px',
            width: '100px',
            height: '36px',
            alignItems: 'center',
            border: 'none',
            borderBottom: '1px solid #D2D6DA',
            backgroundColor: 'transparent',

            '> span': {
              marginRight: 'auto',
            },
          }}
        >
          <Typography variant="body2bold">{selectedOption.label}</Typography>

          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      }
      content={
        <ul
          css={{
            position: 'absolute',
            width: '100px',
            top:
              (triggerRef.current?.getBoundingClientRect().top || 0) + 36 + 6,
            left: triggerRef.current?.getBoundingClientRect().left,
            boxShadow: '0px 0px 4px 0px #00000040',
            backgroundColor: theme.color.palette.white,
            zIndex: 30,
          }}
        >
          {options
            .filter(({ value }) => value !== selectedOption.value)
            .map(({ label, value }) => (
              <li
                key={`select-option-${value}`}
                css={{
                  height: '30px',
                }}
              >
                <Button
                  icon
                  fullWidth
                  onClick={handleClickSelectOption({ label, value })}
                  css={{
                    padding: '4px 8px',
                    justifyContent: 'flex-start',
                    height: '30px',
                  }}
                >
                  <Typography
                    variant="caption"
                    css={{
                      lineHeight: '22px',
                    }}
                  >
                    {label}
                  </Typography>
                </Button>
              </li>
            ))}
        </ul>
      }
    />
  );
}
