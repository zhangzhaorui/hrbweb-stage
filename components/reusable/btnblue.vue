<style>
	.btnblue{
	    height:100%;
	    width:100%;
	    padding:2px 16px;
	    background-color:#29abe2 !important;
	    border-color:#29abe2 !important;
	    margin:10px auto;
	    border:0;
	    color:white;
	    border-radius:8px;
	    background-color: #e3e3e3;
	    color: #fff;
	    font-size: 18px;
	    font-weight: 700;
	    height: 40px;
	    line-height: 40px;
	    text-align: center;
	}
	.btnblue:hover{
	    background-color:#1998ce !important;
	}
</style>


<template>
	<button class="btnblue">{{btntext}}</button>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        props: {
		    btntext:String
		},
		  methods: {
		  	subupload: function(e){
		  	}
		  }
    }
</script>




