const  socketio = require('socket.io')

let io
// 現在のコネクション数
let count = 0
// 入場上限数
const limitCount = 2 

// socket.io のインスタンスを生成
// 一度しか呼び出さない事
// シングルトンにしてない
const createIo = (server) => {
  io = socketio(server)
  io.on('connect', (socket) => {
    console.log('IO: connect')
    count++
    io.emit('count change', count)
    socket.on('disconnect', () => {
        console.log('IO: disconnect')
        count--
        socket.broadcast.emit('count change', count)
    })
  })
  return io
}

// 現在のコネクション数を返す
const getConnectionCount = () => {
    return count
}

// コネクション数が上限を超えているか判定する
const isOverLimitConnection = () => {
    console.log("LIMIT: " + limitCount)
    return count > limitCount ? true: false
}

module.exports = {
    createIo: createIo,
    getConnectionCount: getConnectionCount,
    isOverLimitConnection: isOverLimitConnection
}