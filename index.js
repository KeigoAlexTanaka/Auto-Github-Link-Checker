const curl = new (require( 'curl-request' ))();
const opn = require('opn');

const request = require('request'),
    username = "INSERT_USERNAME_HERE",
    password = "INSERT_PASSWORD_HERE",
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64"),
    api= "api/v3/repos/",
    base_url = `https://git.generalassemb.ly/`,
    repo_url = `sei-nyc-jeopardy/ruby-rails-auth-bcrypt`; // <- change to whatever you like

let counter = 1;

const openRepo = () => {    
    curl.setHeaders([
        'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
        `Authorization: ${auth}`
    ])
    .get(base_url+api+repo_url)
    .then(({statusCode, body, headers}) => {
        console.log("status",statusCode,"attemping to connect...",counter)
        counter++;
        if (statusCode!=404){
            opn(base_url+repo_url);
            return clearInterval(interval)
        }
    })
    .catch((e) => {
        console.log(e);
    });
}

const interval = setInterval(openRepo, 3000);