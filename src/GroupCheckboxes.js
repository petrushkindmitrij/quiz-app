import React, { useState } from "react";

export default function GroupCheckboxes({card, handleAnsClick}) {
  const options = card.options

  const [selectedAns, setSelectedAns] = useState([]);

  const handleCheckbox = (option) => {
    const indOption = selectedAns.indexOf(option)
    // console.log(indOption)
    // console.log(selectedAns)
    if (indOption === -1){
      setSelectedAns([...selectedAns, option])
    } else{
      const newSelectedAns = [...selectedAns]
      newSelectedAns.splice(indOption,1)
      setSelectedAns(newSelectedAns)
      // console.log(newSelectedAns)

    }
  };

  return (  
    <>  
      {
        typeof(options) === 'object' ? (
          <div className="options">          
            <ul className="options__list">
              {options.map((option, index) => {
                return (
                  <li 
                    className="options__option" 
                    key={index}
                  >
                    <input
                      className="options__input"
                      type="checkbox"
                      id={`checkbox-${index}`}
                      name="checkbox"
                      value={option}
                      checked={selectedAns.indexOf(option) !== -1}
                      onChange={() => handleCheckbox(option)}
                    />
                    <label 
                      className="options__option-text"
                      htmlFor={`checkbox-${index}`}
                    >
                      {option}
                    </label>                         
                  </li>
                )
              })}
            </ul> 
            <button 
              className="btn"
              onClick={() => 
                {
                  if (selectedAns.length !== 0){
                    handleAnsClick(card, selectedAns)
                    setSelectedAns([])
                  }
                }
            }>
              Submit
            </button>   
          </div>
        ) : (
          'Loading'
        )
      }
    </>
  )
}