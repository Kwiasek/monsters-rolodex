import './App.css';
import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {

  const [ monsters, setMonsters ] = useState([])
  const [ searchField, setSearchField] = useState('')
  const [ filteredMonsters, setFilteredMonsters] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters)
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const newSearchField = event.target.value.toLocaleLowerCase();
    setSearchField(newSearchField);
  }

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox 
        className='search-box'
        placeholder='search monsters' 
        onChangeHandler={ onSearchChange } 
      />
      <CardList 
        monsters={ filteredMonsters }
      />
      </div>
  )
}


export default App;
