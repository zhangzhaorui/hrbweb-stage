$(function(){
	new Vue({
		  el: '.modelcertify',
		  data: {
		        user: {
		            email: '',
		            pwd: '',
		            reme:false,
		            loginok:false
		        }
		  },
		  methods: {
			    login: function() {
			    		alert("fff");
			    		alert(this.$parent.name)
			    }
		  }
	});
	
	
	

});



 	      
	 	

