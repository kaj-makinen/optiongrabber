/* jshint -W104 */
/* jshint -W119 */
// returnera måndag 23 kl 10

////////////////////////////////////////////////////////////////////////////////
// Optiongrabber.js. Enables multiple words in options, 
// ie. username and passwords can have spaces
////////////////////////////////////////////////////////////////////////////////

const path = require('path');
const grabberfunc = require(path.join(__dirname, 'functions', 'functions.js'));

// Variables from functions.js
const gcu = grabberfunc.commandoptions.useroption;
const gcp = grabberfunc.commandoptions.passwordoption;
const findArrayInArr = grabberfunc.findArrayInArr;
const filterArr= grabberfunc.filterArr;

// Local variables
const no_options_given = "No options what so ever given";
let sliceusername=[];
let slicepassword=[];
let indexofpassword=-1;
let indexofusername=-1;
let username;
let password;

///////////////////////////////////////////////////////////////////////

const myargs = process.argv.slice(2);
const arguments = myargs;

// we don't know the order of inputs. Starting with whole argv
const usernamearg=arguments;
const passwordarg=arguments;

// check if --user is given (indexofusername != -1)
indexofusername = usernamearg.indexOf(gcu,0);

// check if password is given (indexofpassword != -1)
indexofpassword = passwordarg.indexOf(gcp,0);

// return famous no_options_given if --user and --password not given
if(indexofpassword===-1 && indexofusername===-1) {
    console.log(no_options_given);
    process.exit(0);
}

// slice inputs from argv 
if(indexofpassword > indexofusername) {
    sliceusername = usernamearg.slice(indexofusername,usernamearg.indexOf(gcp,0));
    slicepassword = passwordarg.slice(indexofpassword); 
} else {
    sliceusername = usernamearg.slice(indexofusername);
    slicepassword = passwordarg.slice(indexofpassword,passwordarg.indexOf(gcu,0));
}

// search for duplicates of --user and --password
// --user and --password cannot be words in username o password 
if(findArrayInArr([''].fill(gcu),sliceusername)) {
    console.log(`Reserved word ${gcu} used in username`);
    process.exit(0);
}

if(findArrayInArr( [''].fill(gcp),slicepassword)) {
    console.log(`Reserved word ${gcp} used in password`);
    process.exit(0);
}

// build username and password (remove --user and --password and convert to string)
username = filterArr(sliceusername,gcu).join(' ');
password = filterArr(slicepassword,gcp).join(' ');

// show error messages and exit
if(indexofpassword===-1 && indexofusername!==-1) {
    console.log(`The user option = ${username} given, but no password option!`);
    process.exit(0);
}

if(indexofpassword !== -1 && indexofusername === -1) {
    console.log(`The password option = ${password} given, but no user option!`);
    process.exit(0);
}

//all ok !
console.log(`The user option = ${username} given, with the password option = ${password}.`);
