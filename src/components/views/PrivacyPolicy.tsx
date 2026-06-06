import React from 'react';

export function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-semibold text-stone-900 mb-6">Privacy Policy</h1>
      
      <div className="prose prose-stone max-w-none space-y-6 text-stone-700">
        <p>Last updated: June 2026</p>

        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">1. Information We Collect</h2>
          <p>
            We collect the information you voluntarily provide when using the Native Habitat platform, specifically when you use the "Suggest a Species" feature. This may include:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Names, categories, and observation notes of species.</li>
            <li>General location data (such as state, county, or ecological region) related to the species habitat.</li>
            <li>Your name or alias (optional), if provided for crediting your contribution.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">2. How We Use Your Information</h2>
          <p>
            The information collected is used exclusively to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Curate, moderate, and maintain our public species database.</li>
            <li>Display the submitted species and your chosen name/alias (if provided) on the public directory upon approval.</li>
            <li>Improve the quality and accuracy of the native habitat platform for all users.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">3. Data Sharing and Disclosure</h2>
          <p>
            Approved submissions, including the general location and optional credit name, become part of the public species library. 
            We do not sell, rent, or trade your personal information to third parties. We may disclose data if required by law or to protect the rights and safety of our platform and its users.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">4. Data Security</h2>
          <p>
            We implement reasonable security measures to protect the integrity of our database and the information you submit. However, no data transmission over the Internet or electronic storage is entirely secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">5. Your Choices</h2>
          <p>
            You are not obligated to provide your name when submitting a species. You may submit anonymously. If you wish to request the removal of a submission you made, please contact our administrative team.
          </p>
        </section>
      </div>
    </div>
  );
}
