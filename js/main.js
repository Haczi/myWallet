const deleteBtn = document.querySelector('.delete')
const addBtn = document.querySelector('.add')
const removeBtn = document.querySelector('.remove-all')
const lightBtn = document.querySelector('.light')
const darkBtn = document.querySelector('.dark')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const earns = document.querySelector('.earns')
const expenses = document.querySelector('.expenses')
const savers = document.querySelector('.savers')
const category = document.querySelector('#category')
const addPanel = document.querySelector('.add-transaction-panel')
const name = document.querySelector('#name')
const amount = document.querySelector('#amount')
const transactions = document.getElementsByClassName('transaction')
const inputs = document.querySelectorAll('input')
const money = document.querySelector('.money')
root = document.documentElement

let numbersOfErrors = 0
let icon
let countEarns = 0
let countExpenses = 0
let avaiableMoney
const openPanel = () => {
	addPanel.style.display = 'flex'
}

const closePanel = () => {
	addPanel.style.display = 'none'
	clearError(name)
	clearError(amount)
	name.value = ''
	amount.value = ''
	category.selectedIndex = 0
}

const removeAll = () => {
	const arrTransactions = [...transactions]
	const deleteTransaction = arrTransactions.forEach(transaction => transaction.remove())
	money.textContent = '0,00'
	countEarns = 0
	countExpenses = 0
}

const deleteTransaction = e => {
	if (e.target.matches('.fa-times')) {
		const parent = e.target
		let minus = parseFloat(parent.closest('div>p').textContent)
		avaiableMoney = parseFloat(money.textContent)
		money.textContent = avaiableMoney - minus
		countEarns -= minus
		parent.closest('.transaction').remove()
	}
}

const addTransaction = () => {
	const trans = document.createElement('div')
	trans.classList.add('transaction')
	if (amount.value.includes('-')) {
		expenses.append(trans)

		countExpenses += parseFloat(amount.value)
		console.log(countExpenses)
	} else {
		earns.append(trans)

		countEarns += parseFloat(amount.value)
	}
	const p = document.createElement('p')
	p.classList.add('transaction-name')
	trans.append(p)
	choiceIcon()
	const i = document.createElement('i')
	i.classList.add('fas')
	i.classList.add(icon)
	p.append(i)
	const span = document.createElement('span')
	span.textContent = `${name.value}`
	p.append(span)
	const p2 = document.createElement('p')
	p2.classList.add('transaction-amount')
	p2.textContent = `${amount.value}zl`
	trans.append(p2)
	const button = document.createElement('button')
	button.classList.add('delete')
	p2.append(button)
	const i2 = document.createElement('i')
	i2.classList.add('fas', 'fa-times')
	button.append(i2)
	countMyMoney()
	name.value = ''
	amount.value = ''
	category.selectedIndex = 0
}

const showError = inputValue => {
	inputValue.previousElementSibling.style.color = 'red'
}
const clearError = inputValue => {
	inputValue.previousElementSibling.style.color = 'white'
	category.previousElementSibling.style.color = 'white'
}

const checkInput = inputValue => {
	inputValue.forEach(el => {
		if (el.value === '') {
			showError(el)
			numbersOfErrors++
		} else {
			clearError(el)
		}
	})
	checkSelected()
	checkErrors()
	numbersOfErrors = 0
}

const checkSelected = () => {
	if (category.selectedIndex === 0) {
		category.previousElementSibling.style.color = 'red'
		numbersOfErrors++
	} else {
		category.previousElementSibling.style.color = 'white'
	}
}

const checkErrors = () => {
	if (numbersOfErrors === 0) {
		addPanel.style.display = 'none'
		addTransaction()
	}
}

const choiceIcon = () => {
	if (category.selectedIndex === 1) {
		icon = 'fa-money-bill-wave'
	} else if (category.selectedIndex === 2) {
		icon = 'fa-cart-arrow-down'
	} else if (category.selectedIndex === 3) {
		icon = 'fa-hamburger'
	} else if (category.selectedIndex === 4) {
		icon = 'fa-film'
	} else {
		console.log('error')
	}
}

const countMyMoney = () => {
	let myMoney = countEarns + countExpenses
	money.textContent = myMoney.toFixed(2)
}

const changeStyleToLight = () => {
	root.style.setProperty('--first-color', '#F9F9F9')
	root.style.setProperty('--second-color', '#14161F')
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)')
}

const changeStyleToDark = () => {
	root.style.setProperty('--first-color', '#14161F')
	root.style.setProperty('--second-color', '#F9F9F9')
	root.style.setProperty('--border-color', 'rgba(255, 255, 255, .4)')
}

addBtn.addEventListener('click', openPanel)
cancelBtn.addEventListener('click', closePanel)
removeBtn.addEventListener('click', removeAll)
expenses.addEventListener('click', deleteTransaction)
earns.addEventListener('click', deleteTransaction)
saveBtn.addEventListener('click', e => {
	e.preventDefault()
	checkInput(inputs)
})
lightBtn.addEventListener('click', changeStyleToLight)
darkBtn.addEventListener('click', changeStyleToDark)
