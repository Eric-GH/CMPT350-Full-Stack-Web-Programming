function initDatabase() {//初始化数据库
    var db = getCurrentDb();
    if(!db) {
        alert("您的浏览器不支持HTML5");
        return;
    }
}

$(function () {

    var full=window.location.search.split("?");
    var data=full[1];
    initDatabase();
    showAllCourse(data);
    blank();
});




function getCurrentDb() {
    //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
    var db = openDatabase("350project", "1.0", "it's to save demo data!", 1024 * 1024); ;
    return db;

}




function showAllCourse(data){
    var db = getCurrentDb();
    var value=data;
    db.transaction(function (trans) {
        trans.executeSql("select * from Course where course_code = ?", [value], function (ts, data) {
            if (data) {
                for (var i = 0; i < data.rows.length; i++) {
                    appendDataToCourse(data.rows.item(i));//获取某行数据的json对象
                }
            }
        }, function (ts, message) {
            alert(message);
            var tst = message;
        });

    });
    showAllTheCommon(value);
}



function appendDataToCourse(data){

    var code= data.course_code;
    var name=data.course_name;
    var des=data.common_describe;


    var course_ul="";
    course_ul +="";
    course_ul +="<div class= \"c_border\">";
    course_ul +="<ul class=\"course_ul\">";
    course_ul +="<li class=\"c_code\">";
    course_ul +="<form>";
    course_ul +="<label class=\"c_code_label\">" +code;
    course_ul +="</label>";
    course_ul +="</form>";
    course_ul +="</li>";
    course_ul +="<li class=\"c_name\">";
    course_ul +="<form>";
    course_ul +="<label class=\"c_name_label\">" + name;
    course_ul +="</label>";
    course_ul +="</form>";
    course_ul +="</li>";
    course_ul +="<li class=\"c_discrib\">";
    course_ul +="<label class=\"c_discrib_label\">";
    course_ul +="<span class=\"c_discrib_text\">" + des;
    course_ul +="</span>";
    course_ul +="</label>";
    course_ul +="</li>";
    course_ul +="</ul>";
    course_ul +="</div>";
    $("#Course_Info").append(course_ul);


}


function showAllTheCommon(value) {
    $("#user_Evaluation").empty();
    var db = getCurrentDb();

    db.transaction(function (trans) {
        trans.executeSql("select * from Describe where course_code=?", [value], function (ts, data) {
            if (data) {
                for (var i = 0; i < data.rows.length; i++) {
                    appendDataToCommon(data.rows.item(i));//获取某行数据的json对象
                }
            }
        }, function (ts, message) {
            alert(message);
            var tst = message;
        });

    });
}

function appendDataToCommon(data) {//将数据展示到表格里面
    //uName,title,words
    var txtName = data.user_name;
    var txtTitle = data.user_common;
    var words = data.common_time;

    var strHtml = "";
    strHtml += "<div class=\"u_border\">";
    strHtml += "<table class=\"u_table\">";
    strHtml += "<tr>";
    strHtml += "<th class=\"u_name\">"+txtName+"</th>";
    strHtml += "<th class=\"u_discrib\">" + txtTitle + "</th>";
    strHtml += "</tr>";
    strHtml += "<tr>";
    strHtml += "<th class=\"u_time\">" + words + "</th>";
    strHtml += "</tr>";
    strHtml += "</table>";
    strHtml += "</div>";
    $("#user_Evaluation").append(strHtml);
}

function blank(){
    var textfill="";
    var strHtml = "";
    strHtml += "<div class=\"blank\">";
    strHtml +="<label class=\"blank_label\">" + textfill + "<label>";
    strHtml +="</div>";
    $("#c_blank").append(strHtml);
}


function flash() {
    location.reload();

}


