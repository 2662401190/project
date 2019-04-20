
layui.config({
    base: 'js/module/'
}).extend({
    treetable: 'treetable-lay/treetable'
}).use(['layer', 'table', 'treetable'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer;
    var treetable = layui.treetable;

    $.ajax({
        type:'post',
        url:'my-menu/list',
        typeData:'json',
        success:function (result) {
            console.log(result);
            // 渲染表格
            treetable.render({
                treeColIndex: 2,          // treetable新增参数
                treeSpid: 0,             // treetable新增参数
                treeIdName: 'menuId',       // treetable新增参数
                treePidName: 'parentId',     // treetable新增参数
                treeDefaultClose: true,   // treetable新增参数
                treeLinkage: true,        // treetable新增参数
                elem: '#Mydemo',
                data:result,
                page:false,
                cols: [[
                    {type: 'numbers'}
                    ,{field: 'menuId', title: '编号'}
                    ,{field: 'menuName', title: '名称'}
                    ,{field: 'icon', title: '图标'}
                    ,{field: 'type', title: '类型', minWidth: 160}
                    ,{field: 'url', title: '地址', width: 80}
                    ,{field: 'perms', title: '权限标识', width: 100}
                    ,{field: 'createTime', title: '创建时间', width: 80, sort: true}
                    ,{fixed: 'right',title:'操作', width:178, align:'center', toolbar: '#barDemo'}
                ]]
            });
            //监听工具条
            table.on('tool(demo)', function(obj){
                var data = obj.data;
                if(obj.event === 'detail'){
                    layer.msg('ID：'+ data.id + ' 的查看操作');
                } else if(obj.event === 'del'){
                    layer.confirm('真的删除行么', function(index){
                        obj.del();
                        layer.close(index);
                    });
                } else if(obj.event === 'edit'){
                     // layer.alert('编辑行：<br>'+ JSON.stringify(data.menuName))
                    var ind =layer.open({
                        type: 1,
                        title:'修改',
                        skin: 'layui-layer-rim', //加上边框
                        area: ['780px', '555px'], //宽高
                        content:$("#my-menu-add")

                    });
                    $("#my-menu-add").click(function (event) {
                        var obj = event.srcElement || event.target;
                        if (!$(obj).is("input[name='icon']")) {
                            $icon_drop.hide();
                        }
                    });
                    //  赋值
                    $("#my-menu-name").val(data.menuName);
                    $(".my-menu-type").val(data.type);
                    $("#menu-url").val(data.url);
                    $("#menu-perms").val(data.perms);
                    $("#icon").val(data.icon);
                    var $menuTree = $('#menuTree');
                    $menuTree.jstree('select_node', data.parentId, true);
                    $menuTree.jstree('disable_node', data.menuId);

                    $("#my-menu-add .btn-close").click(function () {

                        layer.close(ind);
                    });
                }
            });
        }
    });

});




//
//
//
// layui.use('table', function(){
//     var table = layui.table;
//     //展示已知数据
//
//
//     $.ajax({
//         type:'post',
//         url:'my-menu/list',
//         typeData:'json',
//         success:function (result) {
//             alert(result);
//             table.render({
//                 elem: '#Mydemo'
//                 ,cols: [[ //标题栏
//                     {field: 'menuId', title: '编号', width: 80, sort: true}
//                     ,{field: 'menuName', title: '名称', width: 120}
//                     ,{field: 'icon', title: '图标', minWidth: 150}
//                     ,{field: 'type', title: '类型', minWidth: 160}
//                     ,{field: 'url', title: '地址', width: 80}
//                     ,{field: 'perms', title: '权限标识', width: 100}
//                     ,{field: 'createTime', title: '创建时间', width: 80, sort: true}
//                     ,{fixed: 'right', width:178, align:'center', toolbar: '#barDemo'}
//                 ]]
//                 ,data:result
//
//                 //,skin: 'line' //表格风格
//                 ,even: true
//                 //,page: true //是否显示分页
//                 //,limits: [5, 7, 10]
//                 //,limit: 5 //每页默认显示的数量
//             });
//         }
//
//     });
//
//
//     //监听工具条
//     table.on('tool(demo)', function(obj){
//         var data = obj.data;
//         if(obj.event === 'detail'){
//             layer.msg('ID：'+ data.id + ' 的查看操作');
//         } else if(obj.event === 'del'){
//             layer.confirm('真的删除行么', function(index){
//                 obj.del();
//                 layer.close(index);
//             });
//         } else if(obj.event === 'edit'){
//          //   layer.alert('编辑行：<br>'+ JSON.stringify(data.username))
//             //页面层
//             layer.open({
//                 type: 1,
//                 title:'修改',
//                 skin: 'layui-layer-rim', //加上边框
//                 area: ['500px', '420px'], //宽高
//                 content:$("#my-menu-add")
//             });
//             $("#my-name").val(data.username);
//             $("#my-email").val(data.email);
//             $("#my-signature").val(data.sign);
//             $(".my-sex").val(data.sex);
//         }
//     });
//
// });
//
//
