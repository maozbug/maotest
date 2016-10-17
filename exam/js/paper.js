/**
 * Created by Administrator on 2016/9/28.
 * 试卷模块
 */
angular.module("app.paper",["ng","app.subject"])
    //试卷查询控制器
    .controller("paperListController",["$scope",function ($scope) {

    }])
    //试卷添加控制器
    .controller("paperAddController",["$scope","commonService","paperModel","$routeParams","paperService","$location",function ($scope,commonService,paperModel,$routeParams,paperService,$location) {
        commonService.getAllDepartmentes(function (data) {
            //将全部方向绑定到dep上
            $scope.dep=data;
        });
        var subjectId=$routeParams.id;
        if ($routeParams.id!=0){
            paperModel.addSubjectId(subjectId);
            paperModel.Subjects(angular.copy($routeParams));
            //paperModel.model.subjectIds.push($routeParams.id);
            //paperModel.model.subject.push(angular.copy($routeParams))
        }
        //双向绑定的模板
        $scope.pmodel=paperModel.model;
        $scope.savePaper = function () {
            paperService.savePaper($scope.pmodel,function (data) {
                alert(data);
                //重置paperModel.model
                paperModel.model={
                        departmenteId:1,//方向id
                        title:"",        //试卷标题
                        desc:"",        //试卷描述
                        at:"0",         //答题时间
                        total:"",    //总分
                        scores:[],      //每个题的分值
                        subjectIds:[],   //每个题的id
                        subject:[]
                    }
                //重置后，刷新页面
                $location.path("/paperAdd/id/0/stem/0/type/0/topic/0/level/0")
            })
        }
    }])
    //试卷删除控制器
    .controller("paperDelController",["$scope",function ($scope) {

    }])
    .factory("paperModel",function () {
        return{
            model:{
                departmenteId:1,//方向id
                title:"",        //试卷标题
                desc:"",        //试卷描述
                at:"0",         //答题时间
                total:"",    //总分
                scores:[],      //每个题的分值
                subjectIds:[],   //每个题的id
                subject:[]
            },
            addSubjectId:function (id) {
                this.model.subjectIds.push(id);
            },
            Subjects:function ($routeParams) {
                this.model.subject.push($routeParams);
            }
        }
    })
    .service("paperService",["$httpParamSerializer","$http",function ($httpParamSerializer,$http) {
        return{
            savePaper:function (param,handler) {
                var obj={}
                for(var key in param){
                    var val = param[key];
                    switch (key){
                        case "departmenteId":
                            obj['paper.department.id']=val;
                            break;
                        case "title":
                            obj['paper.title']=val;
                            break;
                        case "desc":
                            obj['paper.description']=val;
                            break;
                        case "at":
                            obj['paper.answerQuestionTime']=val;
                            break;
                        case "total":
                            obj['paper.totalPoints']=val;
                            break;
                        case "scores":
                            obj['scores'] = val;
                            break;
                        case "subjectIds":
                            obj['subjectIds'] = val;
                            break;
                    }
                }
                obj = $httpParamSerializer(obj);
                $http.post("http://172.16.0.5:7777/test/exam/manager/saveExamPaper.action",obj,{
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    }
                }).success(function (data) {
                    handler(data);
                });
            }
        }
    }]);