

const GET_HELP_SUBMENU = {
    getAccommodation: {
        label: 'Житло 🏡',
        subMenu: {
            getPaid: {
                label: 'Платне 💵',
                break: true,
            },
            getFree: {
                label: 'Безоплатне 🆓',
            }
        }
    },
    getFood: {
        label: 'Харчування 🍔',
        subMenu: {
            getFoodChildren: {
                label: 'Дитяче 👶',
            },
            getFoodGeneral: {
                label: 'Загальне 👫',
            }
        }
    },
    getClothes: {
        label: 'Речі 👔',
        subMenu: {
            getClothesChildren: {
                label: 'Дитяче 👶'
            },
            getClothesWomen: {
                label: 'Жіночі 👩‍🦰'
            },
            getClothesMen: {
                label: 'Чоловічі 👨‍🦰'
            },
            getAmmunition: {
                label: 'Амуніція 🪖'
            },
            getClothesMilitary: {
                label: 'Військове спорядження 🏹'
            }
        },
    },
    getMedicines: {
        label: 'Медикаменти 💊',
    }
}

const GIVE_HELP_SUBMENU = {
    giveAccommodation: {
        label: 'Житло 🏡',
        subMenu: {
            givePaid: {
                label: 'Платне 💵'
            },
            giveFree: {
                label: 'Безоплатне 🆓'
            }
        }
    },
    giveFood: {
        label: 'Харчування 🍔',
        subMenu: {
            giveFoodChildren: {
                label: 'Дитяче 👶'
            },
            giveFoodGeneral: {
                label: 'Загальне 👫'
            }
        }
    },
    giveClothes: {
        label: 'Речі 👔',
        subMenu: {
            giveClothesChildren: {
                label: 'Дитячі 👶'
            },
            giveClothesWomen: {
                label: 'Жіночі 👩‍🦰'
            },
            giveClothesMen: {
                label: 'Чоловічі 👨‍🦰'
            },
            giveAmmunition: {
                label: 'Амуніція 🪖'
            },
            giveClothesMilitary: {
                label: 'Військове спорядження 🏹'
            }
        },
    },
    giveMedicines: {
        label: 'Медикаменти 💊',
    },
    giveMoney: {
        label: 'Грошовий переказ 💸',
    }
}

const REGIONS_SUB_MENU = {
    regionDontHaveCar: {
        label: 'Немає транспорта 🐌'
    },
    regionHaveCar: {
        label: 'Є транспорт 🚀',
        subMenu: {
            regionHaveCarEasy: {
                label: 'Легковий 🚙'
            },
            regionHaveCarHeavy: {
                label: 'Бус вантажний 🚚'
            },
            regionHaveCarHeavyPeople: {
                label: 'Бус пасажир 🚌'
            },
            regionHaveCarTruck: {
                label: 'Вантажний 🚛'
            }
        }
    },
}

const BOT_MENU = {
    getHelp: {
        label: 'Отримати допомогу 🙋‍♀️',
        channelId: '@test_tg_help',
        subMenu: {...GET_HELP_SUBMENU}
    },
    giveHelp: {
        label: 'Пропоную допомогу 💁‍♀️',
        channelId: '@test_tg_help',
        subMenu: {...GIVE_HELP_SUBMENU}
    },
    volonteers: {
        label: 'Волонтери 👨‍👩‍👧‍👦',
        channelId: '@test_tg_help',
    },
    drivers: {
        label: 'Водії 🚘',
        channelId: '@test_tg_help',
        subMenu: {
            region: {
                label: 'Область 📌',
                subMenu: { ...REGIONS_SUB_MENU }
            },
            ukraine: {
                label: 'Україна 🇺🇦',
                subMenu: {
                    ukraineDontHaveCar: {
                        label: 'Немає транспорта 🐌'
                    },
                    ukraineHaveCar: {
                        label: 'Є транспорт 🚀',
                        subMenu: {
                            ukraineHaveCarEasy: {
                                label: 'Легковий 🚙'
                            },
                            ukraineHaveCarHeavy: {
                                label: 'Бус вантажний 🚚'
                            },
                            ukraineHaveCarHeavyPeople: {
                                label: 'Бус пасажир 🚌'
                            },
                            ukraineHaveCarTruck: {
                                label: 'Вантажний 🚛'
                            }
                        }
                    },
                }
            },
            europe: {
                label: 'Європа 🇪🇺',
                subMenu: {
                    europeDontHaveCar: {
                        label: 'Немає транспорта 🐌'
                    },
                    europeHaveCar: {
                        label: 'Є транспорт 🚀',
                        subMenu: {
                            europeHaveCarEasy: {
                                label: 'Легковий 🚙'
                            },
                            europeHaveCarHeavy: {
                                label: 'Бус вантажний 🚚'
                            },
                            europeHaveCarHeavyPeople: {
                                label: 'Бус пасажир 🚌'
                            },
                            europeHaveCarTruck: {
                                label: 'Вантажний 🚛'
                            }
                        }
                    },
                }
            }
        }
    },
    needs: {
        label: 'Потреби 🙌',
        channelId: '@test_tg_help',
        subMenu: {
            needsMedicine: {
                label: 'Медицина 🩺'
            },
            humanitarianHelp: {
                label: 'Гуманітарна допомога 🤝'
            },
            needsMilitary: {
                label: 'Військові ⚔️'
            }
        }
    },
    hotNumbers: {
        label: 'Гарячі телефони по областях ☎️',
        channelId: '@test_tg_help',
    }
}

