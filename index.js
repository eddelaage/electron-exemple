const axios = require('axios')
const {remote, ipcRenderer} = require('electron')
const {BrowserWindow, Menu} = remote

this.initMenu()

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
                <li class="list-group-item d-flex align-items-center" data-image="${element.data.preview.images[0].source.url}">
                    <img src="${element.data.thumbnail}" alt="thumb" class="thumbnail" />
                    <div>${element.data.title}</div>
                </li>
            `
    })

    addEventListeners()
    
}

function addEventListeners(){
    document.querySelectorAll('.list-group-item').forEach(element => {
        element.addEventListener('click', function() {
            console.log('clicked')
            let imageWindow = new BrowserWindow({
                width: 500,
                height: 500,
            })

            imageWindow.on('closed', () => {
                win = null
            })

            imageWindow.loadURL('file://' + __dirname + '/image.html?image=' + this.getAttribute('data-image'))   

            imageWindow.show()
            
        })
    })
}

function initMenu() {
    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {label: 'New Wildow'},
                {label: 'Setting',
                accelerator: 'CmdOrCtrl+',
                click: () => {
                    // console.log('ok ')
                    ipcRenderer.send('toggle-settings')
                }},
                {type: 'separator'},
                {label: 'Quit',
                accelerator: 'CmdOrCtrl+Q'}, 
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {label: 'Menu item 1'},
                {label: 'Menu item 2'},
                {label: 'Menu item 3'},
            ]
        }
    ])

    Menu.setApplicationMenu(menu)
}