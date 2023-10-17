/**
 * @title Console your code with a twisted example
 * @author yourName 🤍
 * @tutorial 
 * * use live server extention 
 *      (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
 * * open html file with live server and in the setting put the console drawer on the bottom
 * * save the js file and see the changes 😲
 */
'use strict';

console.log('Example of how to use objects in js')
//delete when you're ready

const numberOfProducts = {
  ProductionLine1: {
    "product1": {
      AMER: 100,
      APAC: 100,
      EMEA: 100
    },
    "product2": {
      AMER: 50,
      APAC: 100,
      EMEA: 100
    },
    "product3": {
      AMER: 50,
      APAC: 100,
      EMEA: 100
    }
  },
  "ProductionLine2": {
    "product1": {
      AMER: 50,
      APAC: 100,
      EMEA: 100
    },
    "product2": {
      AMER: 50,
      APAC: 100,
      EMEA: 100
    },
    "product3": {
      AMER: 10,
      APAC: 100,
      EMEA: 100
    },
    "product4": {
      AMER: 10,
      APAC: 100,
      EMEA: 100
    },
    "product5": {
      AMER: 2,
      APAC: 100,
      EMEA: 100
    },
    "product6": {
      AMER: 10,
      APAC: 100,
      EMEA: 100
    },
    "product7": {
      AMER: 0,
      APAC: 100,
      EMEA: 100
    }
  },
  ProductionLine3: {
    "product1": {
      AMER: 20,
      APAC: 100,
      EMEA: 100
    },
    "product2": {
      AMER: 20,
      APAC: 50,
      EMEA: 100
    }
  }
}

const percentageOfSlots = {}

Object.entries(numberOfProducts).forEach(([modelLine, modelsArr]) => {
  percentageOfSlots[modelLine] = { ...modelsArr, total: {} }
  Object.values(modelsArr).map((percentageArr) => {
    Object.entries(percentageArr).forEach(([area, value]) => {
      let sum = percentageOfSlots[modelLine].total[area] || 0
      percentageOfSlots[modelLine].total[area] = sum + value
    })
  })
})

console.log('Slots per product line / product / area', percentageOfSlots)

console.log('<====================== Your code =====================>')

