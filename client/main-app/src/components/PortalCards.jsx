const PORTAL_LINKS = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Access analytics, reports, and key metrics across your portfolio',
    url: 'http://dashboard.myplatform.local:4000',
    label: 'Open Dashboard'
  },
  {
    id: 'store',
    title: 'Store',
    description: 'Browse products, manage inventory, and process orders',
    url: 'http://store.myplatform.local:5000',
    label: 'Open Store'
  }
];

export default function PortalCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {PORTAL_LINKS.map(portal => (
        <a 
          key={portal.id}
          href={portal.url}
          className="block p-6 bg-white border border-gray-300 rounded hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">{portal.title}</h3>
          <p className="text-gray-600 mb-4">{portal.description}</p>
          <span className="text-blue-600 font-semibold">{portal.label} →</span>
        </a>
      ))}
    </div>
  );
}
