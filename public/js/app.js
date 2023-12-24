const rootDiv = document.querySelector('.wrapper')
const fieldDiv = document.querySelector('.fieldDiv')
const startButton = document.querySelector('.btnCreate')
const buttonWidth = 50;
const select = document.querySelector('.select')

startButton.addEventListener('click', () => {
	boardCreate(select.value || window.innerWidth)
})

function boardCreate (viewport) {
	fieldDiv.innerHTML = ''
	const field = `<div class="field" style="width: ${select.value}px;"></div>`
	fieldDiv.innerHTML = field
	const currentField = document.querySelector('.field')
	const size = Math.round(viewport/buttonWidth)
	
	for (let i = 0; i < size; i++) {
		let div = document.createElement('div')
		for (let j = 0; j < size; j++) {
			let span = document.createElement('span')
			span.addEventListener('click', () => {
				span.innerHTML = `<button id="btn-${j}-${i}" style="background-color: red; width: 50px; height: 50px;"></button>`
			})
			span.innerHTML = `<button id="btn-${j}-${i}" style="width: 50px; height: 50px;"></button>`
			div.appendChild(span)
	}
		currentField.appendChild(div)
	}
	return currentField
}

