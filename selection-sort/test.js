Array.prototype.swap = function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
}

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

arrChange()

console.log(`Original Array: ${arr}`)


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

let subArray = arr.slice(0)

let leftwall = 0

function selectionSort() {
    var index = findLeastNum(subArray)

    subArray = subArray.swap(0, index)
    
    arr.length=leftwall
    arr.push(...subArray);

    subArray.splice(0, 1)
    if (subArray.length == 0) {
        return
    }
    leftwall++
    selectionSort()
}

selectionSort()
console.log(`Finished: ${arr}`)