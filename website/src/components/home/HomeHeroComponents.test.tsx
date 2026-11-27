import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HomeBrandLogoEmblem } from './HomeBrandLogoEmblem';

describe('HomeBrandLogoEmblem', () => {
  it('renders brand name and telemetry badges', () => {
    render(<HomeBrandLogoEmblem />);

    expect(screen.getByText(/MONO/i)).toBeDefined();
    expect(screen.getAllByText(/FORGE/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/100% CLIENT-SIDE/i)).toBeDefined();
  });
});
