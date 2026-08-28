function LightUp (x_lay: number, y_lay: number) {
    // 今選択している点を反転
    if (mass[x_lay][y_lay] == 0) {
        mass[x_lay][y_lay] = 1
    } else {
        mass[x_lay][y_lay] = 0
    }
    // 右の点を反転
    if (x_lay + 1 < 5) {
        if (mass[x_lay + 1][y_lay] == 0) {
            mass[x_lay + 1][y_lay] = 1
        } else {
            mass[x_lay + 1][y_lay] = 0
        }
    }
    // 左の点を反転
    if (x_lay - 1 > -1) {
        if (mass[x_lay - 1][y_lay] == 0) {
            mass[x_lay - 1][y_lay] = 1
        } else {
            mass[x_lay - 1][y_lay] = 0
        }
    }
    // 上の点を反転
    if (y_lay + 1 < 5) {
        if (mass[x_lay][y_lay + 1] == 0) {
            mass[x_lay][y_lay + 1] = 1
        } else {
            mass[x_lay][y_lay + 1] = 0
        }
    }
    // 下の点を反転
    if (y_lay - 1 > -1) {
        if (mass[x_lay][y_lay - 1] == 0) {
            mass[x_lay][y_lay - 1] = 1
        } else {
            mass[x_lay][y_lay - 1] = 0
        }
    }
}
// Aボタンを押下した時にx軸上を移動
input.onButtonPressed(Button.A, function () {
    music.playTone(784, music.beat(BeatFraction.Sixteenth))
    if (x_lay == 4) {
        x_lay = 0
    } else {
        x_lay += 1
    }
})
// A+Bボタンを押下した時にその点と周りのLEDが反転
input.onButtonPressed(Button.AB, function () {
    music.playTone(932, music.beat(BeatFraction.Sixteenth))
    push_count += 1
    LightUp(x_lay, y_lay)
})
// Bボタンを押下した時にy軸上を移動
input.onButtonPressed(Button.B, function () {
    music.playTone(784, music.beat(BeatFraction.Sixteenth))
    if (y_lay == 4) {
        y_lay = 0
    } else {
        y_lay += 1
    }
})
/**
 * 変数の用意
 */
let count = 0
let y_lay = 0
let push_count = 0
let x_lay = 0
let random_y = 0
let random_x = 0
let mass: number[][] = []
let row: number[] = []
// 配列の全ての中身を0にする
for (let index = 0; index < 5; index++) {
    row = []
    for (let index = 0; index < 5; index++) {
        row.push(0)
    }
    mass.push(row)
}
// ランダムな数を光らせる
let random = randint(5, 20)
for (let index = 0; index < random; index++) {
    random_x = randint(0, 4)
    random_y = randint(0, 4)
    LightUp(random_x, random_y)
}
basic.forever(function () {
    // 点灯しているLEDの数と描画
    count = 0
    for (let count_x = 0; count_x <= 4; count_x++) {
        for (let count_y = 0; count_y <= 4; count_y++) {
            if (mass[count_x][count_y] == 1) {
                led.plotBrightness(count_x, count_y, 100)
                count += 1
            } else {
                led.unplot(count_x, count_y)
            }
        }
    }
    // 選択しているマスのLEDの明るさの変化
    if (mass[x_lay][y_lay] == 1) {
        led.plotBrightness(x_lay, y_lay, 255)
    } else {
        led.plotBrightness(x_lay, y_lay, 20)
    }
    // すべてが点灯したら終了してリセット
    if (count == 25) {
        basic.showString("CLEAR" + push_count)
        control.reset()
    }
})
