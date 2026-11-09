import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  return (
    <CollectionPage
      endpoint={endpoint}
      title="Users"
      emptyMessage="No users have joined OctoFit yet."
      renderItem={(user) => (
        <article className="card h-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title h5">{user.name ?? user.username}</h2>
            {user.username && <p className="card-text text-body-secondary">@{user.username}</p>}
            {user.email && <a href={`mailto:${user.email}`}>{user.email}</a>}
          </div>
        </article>
      )}
    />
  )
}

export default Users
