const express = require('express')
const Telegraf = require('telegraf').Telegraf;

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL

if (BOT_TOKEN === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf(BOT_TOKEN);

const { botMenu } = require('./menu')

const channelId = '@test_tg_help'

const requestPhoneKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "Мій номер телефону",
                request_contact: true,
                callback_data: 'phone',
                one_time_keyboard: true
            }]
        ]
    }
};

let actionHistory = []

const getCurrentLevelMenu = (menuObj, includeBackMenu = true) => {
    const markup = {
        "reply_markup": {
            "one_time_keyboard": true,
            "inline_keyboard": []
        }
    }

    Object.keys(menuObj).forEach(menuKey => {
        const menu = menuObj[menuKey]

        markup['reply_markup']['inline_keyboard'].push([{
            text: menu.label,
            callback_data: menuKey
        }])
    });

    if (includeBackMenu) {
        markup['reply_markup']['inline_keyboard'].push([{
            text: 'Поперднє меню',
            callback_data: 'back_menu'
        }])
    }

    return markup
}

const globalMenu = getCurrentLevelMenu(botMenu, false)

const createActions = (menuObj) => {
    for (const menuItem in menuObj) {

        bot.action(menuItem, async ctx => {

            actionHistory.push({
                action: menuItem,
                menu: menuObj,
                data: menuObj[menuItem].label
            })

            if (menuObj[menuItem].subMenu) {
                ctx.deleteMessage(ctx.update.callback_query.message.message_id)
                bot.telegram.sendMessage(ctx.chat.id, 'Виберіть один з пунктів:', getCurrentLevelMenu(menuObj[menuItem].subMenu), {})
            } else {
                bot.telegram.sendMessage(ctx.chat.id, 'Надати мій телефон', requestPhoneKeyboard, {}).then(() => {
                    bot.on('contact', async msg => {
                        const { phone_number, first_name, last_name } = msg.message.contact

                        let finalMesage = `*${first_name ? first_name : ''} ${last_name ? last_name : ''}* \n \`${phone_number.includes('+') ? '' : '+'}${phone_number}\`\n`
                        actionHistory.forEach((history, index) => {
                            finalMesage += index === 0 ? `${history.data}:` : `\n • ${history.data}`
                        })
                        await bot.telegram.sendMessage(channelId, finalMesage, { parse_mode: 'MarkdownV2' })
                        actionHistory = []
                    })
                })
            }
        })

        if (menuObj[menuItem].subMenu) {
            createActions(menuObj[menuItem].subMenu)
        } else {
            continue
        }
    }
}

bot.command('start', ctx => {
    actionHistory = []
    bot.telegram.sendMessage(ctx.chat.id, 'Виберіть один з пунктів допомоги:', globalMenu, {})
})

bot.action('back_menu', async ctx => {
    ctx.deleteMessage(ctx.update.callback_query.message.message_id)
    const menu = getCurrentLevelMenu(actionHistory[actionHistory.length - 1].menu, actionHistory.length > 1)
    await bot.telegram.sendMessage(ctx.chat.id, 'Виберіть один з пунктів:', menu, {})
    actionHistory.pop()
})

createActions(botMenu)

const secretPath = `/bot/${bot.secretPathComponent()}`

bot.telegram.setWebhook(`${URL + secretPath}`);
bot.startWebhook(secretPath, null, PORT)
