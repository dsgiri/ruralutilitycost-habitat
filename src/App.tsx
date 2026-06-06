import { useState, useEffect } from 'react';
import { Leaf, Menu, Library, PlusCircle, ShieldCheck, Lock } from 'lucide-react';
import { SpeciesDatabase } from './components/views/SpeciesDatabase';
import { SuggestSpecies } from './components/views/SuggestSpecies';
import { ModerationQueue } from './components/views/ModerationQueue';
import { TermsOfService } from './components/views/TermsOfService';
import { PrivacyPolicy } from './components/views/PrivacyPolicy';
import { Disclaimer } from './components/views/Disclaimer';
import { Species } from './types';

type ViewState = 'database' | 'suggest' | 'admin' | 'terms' | 'privacy' | 'disclaimer';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('database');
  const [species, setSpecies] = useState<Species[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Admin auth state
  const [adminSecret, setAdminSecret] = useState<string>('');
  const [isPromptingAdminSecret, setIsPromptingAdminSecret] = useState(false);
  const [pendingAdminAction, setPendingAdminAction] = useState<{type: 'approve'|'reject', id: string} | null>(null);

  // Load initial data
  useEffect(() => {
    fetch('/api/species')
      .then(res => res.json())
      .then(data => setSpecies(data))
      .catch(err => console.error('Failed to load species:', err));
  }, []);

  const handleSuggest = async (newSpeciesData: Omit<Species, 'id' | 'status' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/species', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpeciesData)
      });
      if (res.ok) {
        const added = await res.json();
        setSpecies([...species, added]);
      } else {
        alert('Failed to submit species. Please try again.');
      }
    } catch (e) {
      alert('Network error submitting species.');
    }
  };

  const executeAdminAction = async (type: 'approve'|'reject', id: string, secret: string) => {
    try {
      const res = await fetch(`/api/species/${id}/${type}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${secret}` }
      });
      
      if (res.ok) {
        const updated = await res.json();
        setSpecies(species.map(s => s.id === id ? updated : s));
        setIsPromptingAdminSecret(false);
        setPendingAdminAction(null);
      } else if (res.status === 403) {
        alert('Unauthorized. Invalid admin password.');
      } else {
        alert('Failed to perform moderation action.');
      }
    } catch (e) {
      alert('Network error during moderation.');
    }
  };

  const requireAdminAction = (type: 'approve'|'reject', id: string) => {
    if (adminSecret) {
      executeAdminAction(type, id, adminSecret);
    } else {
      setPendingAdminAction({ type, id });
      setIsPromptingAdminSecret(true);
    }
  };

  const handleApprove = (id: string) => requireAdminAction('approve', id);
  const handleReject = (id: string) => requireAdminAction('reject', id);

  const existingNames = species
    .filter(s => s.status !== 'rejected')
    .map(s => s.commonName);

  const pendingCount = species.filter(s => s.status === 'pending').length;

  const Navigation = () => (
    <>
      <button
        onClick={() => { setCurrentView('database'); setIsMobileMenuOpen(false); }}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          currentView === 'database' 
            ? 'bg-emerald-50 text-emerald-700' 
            : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
        }`}
      >
        <Library className="h-4 w-4" />
        Library
      </button>
      <button
        onClick={() => { setCurrentView('suggest'); setIsMobileMenuOpen(false); }}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          currentView === 'suggest' 
            ? 'bg-emerald-50 text-emerald-700' 
            : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
        }`}
      >
        <PlusCircle className="h-4 w-4" />
        Contribute
      </button>
      <button
        onClick={() => { setCurrentView('admin'); setIsMobileMenuOpen(false); }}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          currentView === 'admin' 
            ? 'bg-amber-50 text-amber-700' 
            : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
        }`}
      >
        <ShieldCheck className="h-4 w-4" />
        Admin
        {pendingCount > 0 && (
          <span className="ml-1 bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            {pendingCount}
          </span>
        )}
      </button>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans relative">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10 w-full shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('database')}>
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-lg tracking-tight text-stone-800">
                Native Habitat
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-2">
              <Navigation />
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-stone-500 hover:text-stone-900 focus:outline-none p-2"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-stone-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
            <div className="flex flex-col space-y-2">
              <Navigation />
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {currentView === 'database' && <SpeciesDatabase speciesList={species} />}
        {currentView === 'suggest' && <SuggestSpecies onSubmit={handleSuggest} existingNames={existingNames} />}
        {currentView === 'admin' && <ModerationQueue speciesList={species} onApprove={handleApprove} onReject={handleReject} />}
        {currentView === 'terms' && <TermsOfService />}
        {currentView === 'privacy' && <PrivacyPolicy />}
        {currentView === 'disclaimer' && <Disclaimer />}
      </main>

      <footer className="bg-stone-900 border-t border-stone-800 py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-stone-300">
              <Leaf className="h-5 w-5 text-emerald-500" />
              <span className="font-medium text-lg tracking-tight">Native Habitat</span>
            </div>
            
            <div className="flex gap-6 text-sm text-stone-400">
              <button onClick={() => setCurrentView('terms')} className="hover:text-stone-200 transition-colors">Terms of Service</button>
              <button onClick={() => setCurrentView('privacy')} className="hover:text-stone-200 transition-colors">Privacy Policy</button>
              <button onClick={() => setCurrentView('disclaimer')} className="hover:text-stone-200 transition-colors">Disclaimer</button>
            </div>
          </div>
          
          <div className="mt-8 text-center md:text-left text-sm text-stone-500">
            <p>&copy; {new Date().getFullYear()} Rural Utility Cost. All rights reserved. A community-driven resource for practical land stewardship.</p>
          </div>
        </div>
      </footer>

      {/* Admin Secret Prompt Modal */}
      {isPromptingAdminSecret && (
        <div className="fixed inset-0 bg-stone-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <Lock className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg">Admin Authentication</h3>
            </div>
            <p className="text-sm text-stone-600 mb-4">
              Please enter the moderation password to perform this action.
            </p>
            <form onSubmit={e => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const secret = formData.get('secret') as string;
              if (secret) {
                setAdminSecret(secret);
                if (pendingAdminAction) {
                  executeAdminAction(pendingAdminAction.type, pendingAdminAction.id, secret);
                }
              }
            }}>
              <input
                type="password"
                name="secret"
                autoFocus
                placeholder="Admin password"
                className="w-full px-3 py-2 border border-stone-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsPromptingAdminSecret(false);
                    setPendingAdminAction(null);
                  }}
                  className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-amber-600 text-white rounded hover:bg-amber-700"
                >
                  Confirm Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

