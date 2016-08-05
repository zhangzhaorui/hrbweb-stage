
		var testEditor=null;
		
		var repname=rep;
		var itemname=item;

		headerToken={Authorization:"Token "+$.cookie("token")};
		$.ajax({
			url: "/api/repositories/"+repname+"/"+itemname,
			type: "get",
			cache:false,
		   	async:false,
		   	headers:headerToken,
			dataType:'json',
			success:function(json){
				if(type=="meta"){
					$("#tt").text(json.data.Meta);
				}
				if(type=="sample"){
					$("#tt").text(json.data.Sample);
				}
				
				testEditor = editormd("editormd", {
			        width           : "90%",
			        autoHeight      : false,
			        height          : "500",
			        path            : "/plugin/mark/",
			        htmlDecode      : "style,script,iframe", 
			        saveHTMLToTextarea : true,
			        toolbarIcons : function() {
			            // Or return editormd.toolbarModes[name]; // full, simple, mini
			            // Using "||" set icons align right.
			            return ["undo", "redo", "|", "code", "bold", "hr", "del","quote","ucwords","uppercase","lowercase","|","h1","h2","h3","h4","h5","h6","|","list-ul","list-ol","|","preview", "watch", "|", "fullscreen", "testIcon", "testIcon2", "file", "faicon", "||", "watch", "fullscreen", "preview", "testIcon"]
			        }
			    }); 
				
			}
		}); 
		
	    $("#sub").click(function(){
		    var datas="";
	    	if(type=="meta"){
	    		datas=JSON.stringify({"meta":testEditor.getMarkdown()})
			}
			if(type=="sample"){
				datas=JSON.stringify({"sample":testEditor.getMarkdown()})
			}
			$.ajax({
				url: "/api/repositories/"+repname+"/"+itemname,
	    		type: "put",
	    		cache:false,
	    	   	async:false,
	    	   	data:datas,
	    	   	headers:{Authorization:"Token "+$.cookie("token")},
	    		dataType:'json',
	    		success:function(json){  
	    			$('#alerts').modal('toggle');  	
					window.location.href="/my/itemDetails/"+repname+"/"+itemname;
	    		}
	    	}); 
	    
	    	
	    });
	    
	    $('#alerts').on('hidden.bs.modal', function (e) {
	    	location.href=window.location.href;
	    });

