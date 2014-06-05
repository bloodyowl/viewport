var viewport = require("../")
var tape = require("tape")

tape("viewport", function(test){
  var v = viewport()
  var i = -1
  v.use({
    range : [0, 100],
    on : function(){
      test.equal(++i, 0)
      v.update(110)
    },
    off : function(){
      test.equal(++i, 1)
      v.destroy()
      v.update(50)
      test.end()
    }
  })
  v.update(50)
})

tape("multiple viewport ranges can be active", function(test){
  var v = viewport()
  var i = -1
  v
    .use({
      range : [0, 100],
      on : function(){
        test.equal(++i, 0)
      },
      off : function(){
        test.equal(++i, 2)
      }
    })
    .use({
      range : [0, 60],
      on : function(){
        test.equal(++i, 1)
        v.update(110)
      },
      off : function(){
        test.equal(++i, 3)
        v.destroy()
        v.update(50)
        test.end()
      }
    })
  v.update(50)
})

tape("use should throw if no range is defined", function(test){
  test.throws(function(){
    var v = viewport()
    v.use()
    v.destroy()
  }, "with null")
  test.throws(function(){
    var v = viewport()
    v.use({range:null})
    v.destroy()
  }, "with object and null range")
  test.throws(function(){
    var v = viewport()
    v.use({range:["foo", "bar"]})
    v.destroy()
  }, "with object and wrong range")
  test.end()
})

tape("behaves correctly on update", function(test){
  var v = viewport()
  var i = -1
  v.use({
    range : [200, 300],
    on : function(){
      test.equal(++i, 0)
      v.update(250)
    },
    off : function(){
      test.equal(++i, 2)
    }
  })
  .use({
    range : [240, 260],
    on : function(){
      test.equal(++i, 1)
      v.update(320)
    },
    off : function(){
      test.equal(++i, 3)
      test.end()
      v.destroy()
    }
  })
  v.update(210)
})

tape("inits", function(test){
  var v = viewport()
  v.use({
    range : [0, Infinity],
    on : function(){
      test.ok(1)
      test.end()
      v.destroy()
    }
  })
  v.init()
})
