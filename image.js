const urlParams = new URLSearchParams(location.search)
image = urlParams.get('image')

document.body.innerHTML = `
    <img src="${image}" alt="image" >
` 