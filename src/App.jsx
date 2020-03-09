import React, { useState } from 'react'
import AddNew from './components/AddNew';
import ListNotes from './components/ListNotes';
import SearchBar from './components/SearchBar';
import Landing from './components/Landing';

const App = () => {
  const [searchField, setSearchField] = useState('')
  const [notes, setNotes] = useState([
    { title: 'Today \'s revalataion', audio: '', content: 'Lorem ipedita, corporis adipisci sit, fprovident delectus assumenda obcaecati aperiam sint impedit ipsa sed voluptas quidem id sapiente?', time: new Date().toLocaleString() },
  ])

  const addNewNote = e => {
    console.log(e);
    setNotes([...notes, e])
  }

  const Search = e => {
    console.log(e)
    setSearchField(e)
  }

  const Delete = time =>{
    // const 
    console.log(time);
    const newNoteList = notes.filter(note=>{
      return note.time != time
    })
    setNotes(newNoteList)    
  }

  const noteList = notes.filter(note => {
    return note.content.toLowerCase().includes(searchField.toLowerCase())
  })


  return (
    <div className='App '>
      <Landing/>
      <SearchBar Search={Search} />
      <ListNotes notes={noteList} Delete={Delete} />
      <AddNew addNewNote={addNewNote} />
    </div>
  )
}

export default App
