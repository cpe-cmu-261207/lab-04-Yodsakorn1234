const btn = document.querySelector('#✔')
const input = document.querySelector('input')
const reset = document.querySelector('#❌')

if (localStorage.getItem('TD') == null) {
    localStorage.setItem('TD', JSON.stringify([]))
}
if (localStorage.getItem('D') == null) {
    localStorage.setItem('D', JSON.stringify([]))
}

var todolist = JSON.parse(localStorage.getItem('TD'))
var donelist = JSON.parse(localStorage.getItem('D'))

todolist.forEach(element => {
    addToDoList('init', element)
});

donelist.forEach(element => {
    addDoneList('init', element)
});

function setLocal() {
    localStorage.TD = JSON.stringify(todolist)
    localStorage.D = JSON.stringify(donelist)
}

function addToDoBlock(textAdd) {
    const newDiv = document.createElement('div')
    const smallerDiv = document.createElement('div')
    const text = document.createElement('p')
    const done = document.createElement('button')
    const del = document.createElement('button')

    newDiv.classList = 'px-5 shadow-inner shadow-2xl flex block p-3 my-1 justify-between items-center  rounded-md '

    smallerDiv.classList = 'space-x-5'

    text.innerText = textAdd
    text.classList = 'text-4xl font-semibold'

    done.classList = 'button p-2 text-3xl font-semibold rounded-md '
    done.innerText = 'true'
    done.style.visibility = "hidden"

    del.classList = 'button p-2 text-3xl font-semibold rounded-md '
    del.innerText = 'false'
    del.style.visibility = "hidden"

    smallerDiv.append(done)
    smallerDiv.append(del)
    newDiv.append(text)
    newDiv.append(smallerDiv)

    const toDoListDiv = document.querySelector('#ToDoList')
    toDoListDiv.append(newDiv)

    newDiv.addEventListener('mouseover', () => {
        done.style.visibility = "visible"
        del.style.visibility = "visible"
    })

    newDiv.addEventListener('mouseout', () => {
        done.style.visibility = "hidden"
        del.style.visibility = "hidden"
    })

    del.addEventListener('click', () => {
        todolist.splice(todolist.indexOf(text.innerText), 1)
        setLocal()
        newDiv.remove()
    })

    done.addEventListener('click', () => {
        todolist.splice(todolist.indexOf(text.innerText), 1)
        addDoneList('done', text.innerText)
        newDiv.remove()
    })
}

function addDoneBlock(textAdd) {
    const newDiv = document.createElement('div')
    const smallerDiv = document.createElement('div')
    const text = document.createElement('p')
    const svg = document.createElement('img')


    text.innerText = textAdd
    text.classList = 'text-3xl'
    text.style.textDecoration = 'line-through'

    newDiv.classList = 'items-center shadow-md flex p-3 justify-between  rounded-md mt-2'

    newDiv.append(text)
    smallerDiv.append(svg)
    newDiv.append(smallerDiv)

    const DoneListDiv = document.querySelector('#DoneList')
    DoneListDiv.append(newDiv)
}

function addToDoList(type, text) {
    if (type == 'input') {
        todolist.push(text)
        setLocal()
    }
    addToDoBlock(text)
}

function addDoneList(type, newText) {
    if (type == 'done') {
        donelist.push(newText)
        setLocal()
    }
    addDoneBlock(newText)
}

btn.addEventListener('click', () => {
    if (input.value == '')
        alert("Task cannot empty")
    else {
        addToDoList('input', input.value)
        input.value = ''
    }
})

input.addEventListener('keyup', (evnt) => {
    if (evnt.keyCode == 13) {
        if (input.value == '')
            alert("Task cannot empty")
        else {
            addToDoList('input', input.value)
            input.value = ''
        }
    }
})

reset.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
})