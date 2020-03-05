// This one is used from the webpage itself.
const fs = require("fs");
const login = require("facebook-chat-api");
const simpleGit = require('simple-git');
const git = require('simple-git/promise');
const express = require ("express");

const USER = process.env.USER;
const PASS = process.env.PASS;
const REPO = 'github.com/vakkendwarf/msgctr';

const remote = `https://${USER}:${PASS}@${REPO}`;

var args = [];

console.log("INIT REGEN APPSTATE")

process.argv.forEach(function (val, index, array){
  if (index == 2 || index == 3) {
    console.log("REGEN_APPSTATE >>> " + val)
    args.push(val);
  }
});

login({email: args[0], password: args[1]}, {
	forceLogin: true,
	userAgent: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1"
}, (err, api) => {
    if(err) {
    /*
      if (process.send) {
        process.send('err');
      }
    */
      return console.error(err)
    };

    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));

    simpleGit().init()
      .add('appstate.json')
      .commit('Auto appstate regeneration')
      .push('origin', 'cronox-testing')
      .exec(() => console.log("REGEN_APPSTATE >>> Pushed new appstate"));

    /*
    if(err) {
      if (process.send) {
        process.send('relogin');
      }
    }
    */
});
