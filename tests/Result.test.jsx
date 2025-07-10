import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Result from '../src/components/Result';

describe('Result component', () => {
  it('renders the result correctly', () => {
    const testResult = { result: 'A' };
    render(<Result result={testResult} />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders with the initial state', () => {
    render(<Result result={{ result: 'X' }} />);
    expect(screen.getByText('X')).toBeInTheDocument();
  });
});
