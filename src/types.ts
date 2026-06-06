export type Category = 'animal' | 'bird' | 'flower' | 'tree' | 'shrub' | 'grass' | 'other';
export type Status = 'pending' | 'approved' | 'rejected';
export type NativeStatus = 'native' | 'likely-native' | 'unsure';

export interface Species {
  id: string;
  commonName: string;
  scientificName?: string;
  category: Category;
  location: string;
  nativeStatus: NativeStatus;
  note: string;
  submitterName?: string;
  status: Status;
  createdAt: string;
}
