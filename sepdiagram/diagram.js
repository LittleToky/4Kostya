var colors=['ff7700','00b0b0','F13C76','0ff000','AD66D5','ffff00','A66E00','ff5050','767377','701A42','0BF5ED','172461','612717','7F3C7E','329F4D'], today=new Date, onedaywidth=500; //ширина одного дня в пикселях

var jsonDiagramData='[{"name":"Токарно-винторезный - 1K62|SN=3|","operations":[{"order":"1","text":"Штуцер","start":480,"duration":391,"additionaltime":0,"type":1},{"order":"2","text":"Гайка","start":871,"duration":165,"type":2}]},{"name":"Токарный многорезцовый полуавтомат - 1731.Станок 1|SN=7|","operations":[{"order":"3","text":"Диск","start":480,"duration":97,"type":3},{"order":"4","text":"Кулачок","start":577,"duration":159,"type":0},{"order":"5","text":"Штуцер","start":871,"duration":116,"additionaltime":0,"type":1},{"order":"6","text":"Гайка","start":1036,"duration":172,"type":2},{"order":"7","text":"Штуцер","start":1615,"duration":213,"additionaltime":0,"type":1},{"order":"8","text":"Штуцер","start":1828,"duration":115,"additionaltime":0,"type":1}]},{"name":"Токарный многорезцовый полуавтомат - 1731.Станок 2|SN=7|","operations":[{"order":"9","text":"Диск","start":480,"duration":97,"type":3},{"order":"10","text":"Кулачок","start":577,"duration":159,"type":0},{"order":"11","text":"Штуцер","start":871,"duration":116,"additionaltime":0,"type":1},{"order":"12","text":"Гайка","start":1036,"duration":172,"type":2},{"order":"13","text":"Штуцер","start":1615,"duration":213,"additionaltime":0,"type":1},{"order":"14","text":"Штуцер","start":1828,"duration":115,"additionaltime":0,"type":1}]},{"name":"Токарный копировальный полуавтомат - 1722|SN=6|","operations":[{"order":"15","text":"Кольцо","start":480,"duration":132,"type":4},{"order":"16","text":"Диск","start":612,"duration":345,"type":3},{"order":"17","text":"Кольцо","start":957,"duration":36,"type":4},{"order":"18","text":"Штуцер","start":993,"duration":231,"additionaltime":0,"type":1},{"order":"19","text":"Шайба","start":1224,"duration":189,"type":5}]},{"name":"Токарный многорезцовый полуавтомат с двусторонним приводом для обработки шатунных коренных шеек коленчатого вала - МК-139|SN=8|","operations":[{"order":"20","text":"Коленчатый вал","start":542,"duration":63,"type":7},{"order":"21","text":"Ступица","start":794,"duration":132,"type":6},{"order":"22","text":"Штуцер","start":1224,"duration":391,"additionaltime":0,"type":1}]},{"name":"Одношпиндельный револьверный автомат - 1А136|SN=10|","operations":[{"order":"23","text":"Кольцо","start":1269,"duration":312,"type":4},{"order":"24","text":"Шайба","start":1581,"duration":108,"type":5},{"order":"25","text":"Штуцер","start":1943,"duration":34,"additionaltime":0,"type":1}]},{"name":"Долбежный - 7417|SN=25|","operations":[{"order":"26","text":"Штуцер","start":1977,"duration":206,"additionaltime":0,"type":1}]},{"name":"Вертикально-фрезерный - 6H13|SN=19|","operations":[{"order":"27","text":"Шайба","start":1689,"duration":189,"type":5}]},{"name":"Револьверный (с горизонтальной осью револьверной головки) -1336M|SN=4|","operations":[]}]';

diagramData=JSON.parse(jsonDiagramData);

var deadLine=new Date(today.getFullYear(), today.getMonth(), (today.getDate()), 21, 12);


