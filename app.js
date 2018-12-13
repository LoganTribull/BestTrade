// given a list of prices returns {bestProfit, lowestIndex, highestIndex}
function findBestTrade(prices){
  // declaring some information I want to keep track of
  // note potentailLowest will be null when there isn't one to keep track of
   let bestProfit = 0
   let lowest = null
   let today = null
   let lowestIndex = null
   let potentialLowestIndex= null
   let highestIndex = null
   let potentialLowest = null

   // going through each price
   for(let i = 0; i < prices.length; i++){
     today = prices[i]
     // first day needs to initialize a lowest and lowest index
     if(i===0){
       lowest = today
       lowestIndex = i
     }
     else{

      // if we have a potentail lowest if we get a better profit we switch
      // lowest to potentail lowest and make potentail lowest null again
      if(potentialLowest || potentialLowest===0){
        if(today-potentialLowest > bestProfit){
          lowest = potentialLowest
          bestProfit = today - potentialLowest
          potentialLowest = null
          lowestIndex = potentialLowestIndex
          potentialLowestIndex = null
          highestIndex = i
        }

        // we might not have a profitable trade to make but a new better potentail lowest
        if(today < potentialLowest){
          potentialLowest= today
          potentialLowestIndex = i
        }
      }

      else{
        // set potential lowest if today is lower than lowest
        if(today < lowest){
          potentialLowest = today
          potentialLowestIndex = i
        }

        // keeping track of best profit
        if((today - lowest) > bestProfit){
          bestProfit = today - lowest
          highestIndex = i
        }
      }
     }
   }

   return {
     bestProfit,
     lowestIndex,
     highestIndex
   }
}

// takes best profit lowestIndex and highestIndex
// resets style
// colors up the inputs of lowest day and highest day to execute trade
// adds best profit to span
function styleUp(bestProfit, lowestIndex, highestIndex){
  document.querySelector("#answer").innerHTML = bestProfit
  let inputs = document.querySelectorAll("input")
  inputs.forEach(input => input.style.border='1px solid black')
  inputs[lowestIndex].style.border= "3px solid blue"
  inputs[highestIndex].style.border="3px solid blue"
}

// returns the prices on screen as an arrray
function getCloses(){
  closingPrices = []
  document.querySelectorAll("input").forEach(input=>closingPrices.push(+input.value))
  return closingPrices
}

// adds a new input with the propper event listeners to keep interactivity
function addInput(e,defaultValue = 10){
  input = document.createElement("input")
  input.setAttribute("type","number")
  input.setAttribute("value", defaultValue)

  //input.setAttribute("value", value)
  input.addEventListener("click", e=> {
    let {bestProfit, lowestIndex, highestIndex}= findBestTrade(getCloses())
    styleUp(bestProfit, lowestIndex, highestIndex)
  })

  document.querySelector("#inputs-container").appendChild(input)
}

// runs on load to start process
function seed(){
  let seeds = [6,5,1,13]
  const inputsContainer = document.querySelector("#inputs-container")
  for(seed of seeds){
    addInput(null, seed)
  }

  let {bestProfit, lowestIndex, highestIndex}= findBestTrade(seeds)
  styleUp(bestProfit, lowestIndex, highestIndex)
}

//start up
seed()
const addDayBtn = document.querySelector("#add-day")

// add the ability for add day button to create new input with all the required listeners
addDayBtn.addEventListener("click", ()=>{
  addInput()
  let {bestProfit, lowestIndex, highestIndex}= findBestTrade(getCloses())
  styleUp(bestProfit, lowestIndex, highestIndex)
  }
)
