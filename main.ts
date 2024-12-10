enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const npc = SpriteKind.create()
}
function load_combat () {
    enemyHeal = 1
    fightStatus = 0
    In_Combat += 1
    statusbar2 = statusbars.create(20, 4, StatusBarKind.Health)
    statusbar2.max = 20
    statusbar2.value = 20
    tiles.setCurrentTilemap(tilemap`forestCombat`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 4))
    healthBar.max = 100
    healthBar.attachToSprite(mySprite)
    enemy1 = sprites.create(assets.image`ENEMY`, SpriteKind.Enemy)
    tiles.placeOnTile(enemy1, tiles.getTileLocation(7, 4))
    statusbar2.attachToSprite(enemy1)
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    timer.throttle("action", 500, function () {
        if (menuOpen == false) {
            if (mySprite.tileKindAt(TileDirection.Right, assets.tile`cash rgister`) && game.ask("trade?")) {
                menuOpen = true
                witchtrade()
            }
        }
    })
})
function load_wall () {
    for (let wall1 of tiles.getTilesByType(assets.tile`myTile0`)) {
        tiles.setWallAt(wall1, true)
    }
    for (let wall2 of tiles.getTilesByType(assets.tile`myTile12`)) {
        tiles.setWallAt(wall2, true)
    }
    for (let wall3 of tiles.getTilesByType(assets.tile`myTile13`)) {
        tiles.setWallAt(wall3, true)
    }
    for (let wall4 of tiles.getTilesByType(assets.tile`myTile17`)) {
        tiles.setWallAt(wall4, true)
    }
    for (let wall5 of tiles.getTilesByType(assets.tile`myTile19`)) {
        tiles.setWallAt(wall5, true)
    }
    for (let wall6 of tiles.getTilesByType(assets.tile`myTile3`)) {
        tiles.setWallAt(wall6, true)
    }
    for (let wall7 of tiles.getTilesByType(assets.tile`myTile21`)) {
        tiles.setWallAt(wall7, true)
    }
    for (let wall8 of tiles.getTilesByType(assets.tile`myTile28`)) {
        tiles.setWallAt(wall8, true)
    }
    for (let wall9 of tiles.getTilesByType(assets.tile`myTile29`)) {
        tiles.setWallAt(wall9, true)
    }
    for (let wall10 of tiles.getTilesByType(assets.tile`myTile29`)) {
        tiles.setWallAt(wall10, true)
    }
    for (let wall11 of tiles.getTilesByType(assets.tile`myTile31`)) {
        tiles.setWallAt(wall11, true)
    }
    for (let wall12 of tiles.getTilesByType(assets.tile`myTile33`)) {
        tiles.setWallAt(wall12, true)
    }
    for (let wall13 of tiles.getTilesByType(assets.tile`myTile32`)) {
        tiles.setWallAt(wall13, true)
    }
    for (let wall14 of tiles.getTilesByType(assets.tile`myTile34`)) {
        tiles.setWallAt(wall14, true)
    }
    for (let wall15 of tiles.getTilesByType(assets.tile`myTile35`)) {
        tiles.setWallAt(wall15, true)
    }
    for (let wall20 of tiles.getTilesByType(assets.tile`myTile44`)) {
        tiles.setWallAt(wall20, true)
    }
    for (let wall21 of tiles.getTilesByType(assets.tile`myTile45`)) {
        tiles.setWallAt(wall21, true)
    }
    for (let wall22 of tiles.getTilesByType(assets.tile`myTile52`)) {
        tiles.setWallAt(wall22, true)
    }
}
function menu () {
    inventory_menu = miniMenu.createMenu(
    miniMenu.createMenuItem("Open inventory"),
    miniMenu.createMenuItem("Exit")
    )
    inventory_menu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        inventory_menu.close()
        if (selectedIndex == 0) {
            inventory2()
        } else {
            canMove = true
            load_status_bar()
        }
    })
}
function quest1 () {
    game.showLongText("Adventurer!! I need your help", DialogLayout.Bottom)
    game.showLongText("I lost my magic stone somewhere in the woods", DialogLayout.Bottom)
    game.showLongText("If you bring back my magic stone I will reward you handsomley", DialogLayout.Bottom)
    if (game.ask("Accept quest?")) {
        game.showLongText("Thank you adventurer I will reward you once you return the stone", DialogLayout.Bottom)
        questStatus += 1
    } else {
        game.showLongText("Come back any time and I will give you the quest.", DialogLayout.Bottom)
    }
}
function inventory2 () {
    inventorycount = miniMenu.createMenu(
    miniMenu.createMenuItem("# of Health Potions: " + Heal, assets.image`health_potion`),
    miniMenu.createMenuItem("# of Health Potions: " + Mana, assets.image`mana_potion`),
    miniMenu.createMenuItem("# of Health Potions: " + Stamina, assets.image`stamina_potion`),
    miniMenu.createMenuItem("Exit")
    )
    inventorycount.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 3) {
            inventorycount.close()
            canMove = true
            load_status_bar()
        } else {
            game.splash("can't interact")
        }
    })
}
function callbuy () {
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("mana potioin", assets.image`mana_potion`),
    miniMenu.createMenuItem("stamina", assets.image`stamina_potion`),
    miniMenu.createMenuItem("health", assets.image`health_potion`),
    miniMenu.createMenuItem("back")
    )
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 0) {
            if (info.score() <= 0) {
                game.splash("ur broke")
                canMove = true
                myMenu.close()
            } else {
                info.changeScoreBy(-10)
            }
        } else if (selectedIndex == 1) {
            if (info.score() <= 0) {
                game.splash("ur broke")
                canMove = true
                myMenu.close()
            } else {
                info.changeScoreBy(-10)
            }
        } else if (selectedIndex == 2) {
            if (info.score() <= 0) {
                game.splash("ur broke")
                canMove = true
                myMenu.close()
            } else {
                info.changeScoreBy(-10)
            }
        } else {
            myMenu.close()
            witchtrade()
        }
    })
}
function load_status_bar () {
    healthBar = statusbars.create(20, 4, StatusBarKind.Health)
    healthBar.attachToSprite(mySprite)
    healthBar.max = 100
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile25`, function (sprite, location) {
    timer.throttle("action", 500, function () {
        music.stopAllSounds()
        sprites.destroy(mySprite2)
        tiles.setCurrentTilemap(tilemap`level`)
        load_wall()
    })
})
function enemy_attack () {
    if (statusbar2.value <= 10 && enemyHeal > 0) {
        timer.after(500, function () {
            enemyHeal += -1
            extraEffects.createSpreadEffectOnAnchor(enemy1, extraEffects.createSingleColorSpreadEffectData(7, ExtraEffectPresetShape.Cloud), 200)
            timer.after(500, function () {
                statusbar2.value += 10
            })
            fightStatus += -1
            encounter1()
        })
    } else {
        timer.after(500, function () {
            fightStatus += -1
            animation.runImageAnimation(
            enemy1,
            [img`
                ........................
                ........................
                ........................
                ........................
                ..........fffff.........
                ........ff1111bff.......
                .......fb1111111bf......
                .......f111111111f......
                ......fd1111111ffff.....
                ......fd111dd1c111bf....
                ......fb11fcdf1b1bff....
                ......f11111bfbfbff.....
                ......f1b1bdfcffff......
                ......fbfbfcfcccf.......
                ......ffffffffff........
                .........ffffff.........
                .........ffffff.........
                .........fffffff..f.....
                ..........fffffffff.....
                ...........fffffff......
                ........................
                ........................
                ........................
                ........................
                `,img`
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff1111ff........
                .......fb111111bf.......
                .......f1111111dbf......
                ......fd1111111ddf......
                ......fd111111dddf......
                ......fd111ddddddf......
                ......fd111ddddddf......
                ......fd1dddddddbf......
                ......fd1dfbddbbff......
                ......fbddfcdbbcf.......
                .....ffffccddbfff.......
                ....fcb1bbbfcffff.......
                ....f1b1dcffffffff......
                ....fdfdf..ffffffffff...
                .....f.f.....ffffff.....
                ........................
                ........................
                ........................
                ........................
                ........................
                `],
            500,
            false
            )
            music.play(music.createSoundEffect(WaveShape.Noise, 2483, 1, 225, 225, 438, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            timer.after(500, function () {
                healthBar.value += -30
                myIndicator2 = damageIndicators.makeIndicator("-30", 12)
                damageIndicators.showIndicatorSprite(mySprite, myIndicator2)
                encounter1()
            })
        })
    }
}
function witchtrade () {
    canMove = false
    shop1 = miniMenu.createMenu(
    miniMenu.createMenuItem("Trade"),
    miniMenu.createMenuItem("Talk"),
    miniMenu.createMenuItem("leave")
    )
    shop1.onButtonPressed(controller.A, function (selection, selectedIndex) {
        shop1.close()
        if (selectedIndex == 0) {
            callbuy()
        } else if (selectedIndex == 1) {
            if (questStatus == 0) {
                quest1()
                canMove = true
                menuOpen = false
            } else if (questStatus == 1 && quest_objective1 == 1) {
                effects.confetti.startScreenEffect(5000)
                game.showLongText("thank you for getting my stone here is 100 gold", DialogLayout.Bottom)
                info.changeScoreBy(100)
                canMove = true
                menuOpen = false
            } else {
                game.showLongText("Please retrieve my stone!", DialogLayout.Bottom)
                canMove = true
                menuOpen = false
            }
        } else {
            canMove = true
            menuOpen = false
        }
    })
}
function attack () {
    Attack = miniMenu.createMenu(
    miniMenu.createMenuItem("sword slash"),
    miniMenu.createMenuItem("back")
    )
    Attack.onButtonPressed(controller.A, function (selection, selectedIndex) {
        Attack.close()
        if (selectedIndex == 0) {
            fightStatus += 1
            animation.runImageAnimation(
            mySprite,
            assets.animation`attack_anim_sword`,
            100,
            false
            )
            music.play(music.createSoundEffect(WaveShape.Sawtooth, 2201, 1, 243, 243, 352, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            myIndicator = damageIndicators.makeIndicator("-5", 12)
            damageIndicators.showIndicatorSprite(enemy1, myIndicator)
            timer.after(500, function () {
                encounter1()
            })
            statusbar2.value += -5
        } else {
            encounter1()
        }
    })
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile57`, function (sprite, location) {
    timer.throttle("action", 500, function () {
        if (game.ask("Go to town?")) {
            tiles.setCurrentTilemap(tilemap`level`)
            load_wall()
            mySprite.setPosition(14, 77)
            canAttack += -1
        }
    })
})
function encounter1 () {
    if (healthBar.value <= 0) {
        game.splash("you are dead")
        dead_screen()
    } else {
        if (statusbar2.value == 0) {
            music.stopAllSounds()
            music.play(music.createSong(assets.song`open chest`), music.PlaybackMode.InBackground)
            game.splash("You won the fight.", "Gain 20 gold")
            info.changeScoreBy(50)
            sprites.destroy(enemy1, effects.spray, 500)
            timer.after(500, function () {
                healthBar.value = healthBar.max
                canMove = true
                travel_to_forest()
            })
        } else {
            if (fightStatus == 0) {
                combatMenu = miniMenu.createMenu(
                miniMenu.createMenuItem("Attack"),
                miniMenu.createMenuItem("Potions")
                )
                combatMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
                    combatMenu.close()
                    if (selectedIndex == 0) {
                        attack()
                    } else {
                        potion()
                    }
                })
            } else {
                enemy_attack()
            }
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`chest2`, function (sprite, location) {
    timer.throttle("action", 500, function () {
        if (game.ask("Open chest?") && Chest2 == 0) {
            music.play(music.createSong(assets.song`open chest`), music.PlaybackMode.InBackground)
            game.splash("You found 50 gold")
            info.changeScoreBy(50)
            Chest2 += 1
        } else {
            game.showLongText("The chest is empty", DialogLayout.Bottom)
        }
    })
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (canMove == true) {
        canMove = false
        sprites.destroy(healthBar)
        menu()
    }
})
function dead_screen () {
    music.stopAllSounds()
    dead_menu = miniMenu.createMenu(
    miniMenu.createMenuItem("you highest score was" + info.highScore()),
    miniMenu.createMenuItem("respawn")
    )
    dead_menu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        dead_menu.close()
        if (selectedIndex == 1) {
        	
        }
    })
}
function potion () {
    potionMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Health Potion", assets.image`health_potion`),
    miniMenu.createMenuItem("Mana Potion", assets.image`mana_potion`),
    miniMenu.createMenuItem("Stamina Potion", assets.image`stamina_potion`),
    miniMenu.createMenuItem("Back")
    )
    potionMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        potionMenu.close()
        if (selectedIndex == 0) {
            healthBar.value = healthBar.max
            extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(12, ExtraEffectPresetShape.Cloud), 500)
            timer.after(500, function () {
                encounter1()
            })
        } else if (selectedIndex == 1) {
        	
        } else if (selectedIndex == 2) {
        	
        } else {
            encounter1()
        }
    })
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`chest1`, function (sprite, location) {
    timer.throttle("action", 500, function () {
        if (game.ask("Open chest?") && Chest1 == 0) {
            music.play(music.createSong(assets.song`open chest`), music.PlaybackMode.InBackground)
            game.splash("You found 50 gold")
            info.changeScoreBy(50)
            Chest1 += 1
        } else {
            game.showLongText("The chest is empty", DialogLayout.Bottom)
        }
    })
})
function travel_to_forest () {
    tiles.setCurrentTilemap(tilemap`level10`)
    mySprite.setPosition(30, 30)
    healthBar.attachToSprite(mySprite)
    for (let wall23 of tiles.getTilesByType(sprites.castle.tileDarkGrass1)) {
        tiles.setWallAt(wall23, true)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile53`, function (sprite, location) {
    timer.throttle("action", 500, function () {
        if (game.ask("Travel to forest?")) {
            travel_to_forest()
        }
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile55`, function (sprite, location) {
    timer.throttle("action", 500, function () {
        canMove = false
        load_combat()
        encounter1()
        music.play(music.createSong(assets.song`mySong0`), music.PlaybackMode.LoopingInBackground)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile11`, function (sprite, location) {
    timer.throttle("action", 1000, function () {
        if (game.ask("enter witches hut?")) {
            music.play(music.createSong(assets.song`whitches hut`), music.PlaybackMode.LoopingInBackground)
            tiles.setCurrentTilemap(tilemap`house inside 1`)
            mySprite2 = sprites.create(assets.image`witch`, SpriteKind.npc)
            mySprite2.setPosition(150, 15)
        }
        for (let wall16 of tiles.getTilesByType(assets.tile`Counter`)) {
            tiles.setWallAt(wall16, true)
        }
        for (let wall17 of tiles.getTilesByType(assets.tile`cash rgister`)) {
            tiles.setWallAt(wall17, true)
        }
        for (let wall18 of tiles.getTilesByType(assets.tile`tile34`)) {
            tiles.setWallAt(wall18, true)
        }
        for (let wall19 of tiles.getTilesByType(assets.tile`tile35`)) {
            tiles.setWallAt(wall19, true)
        }
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile26`, function (sprite, location) {
    timer.throttle("action", 500, function () {
        if (questStatus == 1) {
            effects.confetti.startScreenEffect(5000)
            game.splash("you have picked up \"magic stone\"")
            quest_objective1 += 1
            tiles.setTileAt(location, sprites.castle.tileDarkGrass1)
        } else {
            game.showLongText("*weird glowing rock*", DialogLayout.Bottom)
        }
    })
})
let potionMenu: miniMenu.MenuSprite = null
let dead_menu: miniMenu.MenuSprite = null
let combatMenu: miniMenu.MenuSprite = null
let canAttack = 0
let myIndicator: damageIndicators.Indicator = null
let Attack: miniMenu.MenuSprite = null
let shop1: miniMenu.MenuSprite = null
let myIndicator2: damageIndicators.Indicator = null
let mySprite2: Sprite = null
let myMenu: miniMenu.MenuSprite = null
let inventorycount: miniMenu.MenuSprite = null
let inventory_menu: miniMenu.MenuSprite = null
let menuOpen = false
let enemy1: Sprite = null
let healthBar: StatusBarSprite = null
let statusbar2: StatusBarSprite = null
let In_Combat = 0
let fightStatus = 0
let enemyHeal = 0
let mySprite: Sprite = null
let quest_objective1 = 0
let questStatus = 0
let Chest2 = 0
let Chest1 = 0
let canMove = false
let Stamina = 0
let Mana = 0
let Heal = 0
Heal = 1
Mana = 1
Stamina = 1
canMove = true
Chest1 = 0
Chest2 = 0
// 0 = quest not started, 1 = quest in progress, 2 = quest completed
questStatus = 0
quest_objective1 = 0
let gold = 50
mySprite = sprites.create(assets.image`character`, SpriteKind.Player)
info.setScore(gold)
load_status_bar()
mySprite.setVelocity(0, 0)
mySprite.setPosition(14, 77)
mySprite.setStayInScreen(true)
mySprite.setBounceOnWall(true)
tiles.setCurrentTilemap(tilemap`level`)
for (let wall1 of tiles.getTilesByType(assets.tile`myTile0`)) {
    tiles.setWallAt(wall1, true)
}
for (let wall2 of tiles.getTilesByType(assets.tile`myTile12`)) {
    tiles.setWallAt(wall2, true)
}
for (let wall3 of tiles.getTilesByType(assets.tile`myTile13`)) {
    tiles.setWallAt(wall3, true)
}
for (let wall4 of tiles.getTilesByType(assets.tile`myTile17`)) {
    tiles.setWallAt(wall4, true)
}
for (let wall5 of tiles.getTilesByType(assets.tile`myTile19`)) {
    tiles.setWallAt(wall5, true)
}
for (let wall6 of tiles.getTilesByType(assets.tile`myTile3`)) {
    tiles.setWallAt(wall6, true)
}
for (let wall7 of tiles.getTilesByType(assets.tile`myTile21`)) {
    tiles.setWallAt(wall7, true)
}
for (let wall8 of tiles.getTilesByType(assets.tile`myTile28`)) {
    tiles.setWallAt(wall8, true)
}
for (let wall9 of tiles.getTilesByType(assets.tile`myTile29`)) {
    tiles.setWallAt(wall9, true)
}
for (let wall10 of tiles.getTilesByType(assets.tile`myTile29`)) {
    tiles.setWallAt(wall10, true)
}
for (let wall11 of tiles.getTilesByType(assets.tile`myTile31`)) {
    tiles.setWallAt(wall11, true)
}
for (let wall12 of tiles.getTilesByType(assets.tile`myTile33`)) {
    tiles.setWallAt(wall12, true)
}
for (let wall13 of tiles.getTilesByType(assets.tile`myTile32`)) {
    tiles.setWallAt(wall13, true)
}
for (let wall14 of tiles.getTilesByType(assets.tile`myTile34`)) {
    tiles.setWallAt(wall14, true)
}
for (let wall15 of tiles.getTilesByType(assets.tile`myTile35`)) {
    tiles.setWallAt(wall15, true)
}
for (let wall20 of tiles.getTilesByType(assets.tile`myTile44`)) {
    tiles.setWallAt(wall20, true)
}
for (let wall21 of tiles.getTilesByType(assets.tile`myTile45`)) {
    tiles.setWallAt(wall21, true)
}
for (let wall22 of tiles.getTilesByType(assets.tile`myTile52`)) {
    tiles.setWallAt(wall22, true)
}
game.onUpdate(function () {
    if (canMove == true) {
        controller.moveSprite(mySprite, 100, 100)
        scene.cameraFollowSprite(mySprite)
    } else {
        controller.moveSprite(mySprite, 0, 0)
    }
})
