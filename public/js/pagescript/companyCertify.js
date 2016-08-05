/**
 * Created by Max cheng on 2016/5/3.
 */

var headerToken={};
if($.cookie("token")!=null&&$.cookie("token")!="null"){
    headerToken={Authorization:"Token "+$.cookie("token")};
}

new Vue({
    el:'.companyCertify',
    data:{
        currentView:'view1',
        name:"vvv"//企业名称
    },
    methods:{
        liEvent:function(e){
            $(e.target).addClass('selected').siblings().removeClass('selected');
            var className=e.target.className.split(' ')[0];
            switch(className){
                case 'li_one':
                    this.currentView='view1';
                    break;
                case 'li_two':
                    this.currentView='view2';
                    break;
                case 'li_three':
                    this.currentView='view3';
                    break;
                case 'li_four':
                    this.currentView='view4';
                    break;
                case 'li_five':
                    this.currentView='view5';
                    break;
            }
        }
    },
    components: {
        view1: {
            template: '#view1',
            data:function(){
                return {
                        companyName:'',//公司名称
                        companyAddress:'',//公司地址
                        kbisNum:'',//营业执照编号
                        org:''//组织代码
                };
            },
            methods:{
                comName:function(e){
                    this.companyName=e.target.value;
                },
                comAddress:function(e){
                    this.companyAddress=e.target.value;
                },
                regNumber:function(e){
                	this.$parent.name=e.target.value;
                    this.kbisNum=e.target.value;
                },
                orgCode:function(e){
                    this.org=e.target.value;
                },
                comCardFilename:function(){
                },
                view1Event:function(){
                    console.log(this.data);
                    $.ajax({
                        url: "/api/certification/upload",
                        type: "post",
                        cache: false,
                        async: false,
                        dataType: 'json',
                        contentType:'application/json',
                        success: function (json) {
                        },
                        error: function () {
                        }
                    });
                }
            }
        },
        view2: {
            template: '#view2',
            methods:{

            }
        },
        view3: {
            template: '#view3',
            methods:{
            }
        },
        view4: {
            template: '#view4',
            methods:{

            }
        },
        view5: {
            template: '#view5',
            methods:{
            	test:function(e){
                    alert( this.$parent.name)
                }
            }
        }
    }
})