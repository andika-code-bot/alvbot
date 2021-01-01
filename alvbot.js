/*
BOT PUNYA : ALVARO BHERMAN
DIBUAT OLEH : ALVARO BHERMAN
YT : ALVARO BHERMAN
IG : @alvarobhermann_
THX TO : ST4RZ, MHANKBARBAR, A187ID DAN TOBZ
DILARANG MENGGANTI NAMA AUTHOR TANPA PERSETUJUAN AUTHOR
MAU GANTI NAMA AUTHOR? DM GW : @alvarobhermann_
SEKIAN DAN SELAMAT MENIKMATI FITUR YANG ADA :D
*/
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./alvbot_media/color')
const { sayang } = require('./alvbot_media/help')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./alvbot_media/fetcher')
const { recognize } = require('./alvbot_media/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const lolis = require('lolis.life')
const loli = new lolis()
const welkom = JSON.parse(fs.readFileSync('./alvbot_media/wilujengsumping.json'))
const nsfw = JSON.parse(fs.readFileSync('./alvbot_media/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./alvbot_media/simi.json'))
const farzainkey = APIKEY
prefix = '/'
blocked = []

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Ciee yang udh buat bot :v buruan scan QR nye..'))
	})
	client.on('credentials-updated', () => {
		fs.writeFileSync('./ALPHABOT.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
		info('2', 'Login Info Updated')
	})
	fs.existsSync('./ALPHABOT.json') && client.loadAuthInfo('./ALPHABOT.json')
	client.on('N', () => {
		start('2', 'Sabar Tod, lagi ngonekting...')
	})
	client.on('open', () => {
		success('2', 'Berhasil Tod')
	})
	await client.connect({timeoutMs: 30*1000})

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Haii @${num.split('@')[0]}\nSelamat datang di grup *${mdata.subject}* Semoga gak betah xixixi :v\nBaca desk ya ngab !!!`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `GUDBAI @${num.split('@')[0]} Moga tenang di alam sana awokwowkw :v`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error Ngab : %s', color(e, 'red'))
		}
	})
	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('message-new', async (mek) => {
		try {
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const config = {
    BotName: 'Alpha-Bot', // Nama Bot Lo
    instagram: 'https://instagram.com/amirrehan211', // Nama IG Lo
    nomer: 'wa.me/62852819683990', // Nomor WA Lo
    youtube: 'https://www.youtube.com/channel/Zobin Official', // Nama Channel YT Lo
    whatsapp: 'GAK ADA', // Group Ofc Bot Lo
    tanggal: `TANGGAL: ${moment().format('DD')} ${bulan} ${moment().format('YYYY')}`,
    waktu: time
}
			mess = {
				wait: '⌛ Sabar Ngab, Ingat Orang Sabar Di Sayang Janda :v ⌛',
				success: '✔️ Berhasil ✔️',
				error: {
					stick: '❌ Gagal, terjadi kesalahan saat mengkonversi gambar ke sticker ❌',
					Iv: '❌ Link tidak valid ❌'
				},
				only: {
					group: '❌ Perintah ini hanya bisa di gunakan dalam group ya ngab! ❌',
					ownerG: '❌ Perintah ini hanya bisa di gunakan oleh owner group ya ngab! ❌',
					ownerB: '❌ Perintah ini hanya bisa di gunakan oleh owner bot ya ngab! ❌',
					admin: '❌ Perintah ini hanya bisa di gunakan oleh admin group ya ngab!! ❌',
					Badmin: '❌ Perintah ini hanya bisa di gunakan ketika bot menjadi admin! ya ngab! ❌'
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["62852819683990@s.whatsapp.net"] // ganti jdi nomor lu y ngab
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch(command) {
				case 'sayang':
					client.sendMessage(from, sayang(prefix), text)
					break
				case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*Nama bot* : ${me.name}\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total Block Contact* : ${blocked.length}\n*The bot is active on* : ${kyun(uptime)}\nYouTube : ${youtube}\nIg : ${instagram}\nGC WA : ${whatsapp}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'donate':
					let eerrr = fs.readFileSync('./media_alvbot/DONATE.jpg')
					client.sendMessage(from, eerrr, MessageType.audio, { ptt: true, quoted: mek })
					break
				case 'blocklist':
					teks = 'This is list of blocked number :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
				case 'stiker':
				case 'sticker':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error Gais D: : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error Gais D:: ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'Your-ApiKey'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								buff = fs.readFileSync(ranw)
								client.sendMessage(from, buff, sticker, {quoted: mek})
							})
						})
				switch(command) {
				case 'meme':
					meme = await kagApi.memes()
				
buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
				case 'memeindo':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://imgur.com/${memein.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`Prefix berhasil di ubah menjadi : ${prefix}`)
					break
				case 'hilih':
					if (args.length < 1) return reply('Teksnya mana ngab?')
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
			    case 'tiktokstalk':
					try {
						if (args.length < 1) return client.sendMessage(from, 'Usernamenya mana ngab?', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Kemungkinan username tidak valid')
					}
					break
				case 'gspeak':
					if (args.length < 1) return client.sendMessage(from, 'Kode bahasanya mana ngab?', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Textnya mana ngab?', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Textnya kebanyakan om')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Gagal om:(')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
				case 'ytmp4':
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Thumbnail*= ${anu.thumb}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					break
				case 'ytmp3':
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/yta2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Thumbnail*= ${anu.thumb}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					break
				case 'fb':
					if (args.length < 1) return reply('URLnya mana ngab?')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/facebook?url=${args[0]}`, {method: 'get'})
					reply(anu.result)
					teks = `*KUALITAS :*\n*HD :* ${kualitasHD}\n*SD :* ${kualitasSD}`
                    break 
				case 'ig':
					if (args.length < 1) return reply('URLnya mana ngab?')
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ig?url=${args[0]}`, {method: 'get'})
					reply(anu.result)
					teks = `*DOWNLOAD SENDIRI YA NGAB :V :* ${result}`
                    break 
				case 'smule':
					if (args.length < 1) return reply('URLnya mana ngab?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/smule?link=${args[0]}`, {method: 'get'})
					reply(anu.result)
					teks = `*DOWNLOAD SENDIRI YA NGAB :V :* ${result}`
                    break
				case 'bapackfnt':
					if (args.length < 1) return reply('Teksnya mana ngab?')
					anu = await fetchJson(`https://api.terhambar.com/bpk?kata=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
				case 'igstalk':
					if (args.length < 1) return reply('URLnya mana ngab?')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/stalk?username=${teks}`, {method: 'get'})
					reply(anu.result)
					teks = `*HASIL STALKING :*\n\nBio : ${Biodata}\nJumlah Followers : ${Jumlah_Followers}\nJumlah Following : ${Jumlah_Following}\nName : ${Name}`
                    			thumb = await getBuffer(anu.Profile_pic)
					break
				case 'xvideo':
					if (args.length < 1) return reply('Teksnya mana ngab?')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/xvideos?q=${teks}`, {method: 'get'})
					reply(anu.result)
					teks = `DOSA NGAB !!! : ${result}`
					break
				case 'wikiindo':
					if (args.length < 1) return reply('Mo nyari apa lo?')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/wiki?q=${teks}`, {method: 'get'})
					reply(anu.result)
					teks = `MENURUT WIKIPEDIA :\n\n${result}`
					break
				case 'kbbi':
					if (args.length < 1) return reply('Mo nyari apa lo?')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/kbbi?kata=${teks}`, {method: 'get'})
					reply(anu.result)
					teks = `MENURUT KBBI:\n\n${result}`
					break
				case 'dewabatch':
					if (args.length < 1) return reply('Mo nyari apa lo?')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/dewabatch?q=${teks}`, {method: 'get'})
					reply(anu.result)
					teks = `MENURUT DEWABATCH :\n\nJudul : ${title}\nInfo : ${info}\nSinopsis : ${sinopsis}\nLink : ${link_dl}`
					thumb = await getBuffer(anu.thumb)
					break
				case 'kusonime':
					if (args.length < 1) return reply('Mo nyari apa lo?')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/kuso?q=${teks}`, {method: 'get'})
					reply(anu.result)
					teks = `MENURUT KUSONIME :\n\nJudul : ${title}\nInfo : ${info}\nSinopsis : ${sinopsis}\nLink : ${link_dl}`
					thumb = await getBuffer(anu.thumb)
					break
				case 'ttp':
					if (args.length < 1) return reply('Textnya mana um?')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(9).trim()
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/ttp?text=${teks}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break
				case 'chord':
					if (args.length < 1) return reply('Judul lagunya mana ngab?')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/chord?q=${teks}`, {method: 'get'})
					reply(anu.result)
					break
				case 'jadwalshalat':
					if (args.length < 1) return reply('Daerahnya mana ngab?')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/jadwalshalat?q=${teks}`, {method: 'get'})
					reply(anu.result)
					teks = `*JADWAL SHALAT* :\n\nAshar : ${ashar}\nDzuhur : ${dzuhur}\nImsak : ${imsak}\nIsha : ${isha}\nMaghrib : ${maghrib}\nMidnight : ${midnight}\nSubuh : ${subuh}\nSunrise : ${sunrise}\nSunset : ${sunset}`
					break
				case 'joox':
					if (args.length < 1) return reply('lagunya mana ngab?')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${teks}`, {method: 'get'})
					reply(anu.result)
					teks = `Album : ${album}\nDipublikasi : ${dipublikasi}\nJudul : ${judul}\nMP3 : ${mp3}`
					thumb = await getBuffer(anu.thumb)
					break
				case 'lirik':
					if (args.length < 1) return reply('Judul lagunya mana ngab?')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/lirik?q=${teks}`, {method: 'get'})
					reply(anu.result)
					teks = `Album : ${album}\nDipublikasi : ${dipublikasi}\nJudul : ${judul}\nLirik :\n\n${lirik}`
					thumb = await getBuffer(anu.thumb)
					break
				case 'artinama':
					if (args.length < 1) return reply('Namanya mana ngab?')
					anu = await fetchJson(`https://scrap.terhambar.com/nama?n=${teks}`, {method: 'get'})
					reply(anu.result)
					teks = `ARTI NAMA MU ADALAH :\n\n*****************************\n${result}\n\n*****************************`
					break
				case 'jodoh':
					if (args.length < 1) return reply('Namanya mana ngab?')
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/jodohku?nama=${pasangan[0]}&pasangan=${pasangan[1]}`, {method: 'get'})
					reply(anu.result)
					teks = `\nKecocokan jodoh\n\n************************************\n\nPasangan 1: *${nama[0].trim()}*\nPasangan 2: *${nama[1].trim()}*\n\nsisi positif: ${positif}\nsisi negatif: ${negatif}\n\n***********************************`
					break
				case 'coronaworld':
					if (args.length < 1) return reply('Namanya mana ngab?')
					anu = await fetchJson(`https://api.terhambar.com/negara/{teks}`, {method: 'get'})
					reply(anu.result)
					teks = `Negara : ${negara}\nTotal : ${total}\nKasus Baru : ${kasus_baru}\nMeninggoy : ${meninggal}\nBaru Meninggoy : ${meninggal_baru}\nSembuh : &`;
					break
				case 'namaninja':
					if (args.length < 1) return reply('Namanya mana ngab?')
					anu = await fetchJson(`https://api.terhambar.com/ninja?nama=${teks}`, {method: 'get'})
					reply(anu.result)
					break
				case 'pin':
					if (args.length < 1) return reply('Teksnya mana ngab?')
					anu = await fetchJson(`https://scrap.terhambar.com/pin?url=${teks}`, {method: 'get'})
					reply(anu.result)
                    break 
				case 'loli':
					const loli = await get.get('https://mhankbarbars.herokuapp.com/api/randomloli').json()
					client.sendFileFromUrl(from, loli.result, 'loli.jpeg', 'Lolinya om', id)
					break
				 case 'waifu':
					const waifu = await get.get(`https://st4rz.herokuapp.com/api/waifu`).json()
					client.sendFileFromUrl(from, waifu.image, 'Waifu.jpg', `Image : ${image}\nName : ${name}\nDesk : ${desk}`, id)
					break
				case 'quote':
				case 'quotes':
					const quotes = await get.get('https://mhankbarbars.herokuapp.com/api/randomquotes').json()
					client.reply(from, `➸ *Quotes* : ${quotes.quotes}\n➸ *Author* : ${quotes.author}`, id)
					break
				case 'quotesnime':
					const skya = await get.get('https://mhankbarbars.herokuapp.com/api/quotesnime/random').json()
					skya_ = skya.data
					client.reply(from, `➸ *Quotes* : ${skya_.quote}\n➸ *Character* : ${skya_.character}\n➸ *Anime* : ${skya_.anime}`, id)
					break
			    case 'infogempa':
					const bmkg = await get.get(`https://tobz-api.herokuapp.com/api/infogempa`).json()
					const { potensi, koordinat, lokasi, kedalaman, magnitude, waktu, map } = bmkg
				    const hasil = `Kedalaman : ${kedalaman}\nKoordinat : ${koordinat}\nLokasi : ${lokasi}\nMagnitude : ${magnitude}\nMap : ${map}\nPotensi : ${potensi}\nWaktu : ${waktu}`;
					client.sendFileFromUrl(from, map, 'shakemap.jpg', hasil, id)
					break
				 case 'creator':
					client.sendContact(from, '62852819683990@c.us') // ganti jadi nomor lu y tod
					break
				 case 'nulis':
					if (args.length === 1) return client.reply(from, 'Kirim perintah */nulis [teks]*', id)
					const nulis = encodeURIComponent(body.slice(7))
					client.reply(from, mess.wait, id)
					let urlnulis = `https://st4rz.herokuapp.com/api/nulis?text=${teks}`
					await fetch(urlnulis, {method: "GET"})
					.then(res => res.json())
					.then(async (json) => {
						await client.sendFileFromUrl(from, json.result, 'Nulis.jpg', 'Neh...', id)
					}).catch(e => client.reply(from, "Error: "+ e));
					break 
				case 'jadwalTV':
					if (args.length < 1) return reply('nomornya mana?')
					anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/jadwaltv?ch=${teks}`, {method: 'get'})
					reply(anu.result)
					break
				case 'renungan':
					if (args.length < 1) return reply('...')
					anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/renungan`, {method: 'get'})
					reply(anu.result)
					teks = `*RENUNGAN HARIAN HARI INI :*\n\nJudul : ${judul}\nIsi : ${isi}\nPesan : ${pesan}`
					break
				case 'glitch':
					if (args.length < 1) return reply('Teks nya mana ngab?')
					anu = await fetchJson(`https://inyourdream.herokuapp.com/glitch?kata1=${teks1}&kata2=${teks2}`, {method: 'get'})
					reply(anu.result)
					break
				case 'mediafire'
					if (args.length < 1) return reply('linknya mana ngab?')
					anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/mediafire?url=${teks}`, {method: 'get'})
					reply(anu.result)
					teks = `${detail}\nFilename : ${filename}`
					break
				case 'resepbunda':
					if (args.length < 1) return reply('Teks nya mana ngab?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/resep-search?text=${teks}`, {method: 'get'})
					reply(anu.result)
					break
				case 'nh':
            //if (isGroupMsg) return client.reply(from, 'Sorry this command for private chat only!', id)
            if (args.length === 2) {
                const nuklir = body.split(' ')[1]
                client.reply(from, mess.wait, id)
                const cek = await nhentai.exists(nuklir)
                if (cek === true)  {
                    try {
                        const api = new API()
                        const pic = await api.getBook(nuklir).then(book => {
                            return api.getImageURL(book.cover)
                        })
                        const dojin = await nhentai.getDoujin(nuklir)
                        const { title, details, link } = dojin
                        const { parodies, tags, artists, groups, languages, categories } = await details
                        var teks = `*Title* : ${title}\n\n*Parodies* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artists* : ${artists.join(', ')}\n\n*Groups* : ${groups.join(', ')}\n\n*Languages* : ${languages.join(', ')}\n\n*Categories* : ${categories}\n\n*Link* : ${link}`
                        //exec('nhentai --id=' + nuklir + ` -P mantap.pdf -o ./hentong/${nuklir}.pdf --format `+ `${nuklir}.pdf`, (error, stdout, stderr) => {
                        client.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id)
                            //client.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, then(() => `${title}.pdf`, '', id)).catch(() => 
                            //client.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id))
                            /*if (error) {
                                console.log('error : '+ error.message)
                                return
                            }
                            if (stderr) {
                                console.log('stderr : '+ stderr)
                                return
                            }
                            console.log('stdout : '+ stdout)*/
                            //})
                    } catch (err) {
                        client.reply(from, '[❗] Terjadi kesalahan, mungkin kode nuklir salah', id)
                    }
                } else {
                    client.reply(from, '[❗] Kode nuClear Salah!')
                }
            } else {
                client.reply(from, '[ WRONG ] Kirim perintah */nh [nuClear]*')
            }
        	break
		case 'quotemaker':
            arg = body.trim().split('|')
            if (arg.length >= 4) {
                client.reply(from, mess.wait, id)
                const quotes = encodeURIComponent(arg[1])
                const author = encodeURIComponent(arg[2])
                const theme = encodeURIComponent(arg[3])
                await quotemaker(quotes, author, theme).then(amsu => {
                    client.sendFile(from, amsu, 'quotesmaker.jpg','neh...').catch(() => {
                       client.reply(from, mess.error.Qm, id)
                    })
                })
            } else {
                client.reply(from, 'Usage: \n/quotemaker |teks|watermark|theme\n\nEx :\n/quotemaker |ini contoh|bicit|random', id)
            }
            break
				case 'checkip':
					if (args.length < 1) return reply('IP nya mana ngab?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/check?ip=${teks}`, {method: 'get'})
					reply(anu.result)
					break
				case 'pornsearch':
					if (args.length < 1) return reply('Nyari apa ngab? nyari vid Doggystyle?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/porn?search=${teks}`, {method: 'get'})
					reply(anu.result)
					teks = `INGET DOSA BORR\n\n${result}`
					break
				case 'spamsms':
					if (args.length < 1) return reply('Nomornya mana ngab?')
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/spamsms?no=${teks}&jum=50`, {method: 'get'})
					reply(anu.result)
					break
				case 'spamtelp':
					if (args.length < 1) return reply('Nomornyanya mana ngab?')
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/spamcall?no=${teks}`, {method: 'get'})
					reply(anu.result)
					break
				case 'spamgmail':
					if (args.length < 1) return reply('Alamat gmailnya mana ngab?')
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/spamgmail?target=${teks}`, {method: 'get'})
					reply(anu.result)
					break
				case 'neonime':
					if (args.length < 1) return reply('Teksnya mana ngab?')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/neonime?q=${teks}`, {method: 'get'})
					reply(anu.result)
					break
				case 'brainly':
					if (args.length < 1) return reply('Teksnya mana ngab?')
					anu = await fetchJson(`http://api.farzain.com/brainly.php?id=${teks}&apikey=${farzainkey}`, {method: 'get'})
					reply(anu.result)
					break
				case 'simi':
					if (args.length < 1) return reply('Textnya mana um?')
					teks = body.slice(5)
					anu = await simih(teks) //fetchJson(`https://mhankbarbars.herokuapp.com/api/samisami?text=${teks}`, {method: 'get'})
					//if (anu.error) return reply('Simi ga tau kak')
					reply(anu)
					break
				case 'qrmaker':
					const loli = await get.get(' http://api.farzain.com/qrcode.php?id=${teks}&apikey=${farzainkey}').json()
					client.sendFileFromUrl(from, loli.result, 'loli.jpeg', 'Nih kak QRNya dah jadi ^^', id)
					break
				case 'biotokohdunia':
					if (args.length < 1) return reply('Tokohnya siapa ngab?')
					anu = await fetchJson(`http://api.farzain.com/biografi.php?id=${teks}&apikey=${farzainkey}`, {method: 'get'})
					reply(anu.result)
					teks = `*Title :* ${title}\n*Link :* ${link}\n*Foto :* ${img}`
					break
				case 'twtstalker':
					if (args.length < 1) return reply('Targetnya siapa ngab?')
					anu = await fetchJson(`http://api.farzain.com/twitter.php?id=${teks}&apikey=${farzainkey}`, {method: 'get'})
					reply(anu.result)
					teks = `*Nama :* ${name}\n*Screen Name :* ${screen_name}\n*Desk :* ${description}\n*Followers :*${followers}\n*Following :* ${following}\n*Likes :* ${likes}\n*Joined Twitter :* ${joined}`
					break
				case 'picbp':
					if(isReg(obj)) return
					if(cekumur(cekage)) return
					if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}picbp [ Teks ]*, contoh *${prefix}picbp ALVBOT*`, id)
					tobz.reply(from, mess.wait, id)
					const blpk = body.slice(11)
					await tobz.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/blackpink?text=${blpk}`, 'blackpink.jpg', '', id)
					break
		case 'picpornhub':
            if(isReg(obj)) return
            if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}picpornhub [ |Teks1|Teks2 ]*, contoh *${prefix}picpornhub |Alvbot|Wabot*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                tobz.reply(from, mess.wait, id)
                const lpornhub = argz[1]
                const lpornhub2 = argz[2]
                if (lpornhub.length > 10) return tobz.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                if (lpornhub2.length > 10) return tobz.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                tobz.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/phblogo?text1=${1pornhub}&text2=${1pornhub2}`)
                await limitAdd(serial)
            } else {
                await tobz.reply(from, `Wrong Format!\n[❗] Kirim perintah *${prefix}picpornhub [ |Teks1|Teks2 ]*, contoh *${prefix}picpornhub |Alvbot|Wabot*`, id)
            }
            break
				case 'pic3d':
					if(isReg(obj)) return
					if(cekumur(cekage)) return
					if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}pic3d [ Teks ]*, contoh *${prefix}pic3d ALVBOT*`, id)
					tobz.reply(from, mess.wait, id)
					const teks3d = body.slice(11)
					await tobz.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/text3d?text=${teks3d}`, 'blackpink.jpg', '', id)
					break
				case 'picneon':
					if(isReg(obj)) return
					if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}picneon [ |Teks1|Teks2 ]*, contoh *${prefix}picneon|Alvbot|Wabot*`, id)
					argz = body.trim().split('|')
					if (argz.length >= 2) {
						tobz.reply(from, mess.wait, id)
						const teks1= argz[1]
						const teks2 = argz[2]
						if (lpornhub.length > 10) return tobz.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
						if (lpornhub2.length > 10) return tobz.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
						tobz.sendFileFromUrl(from, `https://tobz-api.herokuapp.com/api/textpro?theme=neon_light&text1=${teks1}&text2=${teks2}`)
						await limitAdd(serial)
				} else {
                await tobz.reply(from, `Wrong Format!\n[❗] Kirim perintah *${prefix}picneon [ |Teks1|Teks2 ]*, contoh *${prefix}picneon|Alvbot|Wabot*`, id)
            }
            break
				case 'picninja':
					if(isReg(obj)) return
					if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}picneon [ |Teks1|Teks2 ]*, contoh *${prefix}picneon|Alvbot|Wabot*`, id)
					argz = body.trim().split('|')
					if (argz.length >= 2) {
						tobz.reply(from, mess.wait, id)
						const teks1= argz[1]
						const teks2 = argz[2]
						if (lpornhub.length > 10) return tobz.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
						if (lpornhub2.length > 10) return tobz.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
						tobz.sendFileFromUrl(from, `https://tobz-api.herokuapp.com/api/textpro?theme=ninjalogo&text1=${teks2}&text2=${teks2}`)
						await limitAdd(serial)
				} else {
                await tobz.reply(from, `Wrong Format!\n[❗] Kirim perintah *${prefix}picninja [ |Teks1|Teks2 ]*, contoh *${prefix}picninja |Alvbot|Wabot*`, id)
            }
            break
				case 'picwolf1':
					if(isReg(obj)) return
					if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}picwolf1 [ |Teks1|Teks2 ]*, contoh *${prefix}picwolf1 |Alvbot|Wabot*`, id)
					argz = body.trim().split('|')
					if (argz.length >= 2) {
						tobz.reply(from, mess.wait, id)
						const teks1= argz[1]
						const teks2 = argz[2]
						if (teks1.length > 10) return tobz.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
						if (teks2.length > 10) return tobz.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
						tobz.sendFileFromUrl(from, `https://tobz-api.herokuapp.com/api/textpro?theme=wolflogo1&text1=${teks1}&text2=${teks2}`)
						await limitAdd(serial)
				} else {
                await tobz.reply(from, `Wrong Format!\n[❗] Kirim perintah *${prefix}picwolf1 [ |Teks1|Teks2 ]*, contoh *${prefix}picwolf1 |Alvbot|Wabot*`, id)
            }
            break
				case 'picwolf2':
					if(isReg(obj)) return
					if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}picwolf2 [ |Teks1|Teks2 ]*, contoh *${prefix}picwolf2 |Alvbot|Wabot*`, id)
					argz = body.trim().split('|')
					if (argz.length >= 2) {
						tobz.reply(from, mess.wait, id)
						const teks1= argz[1]
						const teks2 = argz[2]
						if (teks1.length > 10) return tobz.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
						if (teks2.length > 10) return tobz.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
						tobz.sendFileFromUrl(from, `https://tobz-api.herokuapp.com/api/textpro?theme=wolflogo2&text1=${teks1}&text2=${teks2}`)
						await limitAdd(serial)
				} else {
                await tobz.reply(from, `Wrong Format!\n[❗] Kirim perintah *${prefix}picwolf2 [ |Teks1|Teks2 ]*, contoh *${prefix}picwolf2 |Alvbot|Wabot*`, id)
            }
            break
			case 'piclion':
					if(isReg(obj)) return
					if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}piclion[ |Teks1|Teks2 ]*, contoh *${prefix}piclion |Alvbot|Wabot*`, id)
					argz = body.trim().split('|')
					if (argz.length >= 2) {
						tobz.reply(from, mess.wait, id)
						const teks1= argz[1]
						const teks2 = argz[2]
						if (teks1.length > 10) return tobz.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
						if (teks2.length > 10) return tobz.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
						tobz.sendFileFromUrl(from, `https://tobz-api.herokuapp.com/api/textpro?theme=lionlogo&text1=${teks1}&text2=${teks2}`)
						await limitAdd(serial)
				} else {
                await tobz.reply(from, `Wrong Format!\n[❗] Kirim perintah *${prefix}piclion[ |Teks1|Teks2 ]*, contoh *${prefix}piclion |Alvbot|Wabot*`, id)
            }
            break
			case 'picjoker':
					if(isReg(obj)) return
					if(cekumur(cekage)) return
					if (args.length === 1) return tobz.reply(from, `Kirim perintah *${prefix}picbp [ Teks ]*, contoh *${prefix}picjoker ALVBOT*`, id)
					tobz.reply(from, mess.wait, id)
					const teks = body.slice(11)
					await tobz.sendFileFromUrl(from, `https://tobz-api.herokuapp.com/api/textpro?theme=jokerlogo&text=${teks}`, 'joker.jpg', '', id)
					break
			case 'loli':
					gatauda = body.slice(6)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image,{quoted: mek})
					break
			case 'randomanime':
					gatauda = body.slice(13)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break						
				
				case 'neko':
					gatauda = body.slice(6)
					reply(mess.wait)
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/nekonime`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'randomhentai':
					gatauda = body.slice(6)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/hentai`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'nsfwneko':
					gatauda = body.slice(6)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwneko`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'nsfwtrap':
					gatauda = body.slice(6)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwtrap`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'nsfwblowjob':
					gatauda = body.slice(6)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwblowjob`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'animehuggif':
					gatauda = body.slice(6)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/hug`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'animekissgif':
					gatauda = body.slice(6)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/kiss`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'animecrygif':
					gatauda = body.slice(6)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/cry`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				// GROUP MENU
				
		case 'setpp': 
                        if (!isGroup) return reply(mess.only.group)
                       if (!isGroupAdmins) return reply(mess.only.admin)
                        if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                       media = await client.downloadAndSaveMediaMessage(mek)
                         await client.updateProfilePicture (from, media)
                        reply('𝐢𝐜𝐨𝐧 𝐠𝐫𝐨𝐮𝐩 𝐛𝐞𝐫𝐡𝐚𝐬𝐢𝐥 𝐝𝐢𝐮𝐛𝐚𝐡 ')
                                        break						
		case 'add':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('𝐌𝐚𝐮 𝐦𝐞𝐧𝐚𝐦𝐛𝐚𝐡𝐤𝐚𝐧 𝐚𝐧𝐚𝐤 𝐩𝐮𝐧𝐠𝐮𝐭 𝐤𝐚𝐡 𝐤𝐚𝐤?')
					if (args[0].startsWith('08')) return reply('𝐠𝐮𝐧𝐚𝐤𝐚𝐧 𝐤𝐨𝐝𝐞 𝐧𝐞𝐠𝐚𝐫𝐚 𝐤𝐚𝐤')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('𝐆𝐚𝐠𝐚𝐥 𝐦𝐞𝐧𝐚𝐦𝐛𝐚𝐡𝐤𝐚𝐧 𝐭𝐚𝐫𝐠𝐞𝐭, 𝐦𝐮𝐧𝐠𝐤𝐢𝐧 𝐤𝐚𝐫𝐞𝐧𝐚 𝐝𝐢 𝐩𝐫𝐢𝐯𝐚𝐭𝐞')
					}
					break
		case 'grup':
		case 'gc':
		case 'group':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args[0] === 'buka') {
					    reply(`Sukses membuka Group :D𝐧`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`Sukses menutup Group :D`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
		   		
				
		case 'kick':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝐓𝐚𝐠 𝐭𝐚𝐫𝐠𝐞𝐭 𝐲𝐚𝐧𝐠 𝐦𝐚𝐮 𝐝𝐢 𝐤𝐢𝐜𝐤!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `Maaf, Kamu Telah Di Kick Dari Group Ini, Gudbai D:`, mentioned, true)
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Maaf @${mentioned[0].split('@')[0]}\nKamu Telah Di Kick Dari Group _*${groupMetadata.subject}*_ Gudbai D:`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
		case 'listadmin':
					if (!isGroup) return reply(mess.only.group)
					teks = `List Admin Group _*${groupMetadata.subject}*_\n𝐓Total: _${groupAdmins.length}_\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `┣➥ @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
        case 'leave':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            await client.sendText(from,'titip gorengan ya').then(() => client.leaveGroup(groupId))
            break
        case 'promote':
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *${prefix}promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await client.promoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Cie... @${mentionedJidList[0]} Udah Jadi Admin :v`)
            break
        case 'demote':
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *${prefix}demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await client.demoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
		case 'delete':
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isOwner) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh Owner bot', id)
            if (!quotedMsg) return client.reply(from, 'Salah!!, kirim perintah *${prefix}delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return client.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
		case 'kickall':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if (!isGroupOwner) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMem = await client.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {
                    console.log('Upss.. Ini Admin Grup')
                } else {
                    await client.removeParticipant(groupId, allMem[i].id)
                }
            }
            client.reply(from, 'Sukses Kick semua member awokwokwokwwowkwo', id)
            break
		case 'ownergroup':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const Owner_ = chat.groupMetadata.owner
            await client.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            break
        case 'mentionall':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            const groupMem = await client.getGroupMembers(groupId)
            let hehe = '╔══✪〘 Mention All By : Alvbot 〙✪══\n'
            for (let i = 0; i < groupMem.length; i++) {
                hehe += '╠➥'
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '╚═〘 Mention All By : Alvbot 〙'
            await client.sendTextWithMentions(from, hehe)
            break
		case 'adminlist':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➸ @${admon.replace(/@c.us/g, '')}\n` 
            }
            await client.sendTextWithMentions(from, mimin)
            break
		case 'linkgroup':
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (isGroupMsg) {
                const inviteLink = await client.getGroupInviteLink(groupId);
                client.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
            } else {
            	client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            }
            break
			
		// ADMIN MENU
		
		case 'leaveall':
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChats = await client.getAllChatIds()
            const allGroups = await client.getAllGroups()
            for (let gclist of allGroups) {
                await client.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChats.length}`)
                await client.leaveGroup(gclist.contact.id)
            }
            client.reply(from, 'Succes leave all group!', id)
            break
			
		case 'bc':
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
            let msg = body.slice(4)
            const chatz = await client.getAllChatIds()
            for (let ids of chatz) {
                var cvk = await client.getChatById(ids)
                if (!cvk.isReadOnly) await client.sendText(ids, `[ ALVBOT BRODCAST ]\n\n${msg}`)
            }
            client.reply(from, 'Broadcast Success!', id)
            break
		case 'clone':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Tag target yang ingin di clone')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('Gagal om')
					}
					break
		case 'clearall':
					if (!isOwner) return reply('Kamu siapa?')
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('Sukses delete all chat :)')
					break
// MUSIC SCRIPT 

case 'jago':
case 'abangjago':
case 'abgjago':
     let eerrr = fs.readFileSync('./media_alvbot/bangjago.mp3')
     client.sendMessage(from, eerrr, MessageType.audio, { ptt: true, quoted: mek })
     break	 

// WAIT (WHAT ANIME IS THIS?)

case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Foto Aja Ngab!')
					}
					break
				default:
			if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
					}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

                     
/*
TENGKYU FOR CUSING MAI SEKRIP :V 𝗠𝗵𝗮𝗻𝗸𝗕𝗮𝗿𝗕𝗮𝗿
*/
