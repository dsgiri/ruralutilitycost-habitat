import React from 'react';
import { Leaf, MapPin, HandHeart, ShieldCheck } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-semibold text-stone-900 mb-4">About Native Habitat</h1>
        <p className="text-xl text-stone-500 max-w-2xl mx-auto">
          A practical, community-driven resource to help landowners and homesteaders manage native ecosystems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-stone-900 border-b border-stone-200 pb-2">Our Mission</h2>
          <p className="text-stone-700 leading-relaxed">
            The Native Habitat project was created to give rural landowners, gardeners, and homesteaders a reliable tool to discover which plants, trees, and wildlife truly belong on their land.
          </p>
          <p className="text-stone-700 leading-relaxed">
            We believe that good land management starts with accurate local knowledge. Native species require less water, support vital local food webs, and are more resilient to regional climate events.
          </p>
        </div>
        
        <div className="bg-stone-100 rounded-xl p-8">
          <h3 className="text-lg font-semibold text-stone-900 mb-6">Why It Matters</h3>
          <ul className="space-y-4 text-stone-700">
            <li className="flex gap-3">
              <Leaf className="w-6 h-6 text-emerald-600 shrink-0" />
              <span><strong>Ecosystem Support:</strong> Native plants host local insects, which in turn feed local bird populations.</span>
            </li>
            <li className="flex gap-3">
              <MapPin className="w-6 h-6 text-emerald-600 shrink-0" />
              <span><strong>Drought Resilience:</strong> Species adapted to your specific region typically survive harsh weather with less intervention.</span>
            </li>
            <li className="flex gap-3">
              <HandHeart className="w-6 h-6 text-emerald-600 shrink-0" />
              <span><strong>Land Stewardship:</strong> Keeping land healthy ensures it remains productive and beautiful for future generations.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-8 mb-8 text-center shadow-sm">
        <div className="mx-auto w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-stone-900 mb-3">A Curated Community Resource</h3>
        <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
          While this tool relies on sightings and tips from locals like you, every submission is reviewed by moderators before becoming public. This helps us filter out invasive species posing as natives and keeps the database practical and trustworthy.
        </p>
      </div>

    </div>
  );
}
