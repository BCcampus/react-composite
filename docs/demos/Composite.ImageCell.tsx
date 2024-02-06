import React, { memo } from 'react';
import { Image } from '@mantine/core';
import { CompositeChildProps } from '@bccampus/mantinex-composite';
import { PersonProfile } from './_data';
import classes from './Composite.grid.module.css';

export const ImageCell = memo(
  ({ item, selected, disabled, ...rest }: CompositeChildProps<PersonProfile>) => (
    <Image
      src={item.image}
      alt=""
      fit="cover"
      radius="md"
      {...rest}
      aria-selected={selected}
      className={classes.gridcellImage}
    />
  )
);
