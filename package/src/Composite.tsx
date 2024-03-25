import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import type {
  Key,
  ForwardedRef,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

import type {
  CompositeContextValue,
  CompositeGroupRole,
  CompositeItemElementProps,
  CompositeItemRole,
  CompositeItemExpansionProps,
  CompositeProps,
  InternalItemProps,
  CompositeItemSelectionProps,
  CompsiteRootProps,
} from './Composite.types';

import { FocusManager } from './FocusManager/FocusManager';
import { useSelectionManager } from './SelectionManager/useSelectionManager';
import { useExpansionManager } from './ExpansionManager/useExpansionManager';

import { useId } from './hooks/use-id/use-id';
import { mergeRefs } from './hooks/use-merged-ref/use-merged-ref';
import { createSafeContext } from './hooks/create-safe-context/create-safe-context';

import './Composite.css';

export const [CompositeProvider, useCompositeContext] = createSafeContext<CompositeContextValue>(
  'Composite component was not found in tree'
);

function CompositeWithRef<T>(props: CompositeProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    id,
    type,
    items,
    focusOptions = {},

    selectionOptions = {},
    selectionState,
    defaultSelectionState,
    onSelectionChange,

    expansionOptions = {},
    expandedKeys,
    defaultExpandedKeys,
    onExpansionChange,

    disabledKeys,
    getItemKey = (item: any) => (item.id ?? item.key) as Key,
    getChildren = (item: any) => item.children as T[],
    getChildrenCount = (item: any) => getChildren(item)?.length ?? 0,
    isContainer = (item: any) => Array.isArray(getChildren(item)),

    renderItem,
    renderGroup,
    renderRoot,

    className,

    onFocus,
    onBlur,

    ...rest
  } = props;

  const _id = useId(id);
  const compositeRef = useRef<HTMLElement>(null);

  const focusManager = useMemo(() => {
    if (expansionOptions !== false) {
      focusOptions.includeGroups = true;
    }
    return new FocusManager(compositeRef, type, focusOptions);
  }, [type, focusOptions]);

  const [_expandedKeys, _expandingKeys, expansionManager] = useExpansionManager(
    focusManager,
    expansionOptions,
    {
      expandedKeys,
      defaultExpandedKeys,
      onExpansionChange,
    }
  );

  const [_selectionState, selectionManager, selectionContext] = useSelectionManager(
    focusManager,
    selectionOptions,
    {
      selectionState,
      defaultSelectionState,
      onSelectionChange,
    }
  );

  useEffect(() => {
    focusManager.init();
  }, [items, disabledKeys, focusManager]);

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    let observerStarted = false;

    const resizeObserver = new ResizeObserver(() => {
      if (!observerStarted) {
        observerStarted = true;
        return undefined;
      }

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        focusManager.init();
      }, 500);

      return undefined;
    });

    resizeObserver.observe(compositeRef.current);

    return () => resizeObserver.disconnect();
  }, [focusManager]);

  useEffect(() => {
    if (expansionManager) expansionManager.init();
  }, [items, disabledKeys, expansionManager]);

  useEffect(() => {
    if (selectionManager) selectionManager.init();
  }, [items, disabledKeys, selectionManager]);

  useEffect(() => {
    if (expansionManager && expansionManager.options.defaultExpanded) {
      expansionManager.expandAll();
    }
  }, []);

  const onKeyDownRoot: KeyboardEventHandler = useCallback(
    (event) => {
      const propagate = focusManager.keyboardEventHandler(event);
      if (propagate === true) {
        selectionManager?.keyboardEventHandler(event);
        expansionManager?.keyboardEventHandler(event);
      }
    },
    [expansionManager, focusManager, selectionManager]
  );

  const setInitialFocus = useCallback(() => {
    let initialFocus = false;
    if (
      focusManager.options.initialFocusTarget === 'SelectedItem' &&
      selectionManager?.selectedKeys.size > 0
    ) {
      const firstSelected = selectionManager.getFirstSelection();
      initialFocus = focusManager.focus(firstSelected as HTMLElement);
    } else if (
      focusManager.options.initialFocusTarget === 'LastFocusedItem' &&
      focusManager.focused.element
    ) {
      initialFocus = focusManager.focusAt(focusManager.focused.index);
    }

    if (!initialFocus) {
      focusManager.setInitialFocus();
    }
  }, [focusManager, selectionManager]);

  const onFocusRoot: FocusEventHandler = useCallback(
    (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setInitialFocus();

        if (onFocus) onFocus(event);
      }
    },
    [onFocus]
  );

  const onBlurRoot: FocusEventHandler = useCallback(
    (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        if (onBlur) onBlur(event);
      }
    },
    [onBlur]
  );

  const onFocusItem: MouseEventHandler = useCallback(
    (event) => {
      focusManager.mouseEventHandler(event);
      if (
        selectionManager &&
        selectionManager.options.followFocus &&
        !selectionManager.options.multiple
      ) {
        selectionManager.mouseEventHandler(event);
      }
    },
    [focusManager, selectionManager]
  );

  const onSelectItem: MouseEventHandler = useCallback(
    (event) => {
      if (selectionManager && focusManager.mouseEventHandler(event)) {
        selectionManager.mouseEventHandler(event);
      }
    },
    [focusManager, selectionManager]
  );

  const onExpandItem: MouseEventHandler = useCallback(
    (event) => {
      if (expansionManager && focusManager.mouseEventHandler(event)) {
        expansionManager.mouseEventHandler(event);
      }
    },
    [focusManager, expansionManager]
  );

  const itemMetadata = useMemo(() => {
    const hash = new Map<Key, InternalItemProps>();

    const getItemMeta = (item: T, index: number, parentMeta: Partial<InternalItemProps>) => {
      const key = getItemKey(item);

      const meta: InternalItemProps = {
        key,
        childrenCount: isContainer(item) ? getChildrenCount(item) : null,
        disabled: parentMeta.disabled || disabledKeys?.includes(key) || undefined,
        path: parentMeta.path ? [...parentMeta.path, index] : [index],
        expansionState: 'None',
        visible:
          _expandedKeys === undefined
            ? true
            : parentMeta.visible !== false &&
              (parentMeta.expansionState === 'None' || parentMeta.expansionState !== 'Collapsed'),
      };

      if (parentMeta.childrenCount !== null) {
        meta.setSize = parentMeta.childrenCount;
        meta.posInSet = index + 1;
        meta.level = parentMeta.level ? parentMeta.level + 1 : 1;
      }

      if (_selectionState !== undefined) {
        if (_selectionState.indeterminate?.has(meta.key)) {
          meta.selected = null;
        } else if (
          selectionManager.options.allowGroupSelection === false &&
          meta.childrenCount !== null
        ) {
          meta.selected = undefined;
        } else if (!_selectionState.selected) {
          meta.selected = false;
        } else {
          meta.selected = _selectionState.selected.has(meta.key);
        }
      }

      if (_expandedKeys !== undefined && meta.childrenCount !== null) {
        meta.expansionState = _expandedKeys?.has(meta.key)
          ? 'Expanded'
          : _expandingKeys?.has(key)
            ? 'Expanding'
            : 'Collapsed';
      }

      return meta;
    };

    const getGroupMeta = (group: T[], parentMeta?: Partial<InternalItemProps>) => {
      const groupMeta: InternalItemProps[] = [];

      for (let i = 0; i < group.length; i += 1) {
        const itemMeta = getItemMeta(group[i], i, parentMeta);

        if (itemMeta.childrenCount > 0) {
          const childrenMeta = getGroupMeta(getChildren(group[i]), itemMeta);
          childrenMeta.forEach((meta) => hash.set(meta.key, meta));
        }

        groupMeta.push(itemMeta);
      }
      return groupMeta;
    };

    getGroupMeta(items, {
      visible: true,
      expansionState: 'None',
      childrenCount: items.length,
    }).forEach((meta) => hash.set(meta.key, meta));

    return hash;
  }, [items, disabledKeys, _selectionState, _expandedKeys, _expandingKeys, selectionManager]);

  const getItemProps = useCallback(
    (
      meta: InternalItemProps,
      role: CompositeGroupRole | CompositeItemRole,
      isGroup: boolean = false
    ) => {
      const itemProps: CompositeItemElementProps = {
        key: meta.key,
        role,
        className: `bcc-react-composite-${isGroup ? 'group' : 'item'}`,
        onClickCapture: !meta.disabled ? onFocusItem : undefined,

        'data-item-key': JSON.stringify(meta.key),
        'data-item-path': JSON.stringify(meta.path),

        'aria-hidden': !meta.visible ? true : undefined,
        'aria-disabled': meta.disabled,
        'aria-expanded':
          meta.expansionState !== 'None' ? meta.expansionState === 'Expanded' : undefined,
        'aria-level': meta.level,
        'aria-setsize': meta.setSize,
        'aria-posinset': meta.posInSet,
      };

      if (selectionManager && meta.selected !== undefined) {
        itemProps[selectionManager.options.ariaStateAttribute] = !!meta.selected;
        if (selectionManager.options.makeInferredSelection) {
          itemProps['data-indeterminate'] = meta.selected === null;
        }
      }

      return itemProps;
    },
    [onFocusItem, selectionManager]
  );

  const getItemState = useCallback(
    (meta: InternalItemProps): CompositeItemExpansionProps & CompositeItemSelectionProps => ({
      selected: meta.selected,
      onSelectMouseEventHandler:
        meta.selected !== undefined && !meta.disabled ? onSelectItem : undefined,

      expansionState: meta.expansionState,
      onExpandMouseEventHandler:
        meta.expansionState !== 'None' && !meta.disabled ? onExpandItem : undefined,
    }),
    [onSelectItem, onExpandItem]
  );

  const renderChildren = useCallback(
    (data, index) => {
      const key = getItemKey(data);

      if (!itemMetadata.has(key)) {
        throw new Error(`Metadata not found for a composite item (key: ${key}).`);
      }
      const meta = itemMetadata.get(key);

      const children = getChildren(data);
      if (renderGroup && children && children.length > 0) {
        return renderGroup(
          {
            item: data,
            children: children.map(renderChildren),
            index,
            ...getItemProps(meta, focusManager.roles.group, true),
          },
          getItemState(meta)
        );
      }

      return renderItem(
        { item: data, index, ...getItemProps(meta, focusManager.roles.item) },
        getItemState(meta)
      );
    },
    [
      itemMetadata,
      focusManager,
      getItemKey,
      getChildren,
      renderGroup,
      renderItem,
      getItemState,
      getItemProps,
    ]
  );

  const contextValue = useMemo<CompositeContextValue>(
    () => ({ selection: selectionContext }),
    [selectionContext]
  );

  const compositeProps: CompsiteRootProps = useMemo(
    () => ({
      id: _id,
      ref: mergeRefs(compositeRef, ref),
      className: `bcc-react-composite-root ${className}`,
      role: focusManager.roles.root,
      onKeyDown: onKeyDownRoot,
      onFocus: onFocusRoot,
      onBlur: onBlurRoot,
      'aria-multiselectable': selectionManager && selectionManager.options.multiple,
      'aria-orientation':
        focusManager.type === 'HorizontalListbox' ? ('horizontal' as const) : undefined,
      children: (
        <CompositeProvider value={contextValue}>{items.map(renderChildren)}</CompositeProvider>
      ),
    }),
    [focusManager, rest, selectionManager, renderChildren, items]
  );

  if (renderRoot) {
    return renderRoot(compositeProps);
  }

  return <div {...rest} {...compositeProps} />;
}

const Composite = forwardRef(CompositeWithRef);

export { Composite };