const REGIONS = [
    { name: 'Вінницька' },
    { name: 'Волинська' },
    { name: 'Дніпропетровська' },
    { name: 'Донецька' },
    { name: 'Житомирська' },
    { name: 'Закарпатська' },
    { name: 'Запорізька' },
    { name: 'Івано-Франківська' },
    { name: 'Київська' },
    { name: 'Кіровоградська' },
    { name: 'Луганська' },
    { name: 'Львівська' },
    { name: 'Миколаївська' },
    { name: 'Одеська' },
    { name: 'Полтавська' },
    { name: 'Рівненська' },
    { name: 'Сумська' },
    { name: 'Тернопільська' },
    { name: 'Харківська' },
    { name: 'Херсонська' },
    { name: 'Хмельницька' },
    { name: 'Черкаська' },
    { name: 'Чернівецька' },
    { name: 'Чернігівська' },
]

const PHONES_BY_REGIONS = [
    { name: 'Вінницька', phones: ['0677734538'] },
    { name: 'Волинська', phones: ['0332778211', '0666570915'] },
    { name: 'Дніпропетровська', phones: ['0978817866', '0503223400'] },
    { name: 'Донецька', phones: ['0503479070', '0954062729'] },
    { name: 'Житомирська', phones: ['не приймає евакуйоване населення'] },
    { name: 'Запорізька', phones: ['не приймає евакуйоване населення'] },
    { name: 'Закарпатська', phones: ['0962843368', '0312428029', '031242830'] },
    { name: 'Івано\\-Франківська', phones: ['0342551868', '0683767762'] },
    { name: 'м\\.Київ', phones: ['не приймає евакуйоване населення'] },
    { name: 'Кіровоградська', phones: ['0522305039', '0800500238'] },
    { name: 'Київська', phones: ['не приймає евакуйоване населення'] },
    { name: 'Луганська', phones: ['не приймає евакуйоване населення'] },
    { name: 'Львівська', phones: ['0322546015', '0322975911', '032596031'] },
    { name: 'Миколаївська', phones: ['не приймає евакуйоване населення'] },
    { name: 'Одеська', phones: ['0949454502', '0679926621', '0487934603', '0933929615', '0986155701'] },
    { name: 'Полтавська', phones: ['0800502230', '0668464759', '0506927431'] },
    { name: 'Рівненська', phones: ['0800500078', '0362400100', '0985058325'] },
    { name: 'Сумська', phones: ['не приймає евакуйоване населення'] },
    { name: 'Тернопільска', phones: ['0963373870', '0677206556'] },
    { name: 'Харківська', phones: ['не приймає евакуйоване населення'] },
    { name: 'Хмельницька', phones: ['0673801721', '0673801557', '0673802808'] },
    { name: 'Херсонська', phones: ['не приймає евакуйоване населення'] },
    { name: 'Черкаська', phones: ['0686218029', '0504201356', '0800508886'] },
    { name: 'Чернівецька', phones: ['0951536298', '0985088484'] },
    { name: 'Чернігівська', phones: ['не приймає евакуйоване населення'] }]

const REGIONS_MATCH_REGEX = /Вінницька|Волинська|Дніпропетровська|Донецька|Житомирська|Закарпатська|Запорізька|Івано-Франківська|Київська|Кіровоградська|Луганська|Львівська|Миколаївська|Одеська|Полтавська|Рівненська|Сумська|Тернопільська|Харківська|Херсонська|Хмельницька|Черкаська|Чернівецька|Чернігівська/

module.exports = {
    REGIONS_MATCH_REGEX,
    BOT_MENU,
    GET_HELP_SUBMENU,
    GIVE_HELP_SUBMENU,
    REGIONS_SUB_MENU,
    REGIONS,
    PHONES_BY_REGIONS
}
