export const githubAuthConst ={
    githubHref: 'https://github.com/login/oauth/authorize?client_id=cea86e6977b22536af83&scope=user',
    client_id: 'cea86e6977b22536af83',
    client_sercret: '4d2e92daea3f631a26e5bdd71802e51264cd624b'
}

/* https://github.com/login/oauth/access_token?client_id=cea86e6977b22536af83&code=31929a1520b56c5c456b&client_sercret=4d2e92daea3f631a26e5bdd71802e51264cd624b&redirect_uri=http://localhost:3000
 */export const passwordRegExp = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;