/**
 * Created by Administrator on 2016/10/11.
 */
$(function () {
    $("#addform").off("submit");
    $("#addform").submit(function () {
        var id=$(this).find("[name='id']").val();
        var name=$(this).find("[name='name']").val();
        var gender=$(this).find("[name='gender']").val();
        var age=$(this).find("[name='age']").val();
        var address=$(this).find("[name='address']").val();
        var student=new Student(id,name,gender,age,address);
        //alert($(this).find("[name='age']").val());
        save(student,function () {
            alert("添加学生成功！！！");
            location.reload();
        })
    })
})