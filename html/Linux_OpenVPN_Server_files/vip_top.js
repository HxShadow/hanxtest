var show_vip = function(){
	var timer;
	function delayShow(obj){
	clearTimeout(timer);
	jQuery('#vip_mes_top').show();
	}
	function delayHide(obj,self){
		timer = setTimeout(function(){jQuery('#vip_mes_top').hide();}, 1000);
	};

	jQuery('#login_status .jsVipDrop').live('mouseover',function(){
			delayShow(jQuery(this));
		}
	).live('mouseout', function(){
			delayHide(jQuery(this));
		});
}
show_vip();