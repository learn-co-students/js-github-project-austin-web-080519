document.addEventListener("DOMContentLoaded", (event) => {
    const searchForm = document.getElementById("github-form");
    const search = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");

   function fetchUsers() {
       fetch(`https://api.github.com/search/users?q=${search.value}`, {
           headers: {
               "Accept" : "application/vnd.github.v3+json"
           }
       })
       .then( (response) => response.json())
       .then( (searchData) => {
           const usersData = searchData.items;
           console.log(usersData);
           for (const user of usersData) {
               const userLi = document.createElement("li");
               userLi.innerHTML = `${user['login']}<img src=${user['avatar_url']} width="100" height="100">`;
               userLi.id = user['login'];
               userList.appendChild(userLi);
           }
       })
   }

   function fetchRepos(gitUser) {
       fetch(`https://api.github.com/users/${gitUser}/repos` , {
           headers: {
               "Accept": "application/vnd.github.v3+json"
           }
       })
       .then( (response) => response.json())
       .then( (reposData) => {
            for (const repo of reposData) {
                const repoLi = document.createElement("li")
                repoLi.innerText = `${repo.full_name}`;
                reposList.appendChild(repoLi);
            }
       })
   }

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        fetchUsers();
    })

    if (userList.hasChildNodes()) {
        userList.addEventListener("click", (event) => {
            const user = event.target.id
            fetchRepos(user);
        })
    }  
})