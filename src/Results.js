export default class Results {
  constructor(){
    this.resetRes()
  }

  resetRes(){
    this._priceOfAns = {
      easy: 1,
      medium: 2,
      hard: 3
    }
    this._numAns = {
      easy: 0,
      medium: 0,
      hard: 0
    }
    this._numCorrAns = {
      easy: 0,
      medium: 0,
      hard: 0
    }
    this._score = 0
    this._maxScore = 0
  }

  changeRes(difficulty, corrAns, ans){
    // console.log(corrAns)
    // console.log(ans)
    
    if (JSON.stringify(Array.isArray(corrAns) ? corrAns.sort() : [corrAns]) === 
      JSON.stringify(Array.isArray(ans) ? ans.sort() : [ans]) ) {
        
        this._numCorrAns[difficulty] += 1
        this._score += this._priceOfAns[difficulty]      
    }
    this._numAns[difficulty] += 1
    
    this._maxScore += this._priceOfAns[difficulty]  

    // console.log(this._numCorrAns)
    // console.log(this._score)
    // console.log(this._maxScore)
  }

  getRes(){
    return {
      priceOfAns: this._priceOfAns, 
      numAns: this._numAns, 
      numCorrAns: this._numCorrAns, 
      maxScore: this._maxScore,
      score: this._score,
    }    
  }
}


