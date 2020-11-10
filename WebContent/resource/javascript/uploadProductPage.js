$(function(){
	var uploadFiles=[];
	var $drop=$('#drop');
	
	$drop.on("dragenter",function(e){
		$(this).addClass('drag-over');
	}).on("dragleave",function(e){
		$(this).removeClass('drag-over');
	}).on("dragover",function(e){
		e.stopPropagation();
		e.preventDefault();
	}).on("drop",function(e){
		e.preventDefault();
   		$("input[type='file']")
        .prop("files", e.originalEvent.dataTransfer.files)  // put files into element
        .closest("form")
        .submit();  // autosubmit as well
		$(this).removeClass('drag-over');
		var files= e.originalEvent.dataTransfer.files;
		console.log(files);
		thumbnail(files)
		
	});
	
	function thumbnail(files){
		for(var i=0; i<files.length; i++){
			var file = files[i];
			var size = uploadFiles.push(file);
			preview(file,size-1);
		}
		console.log(size);
		console.log(uploadFiles);
		
	}
	
	function preview(file,idx){
		var reader = new FileReader();
		reader.onload =(function(f,idx){
				return function(e){
					console.log(f);
					var div = '<div class="thumb col-md-5 px-auto mx-auto">\
						<div class="close" data-idx="'+idx+'">x</div>\
						<img class="col-md-12 px-0 mx-0" src="'+e.target.result+'"title="'+escape(f.name)+'"/>\
						</div>';
						$('#thumbnails').append(div);
				};
		})(file,idx);
		reader.readAsDataURL(file);
	}
	$('#thumbnails').on("click",".close",function(e){
		var $target = $(e.target);
		var idx=$target.attr('data-idx');
		uploadFiles[idx].upload='disable';
		$target.parent().remove();
		
	})
	
	
	$('#file_add').click(function() {
	    console.log('fileadd');
	    $("#fileProfile").click();
	   
	});
	
	 //업로드 파일체인지가 됬을경우 실행되는 이벤트  form태그에 fileProfile은 opacity:0으로 넣어줌
	var input = document.querySelector('input[name="fileProfile"]');
    input.addEventListener('change',(function(e){
    	
    	var fileList = input.files;
    	
        console.log($("#fileProfile").val());
		
    	thumbnail(fileList);
    	
        $("#fileProfile").val();
        var frm = document.getElementById('upload');
        var fileData = new FormData(frm);
        console.log(fileData);
        fileList.push(filData);
    	console.log(typeof(fileList));
       
	
	}))
})