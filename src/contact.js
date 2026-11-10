import './assets/css/contact.scss'
import './icons.js'

const models = {
  ford: ['Mustang', 'Bronco'],
  toyota: ['Camry', 'RAV4'],
  bmw: ['3 Series', 'X5'],
}

const brand = document.querySelector('#brand')
const model = document.querySelector('#model')
const budget = document.querySelector('#budget')
const budgetValue = document.querySelector('#budget-value')

brand.addEventListener('change', () => {
  model.replaceChildren(new Option('Оберіть модель', ''))
  for (const name of models[brand.value] ?? []) {
    model.add(new Option(name, name))
  }
  model.disabled = !brand.value
})

budget.addEventListener('input', () => {
  budgetValue.value = budget.value
})

const requestForm = document.querySelector('#car-request')

requestForm.addEventListener('reset', () => {
  model.replaceChildren(new Option('Оберіть модель', ''))
  model.disabled = true
  budgetValue.value = budget.defaultValue
})
