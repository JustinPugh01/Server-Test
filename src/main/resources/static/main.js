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

function getAddFormHTML() {
    return `
    </article>
        <form id = "formbackground" onsubmit="event.preventDefault();addRestaurant(this);">
            <h2>Create a new restaurant </h2>
            <label class = "formbackground"> Restaurant Name</label>
            <input name="name" required /> 
            <label> Image URL </label>
            <input name="ImageURL" type ="url" required/>
            <button> Add Restaurant </button>
        </form>
    </article>

    `
}
function getAddFormDelete(){
    return `
    </article>
        <form id = "formbackground" onsubmit="deleteRestaurant(this);">
            <h2> Delete a Restaurant </h2>
            <label> Restaurant ID number </label>
            <input name="id" type="number" required/>
            <button> Delete Restaurant </button>
        </form>
    </article>

    `  
}

function addRestaurant(HTMLform){

    const restaurantnew = new FormData(HTMLform)
    const name = restaurantnew.get('name')
    const imageURL = restaurantnew.get('ImageURL')
    fetch('/restaurants',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, imageURL})
    })
    .then(res => res.json())
    .then(restaurant => {
        data.push(restaurant)
        render()
    })
    .catch(console.error)
}
function deleteRestaurant(HTMLform){

    const delrestaurant = new FormData(HTMLform)
    const id = delrestaurant.get('id')
    
    fetch(`/restaurants/${id}`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
          body: null
    })
    .then(response => response.json())
    .then(restaurant => {
       data.splice(restaurant)
        render()
   })
   
}


function render() {
    let content = data.map((restaurantData, i) => {
        return `
            <article>
            <div style = "background-image: url('${restaurantData.imageURL}');"></div>
                <h2 class = "restaurantname">${restaurantData.name}</h2>
                <button onclick="displayMenus(${i})">Menus</button>
            </article>
            
        `

    }).join("")

    content += getAddFormHTML ("")
    content += getAddFormDelete ("")

    const appEL = document.getElementById('app')
    appEL.innerHTML = content


    if (state.menuOpen) {
        const modalContent = `
                <section class = "modelBG">
                    <article class = "modelArticle">
                        ${state.menuOpen.map(menu => {
                             return `<h2>${menu.title}</h2>
                             <button>View ${menu.title}</button>`
                    }).join("")}
                        <button onclick ="closeModel()">Close</button>
                        
                    </article>
                </section>
        `
        const modelEl = document.getElementById('model')
        modelEl.innerHTML = modalContent
    } else {
        const modelEl = document.getElementById('model')
        modelEl.innerHTML = ""
    }
}

function displayMenus(index) {
    state.menuOpen = data[index].menus
    render()
}
function closeModel() {
    state.menuOpen = null
    render()
}