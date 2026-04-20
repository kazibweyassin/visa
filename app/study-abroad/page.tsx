export default function StudyAbroadPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Study Abroad Guidance</h1>
      <p className="mb-4">Explore study opportunities, requirements, and tips for international students. We help you navigate applications, visas, and more for top destinations worldwide.</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Country guides for students (UK, Canada, USA, Australia, Europe, Asia, etc.)</li>
        <li>Application timelines and requirements</li>
        <li>Scholarship and funding advice</li>
        <li>Visa and interview preparation</li>
        <li>Pre-departure checklists</li>
      </ul>
      <div className="mt-8">
        <a href="/apply" className="inline-block rounded bg-blue-600 text-white px-6 py-3 font-semibold hover:bg-blue-700">Start Your Application</a>
      </div>
    </main>
  );
}
