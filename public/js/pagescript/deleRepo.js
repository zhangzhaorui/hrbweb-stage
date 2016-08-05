/**
 * Created by Administrator on 2016/3/18.
 */
$(function(){
    $(document).on('click','.isdelerepo',function (e) {
        if ( $("#delerepoalert").length <= 0 ){
            var delBox = '<div class="modal fade" id="delerepoalert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"  modal-repoName="">'+
                '<div class="modal-dialog">'+
                '<div class="modal-content" style="padding:18px 30px;width:300px;float: left;">'+
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
                '<div class="delerepotitle">删除Repository</div>'+
                '<div class="delerepoalertcon"></div>'+
                '</div>'+
                '</div>'+
                '</div>';
            $('body').append(delBox);
        }

        var thisreponame = $(this).attr('datareponame');
        $('#delerepoalert').find('.delerepoalertcon').empty();
        var str = '';
        $.ajax({
            url: "/api/repositories/"+thisreponame,
            type:"get",
            cache:false,
            data:{},
            async:false,
            dataType:'json',
            headers:{ Authorization:"Token "+$.cookie("token") },
            success:function(json){
                if(json.data.items > 0){
                    str = '<div class="delerepocomment">无法删除，请先通过Client端删除'+thisreponame+'内的DataItem</div>'+
                        '<div class="delerepobtnwrop"><span class="nodelrepo nocantdele">我知道了</span></div>'
                }else{
                    str = '<div class="delerepocomment">删除'+thisreponame+'后不可恢复，请确认删除</div>'+
                        '<div class="delerepobtnwrop"><span class="nodelrepo yesdelerepo" datareponame="'+thisreponame+'">确认</span><span class="nodelrepo nodelerepo">取消</span></div>'

                }
                $('#delerepoalert').find('.delerepoalertcon').append(str);
                $('#delerepoalert').modal('toggle');
            }
        });
    })
    $(document).on('click','.yesdelerepo',function(){
        var thisreponame = $(this).attr('datareponame');
        $.ajax({
            url: "/api/repositories/"+thisreponame,
            type:"DELETE",
            cache:false,
            data:{},
            async:false,
            dataType:'json',
            headers:{ Authorization:"Token "+$.cookie("token") },
            success:function(json){
                $('#delerepoalert').modal('toggle');
                location.reload();
            }
        });
    })
    $(document).on('click','.nodelerepo',function(){
        $('#delerepoalert').modal('toggle');
    });
    $(document).on('click','.nocantdele',function(){
        $('#delerepoalert').modal('toggle');
    })
})