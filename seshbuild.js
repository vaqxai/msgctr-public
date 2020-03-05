'use strict'

const Prompts = require('prompts')
const fs = require('fs')
const Loop = require('node-async-loop')

const Builder = [
	{
		type: 'text',
		name: 'datr.0',
		message: 'datr (facebook.com)'
	},
	{
		type: 'text',
		name: 'fr.0',
		message: 'fr (facebook.com)'
	},
	{
		type: 'text',
		name: 'sb.0',
		message: 'sb (facebook.com)'
	},
	{
		type: 'text',
		name: 'c_user.0',
		message: 'c_user (facebook.com)'
	},
	{
		type: 'text',
		name: 'xs.0',
		message: 'xs (facebook.com)'
	},
	{
		type: 'text',
		name: 'spin.0',
		message: 'spin (facebook.com)'
	},
	{
		type: 'text',
		name: 'presence.0',
		message: 'presence (facebook.com)'
	},
	{
		type: 'text',
		name: 'locale.0',
		message: 'locale (facebook.com)'
	},
	{
		type: 'text',
		name: 'datr.1',
		message: 'datr (messenger.com)'
	},
	{
		type: 'text',
		name: 'fr.1',
		message: 'fr (messenger.com)'
	},
	{
		type: 'text',
		name: 'sb.1',
		message: 'sb (messenger.com)'
	},
	{
		type: 'text',
		name: 'c_user.1',
		message: 'c_user (messenger.com)'
	},
	{
		type: 'text',
		name: 'xs.1',
		message: 'xs (messenger.com)'
	},
	{
		type: 'text',
		name: 'spin.1',
		message: 'spin (messenger.com)'
	},
	{
		type: 'text',
		name: 'presence.1',
		message: 'presence (messenger.com)'
	},
	{
		type: 'text',
		name: 'locale.1',
		message: 'locale (messenger.com)'
	},
]

Prompts(Builder)
	.then(async resp => {
		// Edit `session.json` to your appState json.
		let Session = JSON.parse(fs.readFileSync('export.json', 'utf8'))
		let Keys = Object.entries(resp)

		Loop(Keys, async (key, next) => {
			let Key = key[0].split('.')
			let Domain = null

			if ( parseInt(Key[1]) === 0 ) {
				Domain = 'facebook.com'
			} else {
				Domain = 'messenger.com'
			}

			await Session.forEach((sess, index) => {
				if ( sess.key === Key[0] && sess.domain === Domain ) {
					if ( sess.value != key[1] ) {
						Session[index].value = key[1]
						console.log(`[ # ] ${sess.key} [ Index: ${index} ] (${sess.domain}) -> ${key[1]}`)
					} else {
						console.log(`[ # ] ${sess.key} skipped. Values is Same.`)
					}
				}
			})

			next()
		}, () => {
			fs.writeFileSync('session.json', JSON.stringify(Session), 'utf8')
			console.log('Done.')
		})
	})
	.catch(err => console.error(err))
	