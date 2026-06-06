import React from 'react';
import { ShieldAlert } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-semibold text-stone-900 mb-6">Disclaimer</h1>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-8 flex gap-3 text-sm text-amber-900">
        <ShieldAlert className="h-6 w-6 text-amber-600 shrink-0" />
        <p>
          <strong>Notice:</strong> This site relies heavily on community-contributed information. While we have a moderation queue, we cannot guarantee the complete scientific accuracy of all entries.
        </p>
      </div>

      <div className="prose prose-stone max-w-none space-y-6 text-stone-700">
        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">General Information</h2>
          <p>
            The Native Habitat tool and database (habitat.ruralutilitycost.com) are provided for educational, informational, and general planning purposes only. This resource is designed to help landowners and homesteaders explore local ecosystems and community-reported native species.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">Not Professional Advice</h2>
          <p>
            The information contained on this website is not a substitute for professional ecological assessment, land management consultation, or legal advice. Environmental regulations, endangered species protections, and agricultural laws vary significantly by jurisdiction. Do not rely solely on this database for making decisions that could have legal, financial, or ecological consequences.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">Data Accuracy and Native Status</h2>
          <p>
            While submissions are moderated for spam and obvious inaccuracies, the determination of a plant or animal's "native" status can be scientifically complex and context-dependent. The database reflects the best-effort observations of the community and the moderation team. We make no representations or warranties of any kind as to the absolute accuracy, completeness, or reliability of species identifications.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">Invasive Species Warning</h2>
          <p>
            Always verify a plant or animal's status with local agricultural extensions, native plant societies, or conservation departments before introducing a new species to your land. Erroneously introducing an invasive species can harm local ecosystems and may violate state or federal laws.
          </p>
        </section>
      </div>
    </div>
  );
}
