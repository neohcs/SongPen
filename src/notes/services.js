export function getNotes() {
  return fetchNotes()
}

export function postNote(data) {
  return fetchNotes({ method: 'POST', data })
}

export function patchNote(id, data) {
  return fetchNotes({ method: 'PATCH', id, data })
}

export function deleteNote(id) {
  return fetchNotes({ method: 'DELETE', id })
}

function fetchNotes({ method = 'GET', id = '', data, file = null } = {}) {
  return fetch('/notes/' + id, {
    method,
    body: data ? JSON.stringify(data) : file,
    headers: {
      'content-type': 'application/json',
    },
  }).then(res => res.json())
}
