import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../page';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { fetchCharacters } from '@/lib/api';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('@/lib/api', () => ({ fetchCharacters: jest.fn() }));

const mockPush = jest.fn();
const characters = {
  info: { pages: 3 },
  results: [
    { id: 1, name: 'Rick Sanchez' },
    { id: 2, name: 'Morty Smith' },
  ],
};

describe('Home Page', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => '1', toString: () => 'page=1' });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue('/');
    (fetchCharacters as jest.Mock).mockResolvedValue(characters);
  });

  afterEach(jest.clearAllMocks);

  it('matches snapshot', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it('renders characters from API', async () => {
    render(<Home />);
    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('navigates to character page on click', async () => {
    render(<Home />);
    fireEvent.click(await screen.findByText('Rick Sanchez'));
    expect(mockPush).toHaveBeenCalledWith('/character/1');
  });
});
