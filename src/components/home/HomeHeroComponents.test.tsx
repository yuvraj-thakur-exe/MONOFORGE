import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HomeBrandLogoEmblem } from './HomeBrandLogoEmblem';
import { HomeCyberMonkeyHero } from './HomeCyberMonkeyHero';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('HomeBrandLogoEmblem', () => {
  it('renders brand name and telemetry badges', () => {
    render(<HomeBrandLogoEmblem />);

    expect(screen.getByText(/MONO/i)).toBeDefined();
    expect(screen.getAllByText(/FORGE/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/100% CLIENT-SIDE/i)).toBeDefined();
  });
});

describe('HomeCyberMonkeyHero', () => {
  it('renders interactive companion station and reacts to interactions', () => {
    render(<HomeCyberMonkeyHero />);

    expect(screen.getByText(/CYBER MONKEY COMPANION/i)).toBeDefined();
    expect(screen.getByText(/ONLINE \/\/ 60FPS/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Feed Banana/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Profile Advice/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Tell Joke/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Hack Mode/i })).toBeDefined();

    // Click Feed Banana
    const feedBtn = screen.getByRole('button', { name: /Feed Banana/i });
    fireEvent.click(feedBtn);

    // Click Profile Advice
    const adviceBtn = screen.getByRole('button', { name: /Profile Advice/i });
    fireEvent.click(adviceBtn);

    // Click Tell Joke
    const jokeBtn = screen.getByRole('button', { name: /Tell Joke/i });
    fireEvent.click(jokeBtn);
  });
});
