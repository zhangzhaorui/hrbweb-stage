/**
 * Created by wd on 16/4/5.
 */
//var App = require('../../components/a.vue');
//
////import App from '../../components/a.vue'
//
//new Vue({
//    el: '#tt1',
//    components: {
//        app: App
//    }
//})


$(document).ready(function(){


	
	$("#tt").click(function(){
		daovoice('openNewMessage', '我是打开时默认带上的内容');

		$(".daodream-powered-by").children().find("span").remove();
	});
	
	
});