/**
$(function() {
    //the form wrapper (includes all forms)
    var $form_wrapper	= $('#form_wrapper'),
        //the current form is the one with class active
        $currentForm	= $form_wrapper.children('form.active'),
        //the change form links
        $linkform		= $form_wrapper.find('.linkform');

    //get width and height of each form and store them for later
    $form_wrapper.children('form').each(function(i){
        var $theForm	= $(this);
        //solve the inline display none problem when using fadeIn fadeOut
        if(!$theForm.hasClass('active'))
            $theForm.hide();
        $theForm.data({
            width	: $theForm.width(),
            height	: $theForm.height()

        });
    });

    //set width and height of wrapper (same of current form)
    setWrapperWidth();
**/
    /*
    clicking a link (change form event) in the form
    makes the current form hide.
    The wrapper animates its width and height to the
    width and height of the new current form.
    After the animation, the new form is shown

    $linkform.bind('click',function(e){
        var $link	= $(this);
        var target	= $link.attr('rel');
        $currentForm.fadeOut(400,function(){
            //remove class active from current form
            $currentForm.removeClass('active');
            //new current form
            $currentForm= $form_wrapper.children('form.'+target);
            //animate the wrapper
            $form_wrapper.stop()
                .animate({
                    width	: $currentForm.data('width') + 'px',
                    height	: $currentForm.data('height') + 'px'
                },500,function(){
                    //new form gets class active
                    $currentForm.addClass('active');
                    //show the new form
                    $currentForm.fadeIn(400);
                });
        });
        e.preventDefault();
    });

    function setWrapperWidth(){
        $form_wrapper.css({
            width	: $currentForm.data('width') + 'px',
            height	: $currentForm.data('height') + 'px'
        });
    }
  */
    /*
    for the demo we disabled the submit buttons
    if you submit the form, you need to check the
    which form was submited, and give the class active
    to the form you want to show

    $form_wrapper.find('input[type="submit"]')
        .click(function(e){
            e.preventDefault();
        });

});

*/



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

function LogIn() {
    initDatabase();
    var db = getCurrentDb();
    var tryUser=$("#log_account").val();
    var tryPass=$("#password").val();
    db.transaction(function (trans) {
        trans.executeSql("select user_name from Account where user_password=?", [tryPass], function (ts, data) {
            if (data) {
                var temp = "test";
                for (var i = 0; i < data.rows.length; i++) {
                    if (data.rows.item(i).user_name == tryUser) {
                        temp = data.rows.item(i).user_name;
                        var newUrl="MainPage.html?"+temp;
                        window.location.assign(newUrl);
                    }
                }
            }
        }, function (ts, message) {
            alert(message);
            var tst = message;
        });

    });
}


function register(){
    initDatabase();
    var GetUser = $("#s_username").val();
    var GetPass = $("#s_password").val();
    var GetRepass = $("#con_pass").val();
    var GetLast = $("#reaLastlName").val();
    var GetFirst = $("#realFirstName").val();
    var GetEmail = $("#Email").val();
    var db = getCurrentDb();

    db.transaction(function (trans) {
        trans.executeSql("select user_name from Account where user_name=?", [GetUser], function (ts, data) {
            if (data.rows.length ==0){
                document.getElementById("name_label").style.color="black";
                if (GetPass == GetRepass){
                    document.getElementById("con_label").style.color="black";
                    var newUrl="MainPage.html?"+GetUser;
                    window.location.assign(newUrl);

                    db.transaction(function (trans) {

                        trans.executeSql("insert into Account(user_name, user_password) values(?,?) ", [GetUser,GetPass], function (ts, data) {

                        }, function (ts, message) {
                            alert(message);
                        });
                    });

                    db.transaction(function (trans) {

                        trans.executeSql("insert into Info(user_name, user_last, user_first,user_email) values(?,?,?,?) ", [GetUser,GetLast,GetFirst,GetEmail], function (ts, data) {

                        }, function (ts, message) {
                            alert(message);
                        });
                    });


                }
                else{
                    document.getElementById("con_label").style.color="red";
                }

            }
            else {

                document.getElementById("name_label").style.color="red";
            }


        }, function (ts, message) {
            alert(message);
            var tst = message;
        });

    });
}