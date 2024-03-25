import React, { memo, useId } from 'react';
import { Indicator, Paper, Stack, Text } from '@mantine/core';
import { CompositeItemProps, CompositeItemSelectionProps } from '@bccampus/react-composite';
import classes from './Composite.demo.module.css';

export const ComponentCardCell = memo(
  ({
    item,
    selected,
    onSelectMouseEventHandler,
    ...rest
  }: CompositeItemProps & CompositeItemSelectionProps) => {
    const labelId = useId();
    const descId = useId();

    return (
      <Paper
        shadow="sm"
        p="sm"
        {...rest}
        aria-selected={!!selected}
        aria-labelledby={labelId}
        aria-describedby={descId}
        onClickCapture={onSelectMouseEventHandler}
        className={classes.compositeItem}
      >
        <Indicator size={16} offset={4} color="green" withBorder disabled={!selected}>
          <Stack gap="0rem">
            <Text fw={500} truncate id={labelId}>
              {item.title}
            </Text>
            <Text size="xs" truncate>
              {item.package}
            </Text>
            <Text size="sm" c="dimmed" h="2.5rem" lineClamp={2} id={descId}>
              {item.description}
            </Text>
          </Stack>
        </Indicator>
      </Paper>
    );
  }
);
