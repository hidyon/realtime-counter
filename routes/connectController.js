const io = require('../socketio')

module.exports = {

  // コネクションが上限を超えている場合はルートへリダイレクトする
  // 超えていない場合は通過する
  controll : function(req, res, next){
    const count = io.getConnectionCount()
    console.log("COUNT: " + count)
    if(io.isOverLimitConnection()){
      //redirect
      res.redirect('/')
      return
    } 
    next()
  }

}