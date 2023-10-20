/**
 * @title Dice Game App - Solution
 * @author mmousiou@gmail.com (Maria Mousiou)
 * @fileoverview js file for the app
 * @version  Solution_v1
 */
import { LightningElement } from 'lwc'

const DICE_ARRAY = [0,1,5,6,3,4,2]

export default class PigGame extends LightningElement {

  // initialize variables
  scoreP0 = 43
  scoreP1 = 24
  currentP0 = 0
  currentP1 = 0
  scores = { P0: 0, P1: 0 }
  currentScore = 0
  activePlayer = 'P0'
  playing = true

  handleNewBtnClicked (e) {
    console.log('Button was clicked')
    this.init()
  }

  sleep (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  async handleRollBtnClicked (e) {
    console.log('Roll Button was clicked')
    if (this.playing) {

      const diceEl = this.template.querySelector('[data-id="dice1"]')
      const diceSide = Math.floor((Math.random() * 6) + 1)

      console.log(diceSide)

      for (var i = 1; i <= 6; i++) {
        diceEl.classList.remove('show-' + i)
        if (diceSide === i) {
          diceEl.classList.add('show-' + i)
        }
      }

      await this.sleep(1100)
      const diceNum = DICE_ARRAY[diceSide]
      console.log(diceNum)

      if (diceNum !== 1) {
        // Add dice to current score
        this.currentScore += diceNum
        //save current score to current player
        this[`current${this.activePlayer}`] = this.currentScore
      } else {
        // Switch to next player
        this.switchPlayer()
      }
    }
  }

  handleHoldBtnClicked (e) {
    console.log('Button hold was clicked')
    if (this.playing) {
      // 1. Add current score to active player's score
      this.scores[this.activePlayer] = this.scores[this.activePlayer] + this.currentScore
      // scores[1] = scores[1] + currentScore
  
      this[`score${this.activePlayer}`] = this.scores[this.activePlayer]
  
      // 2. Check if player's score is >= 100
      if (this.scores[this.activePlayer] >= 30) {
        // Finish the game
        this.playing = false

        const gameEl = this.template.querySelector('.game')
        gameEl.classList.add('hidden');
  
        this.template.querySelector(`.player${this.activePlayer}`)
          .classList.add('player--winner');
        this.template.querySelector(`.player${this.activePlayer}`)
          .classList.remove('player--active');
      } else {
        // Switch to the next player
        this.switchPlayer();
      }
    }
  }

  init () {
    this.playing = true
    this.scores = { P0: 0, P1: 0 }
    this.currentScore = 0
    this.activePlayer = 'P0'

    const player0El = this.template.querySelector('.playerP0')
    const player1El = this.template.querySelector('.playerP1')

    const gameEl = this.template.querySelector('.game')
    gameEl.classList.remove('hidden')

    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')

    this.scoreP0 = 0
    this.scoreP1 = 0
    this.currentP0 = 0
    this.currentP1 = 0

    this.hideDice = true
    
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
  }

  connectedCallback () {
    console.log('Connected is called!!')
  }

  switchPlayer () {
    this[`current${this.activePlayer}`] = 0
    this.currentScore = 0
    this.activePlayer = this.activePlayer === 'P0' ? 'P1' : 'P0'
    const player0El = this.template.querySelector('.playerP0')
    const player1El = this.template.querySelector('.playerP1')
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
}