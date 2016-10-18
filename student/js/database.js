/**
 * Created by Administrator on 2016/10/11.
 */
function getDB() {
    var db=window.openDatabase("sql","1.0","this is a database",2*1024*1024);
    //return db;
    //var db = window.openDatabase("sms","1.0","student manager system db",2*1024*1024);
    return db;
}
(function(){
    var db=getDB();
    db.transaction(function (transaction) {
        var sql ="CREATE TABLE IF NOT EXISTS " +
        //var sql = "CREATE TABLE IF NOT EXISTS "+
            "student(" +
            "id INTEGER," +
            "name TEXT," +
            "gender TEXT," +
            "age INTEGER," +
            "address TEXT)";
        transaction.executeSql(sql,[],function () {
            console.log("创建成功！");
        })
    });
})();
function Student(id,name,gender,age,address) {
    this.id = id;
    this.name=name;
    this.gender=gender;
    this.age=age;
    this.address=address;
}
function save(student,handler) {
    //console.log(student);
    if(student instanceof Student){
        var db=getDB();
        db.transaction(function (transaction) {
            var sql="insert into student values(?,?,?,?,?)";
            transaction.executeSql(sql,[
                student.id,student.name,student.gender,student.age,student.address
            ],function () {
                handler.call(this);
            })
        })
    }else{
        alert("输入有误");
    }
}
function getAllstu(handle){
    //console.log(typeof.id);
    var db=getDB();
    db.transaction(function (transaction) {
        var sql="select * from student";
        transaction.executeSql(sql,[],function (transaction,result) {
            console.log(result.rows);
            //console.log("db:"+event);
            handle(result);


        })
    })
}
function delstu(ids,handle) {
    var db=getDB();
    //console.log(typeof id);
    db.transaction(function (transaction) {
        var sql="delete from student where id in (?)"
        for(var i=0;i<ids.length;i++){
            transaction.executeSql(sql,[ids[i]],function(transaction,result){
                location.reload();
                handle(result);
            })
        }
    })
}
function updatestu(val,id,upname,handle){
    var db=getDB();
    //console.log(typeof id);
    //console.log(val);
    db.transaction(function (transaction) {
        //console.log(val);
        //console.log(id);
        console.log(typeof upname);
       //console.log(upname);
        switch (upname){
            case "姓名":
                var sql="update student set name = (?) where id in (?)"
                break;
            case "性别":
                var sql="update student set gender = (?) where id in (?)"
                break;
            case "年龄":
                var sql="update student set age = (?) where id in (?)"
                break;
            case "地址":
                var sql="update student set address = (?) where id in (?)"
                break;
        }
            console.log(typeof sql);
        //var sql="update student set name = (?) where id in (?)"
        transaction.executeSql(sql,[val,id],function(transaction,result){
            location.reload();
            handle(result);
        })
    });
}
function search(txt,handle) {
    var db=getDB();
    //console.log(typeof id);
    db.transaction(function (transaction) {
        var sql="select * from student where age in (?)"
        transaction.executeSql(sql,[txt],function(transaction,result){
            //location.reload();
            handle(result);
        })
    })
}