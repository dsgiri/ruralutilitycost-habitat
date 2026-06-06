import React, { useState } from 'react';
import { Search, MapPin, Leaf } from 'lucide-react';
import { Species, Category } from '../types';

interface SpeciesDatabaseProps {
  speciesList: Species[];
}

export function SpeciesDatabase({ speciesList }: SpeciesDatabaseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const approvedSpecies = speciesList.filter(s => s.status === 'approved');

  const filteredSpecies = approvedSpecies.filter(s => {
    const matchesSearch = s.commonName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (s.scientificName && s.scientificName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: { value: Category | 'all', label: string }[] = [
    { value: 'all', label: 'All Species' },
    { value: 'tree', label: 'Trees' },
    { value: 'flower', label: 'Flowers' },
    { value: 'shrub', label: 'Shrubs' },
    { value: 'grass', label: 'Grasses' },
    { value: 'bird', label: 'Birds' },
    { value: 'animal', label: 'Animals' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-stone-900 rounded-2xl p-8 md:p-12 mb-8 relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 100% 100%, #10b981 0%, transparent 50%), radial-gradient(circle at 0% 0%, #10b981 0%, transparent 40%)' }}></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            Discover what belongs on your land.
          </h1>
          <p className="text-lg text-stone-300 mb-8 leading-relaxed">
            Explore native habitat by region. Browse verified species that support local ecosystems, or contribute your own local sightings to improve the map.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => {
                const searchInput = document.getElementById('species-search');
                if (searchInput) {
                  searchInput.focus();
                  searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-md font-medium transition-colors shadow-sm"
            >
              Search Species
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Species Library</h2>
          <p className="text-stone-500 mt-1">Curated list of community-contributed species data.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-stone-400" />
          </div>
          <input
            id="species-search"
            type="text"
            placeholder="Search common or scientific name..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat.value
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200 border'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSpecies.length > 0 ? (
          filteredSpecies.map((species) => (
            <div key={species.id} className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors">{species.commonName}</h3>
                    {species.scientificName && (
                      <p className="text-sm italic text-stone-500">{species.scientificName}</p>
                    )}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium capitalize bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {species.category}
                  </span>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-start gap-2 text-sm text-stone-600">
                    <MapPin className="h-4 w-4 text-stone-400 shrink-0 mt-0.5" />
                    <span>{species.location}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-sm text-stone-600">
                    <Leaf className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="capitalize">{species.nativeStatus.replace('-', ' ')}</span>
                  </div>
                  
                  <div className="mt-4 bg-stone-50 p-3 rounded-md border border-stone-100">
                    <p className="text-sm text-stone-700 leading-relaxed line-clamp-4 relative">
                      {species.note}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-3 bg-white border-t border-stone-100 text-xs text-stone-500 flex justify-between items-center">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Verified contribution</span>
                <span>{species.submitterName ? `By ${species.submitterName}` : 'Anonymous'}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-stone-300 flex flex-col items-center justify-center">
            <Search className="h-8 w-8 text-stone-300 mb-3" />
            <h3 className="text-stone-900 font-medium">No species found</h3>
            <p className="text-stone-500 text-sm mt-1">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
