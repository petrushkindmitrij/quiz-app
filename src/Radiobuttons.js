import React, { useState } from 'react';

export default function Radiobuttons({card, handleAnsClick}) {
  const options = card.options

  const [selectedAns,setSelectedAns]=useState('');

  const handleRadio=(option)=>{
    setSelectedAns(option);
  }

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
                    type="radio" 
                    id={`radiobutton-${index}`}
                    name="radiobuttons"
                    value={option} 
                    checked={selectedAns === option} 
                    onChange={() => handleRadio(option)} 
                  />
                  <label 
                    className="options__option-text"
                    htmlFor={`radiobutton-${index}`}
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
                if (selectedAns !== ""){
                  handleAnsClick(card, selectedAns)
                  setSelectedAns('')           
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
  );
}