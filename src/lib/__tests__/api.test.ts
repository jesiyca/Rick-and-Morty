import { fetchCharacter, fetchCharacters } from '@/lib/api';
// https://www.npmjs.com/package/jest-fetch-mock
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('fetchCharacter', () => {
    beforeEach(() => fetchMock.resetMocks());

    it('fetches a single character by id', async () => {
        const mockData = { id: 1, name: 'Rick Sanchez' };
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const result = await fetchCharacter(1);

        expect(fetchMock).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
        expect(result).toEqual(mockData);
    });

    it('throws an error on failed fetch', async () => {
        fetchMock.mockResponseOnce('', { status: 404, statusText: 'Not Found' });

        await expect(fetchCharacter(999)).rejects.toThrow('Failed to fetch character with id = 999 with error = Not Found');
    });
});

describe('fetchCharacters', () => {
    it('fetches character list with query params', async () => {
        const mockData = {
            info: { pages: 1 },
            results: [{ id: 1, name: 'Rick Sanchez' }],
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const result = await fetchCharacters({ page: 2, species: 'human' });

        expect(fetchMock).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/?page=2&species=human');
        expect(result).toEqual(mockData);
    });

    it('throws an error on failed characters fetch', async () => {
        fetchMock.mockResponseOnce('', { status: 500, statusText: 'Internal Server Error' });

        await expect(fetchCharacters({ name: 'rick' })).rejects.toThrow('Failed to fetch characters for name=rick with error = Internal Server Error');
    });
});
