const Telegraf = require('telegraf').Telegraf;
const { BOT_MENU, REGIONS, REGIONS_MATCH_REGEX, REGIONS_SUB_MENU, PHONES_BY_REGIONS} = require('./menu')

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL
const PHONES = [
    {
        name: 'Житло 🏡',
        number: process.env.PHONE_HOUSE
    },
    {
        name: 'Харчування 🍔',
        number: process.env.PHONE_FOOD
    },
    {
        name: 'Речі 👔',
        number: process.env.PHONE_CLOTHES
    },
    {
        name: 'Mедикаменти 💊',
        number: process.env.PHONE_MEDICINE
    }
]

const BANK_IDS = [
    {
        name: 'IBAN',
        number: process.env.IBAN
    },
    {
        name: 'USD',
        number: process.env.USD
    },
    {
        name: 'EUR',
        number: process.env.EUR
    }
]

const SPECIAL_MENU_CASES = {
    VOLONTEERS: 'volonteers',
    GIVE_MONEY: 'giveMoney',
    HOT_NUMBERS: 'hotNumbers',
    DRIVERS_BY_REGION: 'region',
    NEEDS_MEDICINE: 'needsMedicine',
    NEEDS_HUMANITARIAN_HELP: 'humanitarianHelp',
    NEEDS_MILITARY: 'needsMilitary'
}

if (BOT_TOKEN === undefined) {
    throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf(BOT_TOKEN);
let CHANNEL_ID = ''

let actionHistory = []

const setChannelId = (action) => {

    switch(action){
        case 'getAccommodation':
        case 'giveAccommodation':
            CHANNEL_ID = process.env.HOUSE_HELP
            break
        case 'getFood':
        case 'giveFood':
        case 'getClothes':
        case 'giveClothes':
            CHANNEL_ID = process.env.CLOTHES_FOOD_HELP
            break
        case 'getMedicines':
        case 'giveMedicines':
            CHANNEL_ID = process.env.MEDICINE_HELP
            break
        case 'drivers':
            CHANNEL_ID = process.env.DRIVERS_HELP
            break
        default: break
    }
}

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
            text: 'Поперднє меню ⬅️',
            callback_data: 'back_menu'
        }])
    }

    return markup
}

const generateRegionsMenu = () => {

    const markup = {
        "reply_markup": {
            "columns": 2,
            "keyboard": []
        }
    }

    for (let i = 0; i < REGIONS.length; i+=2) {

        markup['reply_markup']['keyboard'].push([
            {
                text: REGIONS[i].name,               
            },
            {
                text: REGIONS[i + 1].name,                
            },
        ])
    }

    return markup
}

const generateGiveMoneyMessage = () => {
    let message = ''
    message += `*Установа банку:*\nПриватБанк\n\n*МФО банку:*\n\`${process.env.BANK_MFO}\`\n\n*Отримувач платежу*\nГО "Галич давній сучасний"\n\n*Рахунок отримувача:*\n\`${process.env.BANK_WALLET}\`\n\n`
    message +=`*Реквізити:*\n`
    BANK_IDS.forEach(bank => {
        message += `*${bank.name}:* \`${bank.number}\`\n\n`
    })
    return message
}

const generatePhoneNumbersByRegion = () => {
    let message = 'Для зручності копіювання номерів, тримайте список гарячих ліній:\n\n'

    const renderPhones = (phones => {
        let msg = ''
        phones.forEach(phone => {
            msg += `\`${phone}\`, `
        })
        return msg
    })

    PHONES_BY_REGIONS.forEach(region => {
        message += `*${region.name}:* ${renderPhones(region.phones)}\n\n`
    })

    return message
}

const createActions = (menuObj) => {
    for (const menuItem in menuObj) {

        bot.action(menuItem, async ctx => {
            setChannelId(menuItem)
            switch(menuItem){
                case SPECIAL_MENU_CASES.VOLONTEERS:
                    await ctx.deleteMessage(ctx.update.callback_query.message.message_id)
                    const html = `Перейдіть за посиланням для реєстрації волонтерів:\n\n<a href="${process.env.VOLONTEERS_FORM_LINK}">Реєстрація волонтерів</a>`                   
                    await bot.telegram.sendMessage(ctx.chat.id, html, {parse_mode: 'HTML'})
                    await sendMainMenu(bot, ctx.chat.id)
                    break;               
                case SPECIAL_MENU_CASES.GIVE_MONEY:
                    await bot.telegram.sendMessage(ctx.chat.id, generateGiveMoneyMessage(), {parse_mode: 'MarkdownV2'})
                    await sendMainMenu(bot, ctx.chat.id)
                    break;
                case SPECIAL_MENU_CASES.HOT_NUMBERS:                                        
                    await ctx.replyWithPhoto({source: 'src/assets/hot-numbers.jpeg'})
                    await bot.telegram.sendMessage(ctx.chat.id, generatePhoneNumbersByRegion(), {parse_mode: 'MarkdownV2'})
                    await sendMainMenu(bot, ctx.chat.id)
                    break;
                case SPECIAL_MENU_CASES.DRIVERS_BY_REGION:  
                    actionHistory.push({
                        action: menuItem,
                        menu: menuObj,
                        data: menuObj[menuItem].label
                    })
                    await ctx.deleteMessage(ctx.update.callback_query.message.message_id)                                 
                    await bot.telegram.sendMessage(ctx.chat.id, 'Оберіть область:', generateRegionsMenu(), {parse_mode: 'MarkdownV2'})                    
                    break;  
                case SPECIAL_MENU_CASES.NEEDS_MEDICINE:
                case SPECIAL_MENU_CASES.NEEDS_HUMANITARIAN_HELP:
                case SPECIAL_MENU_CASES.NEEDS_MILITARY:
                    const htmlLink = `Перейдіть за посиланням для потреб:\n\n<a href="${process.env.NEEDS_LINK}">Потреби</a>`
                    await ctx.deleteMessage(ctx.update.callback_query.message.message_id)
                    await bot.telegram.sendMessage(ctx.chat.id, htmlLink, {parse_mode: 'HTML'})
                    await sendMainMenu(bot, ctx.chat.id)                    
                    break;
                default:  await proceedAction(bot, ctx, menuObj, menuItem)
            }
        })

        if (menuObj[menuItem].subMenu) {
            createActions(menuObj[menuItem].subMenu)
        } else {
            continue
        }
    }
}

