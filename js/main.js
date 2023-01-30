const toggle = document.querySelector('.header__toggle');
const lightTheme = document.querySelector('.toggle_light');
const darkTheme = document.querySelector('.toggle_dark');
const root = document.querySelector('html');
const input = document.querySelector('#form');
const btn = document.querySelector('.search-form__button');
const error = document.querySelector('.search-form__error');
const userAvatar = document.querySelector('.user-card__icon > img')
const userName = document.querySelector('.user__name');
const userNick = document.querySelector('.user__nick');
const userJoin = document.querySelector('.user__join > span');
const userBio = document.querySelector('.user__bio');
const userRepos = document.querySelector('.user__repos > .activities__amount');
const userFollowers = document.querySelector('.user__followers > .activities__amount');
const userFollowing = document.querySelector('.user__following > .activities__amount');
const userLocation = document.querySelector('.user__location > .link__desc');
const userTwitter = document.querySelector('.user__twitter > .link__desc');
const userWebsite = document.querySelector('.user__website > .link__desc');
const userCompany = document.querySelector('.user__company > .link__desc');

toggle.addEventListener('click', changeTheme);

function changeTheme() {
    if (document.body.hasAttribute('light')) {
        document.body.removeAttribute('light');
        document.body.setAttribute('dark', '');
    } else {
        document.body.removeAttribute('dark');
        document.body.setAttribute('light', '');
    }
}


window.addEventListener('load', getUser('octocat'));

btn.addEventListener('click', () => {
    let nick = input.value;
    getUser(nick);
});

input.addEventListener('input', checkError);

function checkError() {
    if (error.style.display = "block") {
        error.style.display = "none"
    } else {
        error.style.display = "block";
    }
}

async function getUser(nick) {
    let response = await fetch(`https://api.github.com/users/${nick}`);

    if (response.ok) {
        let json = await response.json();
        checkError();
        saveUser(json);
    } else {
        error.style.display = "block";
    }
}

function saveUser(json) {
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
        blog: json.blog,
        twitter: json.twitter_username,
    };

    useUserInformation(user);
}

function useUserInformation(user) {
    userAvatar.src = user.avatar;
    userName.innerHTML = user.nickname;
    userNick.innerHTML = `@${user.login}`;
    userJoin.innerHTML = getDate(user.joined);

    if (user.bio == null) {
        userBio.innerHTML = 'This profile has no bio'
    } else {
        userBio.innerHTML = user.bio;
    };

    userRepos.innerHTML = user.repos;
    userFollowers.innerHTML = user.followers;
    userFollowing.innerHTML = user.following;
    userLocation.innerHTML = getInfo(user.location);
    userTwitter.innerHTML = getInfo(user.twitter);
    userWebsite.innerHTML = getInfo(user.blog);
    userCompany.innerHTML = getInfo(user.company);
}

function getDate(string) {
    let timestamp = Date.parse(string);
    let fullDate = new Date(timestamp);
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${fullDate.getDate()} ${month[fullDate.getMonth()]} ${fullDate.getFullYear()} `
};

function getInfo(info) {
    if (info == null|| info == '') {
        return 'Not Available'
    } else {
        return info;
    }
}