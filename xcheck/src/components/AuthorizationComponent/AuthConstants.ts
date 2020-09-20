export const githubAuthConst ={
    githubHref: 'https://github.com/login/oauth/authorize?client_id=cea86e6977b22536af83&scope=user',
    client_id: 'cea86e6977b22536af83',
    client_secret: 'a6bc01671d7cd88314bdea894965802bca7379e3',
    proxyurl: "https://cors-anywhere.herokuapp.com/",

}

/* https://github.com/login/oauth/access_token?client_id=cea86e6977b22536af83&code=31929a1520b56c5c456b&client_secret=a6bc01671d7cd88314bdea894965802bca7379e3&redirect_uri=http://localhost:3000/tasks
 */export const passwordRegExp = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;