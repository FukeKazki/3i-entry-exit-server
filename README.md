# Server of 3i-entry-exit

<p align='center'>URL:  https://server-3i-entry-exit.herokuapp.com</p>
<p align='center'>はてなブログ:  https://is.gd/yDZqUV</p>

## Description
入退場システム用サーバ

## 環境
- heroku
- heroku-postgre
- express

## API仕様
### 時刻投稿
**route**  
POST ```/api/v1/post_time```  
**param**  
```{ user_handle: string, conditions: "入場" or "退場", time: date }```  
**response**  
200  
```{}```  

### 名前一覧取得
**route**  
GET ```/api/v1/names```  
**param**  
```{}```  
**response**  
200  
```[string, ...]```

### ランキング取得
**route**  
GET ```/api/v1/ranking```  
**param**  
```{}```  
**response**  
200  
```[{ name: string, time: date }, ...]```  

### 入場表取得
**route**  
GET ```/api/v1/entry```  
**param**  
```{}```  
**response**  
200  
```[{ id: number, name: string, entry_time: date }]```  

### 退場表取得
**route**  
GET ```/api/v1/exit```  
**param**  
```{}```  
**response**  
200  
```[{ id: number, name: string, exit_time: date }]```  