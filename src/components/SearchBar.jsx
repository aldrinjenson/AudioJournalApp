import React from 'react'
const SearchBar = ({Search}) => {
    return (
        <div className='container'>
            <div className="search-bar">
                <div className="input-field">
                    <input placeholder='Search Audio Notes' onChange={(e)=>{Search(e.target.value)}} type="text" id="search-box"/>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
