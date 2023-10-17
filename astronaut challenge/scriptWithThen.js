/** 
 * @title Astronaut App - Solution
 * @author mmousiou@gmail.com (Maria Mousiou)
 * @fileoverview 
 * * Application that calls an API and gets the current number of people in space, 
 *   their names and their spacecrafts.
 * * this script uses [promise...then] to fetch the data
 * @version Solution_v2
 * @link http://open-notify.org/Open-Notify-API/People-In-Space/
 */

'use strict';

const btnCalc = document.getElementById('calculate');
const outcomeEL = document.querySelector('.results');
const peopleNumberEL = document.querySelector('.outcome__people');
const peopleInfoEL = document.querySelector('.outcome__people__info');
const linkEL = document.querySelector('.showLess');

let jsonStr = ''
let numberOfPeople
let people

const init = function () {
  outcomeEL.classList.add('hidden');
}

init()

btnCalc.addEventListener('click', function () {
  callApi()
  console.log(jsonStr)
  outcomeEL.classList.remove('hidden');
})

linkEL.addEventListener('click', function () {
  outcomeEL.classList.remove('hidden');
})

const callApi = function () {
  const apiUrl = 'http://api.open-notify.org/astros.json'
  fetch(apiUrl)
  .then(resp => resp.json())
  .then(data =>  {
    //  const obj = JSON.parse(data)
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
  })
  .catch(err => console.error(err))
}
