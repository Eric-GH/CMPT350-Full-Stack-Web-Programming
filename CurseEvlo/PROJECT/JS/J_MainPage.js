function initDatabase() {//初始化数据库
    var db = getCurrentDb();
    if(!db) {
        alert("您的浏览器不支持HTML5");
        return;
    }

}

function getCurrentDb() {
    //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
    var db = openDatabase("350project", "1.0", "it's to save demo data!", 1024 * 1024); ;
    return db;

}


function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');

    if(!container.hasClass('active')){
        container.addClass('active');
        evt.preventDefault();
    }
    else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
        container.removeClass('active');
        // clear input
        container.find('.search-input').val('');
        // clear and hide result container when we press close
        container.find('.result-container').fadeOut(100, function(){$(this).empty();});
    }
}

function submitFn(obj, evt){
    value = $(obj).find('.search-input').val().trim();
    var  getName= window.location.search.split("?");
    var userName=getName[1];

    var answer = "Did not find this course";
    initDatabase();
    if(!value.length){
        answer = "Yup yup! Add some text friend :D";
    }
    else{
        var searchWords = value;

        var dba = getCurrentDb();
        //寻找数据
        dba.transaction(function (trans) {

            trans.executeSql("select course_code from Course where course_code=?", [searchWords], function (ts, data) {
                if (data) {
                    var newUrl="Course.html?"+userName +"?"+data.rows.item(0).course_code;
                    window.location.assign(newUrl);
                }

            }, function (ts, message) {
                alert(message);
            });
        });
    }

    $(obj).find('.result-container').html('<span>' + answer + '</span>');
    $(obj).find('.result-container').fadeIn(100);

    evt.preventDefault();
}









function flash() {
    location.reload();

}

function person() {
    var getName=window.location.search.split("?");
    var userName=getName[1];
    var userUrl = "Personal.html?"+userName;
    window.location.assign(userUrl);
}