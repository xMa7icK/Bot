let handler = async m => m.reply(`

MY GIT:

pideme el github al priv
😴                                       
`.trim()) 
handler.help = ['git']
handler.tags = ['info']
handler.command = /^git$/i

module.exports = handler

