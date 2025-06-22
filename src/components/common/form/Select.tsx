import { useRef, useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@/assets/icons/index';
import Typography from '@/components/common/data-display/Typography';
import Popover from '@/components/common/surface/Popover';

type TSelectOption = {
  label: string;
  value: string;
};

interface ISelectProps {
  defaultValue: string;
  options: Array<TSelectOption>;
}

export default function Select({ defaultValue, options }: ISelectProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClickOpen = () => {
    setOpen(prev => !prev);
  };

  const handleClickSelectOption = (value: string) => () => {
    setSelectedValue(value);
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
            width: '100px',
            height: '36px',
            alignItems: 'center',
            borderBottom: '1px solid #D2D6DA',
          }}
        >
          <Typography variant="body2bold">
            {selectedValue || defaultValue}
          </Typography>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      }
      content={
        <ul
          css={{
            position: 'absolute',
            width: '100px',
            top: triggerRef.current?.getBoundingClientRect().top,
            left: triggerRef.current?.getBoundingClientRect().left,
            boxShadow: '0px 0px 4px 0px #00000040',
            zIndex: 30,
          }}
        >
          {options.map(({ label, value }) => (
            <li
              key={value}
              onClick={handleClickSelectOption(value)}
              css={{
                height: '30px',
              }}
            >
              <Typography variant="caption">{label}</Typography>
            </li>
          ))}
        </ul>
      }
    />
  );
}
