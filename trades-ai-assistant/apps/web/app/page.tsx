import Link from 'next/link'

export default function Home() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div>
          <Link href="/onboarding">
            <button className="px-4 py-2 bg-slate-800 text-white rounded">Add business</button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Active Businesses</h3>
          <p className="mt-2 text-sm text-slate-600">No businesses yet — start by onboarding one.</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Recent Calls</h3>
          <p className="mt-2 text-sm text-slate-600">No calls yet — incoming calls will appear here.</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Leads</h3>
          <p className="mt-2 text-sm text-slate-600">Leads captured by the assistant will show up here.</p>
        </div>
      </div>
    </section>
  )
}
