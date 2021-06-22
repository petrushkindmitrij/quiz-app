import React, { useState, useEffect, useRef } from 'react';
import GroupCheckboxes from './GroupCheckboxes';
import Radiobuttons from './Radiobuttons';
import ResCard from './ResCard';
import './scss/main.scss'
import axios from 'axios'
import getData from './data.js'
import Results from './Results';

const results = new Results()
const AMOUNT_QUES = 9

function App() {
  
  const [cards, setCards] = useState([])
  const [indCurCard, setIndCurCard] = useState(0);
	const [showRes, setShowRes] = useState(false);

	const handleAnsClick = ({corrAns, difficulty}, ans) => {
    results.changeRes(difficulty, corrAns, ans)

		if (indCurCard + 1 < cards.length) {
			setIndCurCard(indCurCard + 1);
		} else {
			setShowRes(true);
		}
	};

  // Для корректного отображения симоволов
  function decodeStr(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }

  useEffect(() => {
    loadCardsFromApi()
    // loadCardsFromLocal()
  }, [])

  function loadCardsFromLocal(){
    const data = getData()
    // console.log(data)
    setCardsFromData(data)
  }

  function loadCardsFromApi() {
    return new Promise((resolve, reject)=>{
      axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: AMOUNT_QUES,
          // difficulty: 'hard',
          category: 9
        }
      })
      .then(
        result => {
          setCardsFromData(result.data)
          resolve()
        },
        error => {
          // console.log(error)
          loadCardsFromLocal()
          reject()
        }
      )
    })
  }

  function setCardsFromData(data){
    // console.log(data)
    const arrCards = data.results.map((quesItem, index) => {
      const corrAns = decodeStr(quesItem.correct_answer)
      const options = [
        ...quesItem.incorrect_answers.map(a => decodeStr(a)),
        corrAns
      ]
      return {
        id: `${index}-${Date.now()}`,
        type: quesItem.type,
        difficulty: quesItem.difficulty,
        ques: decodeStr(quesItem.question),
        corrAns: corrAns,
        options: options.sort(() => Math.random() - .5)
      }
    })
    // console.log(arrCards)
    setCards(arrCards)
  }

  async function resetApp(loadNewCards = false){
    if(loadNewCards){
      await loadCardsFromApi()
    }
    setIndCurCard(0)
    setShowRes(false)
    results.resetRes()
  }

	return (
    <>
      <h1 className="main-title">Quiz App</h1>
        {!showRes ? (
          <div className='card'>
            <div className='card__ques-count'>              
                <span>Question {indCurCard + 1}</span>|{cards.length}           
            </div>            
            {
              typeof(cards[indCurCard]) === 'object' ? (              
                <>
                  <div className='card__ques-text'>
                    {cards[indCurCard].ques}
                  </div>
                    {
                      cards[indCurCard].type === 'multiple' ? (
                        <GroupCheckboxes card={cards[indCurCard]} handleAnsClick={handleAnsClick}/>        
                      ) : (
                        <Radiobuttons card={cards[indCurCard]} handleAnsClick={handleAnsClick}/>        
                      )
                    }
                </>
              ) : (
                'Loading'
              )
            }
          </div>
        ) : (          
          <ResCard results={results.getRes()} resetApp={resetApp}/>         
        )}
    </>
	);
}

export default App;