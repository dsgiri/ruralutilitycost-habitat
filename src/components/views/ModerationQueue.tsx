import React from 'react';
import { Check, X, Clock, HelpCircle, AlertTriangle } from 'lucide-react';
import { Species } from '../../types';

interface ModerationQueueProps {
  speciesList: Species[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function ModerationQueue({ speciesList, onApprove, onReject }: ModerationQueueProps) {
  const pendingSpecies = speciesList.filter(s => s.status === 'pending');
  
  // Sort oldest first for queue
  pendingSpecies.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  if (pendingSpecies.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
        <h2 className="text-2xl font-semibold text-stone-900">Moderation Queue</h2>
        <div className="bg-white border text-center border-stone-200 rounded-xl p-12 shadow-sm flex flex-col items-center">
          <div className="h-12 w-12 bg-stone-50 rounded-full flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-stone-400" />
          </div>
          <h3 className="text-lg font-medium text-stone-900 mb-1">Queue Empty</h3>
          <p className="text-stone-500">There are no pending submissions awaiting review.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-stone-200 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Moderation Queue</h2>
          <p className="text-stone-500 mt-1">Review community submissions before they go live on the public database.</p>
        </div>
        <div className="text-sm font-medium text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
          {pendingSpecies.length} Pending
        </div>
      </div>

      <div className="space-y-4">
        {pendingSpecies.map(species => (
          <div key={species.id} className="bg-white border-l-4 border-l-amber-400 border-t border-r border-b border-stone-200 rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
            
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-stone-900">{species.commonName}</h3>
                    {species.nativeStatus !== 'native' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                        {species.nativeStatus === 'unsure' ? <HelpCircle className="w-3 h-3"/> : <AlertTriangle className="w-3 h-3"/>}
                        {species.nativeStatus.replace('-', ' ')}
                      </span>
                    )}
                  </div>
                  {species.scientificName && (
                    <p className="text-sm italic text-stone-500">{species.scientificName}</p>
                  )}
                </div>
                
                <span className="inline-flex items-center px-2 py-1 rounded bg-stone-100 text-xs font-medium capitalize text-stone-600">
                  {species.category}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="block text-stone-400 text-xs uppercase tracking-wider font-semibold mb-1">Location</span>
                  <span className="text-stone-800">{species.location}</span>
                </div>
                <div>
                  <span className="block text-stone-400 text-xs uppercase tracking-wider font-semibold mb-1">Submitted By</span>
                  <span className="text-stone-800">{species.submitterName || 'Anonymous'}</span>
                </div>
              </div>

              <div>
                <span className="block text-stone-400 text-xs uppercase tracking-wider font-semibold mb-1">Observation Notes</span>
                <p className="text-stone-700 text-sm bg-stone-50 p-3 rounded border border-stone-100">
                  {species.note}
                </p>
              </div>
            </div>

            <div className="bg-stone-50 border-t md:border-t-0 md:border-l border-stone-200 p-6 flex flex-row md:flex-col justify-center gap-3 w-full md:w-48 shrink-0">
              <button 
                onClick={() => onApprove(species.id)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
                title="Approve and publish to public library"
              >
                <Check className="h-4 w-4" />
                Approve
              </button>
              
              <button 
                onClick={() => onReject(species.id)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-stone-300 hover:bg-stone-100 hover:text-red-600 hover:border-red-200 text-stone-700 px-4 py-2 rounded-md font-medium text-sm transition-colors"
                title="Reject submission and archive"
              >
                <X className="h-4 w-4" />
                Reject
              </button>
              
              <div className="hidden md:flex items-center justify-center gap-1 text-xs text-stone-400 mt-2">
                <Clock className="w-3 h-3" />
                <span>Submitted {new Date(species.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
