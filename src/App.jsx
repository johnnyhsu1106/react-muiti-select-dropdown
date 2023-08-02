import { useState } from 'react'

import DropdownMenu from './DropdownMenu';
import options from './options.json'

import './App.css'

function App() {

  const [selectedOptions, setSeletedOptions] = useState([]);

  return (
    <>
      <DropdownMenu
        options={options}
        selectedOptions={selectedOptions}
        onSelectOptions={setSeletedOptions} 
      />    
    </>
  )
}

export default App;
