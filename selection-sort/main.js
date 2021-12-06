Array.prototype.swap = function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
}

const canvas = document.getElementById("c")
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let intervalAmount = 1000 // by milliseconds

let elements = document.getElementById("elements")
let amountOfElements = elements.value
let aval = document.getElementById("aval")
aval.innerHTML = amountOfElements

elements.oninput = (e) => {
    amountOfElements = e.target.value
    aval.innerHTML = e.target.value
    arrChange()
    draw()
}

let sortingMethod = 0 // 0 = less to greater, 1 = greater to less

let maxValue = 100
let minValue = 0
let delta = maxValue - minValue + 1 // adding one to include maximum

let greatest = document.getElementById("greatest")
let gval = document.getElementById('gval')
gval.innerHTML = greatest.value

greatest.oninput = (e) => {
    gval.innerHTML = e.target.value
    maxValue = e.target.value
    delta = maxValue - minValue + 1
    arrChange()
    draw()
}

let type = document.getElementById("type")
type.onchange = (e) => {
    if (e.target.checked) {
        sortingMethod = 1
    } else {
        sortingMethod = 0
    }
}

let speed = document.getElementById("speed")
speed.onchange = (e) => {
    intervalAmount = e.target.value
}


let arr
let subArray

function arrChange() {
    arr = []
    for (let i=0; i < amountOfElements; i++) {
        arr.push(Math.round(minValue + Math.random() * delta))
    }
    subArray = arr.slice(0)
}

arrChange()


function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.beginPath()

    let x = 10
    for (let i=0; i < arr.length; i++) {
        ctx.strokeRect(x, 10, 10, arr[i])
        ctx.strokeStyle = 'black';
        x += 20
    }
}

draw()

console.log(`Original array: ${arr}`)

function findLeastNum(a) {
    let index = 0
    for (let i=1; i < a.length; i++) {
        if (a[i] < a[index]) {
            index = i
            num = a[i]
        }
    }

    return index
}

let leftwall = 0

function selectionSort() {
    var index = findLeastNum(subArray)

    subArray = subArray.swap(0, index)
    
    arr.length=leftwall
    arr.push(...subArray);

    if (subArray.length == 1) {
        return true
    } else {
        subArray.splice(0, 1)
    }

    leftwall++

    draw()
    
    setTimeout(() => {
        selectionSort()
    }, intervalAmount)
}

let main

document.getElementById("start").onclick = () => {
    arrChange()
    subArray = arr.slice(0)
    main = setInterval(() => {
        let q = selectionSort()

        if (q) {
            clearInterval(main)
            console.log(`Sorted Array: ${arr}`)
            document.getElementById("stop").click()
            arr = []
            subArray = []
        }
    }, intervalAmount)
}

document.getElementById("stop").onclick = () => {
    if (main) {
        clearInterval(main)
    }
}