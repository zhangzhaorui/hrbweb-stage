//$(".g-models").append("<model m-text='666' m-title='777' m-href='forget' m-width='200'></model>");
//$.ajax({
//    type: "get",
//    async: false,
//    cache: false,
//    url: "/api/users/wangdi6@asiainfo.com",
//    success: function (msg) {
//    	$(".g-models").append("<model m-text='v5555333' m-title='3555533' m-href='forget' m-width='300'></model>");
//    }
//});

 var itemsA = [
    {
        a: 'asdasdsad',
        b: 1,
        c: 1,
        d: 1
    },
    {
        a: 'sdfsdfdsfewrw',
        b: 2,
        c: 2,
        d: 2
    },
    {
        a: 'sdfsfsdfs',
        b: 3,
        c: 3,
        d: 3
    }
];
 
var itemsB = [
    {
        a: 'sdfsdfsewrewrc',
        b: 11,
        c: 11,
        d: 11
    },
    {
        a: 'sdfsdfeewb',
        b: 22,
        c: 22,
        d: 22
    },
    {
        a: 'qwewqewwwea',
        b: 33,
        c: 33,
        d: 33
    },
];


var ttt =
{"code":0,"msg":"OK","data":[{"labelname":"全部精选","icon":"allselect"},{"labelname":"终端专题","order":100
	,"icon":"selectphone1"},{"labelname":"互联网专题","order":99,"icon":"selectphone2"},{"labelname":"征信专题","order"
	:98,"icon":"selectphone3"},{"labelname":"运营商专题","order":97,"icon":"selectphone4"},{"labelname":"位置专题"
	,"order":93,"icon":"selectphone8"},{"labelname":"北京公共专题","order":92,"icon":"selectphone9"},{"labelname"
	:"上海公共专题","order":91,"icon":"selectphone10"},{"labelname":"空气质量专题","order":88,"icon":"path1"},{"labelname"
	:"金融数据专题","order":1,"icon":"path2"},{"labelname":"房地产专题","order":1,"icon":"image_fdc"}]}

//11

new Vue({
    el: '#example',
    data: {
        gridHeader: ['目标', '日志', '日期', '状态'],
        test1:{a:"123",b:"vvvvvv"}
    }
});

new Vue({
    el: '#t'
});



var stt=new Vue({
	el: '#s1',
	data:{
		items: [],
		ttt:ttt,
		ss:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0]]
	},
	methods: {
	    insert: function (event) {
	    	var len=this.items.length;
	    	var items=0;
	    	if(len!=0){
	    		items=this.items[this.items.length-1];
	    	}   	
	    	var s=parseInt(items)+1;
	    	this.items.push([s,0]);
	    },
	    del: function (event) {
	    	this.items.splice(event.target.getAttribute("mark"),1);
		},
		update: function (event) {
			
			var num=this.ss[event.target.getAttribute("mark")][1];
			if(num==0){
				this.ss[event.target.getAttribute("mark")].$set(1,1)
			}else{
				this.ss[event.target.getAttribute("mark")].$set(1,0)
			}
			
			
//			var num=this.items[event.target.getAttribute("mark")][1];
//			if(num==0){
//				this.items[event.target.getAttribute("mark")].$set(1,1)
//			}else{
//				this.items[event.target.getAttribute("mark")].$set(1,0)
//			}
	    	
		},
	    haha: function (event) {
		     alert(event);
		}
	  }
});


//new Vue({
//  el: '#app',
//  data: {
//    message: 'Hello Vue.js!'
//  }
//})

var firstChild = Vue.extend({
	template: '<p>Child-A: I will send this massage to my parent: </p><input type="text" v-model="inputter"/><br/><br/>',
	data: function(){
			return {
				inputter:""
			}
	},
	watch: {
		'inputter': function(){
			this.$dispatch('inputter-msg',this.inputter)
		}
	}
})

var secondChild = Vue.extend({
	template: '<p>{{ say }}{{ childmsg }}</p>',
	props: ['childmsg'],
	data: function(){
		return { say: 'Child-B: The data came from my parent is: '}
	},
	
})

var parent = Vue.extend({
	template: '<div><first-child></first-child><second-child :childmsg="parentMsg"></second-child></div>',
	data: function(){
		return {
			recievedMsg: "hello",
			parentMsg: ""
		}
	},
	components: {
		'first-child': firstChild,
		'second-child': secondChild
	},
	events: {
		'inputter-msg': function(inputter){
			this.parentMsg = inputter;
		}
	}
})


Vue.component('the-parent',parent)

new Vue({
	el: "#demo",
//	data: {
//		parentMsg: ""
//	},
//	components:{
//		'first-child': firstChild,
//		'second-child': secondChild
//	},
//	events: {
//		'inputter-msg': function(inputter){
//			this.parentMsg = inputter;
//		}
//	}
})


$.ajax({
    type: "get",
    async: false,
    cache: false,
    url: "/api/selects",
    success: function (msg) {
    	alert(msg)
    }
});





