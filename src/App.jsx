import { useEffect, useState } from 'react'
import DropdownMenu from './DropdownMenu';
import options from './options.json'
import './App.css'

function App() {

  const [selectedOptions, setSeletedOptions] = useState([]);

  useEffect(() => {
    console.log('Selected Options: ', JSON.stringify(selectedOptions, undefined, 4));
  }, [selectedOptions]);

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
