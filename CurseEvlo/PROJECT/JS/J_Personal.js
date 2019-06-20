function initDatabase() {//初始化数据库
    var db = getCurrentDb();
    if (!db) {
        alert("您的浏览器不支持HTML5");
        return;
    }


}

function getCurrentDb() {
    //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
    var db = openDatabase("350project", "1.0", "it's to save demo data!", 1024 * 1024); ;
    return db;

}
$(function () {
    initDatabase();
    var fullName = window.location.search.split("?");
    var GetName = fullName[1];
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("select * from Info where user_name=?", [GetName], function (ts, data) {
            if (data) {
                var newName= data.rows.item(0).user_first +" "+data.rows.item(0).user_last;
                document.getElementById("name_value").innerText= data.rows.item(0).user_name;
                document.getElementById("real_value").innerText= newName;
                document.getElementById("email_value").innerText= data.rows.item(0).user_email;
            }
        }, function (ts, message) {
            alert(message);
            var tst = message;
        });

    });

});


function changePass() {
    document.getElementById("change").style.display ="block";
    document.getElementById("personal").style.display = "none";

}

function backInfo() {
    document.getElementById("change").style.display ="none";
    document.getElementById("personal").style.display = "block";
}


function backToCourse() {
    var getName=window.location.search.split("?");
    if (getName.length == 3){
        var userName=getName[1];
        var courseName=getName[2];
        var userUrl = "Course.html?"+userName+"?"+courseName;
        window.location.assign(userUrl);
    }
    else{
        var newName = getName[1];
        var newUrl = "MainPage.html?"+newName;
        window.location.assign(newUrl);
    }

}

function ChangePassword() {
    var db = getCurrentDb();
    var oldPassword=$("#old_pass").val();
    var newPassword=$("#new_pass").val();
    var ConPassword=$("#confirm_pass").val();
    if (oldPassword != newPassword){
        if (newPassword == ConPassword) {
            var TheName = window.location.search.split("?");
            var userName = TheName[1];
            db.transaction(function (trans) {
                trans.executeSql("update Account set user_password = ? where user_name=?", [newPassword,userName], function (ts, data) {
                    alert("changed");

                }, function (ts, message) {
                    alert(message);
                    var tst = message;
                });

            });
        }
        else{
            document.getElementById("message").innerText = "New Password & Confirm Password should be same";
        }
    }
    else{
        document.getElementById("message").innerText = "Old Password & New Password should not be same";
    }

}

function backMain() {
    var getName=window.location.search.split("?");
    var userName=getName[1];
    var userUrl = "MainPage.html?"+userName;
    window.location.assign(userUrl);
}