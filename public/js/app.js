const rootDiv = document.querySelector('.wrapper')
const fieldDiv = document.querySelector('.fieldDiv')
const createButton = document.querySelector('.btnCreate')
const startButton = document.querySelector('.btnStart')
const buttonWidth = 50
const select = document.querySelector('.select')

createButton.addEventListener('click', () => {
	boardCreate(select.value || window.innerWidth)
})
startButton.addEventListener('click', () => step())

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
				if (selected.length <= 5) {
					span.innerHTML = `<button class="selected" id="${j}${i}" style="background-color: red; width: 50px; height: 50px;"></button>`
				}
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

function step () {
	const size = Math.round(select.value/buttonWidth) - 1
	let selected = document.getElementsByClassName('selected')
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
				console.log(allPoints[i][j])
				count++
			}
		}
			if (count !== 2 && count !== 3) {
				let btn = document.getElementById(`${selectedIds[i]}`)
				btn.setAttribute('style', 'width: 50px; height: 50px;')
				btn.removeAttribute('class')
			} else if (count >= 1) {
				let allPointsForEmpty = []
				let emptyCount = 0 
				let toLive = []

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
					console.log('allPointsForEmpty: ', allPointsForEmpty)
					for (let j = 0; j < allPointsForEmpty.length; j++) {
						
						if (selectedIds.includes(allPointsForEmpty[i][j])) {
							emptyCount++
							if (emptyCount >= 3) {
								let btn = document.getElementById(`${allPointsForEmpty[i][j]}`)
								console.log(emptyCount)
								btn.setAttribute('style', 'background-color: red; width: 50px; height: 50px;')
								btn.setAttribute('class', 'selected')
							}
						}
					}
			}
		}
	}
}

