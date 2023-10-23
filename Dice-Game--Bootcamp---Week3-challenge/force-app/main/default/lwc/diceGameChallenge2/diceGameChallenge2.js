/**
 * @title Dice Game App - Challenge
 * @author mmousiou@gmail.com (Maria Mousiou)
 * @fileoverview js file for the app
 * @version  Challenge_v1
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
    // TODO 5. Print the message 'New button was clicked' in the console. 
    // TODO 6. Call the init() function.
  }

  sleep (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  handleRollBtnClicked (e) { // TODO 7. Using async/await, wait for the execution of sleep()
    // TODO 8. Print the message 'Roll button was clicked' in the console. 
    if (this.playing) {

      const diceEl = this.template.createElement("div") // TODO 9. Refrence an existing element instead of creating a new
      const diceSide = Math.floor((Math.random() * 6) + 1)

      console.log(diceSide)

      // TODO 10. Create a for loop
        // diceEl.classList.remove('show-' + i)
        // if (diceSide === i) {
        //   diceEl.classList.add('show-' + i)
        // }
      // TODO 10. End the for loop

      this.sleep(1100)
      const diceNum = DICE_ARRAY[diceSide]
      console.log(diceNum)

      if (diceNum !== 1) {
        // TODO 11. Add diceNum to currentScore
        this[`current${this.activePlayer}`] = this.currentScore // save current score to current player
      } else {
        // TODO 12 Switch to the next player by calling the appropriate function
      }
    }
  }

  handleHoldBtnClicked (e) {
    // TODO 13. Print the message 'Hold button was clicked' in the console.
    if (this.playing) {
      // TODO 14. Add current score to active player's score
  
      this[`score${this.activePlayer}`] = this.scores[this.activePlayer]
  
      // if () { // TODO 15. Check if player's score is >= 30
        // this.playing = false // finish the game

        // const gameEl = this.template.querySelector('.game')
        // gameEl.classList.add('hidden');
  
        // this.template.querySelector(`.player${this.activePlayer}`)
        //   .classList.add('player--winner');
        // this.template.querySelector(`.player${this.activePlayer}`)
        //   .classList.remove('player--active');
      // } else {
        // TODO 12 Switch to the next player by calling the appropriate function
      // }
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
    
    // TODO 17. Add player--active class to player0El
    // TODO 18. Remove player--active class from player1El
  }

  switchPlayer () {
    this[`current${this.activePlayer}`] = 0
    this.currentScore = 0
    // TODO 19. Check the activePlayer and asassign the other value to the variable
    const player0El = this.template.querySelector('.playerP0')
    const player1El = this.template.querySelector('.playerP1')
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
}