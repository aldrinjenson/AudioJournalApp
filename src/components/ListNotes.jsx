import React from 'react'

const ListNotes = ({ notes }) => {

    const noteList = notes? notes.map(note=>(<div key={note.time}> 
        <li className="collection-item avatar">
            <i className="material-icons circle green lighten-1">audiotrack</i>
            <span className="title">Title: {note.title}</span>
            <p>Date Created: {note.time}</p><br/>
            <audio controls="controls" src={note.audio} type='audio/mp3'/>
            <a href="#!" class="secondary-content"><i class="material-icons">delete</i></a>
            
        </li>
    </div>)):null

    return (
        <div className='container'>
            <h3>Saved Notes</h3>
            <p>You have {notes.length} entries </p>
                <ul className="collection">
                    {noteList}
                </ul>
        </div>
    )
}

export default ListNotes
