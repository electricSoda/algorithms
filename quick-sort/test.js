let arr
let amountOfElements = 10
let minValue = 0
let maxValue = 30
let delta = maxValue - minValue + 1 // adding one to include maximum

function arrChange() {
    arr = []
    for (let i=0; i < amountOfElements; i++) {
        arr.push(Math.round(minValue + Math.random() * delta))
    }
}

// arrChange()

arr = [21, 5, 38, 2, 17, 32, 4, 1, 1, 8]

console.log(`Original Array: ${arr}`)

function partition(a, start, end) {
    let pivot = a[start]
    let leftwall = start

    for (let i=start+1; i<=end; i++) {
        if (a[i] < pivot) {
            [a[i], a[leftwall]] = [a[leftwall], a[i]]
            leftwall = leftwall + 1
        }

        console.log(a)
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
    }
}

quickSort(arr, 0, arr.length -1)
console.log(arr)