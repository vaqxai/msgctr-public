const fs = require("fs");
const login = require("facebook-chat-api");
const simpleGit = require('simple-git');
const git = require('simple-git/promise');
const express = require ("express");

const USER = 'vakkendwarf';
const PASS = 'Razze22p';
const REPO = 'https://github.com/vakkendwarf/msgctr.git';

const remote = `https://${USER}:${PASS}@${REPO}`;


simpleGit()
     .exec(() => console.log('Starting pull...'))
     .pull((err, update) => {
        if(update && update.summary.changes) {
           require('child_process').exec('npm restart');
        }
     })
     .exec(() => console.log('pull done.'));

simpleGit()
	.exec(() => console.log('Starting push...'))
  .add('appstate.json')
  .commit('Auto appstate regeneration')
	.push(['-u', 'origin', 'HEAD:cronox-testing'])
	.exec(() => console.log('push done.'));
