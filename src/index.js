document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementsByTagName('table')
    const form = document.getElementById('dog-form')
    initTable()
})

function initTable() {
    const table = document.getElementById('table-body')
    table.innerHTML = ''
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>Dog ${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            `
        const td = document.createElement('td')
        const bttn = document.createElement('button')
        bttn.textContent = 'Edit'
        bttn.addEventListener('click', () => {
            clickButton(dog)
        })

        td.appendChild(bttn)
        tr.appendChild(td)
        table.appendChild(tr)
    }))
}

function clickButton(dog) {
    const form = document.getElementById('dog-form')

    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex

    form.addEventListener('submit', (e) => {
        handleSubmit(e,dog.id)
    })
}

function handleSubmit(e,id) {
    e.preventDefault()
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            'name': e.target.name.value,
            'breed': e.target.breed.value,
            'sex': e.target.sex.value
            })
    })
    .then(res => res.json())
    .then(() => initTable())
    
}

function updateTable() {

}