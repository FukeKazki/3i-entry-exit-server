import express from 'express'
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


/* ======================= */
// ルーティング処理

// 接続テスト用
app.get('/', (req, res) => {
    res.send('Hello World')
})

// 時刻投稿用
app.post('/api/v1/post_time', (req, res) => {
    // 任意の値を取り出す
    const {
        user_handle,
        conditions,
        time
    } = req.body
    // データベースへの登録を行う

    // レスポンス処理
    console.log(user_handle, conditions, time)
    res.json(req.body)
})

// ランキング取得用
app.get('/api/v1/ranking', (req, res) => {
    // データベースからランキングリストを取得する

    // ソートを行う

    // レスポンス処理
    res.send('This is Ranking List')
})

/* ======================= */

app.listen(PORT)
console.log(`Server running at ${PORT}`)