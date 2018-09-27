const axios = require('axios')

axios.get('http://reddit.com/r/aww.json')
    .then(response => {
        console.log(response.data.data.children)
    })
    .catch(err => {
        console.log(err)
    })