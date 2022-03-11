const botMenu = {
    getHelp: {
        label: 'Отримати допомогу',
        channelId: '@test_tg_help',
        subMenu: {
            getAccommodation: {
                label: 'Житло',
                subMenu: {
                    getPaid: {
                        label: 'Платне',
                        break: true,
                    },
                    getFree: {
                        label: 'Безоплатне',                        
                    }
                }
            },
            getFood: {
                label: 'Харчування',
                subMenu: {
                    getFoodChildren: {
                        label: 'Дитяче',                        
                    },
                    getFoodGeneral: {
                        label: 'Загальне',                       
                    }
                }
            },
            getClothes: {
                label: 'Речі',
                subMenu: {
                    getClothesChildren: {
                        label: 'Дитяче'
                    },
                    getClothesWomen: {
                        label: 'Жіночі'
                    },
                    getClothesMen: {
                        label: 'Чоловічі'
                    },
                    getAmmunition: {
                        label: 'Амуніція'
                    },
                    getClothesMilitary:{
                        label: 'Військове спорядження'
                    }
                },
            },
            getMedicines: {
                label: 'Медикаменти',
                // phone number.
            }            
        }
    },
    giveHelp: {
        label: 'Пропоную допомогу',
        channelId: '@test_tg_help',
        subMenu: {
            giveAccommodation: {
                label: 'Житло',
                subMenu: {
                    givePaid: {
                        label: 'Платне'
                    },
                    giveFree: {
                        label: 'Безоплатне'
                    }
                }
            },
            giveFood: {
                label: 'Харчування',
                subMenu: {
                    giveFoodChildren: {
                        label: 'Дитяче'
                    },
                    giveFoodGeneral: {
                        label: 'Загальне'
                    }
                }
            },
            giveClothes: {
                label: 'Речі',
                subMenu: {
                    giveClothesChildren: {
                        label: 'Дитяче'
                    },
                    giveClothesWomen: {
                        label: 'Жіночі'
                    },
                    giveClothesMen: {
                        label: 'Чоловічі'
                    },
                    giveAmmunition: {
                        label: 'Амуніція'
                    },
                    giveClothesMilitary:{
                        label: 'Військове спорядження'
                    }
                },
            },
            giveMedicines: {
                label: 'Медикаменти',
                // phone number.
            },
            giveMoney: {
                label: 'Грошовий переказ',
                // card numbers.
            }
        }
    },
    volonteers: {
        label: 'Волонтери',
        channelId: '@test_tg_help',
    },
    drivers: {
        label: 'Водії',
        channelId: '@test_tg_help',
        subMenu: {
            region: {
                label: 'Область',
                subMenu: {
                    regionDontHaveCar: {
                        label: 'Немає транспорта'
                    },
                    regionHaveCar: {
                        label: 'Є транспорт',
                        subMenu: {
                            regionHaveCarEasy: {
                                label: 'Легковий'
                            },
                            regionHaveCarHeavy: {
                                label: 'Бус вантажний'
                            },
                            regionHaveCarHeavyPeople:{
                                label: 'Бус пасажир'
                            },
                            regionHaveCarTruck: {
                                label: 'Вантажний'
                            }
                        }
                    },
                }
            },
            ukraine: {
                label: 'Україна',
                subMenu: {
                    ukraineDontHaveCar: {
                        label: 'Немає транспорта'
                    },
                    ukraineHaveCar: {
                        label: 'Є транспорт',
                        subMenu: {
                            ukraineHaveCarEasy: {
                                label: 'Легковий'
                            },
                            ukraineHaveCarHeavy: {
                                label: 'Бус вантажний'
                            },
                            ukraineHaveCarHeavyPeople:{
                                label: 'Бус пасажир'
                            },
                            ukraineHaveCarTruck: {
                                label: 'Вантажний'
                            }
                        }
                    },
                }
            },
            europe: {
                label: 'Європа',
                subMenu: {
                    europeDontHaveCar: {
                        label: 'Немає транспорта'
                    },
                    europeHaveCar: {
                        label: 'Є транспорт',
                        subMenu: {
                            europeHaveCarEasy: {
                                label: 'Легковий'
                            },
                            europeHaveCarHeavy: {
                                label: 'Бус вантажний'
                            },
                            europeHaveCarHeavyPeople:{
                                label: 'Бус пасажир'
                            },
                            europeHaveCarTruck: {
                                label: 'Вантажний'
                            }
                        }
                    },
                }
            }
        }
    },
    needs: {
        label: 'Потреби',
        channelId: '@test_tg_help',
        subMenu: {
            needsMedicine: {
                label: 'Медицина'
            },
            humanitarianHelp: {
                label: 'Гуманітарна допомога'
            },
            needsMilitary: {
                label: 'Військові'
            }
        }
    },
    hotNumbers: {
        label: 'Гарячі телефони по областях',
        channelId: '@test_tg_help',
        subMenu: {
            phoneNumbersByRegion: {
                label: 'Вибір області'
            },
        }
    }
}


module.exports = {
    botMenu
}
