// document.addEventListener("DOMContentLoaded", function() {});


const list = document.querySelector("#list")
const showPanel = document.querySelector("#show-panel")

const URL = "http://localhost:3000/books"

function init() {
    fetch (URL)
    .then(response => response.json())
    .then(booksArray => renderAllBooks(booksArray))
}

function renderAllBooks(booksArray) {
    booksArray.forEach(book => renderBook(book))
}

function renderBook(book) {
    const li = document.createElement("li")
    li.innerText = book.title

    li.addEventListener("click", event => {

        const showDiv = document.createElement("div")

        const image = document.createElement("img")
        image.src = book.img_url
        image.alt = book.title

        const title = createNode("h2", book.title)
        const subtitle = createNode("h2", book.subtitle)
        const author = createNode("h2", book.author)
        const description = createNode("p", book.description)
        const button = createNode("button", "Like")
        const usersUL = document.createElement("ul")
        const usersArray = book.users

        renderUsers(usersArray, usersUL)

        button.addEventListener("click", event => {
            const self = [{"id":1, "username":"pouros"}]
            const newUsers = [...usersArray, ...self]

            fetch(`${URL}/${book.id}`, {
                method:"PATCH",
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify({users:newUsers})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                renderUsers(newUsers, usersUL)
            })
        })

        showPanel.innerHTML = createShowDiv(showDiv, [image, title, subtitle, author, description]).innerHTML
        showPanel.append(usersUL, button)
    })

    list.append(li)
}

function createNode(type, inner) {
    let node = document.createElement(type)
    node.innerText = inner
    return node;
}

function createShowDiv(showDiv, array) {
    array.forEach(element => {
        if (element.innerText != "undefined") {
            showDiv.append(element)
        }
    })
    return showDiv;
}

function renderUsers(usersArray, usersUL) {
    usersUL.innerHTML = ""
    usersArray.forEach(user => {
        const userLi = createNode("li", user.username)
        usersUL.append(userLi)
    })
}

init();
