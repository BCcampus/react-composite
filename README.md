# @bccampus/manttinex-composite

> This package is still in the alpha stage and under development.

```sh
yarn add @bccampus/react-composite
# or
npm install @bccampus/react-composite
```

Documentation: https://bccampus.github.io/react-composite

## Known Issues

- Selecting a range of items or all items is not announced by screen readers
- No RTL support

# To Do

- Improve documentation

- Implement an option for setting focus and navigating inside items

  Reference: [Keyboard Interaction - Setting Focus and Navigating Inside Cells](https://www.w3.org/WAI/ARIA/apg/patterns/grid/#keyboardinteraction-settingfocusandnavigatinginsidecells)

- Refactor the component to decouple selection and extension features from the core functions

```jsx
<CompositeContext data={{ items }} focusOptions={{}}>
  <CompositeSelectionContext selectionOptions={{}}>
    <CompositeExpansionContext expansionOptions={{}}>
      <CompositeComponent renderRoot renderGroup renderItem />
    </CompositeExpansionContext>
  </CompositeSelectionContext>
</CompositeContext>
```

- Implement a DnD context

```jsx
<CompositeContext data={{ items }} focusOptions={{}}>
  <CompositeDragAndDropContext dragAndDropOptions={{}}>
    <CompositeComponent renderRoot renderGroup renderItem />
  </CompositeDragAndDropContext>
</CompositeContext>
```

- Implement a virtualized composite root

```jsx
<VirtualizedCompositeContext data={{ items }} virtualizerOptions={{}} focusOptions={{}}>
  ...
</VirtualCompositeContext>
```
