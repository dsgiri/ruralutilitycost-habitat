import React, { useState } from 'react';
import { CheckCircle2, ShieldAlert, Leaf } from 'lucide-react';
import { Species, Category, NativeStatus } from '../../types';

interface SuggestSpeciesProps {
  onSubmit: (species: Omit<Species, 'id' | 'status' | 'createdAt'>) => Promise<boolean>;
  existingNames: string[];
}

export function SuggestSpecies({ onSubmit, existingNames }: SuggestSpeciesProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    commonName: '',
    scientificName: '',
    category: 'flower' as Category,
    location: '',
    nativeStatus: 'native' as NativeStatus,
    note: '',
    submitterName: ''
  });

  const categories: { value: Category, label: string }[] = [
    { value: 'flower', label: 'Flower / Flowering Plant' },
    { value: 'tree', label: 'Tree' },
    { value: 'shrub', label: 'Shrub' },
    { value: 'grass', label: 'Grass' },
    { value: 'bird', label: 'Bird' },
    { value: 'animal', label: 'Animal (Mammal, Reptile, Amphibian)' },
    { value: 'other', label: 'Other / Unsure' }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!formData.commonName.trim() || !formData.location.trim() || !formData.note.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    // Duplicate check
    const isDuplicate = existingNames.some(
      name => name.toLowerCase() === formData.commonName.trim().toLowerCase()
    );

    if (isDuplicate) {
      setError('A species with this common name already exists or is pending review.');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onSubmit(formData);
      if (success) {
        setIsSubmitted(true);
      } else {
        setError('Network error: Unable to communicate with the server.');
      }
    } catch {
      setError('An unexpected error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto mt-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-white border border-emerald-200 rounded-xl p-8 text-center shadow-sm">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-medium text-stone-900 mb-2">Thank you for your contribution</h2>
          <p className="text-stone-600 mb-6">
            Your species submission has been received. Our moderator team will review the details to ensure accuracy before it appears in the public database.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ ...formData, commonName: '', scientificName: '', note: '' });
            }}
            className="px-6 py-2 bg-stone-900 text-white rounded-md text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-stone-900">Suggest a Species</h2>
        <p className="text-stone-500 mt-2">
          Help improve our local knowledge base. All submissions are carefully reviewed 
          for accuracy to maintain the integrity of the database.
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-5 mb-8 flex gap-4 text-sm text-emerald-900 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Leaf className="w-24 h-24" />
        </div>
        <Leaf className="h-5 w-5 text-emerald-600 shrink-0 relative z-10" />
        <div className="relative z-10">
          <h3 className="font-semibold mb-1 text-emerald-800">Community Moderation</h3>
          <p className="text-emerald-700 leading-relaxed">
            This list is curated to ensure high-quality information. Please provide accurate observations and include specific locations (e.g., "Central Texas" or "Appalachian Region"). Your entry will be reviewed before appearing on the public library.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label htmlFor="commonName" className="block text-sm font-medium text-stone-700">
                Common Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="commonName"
                name="commonName"
                value={formData.commonName}
                onChange={handleChange}
                placeholder="e.g. Eastern Bluebird"
                className="w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="scientificName" className="block text-sm font-medium text-stone-700">
                Scientific Name <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="scientificName"
                name="scientificName"
                value={formData.scientificName}
                onChange={handleChange}
                placeholder="e.g. Sialia sialis"
                className="w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm italic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label htmlFor="category" className="block text-sm font-medium text-stone-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
              >
                {categories.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="nativeStatus" className="block text-sm font-medium text-stone-700">
                Native Confidence <span className="text-red-500">*</span>
              </label>
              <select
                id="nativeStatus"
                name="nativeStatus"
                value={formData.nativeStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
              >
                <option value="native">Confirmed Native</option>
                <option value="likely-native">Likely Native (Need verification)</option>
                <option value="unsure">Unsure (Please check)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="location" className="block text-sm font-medium text-stone-700">
              Region / Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="State, County, or Ecological Region (e.g., Pacific Northwest, Texas Hill Country)"
              className="w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="note" className="block text-sm font-medium text-stone-700">
              Observation Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              id="note"
              name="note"
              rows={4}
              value={formData.note}
              onChange={handleChange}
              placeholder="Why is it important? What have you observed about it on your land? Does it support specific wildlife?"
              className="w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-none"
            ></textarea>
            <p className="text-xs text-stone-500">Provide helpful, practical details for others.</p>
          </div>

          <div className="space-y-1.5 border-t border-stone-100 pt-6 mt-6">
            <label htmlFor="submitterName" className="block text-sm font-medium text-stone-700">
              Your Name <span className="text-stone-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="submitterName"
              name="submitterName"
              value={formData.submitterName}
              onChange={handleChange}
              placeholder="How you'd like to be credited"
              className="w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
          </div>

        </div>
        
        <div className="px-6 py-4 md:px-8 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2.5 text-white font-medium text-sm rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${isSubmitting ? 'bg-stone-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Review'}
          </button>
        </div>
      </form>
    </div>
  );
}
