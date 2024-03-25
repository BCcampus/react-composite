import React, { memo } from 'react';
import { Image } from '@mantine/core';
import { CompositeItemProps, CompositeItemSelectionProps } from '@bccampus/react-composite';
import { PersonProfile } from './_data';
import classes from './Composite.grid.module.css';

export const ImageCell = memo(
  ({
    item,
    selected,
    onSelectMouseEventHandler,
    ...rest
  }: CompositeItemProps<PersonProfile> & CompositeItemSelectionProps) => (
    <Image
      src={item.image}
      aria-label={item.fullname}
      aria-describedby={item.title}
      alt={item.fullname}
      fit="cover"
      radius="md"
      {...rest}
      aria-selected={!!selected}
      className={classes.gridcellImage}
      onClickCapture={onSelectMouseEventHandler}
    />
  )
);
