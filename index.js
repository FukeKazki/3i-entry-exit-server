import express from 'express'
import database from './database'
const app = express()
const PORT = process.env.PORT || 3000

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// jsonを扱えるようにする
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

// データベースの準備
const db = new database

/* ======================= */
// ルーティング処理

// 接続テスト
app.get('/', async (req, res) => {
    res.send('Hello World')
})

// 時刻投稿
app.post('/api/v1/post_time', (req, res) => {
    // 任意の値を取り出す
    const {
        user_handle,
        conditions,
        time
    } = req.body

    // データベースへの登録を行う
    switch (conditions) {
        case '入場':
            db.entryPost(user_handle, time)
            break;
        case '退場':
            db.exitPost(user_handle, time)
            break;
    }
    // レスポンス処理
    res.send("success")
})

// ランキング取得
app.get('/api/v1/ranking', async (req, res) => {
    // データベースからランキングの作成
    // 入場テーブルと退場テーブルを結合させ、時間差を求める
    const result = await db.query('SELECT entry.user_handle as name, exit_time - entry_time as play_time FROM entry INNER JOIN exit ON entry.user_handle = exit.user_handle ORDER BY play_time ASC')
    // レスポンス処理
    res.send(result)
})

// 入場表の取得
app.get('/api/v1/entry', async (req, res) => {
    const result = await db.query('SELECT * FROM entry')
    res.send(result)
})

// 退場表の取得
app.get('/api/v1/exit', async (req, res) => {
    const result = await db.query('SELECT * FROM exit')
    res.send(result)
})

// 名前一覧の取得
app.get('/api/v1/names', async (req, res) => {
    const result = await db.query('SELECT DISTINCT user_handle FROM entry')
    const names = result.map(x => x.user_handle)
    res.send(names)
})

/* ======================= */

app.listen(PORT)
console.log(`Server running at ${PORT}`)