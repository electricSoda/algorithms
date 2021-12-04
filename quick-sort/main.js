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

function arrChange() {
    arr = []
    for (let i=0; i < amountOfElements; i++) {
        arr.push(Math.round(minValue + Math.random() * delta))
    }
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

function delay(n) {  
    n = n || 2000;
    return new Promise(done => {
      setTimeout(() => {
        done();
      }, n);
    });
}

function partition(a, start, end){
    let pivot = a[start]
    let leftwall = start

    for (let i=start+1; i<=end; i++) {
        if (a[i] < pivot) {
            [a[i], a[leftwall]] = [a[leftwall], a[i]]
            leftwall = leftwall + 1
            
            draw()
        }
        delay(intervalAmount)
    }
    [a[a.indexOf(pivot)], a[leftwall]] = [a[leftwall], a[a.indexOf(pivot)]]

    return (leftwall)
}

let pivotlocation

function quickSort(a, start, end) {
    if (start < end) {
        pivotlocation = partition(a, start, end)
        quickSort(a, start, pivotlocation)
        quickSort(a, pivotlocation+1, end)
    } else {
        return true
    }
}

console.log(`Original array: ${arr}`)

let main

document.getElementById("start").onclick = () => {
    main = setInterval(() => {
        let q = quickSort(arr, 0, arr.length -1)
        if (q) {
            clearInterval(main)
            document.getElementById("stop").click()
        }
    }, intervalAmount)
}

document.getElementById("stop").onclick = () => {
    if (main) {
        clearInterval(main)
    }
}