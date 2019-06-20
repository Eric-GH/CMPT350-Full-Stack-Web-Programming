function initDatabase() {//初始化数据库
    var db = getCurrentDb();
    if(!db) {
        alert("您的浏览器不支持HTML5");
        return;
    }
/**
    db.transaction(function (transaction) {
        transaction.executeSql("create table if not exists Course(course_code text null, course_name text null, common_describe text null)", [], function (trans, result) {

        }, function (transaction, message) {
            alert(message);
        });
    }, function (transaction, result) {
    }, function (transaction, message) {
    });

    db.transaction(function (trans) {
        trans.executeSql("create table if not exists Describe(course_code text null, user_name text null, user_common text null, common_time datetime null)", [], function (trans, result) {

        }, function (trans, message) {
            alert(message);
        });
    }, function (trans, result) {
    }, function (trans, message) {
    });

    db.transaction(function (trans) {
        trans.executeSql("create table if not exists Account(user_name text null, user_password text null)", [], function (trans, result) {

        }, function (trans, message) {
            alert(message);
        });
    }, function (trans, result) {
    }, function (trans, message) {
    });

    db.transaction(function (trans) {
        trans.executeSql("create table if not exists Info(user_name text null, user_last text null, user_first text null,user_email text null)", [], function (trans, result) {

        }, function (trans, message) {
            alert(message);
        });
    }, function (trans, result) {
    }, function (trans, message) {
    });
**/
}


function getCurrentDb() {
    //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
    var db = openDatabase("350project", "1.0", "it's to save demo data!", 1024 * 1024); ;
    return db;

}

$(function () {
    initDatabase();
    var dba = getCurrentDb();

    dba.transaction(function (trans) {

        trans.executeSql("insert into Course(course_code, course_name, common_describe) values(?,?,?) ", ["CMPT350","DataBase","Focuses on the concepts, technologies and tools needed for the development of web-centric applications.\n" +
        "                    Special emphasis will be given to client-server programming, scripting, integration of existing application and high-level\n" +
        "                    networking issues, e.g., use of SOAP."], function (ts, data) {

        }, function (ts, message) {
            alert(message);
        });

    });

    dba.transaction(function (trans) {

        trans.executeSql("insert into Describe(course_code, user_name, user_common, common_time) values(?,?,?,?) ", ["CMPT350","Eric","This is test database CMPT350 common test1",new Date()], function (ts, data) {

        }, function (ts, message) {
            alert(message);
        });

    });
    dba.transaction(function (trans) {

        trans.executeSql("insert into Describe(course_code, user_name, user_common, common_time) values(?,?,?,?) ", ["CMPT350","Eric","This is test database CMPT350 common test2",new Date()], function (ts, data) {

        }, function (ts, message) {
            alert(message);
        });

    });
    /**
    dba.transaction(function (trans) {

        trans.executeSql("insert into Account(user_name, user_password) values(?,?) ", ["Eric","test"], function (ts, data) {

        }, function (ts, message) {
            alert(message);
        });

    });
    dba.transaction(function (trans) {

        trans.executeSql("insert into Info(user_name, user_last, user_first,user_email) values(?,?,?,?) ", ["Eric","Li","EricHao","abc@gmail.com"], function (ts, data) {

        }, function (ts, message) {
            alert(message);
        });

    });
**/



});