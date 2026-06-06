import { Species } from './types';

const STORAGE_KEY = 'native_habitat_species_db';

const INITIAL_DATA: Species[] = [
  {
    id: '1',
    commonName: 'White Oak',
    scientificName: 'Quercus alba',
    category: 'tree',
    location: 'Eastern US',
    nativeStatus: 'native',
    note: 'Important canopy tree supporting hundreds of moth and butterfly species. Crucial for local ecosystems.',
    submitterName: 'System',
    status: 'approved',
    createdAt: new Date(Date.now() - 100000000).toISOString(),
  },
  {
    id: '2',
    commonName: 'Purple Coneflower',
    scientificName: 'Echinacea purpurea',
    category: 'flower',
    location: 'Eastern & Central US',
    nativeStatus: 'native',
    note: 'Great for pollinators in the summer, and birds eat the seeds in winter. Extremely drought tolerant.',
    submitterName: 'System',
    status: 'approved',
    createdAt: new Date(Date.now() - 80000000).toISOString(),
  },
  {
    id: '3',
    commonName: 'Eastern Bluebird',
    scientificName: 'Sialia sialis',
    category: 'bird',
    location: 'Eastern North America',
    nativeStatus: 'native',
    note: 'Requires cavity nests. Great natural insect control for homesteads.',
    submitterName: 'System',
    status: 'approved',
    createdAt: new Date(Date.now() - 40000000).toISOString(),
  }
];

export function loadSpecies(): Species[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse local storage, falling back to initial data.', e);
    }
  }
  return INITIAL_DATA;
}

export function saveSpecies(species: Species[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(species));
}
