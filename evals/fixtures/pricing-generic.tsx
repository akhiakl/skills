export default function Pricing() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-center">
      <h2 className="bg-clip-text text-5xl font-bold">Supercharge your team</h2>
      <p className="text-gray-200">Cutting-edge plans for every journey.</p>
      <div className="grid grid-cols-3 gap-6">
        {["Starter", "Pro", "Enterprise"].map((t) => (
          <div key={t} className="rounded-2xl shadow-lg transition-all hover:-translate-y-1 p-8" style={{ fontFamily: "Inter" }}>
            <h3>{t}</h3>
            <button className="outline-none">Get started</button>
          </div>
        ))}
      </div>
    </section>
  );
}
