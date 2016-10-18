/**
 * Created by Administrator on 2016/10/11.
 */
$(function () {
    function getstu(result) {
        //4.获取结果集
        var rows1 = result.rows;
        for(var key in rows1){
            var val = rows1[key];
            //console.log(key,val);
            if (val.id){
                var dd= $("<tr>" +
                    "<td>"+"<input type='checkbox' value='"+val.id+"'>"+"</td>" +
                    "<td>"+val.name+"</td> " +
                    "<td>"+val.gender+"</td> " +
                    "<td>"+val.age+"</td>" +
                    " <td>"+val.address+"</td>" +
                    "</tr>")
                $("tbody").append(dd);
            }
        }
    }
    getAllstu(function (result) {
        //console.log(result.rows);
        getstu(result);
    });
    $("#cha").off("click");
    $("#cha").click(function () {
       var txt=$("#search").val();
        search(txt,function (result) {
            $("tbody").children().remove();
            getstu(result);
            $("#one").reset;
            alert("查询成功")
        })
    })
    $("#del").off("click");
    $("#del").click(function () {
        //var id=+$("input:checked").val();
        var ips = $("td>input:checked");
        var ids = ips.map(function (index,item) {
            return +$(item).val();
        }).get();
        console.log(ids);
        delstu(ids,function () {
            alert("删除成功")
        })
    })
    $("#all").off("change")
    $("#all").change(function () {
        //console.log($("#all").prop('checked'));
        if($("#all").prop('checked')){
            $("td>input:checkbox").prop("checked","checked")
        }else {
            $("td>input:checkbox").removeAttr("checked");
        }
    })
    $("#update").off("click");
    $("#update").click(function () {
        var id=+$("input:checked").val();
        var upname=prompt("请输入要修改的项‘姓名’,'性别','年龄'或'地址'");
        var val=prompt("请输入你要改的值");
        updatestu(val,id,upname,function () {
            alert("更改成功")
        })
    })

})