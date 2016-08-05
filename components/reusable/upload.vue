<style>
.input-group-btn {
    color: #333;
    font-size: 12px;
}
</style>

<template>		
		<span class="input-group-btn"> 
			<input type="text" class="form-control" type="text" style="width: 500px" placeholder="" readonly disabled>
			<button style="width:100px" class="btn btn-default" @click="subupload" id="test" type="submit">文件上传</button> 		
    		<input type="file" style="display:none" accept="{{ accept }}" v-on:click="fileInputClick" v-on:change="fileInputChange" multiple="{{ multiple }}">
    		<slot></slot>		
		</span>	
		
		{{statusmsg}}
			
		<p style="display: inline-block;position: absolute;right: 0px;top: -25px;width: auto;" v-if="statusmsg">
			<span style="float: right;color:#ea0c1d;font-size: 13px;font-weight: bold">
				<img src="/img/images02_127.png" style="float: left;margin: 4px 5px;width: 12px;" />
				{{detmsg}}
			</span>			
		</p>
    	<p style="display: inline-block;position: absolute;right: -20px;top: 45px;width: 100px;" v-if="status"><strong v-text="msg"></strong></p>
</template>

<script>
    export default {
        data () {
            return {
                msg: '',
                myFiles: [],
                status:false,
                statusmsg:false
            }
        },
        props: {
		    class: String,
		    action: {
		      type: String,
		      required: true
		    },
		    accept: String,
		    multiple: String,
		    headers: Object,
		    params: {
		      type: String,
		      default: 'pic'
		    },
		    picid:String,
		    detmsg:String
		},
		  methods: {
		  	subupload: function(e){
		  		var s=e.target;
				var obox=s.parentNode;
				var lis=obox.children;
				lis[2].click();
		  	},
		  	onchangeer: function(){
		  		
		  	},
		    fileInputClick: function() {
		      // click actually triggers after the file dialog opens
		      //this.$dispatch('onFileClick', this.myFiles);
		    },
		    fileInputChange: function(e) {
		    	var s=e.target;
				var obox=s.parentNode;
				var lis=obox.children;

				var filename=lis[2].value;
			
				var mime = filename.toLowerCase().substr(filename.lastIndexOf("."));  

				if(mime!=".jpg" && mime!=".png")
				{
					lis[0].value=null;
			      	this.myFiles = lis[2].files; 
					this.msg="正在上传中......";
			      	this.fileUpload();
			      	this.status=true;
				}else{
					lis[0].value=lis[2].value;
			      	this.myFiles = lis[2].files;     
			      	this.msg="正在上传中......";
			      	this.fileUpload();
			      	this.status=true;
				}
		    },
		    _handleUpload: function(file) {
				//判断类型
		        var mime = file.name.toLowerCase().substr(file.name.lastIndexOf("."));
				if(mime!=".jpg" && mime!=".png")
				{
					this.statusmsg=true;
				}else {
					//判断大小1MB
					var nine = file.size;
					if (nine > 1048576) {
						this.statusmsg = true;
					} else {

						this.statusmsg = false;
						var form = new FormData();
						var xhr = new XMLHttpRequest();
						try {
							form.append('Content-Type', file.type || 'application/octet-stream');
							form.append(this.params, file);
						} catch (err) {
							return;
						}

						return new Promise(function (resolve, reject) {

							xhr.upload.addEventListener('progress', this._onProgress, false);

							xhr.onreadystatechange = function () {
								if (xhr.readyState < 4) {
									return;
								}
								if (xhr.status < 400) {
									var res = JSON.parse(xhr.responseText);
									this.picid = res.picId;
									resolve(file);
								} else {
									this.msg = "上传失败，请重试。";
									var err = "";
									reject(err);
								}
							}.bind(this);

							xhr.onerror = function () {
								var err = JSON.parse(xhr.responseText);
								err.status = xhr.status;
								err.statusText = xhr.statusText;
								reject(err);
							}.bind(this);

							xhr.open('POST', this.action, true);
							if (this.headers) {
								for (var header in this.headers) {
									xhr.setRequestHeader(header, this.headers[header]);
								}
							}
							xhr.send(form);
						}.bind(this));
					}

				}
		    },
		    fileUpload: function() {
		      if(this.myFiles.length > 0) {
		        // a hack to push all the Promises into a new array
		        var arrayOfPromises = Array.prototype.slice.call(this.myFiles, 0).map(function(file) {
		          return this._handleUpload(file);
		        }.bind(this));
		        // wait for everything to finish
		        Promise.all(arrayOfPromises).then(function(allFiles) {

		        	if(allFiles[0]=="undefined" || allFiles[0]==null || allFiles[0]==undefined){
		        		this.msg="上传失败!";
		        	}else{
		        		this.msg="上传完成!";
		        	}
	        
		        }.bind(this)).catch(function(err) {
		       //   this.$dispatch('onFileError', this.myFiles, err);
		        }.bind(this));
		      } else {
		        // someone tried to upload without adding files
		        var err = new Error("No files to upload for this field");
		      }
		    }
		  }
    }
</script>