function setDiagram() {
	var dayZ=new Date(today.getFullYear(), today.getMonth(), (today.getDate()+2)); // Пока взята сегодняшняя дата + 2 дня (по идее должна определяться из входных данных)
	var typenum=diagramData.length; // Количество типов станков определяет количество строк
	var dheight=40; // Сюда запишется высота дива на всякий пожарный
	function setCoord() {
		var days=(dayZ.getTime()-today.getTime())/86400000-((dayZ.getTime()-today.getTime())/86400000)%1;
		str='<table id="coord"><caption>Диаграмма Ганта</caption><tr><td></td>';
		for (var i=0; i<=days; i++) {
			curday=new Date(today.getFullYear(), today.getMonth(), (today.getDate()+i))
			str+='<td class="date" colspan="24" style="min-width: '+onedaywidth+'px;">'+curday.getDate()+'.'+(curday.getMonth()*1+1)+'.'+curday.getFullYear()+'</td>'
		}
		str+='</tr>';
		for (var i=0; i<typenum; i++) {
		str+='<tr><td class="matype"><div>'+diagramData[i].name+'</div></td>';
			for (var q=0; q<=days; q++) {
				var h=0;
				while (h<23) {str+='<td class="cell"></td>'; h++}
				str+='<td class="cell edge"></td>'}
			str+='</tr>'
		}
		str+='</table><div id="workarea"></div>';
		document.getElementById('main').innerHTML=str;
		var leftTopCorner=$(document.getElementById('coord')).find('tr').first().next().find('td').first().next().offset(), workarea=document.getElementById('workarea').style;
		workarea.top=(leftTopCorner.top)+'px';
		workarea.left=(leftTopCorner.left-1)+'px';
	};
	function divPreset() {
		for (var i=0; i<typenum; i++) {
			y=diagramData[i].operations.length;
			for (var j=0; j<y; j++) {
				divmaker(i,diagramData[i].operations[j].start,diagramData[i].operations[j].duration,colors[diagramData[i].operations[j].type],diagramData[i].operations[j].text,diagramData[i].operations[j].type,diagramData[i].operations[j].order);
			}
		}
	}
	function divmaker(line,start,duration,type,text,gr,order) { // i-номер строки, start-время начала относительно сегодня 00:00 (минуты), duration-длительность в минутах, сolor-цвет, gr -номер (отвечает за имя) подсвечиваемой группы
		start=start*(onedaywidth)/1440;
		duration=duration*(onedaywidth)/1440-6;
		var div='<div data-ord="'+order+'" onmouseover="lighteron(this)" onmouseout="lighteroff()" name="gr'+gr+'" class="elem" style="height: '+(dheight)+'px; background-color: #'+type+'; top: '+(line*(dheight+1))+'px; left: '+start+'px; max-width: '+duration+'px; min-width: '+duration+'px;">'+text+'<br>'+(duration/60).toFixed(1)+'ч</div>';
		document.getElementById('workarea').innerHTML+=div;
	}
	setCoord();
	divPreset();
	if (deadLine.constructor==Date) {deadLiner()};
}

function deadLiner() {
	$(document.getElementById('workarea')).prepend('<div id="deadline"></div>');
	var start=(deadLine.getTime()-new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime())*onedaywidth/86400000+2;
	var deadDiv=document.getElementById('deadline'), coord=document.getElementById('coord');
	deadDiv.innerHTML='<p>'+((deadLine.getHours().toString().length==1)?' 0':' ')+deadLine.getHours()+':'+((deadLine.getMinutes().toString().length==1)?'0':'')+deadLine.getMinutes()+'</p>';
	deadDiv.style.left=start+'px';
	deadDiv.style.width=$(coord).find('td').last().offset().left-deadDiv.offsetLeft-$(coord).find('td').first().next().offset().left+$(coord).find('td').last()[0].offsetWidth+'px';
	deadDiv.style.height=$(coord).find('tr').last().offset().top-$(coord).find('tr').first().next().offset().top+$(coord).find('tr').last()[0].offsetHeight+1+'px';
}

function lighteron(targ) {
 	var name=targ.attributes.name.value, arr=document.getElementsByName(name), l=arr.length;
 	$(arr).addClass('group');
 	for (var w=0; w<l; w++) {
 		var target=arr[w], order=$(target).data('ord');
 		target.style.backgroundColor='#ffffff';
 		target.innerHTML+=' (№'+order+')';

 	}
}
function lighteroff() {
	var arr=document.getElementsByClassName('group'); l=arr.length;
	if (l>0) {
		var name=arr[0].attributes.name.value.slice(2);
		for (var w=0; w<l; w++) {
			var target=arr[w];
			target.style.backgroundColor='#'+colors[name];
			target.innerHTML=arr[w].innerHTML.slice(0,arr[w].innerHTML.indexOf('(№'));
	 	}
		$('.group').removeClass('group');
	}
}

function save() {
	var jsonDiagramData=JSON.stringify(diagramData);
	var blob = new Blob([jsonDiagramData], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "DiagramData.txt");
}

function openthis() {
	var file=this.files[0];
	var reader = new FileReader();
	reader.onload = function (e) {
    	diagramData = JSON.parse(e.target.result);
    	setDiagram();
	};
	reader.readAsText(file);
	this.value='';
}

$(document.getElementById('save')).on('click',save);
$(document.getElementById('open')).on('click',function(){document.getElementById('fileload').click()});
$(document.getElementById('fileload')).on('change',openthis);

setDiagram();


/*
function diagramPrepare() {
	document.getElementById('main').innerHTML="Данные обрабатываются. Пожалуйста, подождите.";
	$.ajax({
    type: 'POST',
    url: 'process.php',
    dataType: 'json',
    data: {arg: 22},
    success: function(data) {console.log(data);}
	});
};

*/