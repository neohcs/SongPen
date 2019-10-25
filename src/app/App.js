import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { getNotes, postNote, patchNote, deleteNote } from '../notes/services'
import NotePage from '../notes/NotePage'
import CreatePage from '../pages/CreatePage'
import EditPage from '../pages/EditPage'
import RecorderPlayer from '../media/RecorderPlayer'
import GlobalStyles from '../common/GlobalStyles'

export default function App() {
  const [selectedTag, setSelectedTag] = useState('')
  const [noteList, setNoteList] = useState([])
  useEffect(() => {
    getNotes().then(setNoteList)
  }, [])

  const allNoteTags = ['started', 'advanced', 'completed']
  const filteredNotes = noteList.filter(note => note.tag.includes(selectedTag))

  function selectTag(clickedTag) {
    setSelectedTag(clickedTag)
    return selectedTag === clickedTag
      ? setSelectedTag('')
      : setSelectedTag(clickedTag)
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
      <GlobalStyles />
      <AppStyled>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <>
                <NotePage
                  tags={allNoteTags}
                  onSelectTag={selectTag}
                  notes={filteredNotes}
                  selectedTag={selectedTag}
                  onDeleteClick={deleteNoteOnClick}
                ></NotePage>
              </>
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
          <Route
            path="/media"
            render={props => {
              return <RecorderPlayer></RecorderPlayer>
            }}
          />
        </Switch>
      </AppStyled>
    </Router>
  )
}

const AppStyled = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  width: 375px;
  height: 667px;

  /* grid-template-rows: 50px auto 30px; */
`
