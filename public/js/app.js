const rootDiv = document.querySelector('.wrapper')
const fieldDiv = document.querySelector('.fieldDiv')
const createButton = document.querySelector('.btnCreate')
const startButton = document.querySelector('.btnStart')
const seedButton = document.querySelector('.btnSeed')
const buttonWidth = 50
const select = document.querySelector('.select')
const size = Math.round(select.value/buttonWidth)
const timeDiv = document.querySelector('.timeDiv')

createButton.addEventListener('click', () => {
	const select = document.querySelector('.select')
	boardCreate(select.value || window.innerWidth)
})
startButton.addEventListener('click', () => step())

seedButton.addEventListener('click', () => seed())

function renderTime () {
	const date = new Date()
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const seconds = date.getSeconds()
	if (timeDiv) {
		timeDiv.innerHTML = `<span class="timeSpan" style="color: red; width: 100%; height: 50px;">Time: ${hours}:${minutes}:${seconds}</span>`
	}
}

function boardCreate (viewport) {
	let count = 0
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
				let selected = document.getElementsByClassName('selected')
					span.innerHTML = `<button class="selected" id="${j}${i}" style="background-color: red; width: 50px; height: 50px;"></button>`
			})
			span.innerHTML = `<button id="${j}${i}" style="width: 50px; height: 50px;"></button>`
			div.appendChild(span)
	}
		currentField.appendChild(div)
	}
	return currentField
}

function getPoint (x, y) {
	return String(x) + String(y)
}

function seed () {
	const select = document.querySelector('.select')
	if (select) {
		const size = Math.round(select.value/buttonWidth)
		for (let i = 0; i < size; i++) {
			let btn = document.getElementById(`${String(i + 1) + String(i+1)}`)
			if (btn) {
						btn.setAttribute('style', 'background-color: red; width: 50px; height: 50px;')
						btn.setAttribute('class', 'selected')
					}
			}
			for (let i = 0; i < size; i++) {
				let btn = document.getElementById(`${String(i) + String(i+6)}`)
				if (btn) {
							btn.setAttribute('style', 'background-color: red; width: 50px; height: 50px;')
							btn.setAttribute('class', 'selected')
						}
			}
			for (let i = 5; i < size; i++) {
				let btn = document.getElementById(`${String(i + 3) + String(i+6)}`)
				if (btn) {
							btn.setAttribute('style', 'background-color: red; width: 50px; height: 50px;')
							btn.setAttribute('class', 'selected')
						}
			}
			for (let i = 5; i < size; i++) {
				let btn = document.getElementById(`${String(i + 3) + String(i+1)}`)
				if (btn) {
							btn.setAttribute('style', 'background-color: red; width: 50px; height: 50px;')
							btn.setAttribute('class', 'selected')
						}
			}
			for (let i = 5; i < size; i++) {
				let btn = document.getElementById(`${String(i + 3) + String(i)}`)
				if (btn) {
							btn.setAttribute('style', 'background-color: red; width: 50px; height: 50px;')
							btn.setAttribute('class', 'selected')
						}
			}
	}
	
	renderTime()
}

