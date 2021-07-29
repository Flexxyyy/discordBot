// getting all the env variables available  
require('dotenv').config();

const { Client, MessageFlags } = require('discord.js');
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});
const PREFIX = '$';
// console.log(process.env.DISCORDJS_BOT_TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in `)
})

client.on('message', async (message) => {
    if (message.author.bot) {
        return
    }
    // console.log(`[${message.author.tag}] : ${message.content}`);
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        if (CMD_NAME === 'kick') {
            if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply(`You do not have appropriate permission to kick the user`)
            if (args.length === 0) return message.reply("Please provide an ID")
            //guild=server 
            const member = message.guild.members.cache.get(args[0])
            if (member) {
                member
                    .kick()
                    .then((member) => {
                        message.channel.send(`${member} was kicked.`)
                    })
                    .catch((err) => {
                        message.channel.send('I cannot kick the user :(')
                        console.log(err);
                    })
            }
            else {
                message.channel.send("User not found in the guild")
            }
        }
        else if (CMD_NAME === 'ban') {
            if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply(`You do not have appropriate permission to kick the user`)
            if (args.length === 0) return message.reply("Please provide an ID")
            try {
                const user = await message.guild.members.ban(args[0])
                message.channel.send(`User banned successfully senpai`)
            }
            catch (err) {
                message.channel.send(`An error occured. Either i do not have permissions or the user not found`)
            }
        }
    }
    // else if (message.content === 'hello' || 'Hello') {
    //     message.reply(`Konichiwa ${message.author.tag}`);
    // }
    // else if (message.content === 'bye' || 'Bye') {
    //     message.reply(`Ara Ara Sayonara!!`);
    // }
})

client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id)
    if (reaction.message.id === '870229227163746345') {
        switch (name) {
            case '👑':
                member.roles.add('870226028419751946');
                break;
            case '💻':
                member.roles.add('870221136959512647');
                break;
        }
    }
})

client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id)
    if (reaction.message.id === '870229227163746345') {
        switch (name) {
            case '👑':
                member.roles.remove('870226028419751946');
                break;
            case '💻':
                member.roles.remove('870221136959512647');
                break;
        }
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN)