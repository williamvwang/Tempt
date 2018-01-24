# Tempt
**A Facebook messenger bot for coordinating social activities!**

Online gaming, food runs, homework... Tempt is a lightweight and convenient tool for all your social coordination needs! See who's tempted to do what and where with just a few keystrokes. Utilizing your existing Facebook group chats for natural integration into your most relevant social circles, Tempt puts the power of seamless coordination right at your fingertips.

Tempt runs on the Node.js platform. It uses [facebook-chat-api](https://github.com/Schmavery/facebook-chat-api) as the main component. The bot latches onto a Facebook account, and listens to all incoming messages for triggers. User can add the bot to any group chat, or simply message the bot to see its response.

-----------------------------------------------------------
## Install and run
```bash
npm start
```
or
```bash
heroku local
```

[node.js](https://nodejs.org/en/) is a required dependency.

-----------------------------------------------------------
## Usage:

### CSGO: 
> * [`@csgo tempted`](DOCS.md#tempted)
> * [`@csgo untempt`](DOCS.md#untempt)
> * [`@csgo who`](DOCS.md#who)

### PUBG: 
> * [`@pubg tempted`](DOCS.md#tempted)
> * [`@pubg untempt`](DOCS.md#untempt)
> * [`@pubg who`](DOCS.md#who)

### Food:
> * [`@food tempted`](DOCS.md#tempted)
> * [`@food untempt`](DOCS.md#untempt)
> * [`@food who`](DOCS.md#who)
> * [`@food at (place)`](DOCS.md#at)
> * [`@food where`](DOCS.md#where)

### Homework:
> * [`@hw tempted`](DOCS.md#tempted)
> * [`@hw untempt`](DOCS.md#untempt)
> * [`@hw who`](DOCS.md#who)
> * [`@hw at (place)`](DOCS.md#at)
> * [`@hw where`](DOCS.md#where)
> * [`@hw about (subject)`](DOCS.md#about)
> * [`@hw what`](DOCS.md#what)
> * [`@hw info`](DOCS.md#info)

-----------------------------------------------------------
## Versions
- 0.0.1: Initial framework.
- 0.1.0: Refactored code
- 1.0.0: Initial release with just a CS:GO client
- 1.0.1: Release with food capabilities
- 1.0.2: Release with homework and PUBG capabilities