var placement={roomwidth:5,roomlength:10,machines:[{name:'stanok1',width:2.5,length:1.2,x:0,y:0},{name:'stanok2',width:2.5,length:1.2,x:0,y:0}]};

var scale=50;

function placementStart() {
	$(document.getElementById('room')).css({width:placement.roomlength*scale+'px',height:placement.roomwidth*scale+'px'});
	document.getElementById('room').innerHTML='<div>111</div><div>222</div><div id="worklayer"></div>';
}


document.getElementById('malist').innerHTML='<table>'+placement.machines.reduce(function(all,machine,ma){return(all+'<tr><td>'+machine.name+'</td><td class="machinex">'+machine.x+'</td><td class="machiney">'+machine.y+'</td><td><input type="button" value="Разместить станок" onclick="startMachine('+ma+')" /></td><td><input type="button" value="Повернуть" onclick="rotateMachine('+ma+');startMachine('+ma+')" /></td></tr>')},'')+'</table>';

function startMachine(ma) {
	document.getElementById('worklayer').innerHTML='<div name="'+ma+'" class="placer" style="height: '+(placement.machines[ma].width*scale)+'px; width: '+(placement.machines[ma].length*scale)+'px;">'+placement.machines[ma].name+'</div>';
	$('.placer').on('mousedown',moveMachine);
}
function rotateMachine(ma) {
	var ma=placement.machines[ma], temp=ma.width;
	ma.width=ma.length;
	ma.length=temp;
}
function moveMachine(e) {
	var worklayer=document.getElementById('worklayer');
	$(worklayer).on('mousemove',move);
	function move(e) {
		var currentleft=0, currenttop=0;
		$('body').on('mouseup',stopmove);
		$(worklayer).on('mouseleave',stopmove);
		function stopmove() {
			$(worklayer).off('mousemove');
			var ma=($('.placer')[0].attributes.name.value);
			document.getElementsByClassName('machinex')[ma].innerHTML=currentleft/scale;
			document.getElementsByClassName('machiney')[ma].innerHTML=currenttop/scale;
			
		}
		currenttop=(e.clientY-$('.placer')[0].offsetHeight-100<0)?0:e.clientY-$('.placer')[0].offsetHeight-100;
		currentleft=(e.clientX-$('.placer')[0].offsetWidth-200<0)?0:e.clientX-$('.placer')[0].offsetWidth-200;
		currenttop=(currenttop>worklayer.offsetHeight-$('.placer')[0].offsetHeight+1)?worklayer.offsetHeight-$('.placer')[0].offsetHeight+1:currenttop;
		currentleft=(currentleft>worklayer.offsetWidth-$('.placer')[0].offsetWidth+1)?worklayer.offsetWidth-$('.placer')[0].offsetWidth+1:currentleft;
		$('.placer').css({'position':'absolute','top':currenttop+'px','left':currentleft+'px'})
	}
}

placementStart();