/* eslint-disable no-console */
import React from 'react';
import { renderHook } from '@testing-library/react';
import { createSafeContext } from './create-safe-context';

interface ContextType {
  value: number;
  onChange: (value: number) => void;
}

describe('hooks/create-safe-context', () => {
  it('throws error if useSafeContext hook was called without Provider', () => {
    const originalError = console.error;
    console.error = jest.fn();
    const [, useContext] = createSafeContext<ContextType>('test-error');
    expect(() => renderHook(() => useContext())).toThrow(new Error('test-error'));

    console.error = originalError;
  });

  it('returns context value when useSafeContext hook was called within Provider', () => {
    const fn = jest.fn();
    const [Provider, useContext] = createSafeContext<ContextType>('test-error');
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider value={{ value: 100, onChange: fn }}>{children}</Provider>
    );

    const view = renderHook(() => useContext(), { wrapper });
    expect(view.result.current).toStrictEqual({ value: 100, onChange: fn });
  });
});
