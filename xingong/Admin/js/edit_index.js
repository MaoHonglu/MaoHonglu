// JavaScript Document

$(document).ready(function(){
	$('#select_btn li:first').css('border','none');
	if ($('#zSlider').length) {
		zSlider();
		$('#h_sns').find('img').hover(function(){
			$(this).fadeTo(200,0.5);
		}, function(){
			$(this).fadeTo(100,1);
		});
	}
	function zSlider(ID, delay){
		var ID=ID?ID:'#zSlider';
		var delay=delay?delay:5000;
		var currentEQ=0, picnum=$('#picshow_img li').size(), autoScrollFUN;
		$('#select_btn span').eq(currentEQ).addClass('current');
		$('#select_btn span').eq(currentEQ).removeClass('filter30');
		$('#picshow_img li').eq(currentEQ).show();
		$('#picshow_tx li').eq(currentEQ).show();
		autoScrollFUN=setTimeout(autoScroll, delay);

		$('#select_btn span').hover(function(){
			var picEQ=$('#select_btn span').index($(this));
			if (picEQ==currentEQ) return false;
			currentEQ = picEQ;
			$('#select_btn span').removeClass('current');
			$('#select_btn span').addClass('filter30');
			$('#picshow_img li').hide();
			$('#picshow_tx li').hide().eq(currentEQ).slideDown(100);
			$('#select_btn span').eq(currentEQ).addClass('current');
			$('#select_btn span').eq(currentEQ).removeClass('filter30');
			$('#picshow_img li').eq(currentEQ).show();
			return false;
		});
	};
})


auto=null;
timer=null;
var focus=new Function();
focus.prototype={
	init:function(){

		this.aTime=this.aTime || 10;

		this.sTime=this.sTime || 2000;

		this.oImg=document.getElementById('focus_m').getElementsByTagName("ul")[0];
		this.oImgLi=this.oImg.getElementsByTagName("li");

		this.oL=document.getElementById('focus_l');
		this.oR=document.getElementById('focus_r');

		this.createTextDom();

		this.target=0;

		this.autoMove();

		this.oAction();
	},
	createTextDom:function(){
		var that=this;

		this.oText=document.createElement("div");
		this.oText.className="focus_s";
		var ul=document.createElement('ul');
		var frag=document.createDocumentFragment();
		for (var i=0;i<this.oImgLi.length;i++) {
			var li=document.createElement("li");
			li.innerHTML='<b></b>';
			if (i==0) {
				li.className="active";
			};
			frag.appendChild(li);
		};
		ul.appendChild(frag);
		this.oText.appendChild(ul);
		this.o.insertBefore(this.oText,this.o.firstChild);

		this.oTextLi=this.oText.getElementsByTagName("li");		
	},
	autoMove:function(){
		var that = this;   
		auto=setInterval(function(){that.goNext()},that.sTime);
	},
	goNext:function() {
		this.target=this.nowIndex();
		this.target==this.oTextLi.length-1 ? this.target=0:this.target++;
		this.aStep=(this.target-this.nowIndex())*this.step;
		this.removeClassName();
		this.oTextLi[this.target].className="active";
		this.startMove();
	},
	goPrev:function() {
		this.target=this.nowIndex();
		this.target==0 ? this.target=this.oTextLi.length-1 : this.target--;
		this.aStep=(this.target-this.nowIndex())*this.step;
		this.removeClassName();
		this.oTextLi[this.target].className="active";
		this.startMove();
	},
	startMove:function (){
		var that=this;
		var t=0;
		this.timer='';
		function set(){
			if (t>100) {
				clearInterval(that.timer);
			}else {
				for (var i=0;i<that.oImgLi.length;i++) {
					that.oImgLi[i].style.display='none';
				};
				that.oImgLi[that.target].style.display='block';
				that.setOpacity(that.oImg,t);
				t+=5;
			};
		};
		timer=setInterval(set,that.aTime);
	},
	setOpacity:function(elem,level){
		if(elem.filters){
			elem.style.filter = 'alpha(opacity=' + level + ')';
			elem.style.zoom = 1;
		} else {
			elem.style.opacity = level / 100;
		};
	},
	nowIndex:function(){
		for (var i=0;i<this.oTextLi.length;i++) {
			if (this.oTextLi[i].className=='active') {
				return i;
				break;
			}
		};
	},
	oAction:function(){
		var that=this;
		for (var i=0;i<this.oTextLi.length;i++) {
			this.oTextLi[i].index=i;
			this.oTextLi[i].onclick=function(){
				clearInterval(auto);
				clearInterval(timer);
				that.setOpacity(that.oImg,100);
				that.target=this.index;
				that.removeClassName();
				this.className='active';
				that.startMove();
			}
		};
		mouseEnter (that.o,'mouseleave',function(e){
				clearInterval(auto);
				that.autoMove();
			}
		);
		this.oL.onclick=function(){
			that.goPrev();
		};
		this.oR.onclick=function(){
			that.goNext();
		};
	},

};
var focusRun=new focus();
focusRun.o=document.getElementById("focus");
function mouseEnter(ele,type,func){
	if(window.document.all)	
		ele.attachEvent('on'+type,func);
	else{//ff
		if(type==='mouseenter')
			ele.addEventListener('mouseover',this.withoutChildFunction(func),false);
		else if(type==='mouseleave')
			ele.addEventListener('mouseout',this.withoutChildFunction(func),false);
		else
			ele.addEventListener(type,func,false);
	};
};
function withoutChildFunction(func){
	return function(e){
		var parent=e.relatedTarget;
		while(parent!=this&&parent){
			try{
				parent=parent.parentNode;}
			catch(e){
				break;
			}
		}
		if(parent!=this)
		func(e);
	};
};
function editArticle(link,type) {
	window.open(link+"?type="+type);
}
function upload(num,type) {
    var upBox = $('#upBox_'+type);
    upBox.css('display', 'block');
    $('#upnum_'+type).val(num);
}
function closeBox(type) {
    $('#upBox_'+type).css('display', 'none');
}
function upFile(type) {
    $('#upfile_'+type).click();
}
function addFiles(id) {
	var p = $('#add_fl');
	var file = $(id).prop('files');
	for (var i = file.length - 1; i >= 0; i--) {
		p.prepend("<p>"+file[i].name+"<p>");
	}
	var length = p.children().length/2;
    if (length > 20) {
        alert("鏈€澶у彧鍙笂浼�20涓枃浠讹紝璇烽噸鏂颁笂浼�");
        location.reload();
    }
    $('#num_fl').text(length);
}

window.onload=function(){
	window.base_content = $('#file').html();
	focusRun.init();
};
function winopen(){
	window.open('add_file.html', '_blank', 'height=600, width=1000, top=20, left=180, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
	}