import { Character, CharactersResponse } from '@/types/character';

interface FetchCharactersParams {
    page?: number;
    name?: string;
    species?: string;
    status?: string;
    type?: string;
    gender?: string;
  }

export async function fetchCharacter(id: number): Promise<Character> {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch character with id = ${id} with error = ${res.statusText}`);
    return res.json();
  }

export async function fetchCharacters(params: FetchCharactersParams = {}): Promise<CharactersResponse> {
    const query = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value != null && value !== '') {
        query.append(key, String(value));
      }
    }
  
    const res = await fetch(`https://rickandmortyapi.com/api/character/?${query}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch characters for ${query} with error = ${res.statusText}`);
    }
  
    return res.json();
  }