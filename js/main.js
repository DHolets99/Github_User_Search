const input = document.querySelector('#form');
const btn = document.querySelector('.search-form__button');

btn.addEventListener('click', () => {
    let nick = input.value;
    getUser(nick);
});


async function getUser(nick) {
    let response = await fetch(`https://api.github.com/users/${nick}`);

    if (response.ok) {
        let json = await response.json();
        saveUser(json);
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
}

function saveUser(json) {
    console.log(json);
    const user = {
        nickname: json.name,
        login: json.login,
        joined: json.created_at,
        bio: json.bio,
        repos: json.public_repos,
        followers: json.followers,
        following: json.following,
        location: json.location,
        company: json.company,
        avatar: json.avatar_url,
        web: json.html_url,
        twitter: json.twitter_username,
    };
    console.log(user);
}
