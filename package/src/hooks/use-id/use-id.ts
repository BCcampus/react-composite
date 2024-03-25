import React from 'react';

export function useId(id?: string): string {
  return id || React.useId();
}
