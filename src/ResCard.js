import React from 'react'

export default function ResCard({results, resetApp}) {
  const {priceOfAns, numAns, numCorrAns, score, maxScore} = results

  return (
    <div className='res-card'>
      <span 
        className='res-card__score'
        key={1} 
      >
        You scored {score} out of {maxScore}
      </span>
      <ul className="res-card__details-list">
        {Object.keys(numAns).map((nameDiffic, ind) => {
          return (
          <li
            className="res-card__details-item"
            key={ind}
          >              
            {numCorrAns[nameDiffic]} of {numAns[nameDiffic]} "{nameDiffic}" questions 
            (1 question = {priceOfAns[nameDiffic]} score)
          </li>)
        })}
      </ul>
      <div className="res-card__container-btn">
        <button 
          className="btn"
          onClick={() => 
            {
              resetApp()         
            }
          }
        >
          Play again
        </button>   
        <button 
          className="btn"
          onClick={() => 
            {
              resetApp(true)         
            }
          }
        >
          Load new questions
        </button>   
      </div>
    </div>    
  )
}
