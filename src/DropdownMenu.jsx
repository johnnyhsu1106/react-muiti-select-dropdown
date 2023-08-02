import { useEffect, useRef, useState } from 'react'

const DropdownMenu = ({
  options,
  selectedOptions,
  onSelectOptions
}) => {

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [highlightedOptionIndex, setHighlightedOptionIndex] = useState();
  const containerRef = useRef();


  useEffect(() => {
    const handler = (e) => {
      if (e.target !== containerRef.current) {
        return;
      }
      
      const { code } = e;

      switch (code) {
        case 'Enter':
        case 'Space':
          handleDropdownMenuToggle();  
          if (isMenuOpened) {
            handleOptionSelect(options[highlightedOptionIndex]);
          }
          break

        case 'ArrowUp':
        case 'ArrowDown':
          if (!isMenuOpened) {
            handleDropdownMenuOpen();
            break;
          }
          
          const newHighlightedOptionIndex = highlightedOptionIndex + (code === "ArrowDown" ? 1 : -1)
          handleHighlightedOptionSelect(newHighlightedOptionIndex);
          
          break;

        case 'Escape':
          handleDropdownMenuClose();
          break;

      }
    };

    containerRef.current.addEventListener('keydown', handler);

    return () => {
      containerRef.current.removeEventListener('keydown', handler);
    }
  }, [isMenuOpened, highlightedOptionIndex]);

  
  const handleHighlightedOptionSelect = (index) => {
    if (index < 0 || index >= options.length) {
      return;
    }
    setHighlightedOptionIndex(index);
  };


  const handleOptionSelect = (option) => {
    onSelectOptions((prevSelectedOptions) => {
      // Toggle Selected Option
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((prevSelectedOption) => {
          return prevSelectedOption !== option;
        })
      } 
      
      return [...prevSelectedOptions, option];
    });
  } 

  const handleDropdownMenuToggle = () => {
    setIsMenuOpened((isPrevOpened) => {
      return !isPrevOpened;
    })
  };

  const handleDropdownMenuOpen = () => {
    setIsMenuOpened(true);
  };

  const handleDropdownMenuClose = () => {
    setIsMenuOpened(false);
  };

  const handleSelectedOptionsClear = (e) => {
    e.stopPropagation();
    onSelectOptions([]);
  }

  const handleOptionsOnMouseEnter = (index) => {
    setHighlightedOptionIndex(index);
  }

  const handleSelectedOptionsRender = () => {
    const SelectedOptions = selectedOptions.map((selectedOption) => {
      if (!selectedOption) {
        return [];
      }
      const { label, value } = selectedOption;
      
      return (
        <button 
          className='option-badge'
          key={value}
          onClick={(e) => {
            e.stopPropagation();
            handleOptionSelect(selectedOption);
          }}
        >
          {label}
          <span className='remove-btn'>&times;</span>
        </button>
      )
    });

    return SelectedOptions;
  };

  return (
    <div 
      className='container'
      tabIndex={0}
      ref={containerRef}
      onClick={handleDropdownMenuToggle}
      onBlur={handleDropdownMenuClose}
    >
      <span className='selected-options'>
        {handleSelectedOptionsRender()}
      </span>

      <button 
        className='clear-btn'
        onClick={handleSelectedOptionsClear}
      >
        &times;
      </button>
      <div className='divider'/>
      <div className='caret'/>

      <ul 
        className={`options ${isMenuOpened ? 'visible' : ''}`}>
        
        {options.map((option, index) => {
          const { label, value } = option;
          const isOptionSelected =  selectedOptions.includes(option);
          const isHighlighted = index === highlightedOptionIndex;

          return (
            <li 
              key={value}
              className={`option 
                ${isOptionSelected ? 'selected' : ''}
                ${isHighlighted ? 'highlighted' : ''}`}
          
              onClick={(e) => {
                e.stopPropagation();
                handleOptionSelect(option);
                setIsMenuOpened(false);
              }}

              onMouseEnter={() => {handleOptionsOnMouseEnter(index)}}
            >
              {label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default DropdownMenu;
