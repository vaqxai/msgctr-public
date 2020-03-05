# Messenger Counter

[![File size](https://img.shields.io/github/repo-size/vakkendwarf/msgctr-public)](https://img.shields.io/github/repo-size/vakkendwarf/msgctr-public)
[![Version](https://img.shields.io/github/package-json/v/vakkendwarf/msgctr-public)](https://img.shields.io/github/package-json/v/vakkendwarf/msgctr-public)
[![Last Update](https://img.shields.io/github/last-commit/vakkendwarf/msgctr-public)](https://img.shields.io/github/last-commit/vakkendwarf/msgctr-public)

Automated bot to count fb messenger messages.

A fair warning: This is a (mostly) private project. If you're not fluent in JS, you will not be able to use it.
It requires manual generation of google sheets credentials, and manual insertion of certain info like convo ID and sheet ID into the js script yourself.

# Setup tutorial
 1. Insert your facebook credentials into regen-appstate.js
 2. Run `node regen-appstate` from within the root directory
 3. Edit server.js and enter your facebook conversation id into the `login` function.
 4. Edit server.js and enter your google sheets sheet ID into the appropriate place. Beware, though that it inserts data in a very specific way, either figure out how to make a sheet compatible, or replace with your own database or sheet code.
 5. Run `node server` and configure sheets credentials
 6. Exit and run `node server` again. Your webpage should be available on `localhost:8080` or if you're running this under a service (eg. Heroku) it will automatically assign a port.

#### Change Log:
- 5.5.0 - Removed sensitive information. Published for general use and portfolio reference.
- 5.4.0 - Changed AppState to GeneratedSession. Passwords no longer stored anywhere.
- 5.3.2 - AppVeyor integration
- 5.3.1 - Added ReLogin functionality
- 5.3.0 - Added website-based appstate regenerator
- 5.2.0 - Extended functionality for the appstate regenerator. Sensitive data no longer stored in regen-appstate.js Prepared for on-site integration of appstate regeneration.
- 5.1.x - Manually regenerated appstate
- 5.0.0 - Complete overhaul of the site, refactoring to cronox, this is the initial version of cronox.
- 4.8.0 - Last version of the master branch, preparations for introduction of Google Sheets integration
- 4.7.0 - Added odometer animations to the site, removed the exchange counter
- 4.6.0 - Updated site UI
- 4.5.0 - Added Appstate Regenerator
- // 4.1 - 4.4 Change log was corrupted.
- 4.0.0 - Added new bootstrap UI
- 3.0.0 - Migrated from login-password to appstate
- 2.0.0 - Overhauled counter, removed messages per minute
- 1.0.0 - Initial Release
- 0.1.x - PreRelease Tests
