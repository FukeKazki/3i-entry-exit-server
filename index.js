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
    db.timePost(user_handle, conditions, time)
    // レスポンス処理
    res.send("success")
})

// ランキング取得
app.get('/api/v1/ranking', async (req, res) => {
    // データベースからランキングリストを取得する
    const result = await db.query('SELECT * FROM ranking')
    // ソートを行う
    console.log(result)
    // レスポンス処理
    res.send('This is Ranking List')
})

// タイムログの取得
app.get('/api/v1/time_log', async (req, res) => {
    const result = await db.query('SELECT * FROM time_log')
    res.send(result)
})

/* ======================= */

app.listen(PORT)
console.log(`Server running at ${PORT}`)