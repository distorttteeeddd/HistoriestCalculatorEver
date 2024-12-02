 // get display and history
 let displayElement = document.getElementById('display')
 let historyElement = document.getElementById('history')
 let currentOperation = ''
 let firstOperand = ''
 let secondOperand = ''

 // retrieve history from localStorage
 let historyData = JSON.parse(localStorage.getItem('history')) || []

 // load history from storage
 function loadHistory() {
     historyElement.innerHTML = ''
     historyData.forEach((entry, index) => {
         let historyEntry = document.createElement('div')
         historyEntry.textContent = entry
         let deleteBtn = document.createElement('button')
         deleteBtn.textContent = 'Delete'
         deleteBtn.classList.add('delete-btn')
         deleteBtn.onclick = function() {
             deleteHistory(index)
         }
         historyEntry.appendChild(deleteBtn)
         historyElement.appendChild(historyEntry)
     })
 }

 // add history to localStorage
 function addToHistory(entry) {
     historyData.push(entry)
     localStorage.setItem('history', JSON.stringify(historyData))
     loadHistory()  // Reload history after adding new entry
 }

 // delete history item from localStorage
 function deleteHistory(index) {
     historyData.splice(index, 1)
     localStorage.setItem('history', JSON.stringify(historyData))
     loadHistory()  // Reload history after deleting entry
 }

 // clear all history
 function clearHistory() {
     historyData = []
     localStorage.setItem('history', JSON.stringify(historyData))
     loadHistory()  // Reload history after clearing
 }

 // append number to display
 function append(number) {
     displayElement.value += number
 }

 // set the math operation
 function operation(op) {
     if (displayElement.value === '') return
     firstOperand = displayElement.value
     currentOperation = op
     displayElement.value = ''
 }

 // do the math and show result using eval()
 function calculate() {
     if (displayElement.value === '' || currentOperation === '') return
     let result
     try {
         result = eval(firstOperand + currentOperation + displayElement.value) // using eval() for calculation
     } catch (e) {
         result = 'Error'
     }
     displayElement.value = result
     addToHistory(`${firstOperand} ${currentOperation} ${displayElement.value} = ${result}`)
     clearOperands()
 }

 // clear display and reset
 function clearDisplay() {
     displayElement.value = ''
     clearOperands()
 }

 // remove the last character from display
 function deleteLast() {
     displayElement.value = displayElement.value.slice(0, -1)
 }

 // show or hide history
 function toggleHistory() {
     if (historyElement.style.display === 'none' || historyElement.style.display === '') {
         historyElement.style.display = 'block'
     } else {
         historyElement.style.display = 'none'
     }
 }

 // reset the operands and operation
 function clearOperands() {
     firstOperand = ''
     secondOperand = ''
     currentOperation = ''
 }

 // load history on page loads
 window.onload = function() {
     loadHistory()
 }