import React, { memo, useId } from 'react';
import { Card, Image, Overlay, Paper, Stack, Text } from '@mantine/core';
import { IconSquareCheck, IconSquare } from '@tabler/icons-react';

import {
  CompositeItemProps,
  CompositeItemSelectionProps,
  useCompositeContext,
} from '@bccampus/react-composite';
import classes from './Composite.grid.module.css';
import type { PersonProfile } from './_data';

export const PersonCardCell = memo(
  ({
    item,

    selected,
    onSelectMouseEventHandler,

    ...rest
  }: CompositeItemProps<PersonProfile> & CompositeItemSelectionProps) => {
    const ctx = useCompositeContext();

    const labelId = useId();
    const descId = useId();

    return (
      <Paper
        shadow="md"
        radius="md"
        {...rest}
        className={classes.gridcellCard}
        aria-labelledby={labelId}
        aria-describedby={descId}
        onClickCapture={onSelectMouseEventHandler}
      >
        <Card radius="md">
          <Card.Section>
            <Image src={item.image} height={200} alt="" role="presentation" fit="cover" />
          </Card.Section>

          <Stack gap="0rem" my="0.25rem">
            <Text fw={500} truncate id={labelId}>
              {item.fullname}
            </Text>
            <Text size="xs" truncate>
              {item.title}
            </Text>
          </Stack>

          <Text size="sm" c="dimmed" h="2.5rem" lineClamp={2} id={descId}>
            {item.bio}
          </Text>

          <Overlay display={ctx.selection?.selectionMode ? 'block' : undefined}>
            {selected ? <IconSquareCheck /> : <IconSquare />}
          </Overlay>
        </Card>
      </Paper>
    );
  }
);
