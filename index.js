const axios = require('axios')

let posts = []

axios.get('http://reddit.com/r/aww.json')
    .then(response => {
        let posts = response.data.data.children
        this.renderPosts(posts)
    })
    .catch(err => {
        console.log(err)
    })

function renderPosts(posts) {
    posts.forEach(element => {
        document.getElementById('posts').innerHTML = document.getElementById('posts').innerHTML +
        `
            <li class="list-group-item d-flex align-items-center">
                <img src="${element.data.thumbnail}" alt="thumb" class="thumbnail" />
                <div>${element.data.title}</div>
            </li>
        `
    });
}