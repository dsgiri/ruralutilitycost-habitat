import React from 'react';

export function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-semibold text-stone-900 mb-6">Terms of Service</h1>
      
      <div className="prose prose-stone max-w-none space-y-6 text-stone-700">
        <p>Last updated: June 2026</p>

        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Native Habitat application (a service of Rural Utility Cost), you accept and agree to be bound by the terms and provisions of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">2. User Contributions</h2>
          <p>
            When you submit suggestions, locations, names, notes, or any other content to our platform ("Submissions"):
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>You grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, display, reproduce, and edit your Submissions.</li>
            <li>You acknowledge that all Submissions are subject to moderation. We reserve the right to approve, reject, edit, or remove any Submission at our sole discretion.</li>
            <li>You agree not to submit malicious, false, or purposefully misleading information.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">3. Not Professional Advice</h2>
          <p>
            The information provided on this platform is for educational and informational purposes only. It is not intended to be a substitute for professional land management, ecological, or legal advice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">4. Disclaimers and Limitations of Liability</h2>
          <p>
            The platform is provided on an "as-is" and "as available" basis. We make no warranties regarding the accuracy, completeness, or reliability of the user-submitted data. We shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-stone-900 mb-2">5. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of the platform following the posting of changes will mean that you accept and agree to the changes.
          </p>
        </section>
      </div>
    </div>
  );
}
