// SEarch form for the location
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

// messageOne.textContent = 'From js'
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

//fetching the data from the  url/api
fetch('/weather?address=' + location).then((response) => {
    response.json().then((data, error) => {
        if(data.error) {
            messageOne.textContent = data.error
        }
        else{

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})

})