const proceedAction = async (bot, ctx, menuObj, menuItem) => {

    setChannelId(menuItem)

    actionHistory.push({
        action: menuItem,
        menu: menuObj,
        data: menuObj[menuItem].label
    })

    if (menuObj[menuItem].subMenu) {
        await ctx.deleteMessage(ctx.update.callback_query.message.message_id)
        await bot.telegram.sendMessage(ctx.chat.id, 'Виберіть один з пунктів:', getCurrentLevelMenu(menuObj[menuItem].subMenu), {})
    } else {
        bot.telegram.sendMessage(ctx.chat.id, 'Надати мій телефон', requestPhoneKeyboard, {}).then(() => {
            bot.on('contact', async msg => {
                const { phone_number, first_name, last_name } = msg.message.contact

                const firstName = `${first_name ? first_name : ''}`
                const lastName = `${last_name ? last_name : ''}`

                let finalMesage = `*${firstName} ${lastName}* \n \`${phone_number.includes('+') ? '' : '+'}${phone_number}\`\n`

                actionHistory.forEach((history, index) => {
                    finalMesage += index === 0 ? `${history.data}:` : `\n • ${history.data}`
                })
                               
                await bot.telegram.sendMessage(CHANNEL_ID, finalMesage, { parse_mode: 'MarkdownV2' })
                await bot.telegram.sendMessage(ctx.chat.id, 'Дякую, Ваше повідомлення збережено.\nНаші волонтери зв\'яжуться с Вами найближчим часом.\nСлава Україні!🇺🇦🇺🇦🇺🇦', {
                    "reply_markup": {
                        "remove_keyboard": true
                    }
                }, {})
                await sendMainMenu(bot, ctx.chat.id)

                // clear action history
                actionHistory = []
            })
        })
    }
}

const getPhones = () => {
    let phones = ''
    PHONES.forEach((phone, index) => {
        const lineBreak = index === 0 ? '' : '\n'
        phones += `${lineBreak}*${phone.name}* \`${phone.number}\``
    })
    return phones
}

const sendMainMenu = async (bot, chatId) => {
    const menu = {
        "reply_markup": {
            "one_time_keyboard": true,
            "inline_keyboard": [
                [{
                    text: 'Головне меню 🏠',
                    callback_data: 'start',
                }]
            ]
        }
    }
    await bot.telegram.sendMessage(chatId, 'Натисніть, щоб відкрити головне меню.', menu, {})
}

const globalMenu = getCurrentLevelMenu(BOT_MENU, false)

bot.command('start', ctx => {
    actionHistory = []
    bot.telegram.sendMessage(ctx.chat.id, 'Виберіть один з пунктів допомоги:', globalMenu, {})
})

bot.command('getphones', async ctx => {
    await bot.telegram.sendMessage(ctx.chat.id, `*Номера волонтерів*: \n\n${getPhones()}`, { parse_mode: 'MarkdownV2' })
    await sendMainMenu(bot, ctx.chat.id)
})

bot.action('start', ctx => {
    actionHistory = []
    bot.telegram.sendMessage(ctx.chat.id, 'Виберіть один з пунктів допомоги:', globalMenu, {})
})

bot.action('back_menu', async ctx => {
    ctx.deleteMessage(ctx.update.callback_query.message.message_id)

    const menu = actionHistory.length > 0 
    ? getCurrentLevelMenu(actionHistory[actionHistory.length - 1].menu ,actionHistory.length > 1) 
    : globalMenu
   
    await bot.telegram.sendMessage(ctx.chat.id, 'Виберіть один з пунктів:', menu, {})
    actionHistory.pop()
})

bot.hears(REGIONS_MATCH_REGEX, async ctx => {
    const region = ctx.match.input

    await bot.telegram.sendMessage(ctx.chat.id, 'Область збережено.', {
        "reply_markup": {
            "remove_keyboard": true
        }
    }, {})

    await bot.telegram.sendMessage(ctx.chat.id, 'Виберіть один з пунктів', getCurrentLevelMenu(REGIONS_SUB_MENU), {})

    actionHistory.forEach(item => {
        if(item.action === 'region'){
            item.data += region
        }
    })
})

createActions(BOT_MENU)


// LOCAL LAUNCH
// bot.launch()


// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))


// WEBHOOK SETUP
const secretPath = `/bot/${bot.secretPathComponent()}`

bot.telegram.setWebhook(`${URL + secretPath}`);
bot.startWebhook(secretPath, null, PORT)
