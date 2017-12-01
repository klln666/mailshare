$(function(){
    // 添加房间按钮
    var $addRoom = $('#addRoom'),
        // 编辑按钮
        $editRoom = $('#editRoom'),
        // 添加图片按钮
        $addBtn = $('#addBtn'),
        $delect = $('.del'),
        $roomName = $('.roomName'),
        $container = $('.container'),
        $floatAlert = $('#floatCover'),
        $yes = $('#yes'),
        $no = $('#cancel');
    var base64Img = window.ImageCompresser;
    $addRoom.on('click',function(){
        $addBtn.show();
        var $delete = $('.del');
        $delete.length ? $delete.hide(): '';

    });
    $editRoom.on('click',function(){
        var $delete = $('.del');
        if($delete.length){
            $delete.show();
            $addBtn.hide();
        }
    });
    $roomName.on('focus',function(){
        $(this).css('color','#000');
    }).on('blur',function(){
        $(this).css('color','#6b6b6b');
    });
    var index;
    // 点击图片上方的删除按钮
    $container.on('click','.del',function(){
        index = $(this).parents('dl').index();
        $floatAlert.show();
    });
    // 点击删除图片的确定按钮
    $yes.on('click',function(){
        $container.find('dl').eq(index).remove();
        $floatAlert.hide();
    });
    // 点击取消
    $no.on('click',function(){
        $floatAlert.hide();
    });
    // 获取图片的url
    function getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }
    function creatImgHtml(url){
       var html = $('<dl class="imgItem">\n' +
            '        <dd>\n' +
            '          <img src="'+ url +'">\n' +
            '          <a class="del" href="javascript:void(0)"></a>\n' +
            '        </dd>\n' +
            '        <dt>\n' +
            '          <input autofocus="autofocus" class="roomName" type="text" value="" />\n' +
            '        </dt>\n' +
            '      </dl>');
       $addBtn.before(html);
       $addBtn.prev().find('input').focus();
    }
    $addBtn.on('click',function(){
    });
    // 将图片进行base64编码，生成图片的html放入页面中
    $addBtn.find('input').on('change',function(){
        creatImgHtml(getObjectURL($(this)[0].files[0]));
        var img = new Image;
        img.addEventListener('load',function(){
            try{
                var base64Data = base64Img.getImageBase64(this,{});
            }catch(err){
                return;
            }

        },false);
        img.src = getObjectURL($(this)[0].files[0]);
    });
    $.ajax({
        url:'/getImgInfo/create',
        type:'post',
        data:{
            imgs:'1',
            imgsName:'2',
            sizes:'3'
        },
        success:function(data){
            console.log(data);
        }
    })
});
