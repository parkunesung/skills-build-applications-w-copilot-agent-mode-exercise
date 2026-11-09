import { useCollection } from '../hooks/useCollection.js'

function CollectionPage({ endpoint, title, emptyMessage, renderItem }) {
  const { items, loading, error } = useCollection(endpoint)

  return (
    <section aria-labelledby="page-title">
      <div className="mb-4">
        <p className="text-uppercase text-primary fw-semibold small mb-1">OctoFit Tracker</p>
        <h1 id="page-title" className="h2 mb-0">{title}</h1>
      </div>
      {loading && <p role="status">Loading {title.toLowerCase()}...</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && items.length === 0 && (
        <div className="alert alert-info" role="status">{emptyMessage}</div>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="row g-3">
          {items.map((item, index) => (
            <div className="col-12 col-md-6 col-xl-4" key={item._id ?? item.id ?? index}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default CollectionPage
