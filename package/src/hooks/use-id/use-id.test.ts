import { renderHook } from '@testing-library/react';
import { useId } from './use-id';

describe('hooks/use-id', () => {
  it('returns defined id', () => {
    const _id = 'test-123';
    const id = renderHook(() => useId(_id)).result.current;

    expect(id).toBe(_id);
  });

  it('returns unique ID string', () => {
    const id = renderHook(() => useId()).result.current;

    expect(id).toBeDefined();
  });
});
