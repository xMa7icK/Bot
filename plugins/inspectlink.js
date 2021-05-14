let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text }) => {
  let [_, code] = text.match(linkRegex) || []
  if (!code) throw 'Link invalid'
  let res = await conn.querry({
    json: ["linkRegex", code],
    expect200: true
  })
  let caption = `
-- [ *Group Link Inspector* ] --
${res.id}
*🌤️TÍTULO:* ${res.subject}
*👁️‍🗨️FECHA DE CREACIÓN:* ${formatDate(res.creation * 1000)}
*💭TITULO CAMBIADO* por @${res.subjectOwner.split`@`[0]} el *${formatDate(res.subjectTime * 1000)}*${res.descOwner ? `
*💬DESCRIPCIÓN MODIFICADA* por @${res.descOwner.split`@`[0]} el *${formatDate(res.descTime * 1000)}*` : ''}
*👥TOTAL DE MIEMBROS:* ${res.size}
*👤MIEMBROS QUE SE AN UNIDO*: ${res.participants ? '\n' + res.participants.map((user, i) => ++i + '. @' + user.id.split`@`[0]).join('\n').trim() : 'Ninguno'}
${res.desc ? `*👣DESCRIPCIÓN:*
${res.desc}` : '*```sin descripción```*'}
*JSON Version*
\`\`\`${JSON.stringify(res, null, 1)}\`\`\`
`.trim()
  m.reply(caption, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(caption)
    }
  })
}
handler.help = ['inspect <chat.whatsapp.com>']
handler.tags = ['tools']

handler.command = /^inspect$/i

module.exports = handler

function formatDate(n, locale = 'id') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}
