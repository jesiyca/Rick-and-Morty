import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterPage from '../page';
import { useParams, useRouter } from 'next/navigation';
import { fetchCharacter } from '@/lib/api';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('@/lib/api', () => ({
  fetchCharacter: jest.fn(),
}));

const mockBack = jest.fn();

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  origin: { name: 'Earth' },
  location: { name: 'Citadel of Ricks' },
  image: 'Test Image',
  created: '2023-01-01T00:00:00.000Z',
};

describe('CharacterPage', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ slug: '1' });
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });
    (fetchCharacter as jest.Mock).mockResolvedValue(mockCharacter);
  });

  afterEach(jest.clearAllMocks);

    it('matches snapshot', () => {
      const { container } = render(<CharacterPage />);
      expect(container).toMatchSnapshot();
    });

  it('renders loading initially and then character info', async () => {
    render(<CharacterPage />);
    expect(screen.getByText('Loading character data...')).toBeInTheDocument();

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();
    expect(screen.getByText('Origin: Earth')).toBeInTheDocument();
    expect(screen.getByText('Location: Citadel of Ricks')).toBeInTheDocument();
    expect(screen.getByText('Created: January 1, 2023')).toBeInTheDocument();
  });

  it('calls router.back() when back button is clicked', async () => {
    render(<CharacterPage />);
    await screen.findByText('Rick Sanchez'); // wait until data is loaded

    fireEvent.click(screen.getByRole('button', { name: "Back" }));
    expect(mockBack).toHaveBeenCalled();
  });
});
