
/**
 * Created by Administrator on 2016/9/22.
 * 首页核心js文件
 */
$(function () {
    //左侧导航动态效果
    $(".baseUI>li>a").off("click");
    $(".baseUI>li>a").on("click",function () {
        $(".baseUI>li>ul").slideUp();
        $(this).next().slideDown(300);
    });
    $(".baseUI>li>ul").slideUp();  //默认收起
    $(".baseUI>li>a").eq(0).trigger("click");//默认点击显示第一个

    $(".baseUI>li>ul>li").off();
    $(".baseUI>li>ul>li").on("click",function () {
        if(!$(this).hasClass("current")){
            $(".baseUI>li>ul>li").removeClass("current");
            $(this).addClass("current");
        }
    });
    //模拟点击
    $(".baseUI>li>ul>li>a").eq(0).trigger("click");
    //$(".baseUI>li>ul").eq(0).slideDown();
    //$(".baseUI>li>ul>li").eq(0).trigger("click");

})

//核心模块
angular.module("app",["ng","ngRoute","app.subject","app.paper"])
    .controller("mainCtrl",["$scope",function ($scope) {

    }]).config(["$routeProvider",function ($routeProvider) {
        $routeProvider.when("/AllSubject/a/:a/b/:b/c/:c/d/:d", {
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectController"
        }).when("/SubjectManger",{
            templateUrl:"tpl/subject/subjectManger.html",
            controller:"subjectController"
        }).when("/SubjectAdd",{
            templateUrl:"tpl/subject/subjectAdd.html",
            controller:"subjectController"
        }).when("/subjectDel/id/:id",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectDelController"
        }).when("/checkSubject/id/:id/checkState/:checkState",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"checkSubjectController"
        }).when("/paperAdd/id/:id/stem/:stem/type/:type/topic/:topic/level/:level",{
            templateUrl:"tpl/paper/paperAdd.html",
            controller:"paperAddController"
        }).when("/paperList",{
            templateUrl:"tpl/paper/paperManager.html",
            controller:"paperListController"
        }).when("/paperSubjectList",{
            templateUrl:"tpl/paper/subjectList.html",
            controller:"subjectController"
        });
}])