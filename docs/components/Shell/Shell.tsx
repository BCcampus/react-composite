import React from 'react';
import cx from 'clsx';
import { useHotkeys } from '@mantine/hooks';
import {
  AppShell,
  Container,
  RemoveScroll,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { LogoBCcampus } from '@bccampus/media-kit';
import { HeaderControls } from '@mantinex/mantine-header';
import { PACKAGE_DATA } from '../../data';
import classes from './Shell.module.css';

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const { toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme();
  useHotkeys([['mod + J', toggleColorScheme]]);

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header className={RemoveScroll.classNames.zeroRight}>
        <Container size="lg" px="md" className={classes.inner}>
          <a
            href="https://bccmpus.ca/"
            target="_blank"
            className={cx('mantine-focus-auto', classes.logo)}
            rel="noreferrer"
          >
            <LogoBCcampus size="50%" variant={colorScheme === 'light' ? 'color' : 'white'} />
          </a>

          <HeaderControls
            visibleFrom="xs"
            githubLink={PACKAGE_DATA.repositoryUrl}
            discordLink=""
            withDirectionToggle={false}
            withSearch={false}
            withDiscord={false}
          />
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <div className={classes.main}>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
