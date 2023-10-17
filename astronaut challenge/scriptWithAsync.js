/**
 * @title Astronaut App - Solution
 * @author mmousiou@gmail.com (Maria Mousiou)
 * @fileoverview 
 * * Application that calls an API and gets the current number of people in space, 
 *   their names and their spacecrafts.
 * * this script uses [async...await] to fetch the data
 * @version  Solution_v1 
 * @link http://open-notify.org/Open-Notify-API/People-In-Space/
 */

'use strict';

const btnCalc = document.getElementById('calculate');
const spinner = document.querySelector('.loader');
const btnLabel = document.querySelector('.btn__label');
const outcomeEL = document.querySelector('.outcome');
const peopleNumberEL = document.querySelector('.outcome__people');
const peopleInfoEL = document.querySelector('.outcome__people__info');
const linkEL = document.querySelector('.showLess');

let jsonStr = ''
let numberOfPeople
let people
let calcIsPressed = false

const init = function () {
  calcIsPressed = false
  spinner.style.display = 'none'
  outcomeEL.classList.add('hidden');
}

init()

btnCalc.addEventListener('click', async function () {
  if (calcIsPressed) return
  calcIsPressed = true
  btnLabel.classList.add('hidden');
  spinner.style.display = 'flex'
  await callApi()
  console.log(jsonStr)
  spinner.style.display = 'none'
  btnLabel.classList.remove('hidden');
  outcomeEL.classList.remove('hidden');
})

linkEL.addEventListener('click', function () {
  outcomeEL.classList.remove('hidden')
  calcIsPressed = false
})

const callApi = async function () {
  const apiUrl = 'http://api.open-notify.org/astros.json'
  try {
    const resp = await fetch(apiUrl)
    const data = await resp.json()
  
    people = [...data.people]
    numberOfPeople = data.number
    console.log('people: ', people)
    console.log('number: ', numberOfPeople)
  
    peopleNumberEL.innerHTML = numberOfPeople
    
    let string = ''
    people.forEach(item => {
      const temp = `<p>&nbsp🧑‍🚀${item.name}, 🚀${item.craft}</p>`
      string += temp
    })
  
    peopleInfoEL.innerHTML = string
  } catch (err) {
    console.error(err)
  }
}
