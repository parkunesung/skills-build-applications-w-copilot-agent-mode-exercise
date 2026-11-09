import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  return (
    <CollectionPage
      endpoint={endpoint}
      title="Teams"
      emptyMessage="No teams have been created yet."
      renderItem={(team) => (
        <article className="card h-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title h5">{team.name}</h2>
            <p className="card-text">{team.description || 'Ready to reach a new goal together.'}</p>
            <h3 className="h6 text-body-secondary">Members ({team.members?.length ?? 0})</h3>
            {team.members?.length > 0 ? (
              <ul className="list-unstyled mb-0">
                {team.members.map((member, index) => (
                  <li key={member._id ?? member.id ?? index}>
                    {member.name ?? member.username ?? 'OctoFit member'}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="small text-body-secondary mb-0">No members yet.</p>
            )}
          </div>
        </article>
      )}
    />
  )
}

export default Teams
