import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import { getNotes, postNote, patchNote, deleteNote } from '../notes/services'
import NotePage from '../pages/NotePage'
import CreatePage from '../pages/CreatePage'
import EditPage from '../pages/EditPage'

export default function App() {
  const [selectedTag, setSelectedTag] = useState('')
  const [noteList, setNoteList] = useState([])
  useEffect(() => {
    getNotes().then(setNoteList)
  }, [])

  const allNoteTags = ['started', 'advanced', 'completed']
  const filteredNotes = noteList.filter(note => note.tag.includes(selectedTag))

  function selectTag(clickedTag) {
    selectedTag === clickedTag ? setSelectedTag('') : setSelectedTag(clickedTag)
  }

  function createNote(newNoteData) {
    postNote(newNoteData).then(note => setNoteList([note, ...noteList]))
  }

  function editNote(id, editData) {
    patchNote(id, editData).then(editNote => {
      const index = noteList.findIndex(note => note._id === editNote._id)
      setNoteList([
        editNote,
        ...noteList.slice(0, index),
        ...noteList.slice(index + 1)
      ])
    })
  }

  function deleteNoteOnClick(note) {
    deleteNote(note._id).then(deletedNote => {
      const index = noteList.findIndex(note => note._id === deletedNote._id)
      setNoteList([...noteList.slice(0, index), ...noteList.slice(index + 1)])
    })
  }

  return (
    <Router>
      <AppStyled>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <NotePage
                tags={allNoteTags}
                onSelectTag={selectTag}
                notes={filteredNotes}
                selectedTag={selectedTag}
                onDeleteClick={deleteNoteOnClick}
              ></NotePage>
            )}
          />
          <Route
            path="/create"
            render={() => (
              <CreatePage
                onSelectTag={selectTag}
                selectedTag={selectedTag}
                onSubmit={createNote}
                setNoteList={setNoteList}
              ></CreatePage>
            )}
          />
          <Route
            path="/edit"
            render={props => {
              return (
                <EditPage
                  editNoteData={props.location.editNoteData}
                  notes={filteredNotes}
                  onSelectTag={selectTag}
                  selectedTag={selectedTag}
                  onSubmit={editNote}
                  setNoteList={setNoteList}
                ></EditPage>
              )
            }}
          />
        </Switch>
      </AppStyled>
    </Router>
  )
}

const AppStyled = styled.div`
  width: 100%;
  height: inherit;
`
