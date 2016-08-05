/**
 * Created by Max cheng on 2016/3/2.
 */
var navSelect={
    getNav:function(){
        var obj=new Array();
        var labArr =[];
        var imgPathArr =[];
        $.ajax({
            url: "/api/select_labels",
            type: "get",
            cache:false,
            async:false,
            dataType:'json',
            success:function(json){
                var labels_length=json.data.length;
                obj=json.data;
                console.log(json);
            }
        });
        return obj;
    },
    changeBg:function(){
        //new code
    }
};
Vue.filter('iconPath',function(val){
    val='img/selects_new/'+val;
    return val;
});
var obj=navSelect.getNav();
var selVm=new Vue({
    el:".m-navselect",
    data:{
        obj:obj
        //hoverStates:[]
    },
    methods:{
   /*     start:function(){
            for(var i=0;i<=12;i++){
                this.hoverStates.push([i,0]);
            }
        },
        li_enter:function(e){
            var index=e.target.className.split(' ')[0];
            this.hoverStates[index].$set(index,0);
        },
        li_leave:function(e){

            var index=e.target.className.split(' ')[0];
            this.hoverStates[index].$set(index,1);
        },
        li_click:function(e){
            var index=e.target.className.split(' ')[0];
            this.hoverStates[index].$set(index,1);
        }
   */
    }
});
//selVm.start();