function step () {
	const select = document.querySelector('.select')
	const size = Math.round(select.value/buttonWidth) - 1
	let selected = document.getElementsByClassName('selected')
	if (selected.length) {
		renderTime()

		const selectedIds = []
	for (let i = 0; i < selected.length; i++) {
		selectedIds.push(selected[i].getAttribute('id'))
	}
	const allPoints = []
	
	for (let i = 0; i < selected.length; i++) {
		let x
		let y
		let point = []
		x = Number(selectedIds[i][0]) - 1
		y = selectedIds[i][1]
		
		point = [...point, getPoint(x, y)]
		y = Number(selectedIds[i][1]) - 1

		point = [...point, getPoint(x, y)]

		x = selectedIds[i][0]
		y = Number(selectedIds[i][1]) - 1
		point = [...point, getPoint(x, y)]

		x = Number(selectedIds[i][0]) + 1
		y = Number(selectedIds[i][1]) - 1
		point = [...point, getPoint(x, y)]

		x = Number(selectedIds[i][0]) + 1
		y = Number(selectedIds[i][1])
		point = [...point, getPoint(x, y)]

		x = Number(selectedIds[i][0]) + 1
		y = Number(selectedIds[i][1]) + 1
		point = [...point, getPoint(x, y)]

		x = Number(selectedIds[i][0])
		y = Number(selectedIds[i][1]) + 1
		point = [...point, getPoint(x, y)]

		x = Number(selectedIds[i][0]) - 1
		y = Number(selectedIds[i][1]) + 1
		point = [...point, getPoint(x, y)]

		allPoints.push(point)
	}
	if (allPoints.length) {
		for (let i = 0; i < allPoints.length; i++) {
		let count = 0
		for (let j = 0; j < allPoints[i].length; j++) {
			if (selectedIds.includes(allPoints[i][j])) {
				count++
			}
		}
			if (count < 2 || count > 3) {
				let btn = document.getElementById(`${selectedIds[i]}`)
				if (btn) {
					btn.setAttribute('style', 'width: 50px; height: 50px;')
					btn.removeAttribute('class')
				}
				
			} else {
				let allPointsForEmpty = []
				for (let j = 0; j < allPoints[i].length; j++) {
					let x
					let y
					let point = []
					let element = allPoints[i][j]
						x = Number(element[0]) - 1
						y = element[1]
						
						point = [...point, getPoint(x, y)]
						y = Number(element[1]) - 1

						point = [...point, getPoint(x, y)]

						x = element[0]
						y = Number(element[1]) - 1
						point = [...point, getPoint(x, y)]

						x = Number(element[0]) + 1
						y = Number(element[1]) - 1
						point = [...point, getPoint(x, y)]

						x = Number(element[0]) + 1
						y = Number(element[1])
						point = [...point, getPoint(x, y)]

						x = Number(element[0]) + 1
						y = Number(element[1]) + 1
						point = [...point, getPoint(x, y)]

						x = Number(element[0])
						y = Number(element[1]) + 1
						point = [...point, getPoint(x, y)]

						x = Number(element[0]) - 1
						y = Number(element[1]) + 1
						point = [...point, getPoint(x, y)]

						allPointsForEmpty.push(point)
					
				}
					for (let i = 0; i < allPointsForEmpty.length; i++) {
						let emptyCount = 0 

						for (let j = 0; j < allPointsForEmpty[i].length; j++) {
							if (selectedIds.includes(allPointsForEmpty[i][j])) {

								emptyCount++
								if (emptyCount >= 3) {
									let point = allPointsForEmpty[i][j]
									let x
									let y
									switch (j) {
										case 0:
										x = Number(point[0]) + 1
										y = point[1]
										break;
										case 1:
										x = Number(point[0]) + 1
										y = Number(point[1]) + 1
										break;
										case 2:
										x = Number(point[0])
										y = Number(point[1]) + 1
										break;
										case 3:
										x = Number(point[0]) - 1
										y = Number(point[1]) + 1
										break;
										case 4:
										x = Number(point[0]) - 1
										y = Number(point[1])
										break;
										case 5:
										x = Number(point[0]) - 1
										y = Number(point[1]) - 1
										break;
										case 6:
										x = Number(point[0])
										y = Number(point[1] - 1)
										break;
										case 7:
										x = Number(point[0]) + 1
										y = Number(point[1]) - 1
										break;
									}
									let coord = getPoint(x, y)
									let btn = document.getElementById(`${coord}`)
									if (btn) {
										btn.setAttribute('style', 'background-color: red; width: 50px; height: 50px;')
										btn.setAttribute('class', 'selected')
									}
									
								}
							}
						}
					}
			}
		}
	}
	let currentSelected = document.getElementsByClassName('selected')
	if (currentSelected && currentSelected.length) {
		setInterval(() => {
			step()
		}, 1000)
	}
	}
}

