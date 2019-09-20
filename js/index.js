function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('github-form');
    const search = document.getElementById('search');
    const userList = document.getElementById('user-list')

    function getDetails(username) {
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(resp => resp.json())
        .then(json => {
            console.log(json);
            const referenceNode = document.getElementById(username);
            newDiv = document.createElement('div');
            newUl = document.createElement('ul');
            newDiv.appendChild(newUl);
            for(let i = 0; i < json.length; i++) {
                console.log(json[i].name)
                const newLi = document.createElement('li')
                newLi.innerText = json[i].name
                newUl.appendChild(newLi)
            };
            insertAfter(newDiv, referenceNode)
                });
    }


    function searchUser(user) {
        fetch(`https://api.github.com/search/users?q=${user}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(resp => resp.json())
        .then(json => {
            while (userList.firstChild) {
              userList.removeChild(userList.firstChild);
            }
            for(let i = 0; i < json.items.length; i++) {
                const item = document.createElement('li')
                const avatar = document.createElement('img')
                avatar.src=`${json.items[i].avatar_url}`
                let username = json.items[i].login
                item.innerText = username
                item.setAttribute('id', username)
                userList.appendChild(item)
                item.appendChild(avatar)
                item.addEventListener('click', (event) => {
                    if(event.target.innerText.length > 0) {
                        username = event.target.innerText
                    } else {
                        username = event.target.parentNode.innerText
                    }
                    getDetails(username)
                })
            }
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        user = search.value
        searchUser(user);
    })
});




  