let data = []
const state = {
    menuOpen: null
}

fetch('/restaurants')
.then(response => response.json())
.then(_data => {
    data = _data
    render()
})
.catch(err => console.error(err))

function render(){
    const content = data.map((restaurantData,i) => {
        return `
            <article id = "container">
                <img src="${restaurantData.imageURL}" alt="${restaurantData.name}"/>
                <h2>${restaurantData.name}</h2>
                <button onclick="displayMenus(${i})">Menus</button>
            </article>
        `
    }).join("")
    const appEL = document.getElementById('app')
    appEL.innerHTML = content

    if(state.menuOpen){
        const modalContent = `
                <section class = "modelBG">
                    <article class = "modelArticle">
                        ${state.menuOpen.map(menu => {
                            return `<h3>${menu.title}</h3>`
                        }).join("")}
                        <button onclick ="closeModel()">Close</button>
                    </article>
                </section>
        `
        const modelEl = document.getElementById('model')
        modelEl.innerHTML = modalContent
    }else {
        const modelEl = document.getElementById('model')
        modelEl.innerHTML = ""
    }
}

function displayMenus(index) {
    state.menuOpen = data[index].menus
    render()
}
function closeModel(){
    state.menuOpen =null
    render()
}