const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')


const localStorageTransactions = JSON.parse(localStorage 
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID =>{
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
        updateLocalStorage()
    init()
}

const addTransactionIntoDom = transaction => {
    const operator = transaction.amount < 0 ? '-':'+'
    const CSSClass = transaction.amount < 0 ? 'minus':'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li') 

    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name} <span>${operator} ${amountWithoutOperator} € 
    </span> <button class="delete-btn" onClick="removeTransaction(${transaction.id})"> 
     x 
    </button>
    `
    transactionUl.append(li)
}
const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

const getTotal = transactionsAmounts => transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)

const updateBalanceValues = () =>{
    const transactionsAmounts = transactions.map(transaction => transaction.amount)

    const total = getTotal(transactionsAmounts)
    const income = getIncome(transactionsAmounts)
    const expense = getExpenses(transactionsAmounts)
    
        
    balanceDisplay.textContent = `${total} €`
    incomeDisplay.textContent = `${income} €`
    expenseDisplay.textContent = `${expense} €`
}

const init = () =>{
    transactionUl.innerHTML =''
    transactions.forEach(addTransactionIntoDom)
    updateBalanceValues()

}
init()

/*Salvar informação no local storage */
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const  generateID = () => Math.round(Math.random() * 1000)

const addTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({ 
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount) 
    })
}
const cleanInputs = () => {
    inputTransactionAmount.value = ''
    inputTransactionName.value = ''

}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = transactionName === '' || transactionAmount === ''

    if (isSomeInputEmpty){
        alert ('Dados por preencher!')
        return
    }
    addTransactionsArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
    cleanInputs()
   
}

form.addEventListener('submit', handleFormSubmit )