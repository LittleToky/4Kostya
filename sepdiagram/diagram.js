var colors=['ff7700','00b0b0','F13C76','0ff000','AD66D5','ffff00','A66E00','ff5050','767377','701A42','0BF5ED','172461','612717','7F3C7E','329F4D']; // массив цветов
var load=[]; // массив коэффициентов загрузки каждого станка до дедлайна
var today=new Date; // сейчас
today=new Date(today.getFullYear(),today.getMonth(),today.getDate()); // 00:00 сегодня
var onedaywidth=500; // ширина одного дня в пикселях
var jsonDiagramData='[{"name":"Токарно-винторезный - 1K62|SN=3|","operations":[{"order":"1","text":"Штуцер","start":480,"duration":391,"additionaltime":0,"type":1},{"order":"2","text":"Гайка","start":871,"duration":165,"type":2}]},{"name":"Токарный многорезцовый полуавтомат - 1731.Станок 1|SN=7|","operations":[{"order":"3","text":"Диск","start":480,"duration":97,"type":3},{"order":"4","text":"Кулачок","start":577,"duration":159,"type":0},{"order":"5","text":"Штуцер","start":871,"duration":116,"additionaltime":0,"type":1},{"order":"6","text":"Гайка","start":1036,"duration":172,"type":2},{"order":"7","text":"Штуцер","start":1615,"duration":213,"additionaltime":0,"type":1},{"order":"8","text":"Штуцер","start":1828,"duration":115,"additionaltime":0,"type":1}]},{"name":"Токарный многорезцовый полуавтомат - 1731.Станок 2|SN=7|","operations":[{"order":"9","text":"Диск","start":480,"duration":97,"type":3},{"order":"10","text":"Кулачок","start":577,"duration":159,"type":0},{"order":"11","text":"Штуцер","start":871,"duration":116,"additionaltime":0,"type":1},{"order":"12","text":"Гайка","start":1036,"duration":172,"type":2},{"order":"13","text":"Штуцер","start":1615,"duration":213,"additionaltime":0,"type":1},{"order":"14","text":"Штуцер","start":1828,"duration":115,"additionaltime":0,"type":1}]},{"name":"Токарный копировальный полуавтомат - 1722|SN=6|","operations":[{"order":"15","text":"Кольцо","start":480,"duration":132,"type":4},{"order":"16","text":"Диск","start":612,"duration":345,"type":3},{"order":"17","text":"Кольцо","start":957,"duration":36,"type":4},{"order":"18","text":"Штуцер","start":993,"duration":231,"additionaltime":0,"type":1},{"order":"19","text":"Шайба","start":1224,"duration":189,"type":5}]},{"name":"Токарный многорезцовый полуавтомат с двусторонним приводом для обработки шатунных коренных шеек коленчатого вала - МК-139|SN=8|","operations":[{"order":"20","text":"Коленчатый вал","start":542,"duration":63,"type":7},{"order":"21","text":"Ступица","start":794,"duration":132,"type":6},{"order":"22","text":"Штуцер","start":1224,"duration":391,"additionaltime":0,"type":1}]},{"name":"Одношпиндельный револьверный автомат - 1А136|SN=10|","operations":[{"order":"23","text":"Кольцо","start":1269,"duration":312,"type":4},{"order":"24","text":"Шайба","start":1581,"duration":108,"type":5},{"order":"25","text":"Штуцер","start":1943,"duration":34,"additionaltime":0,"type":1}]},{"name":"Долбежный - 7417|SN=25|","operations":[{"order":"26","text":"Штуцер","start":1977,"duration":206,"additionaltime":0,"type":1}]},{"name":"Вертикально-фрезерный - 6H13|SN=19|","operations":[{"order":"27","text":"Шайба","start":1689,"duration":189,"type":5}]},{"name":"Револьверный (с горизонтальной осью револьверной головки) -1336M|SN=4|","operations":[]}]'; // иммитация приходящего json

diagramData=JSON.parse(jsonDiagramData); // парсим json

var deadLine=new Date(today.getFullYear(), today.getMonth(), (today.getDate()), 30, 0); // дедлайн. если undefined, автоматически установится на конец последней операции
var delay=0; // время в минутах, означает например начало рабочей смены

function dayZ() { // возвращает ДЕНЬ завершения последней операции
	var latest=0; // минуты завершения последней операции
	diagramData.forEach(function(machine){machine.operations.forEach(function(operation){ // для каждой операции
		var endTime=operation.start+operation.duration; // время окончания операции
		latest=(endTime>latest)?endTime:latest;
	})});
	var dayZ=new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes()+latest+delay); // точные время и дата последней операции
	if (deadLine==undefined){deadLine=dayZ}
	return new Date(dayZ.getFullYear(),dayZ.getMonth(),dayZ.getDate());
}

function setDiagram() { // вывод диаграммы
	var typenum=diagramData.length; // Количество типов станков определяет количество строк
	var dheight=40; // высота дива 
	function setCoord() { // вывод координатной сетки и названия станков
		var days=(dayZ().getTime()-today.getTime())/86400000-((dayZ().getTime()-today.getTime())/86400000)%1; // сколько дней занимает весь процесс/ нужно выводить на диаграмме
		str='<table id="coord"><caption>Диаграмма Ганта</caption><tr><td></td>';
		for (var i=0; i<=days; i++) { // для каждого дня процесса
			curday=new Date(today.getFullYear(), today.getMonth(), (today.getDate()+i)); // определение даты для диаграммы 
			str+='<td class="date" colspan="24" style="min-width: '+onedaywidth+'px;">'+curday.getDate()+'.'+(curday.getMonth()*1+1)+'.'+curday.getFullYear()+'</td>'
		}
		str+='</tr>';
		for (var i=0; i<typenum; i++) { // для каждого станка
		str+='<tr><td class="matype"><div>'+diagramData[i].name+'</div></td>';
			for (var q=0; q<=days; q++) { // для каждого дня
				var h=0;
				while (h<23) {str+='<td class="cell"></td>'; h++} // 24 часовых ячейки
				str+='<td class="cell edge"></td>'}
			str+='</tr>'
		}
		str+='</table><br><input type="checkbox" onchange="grid(this)" checked/> Убрать/Показать сетку<div id="workarea"></div>'; 
		document.getElementById('main').innerHTML=str; // вывод координатной сетки в main
		var leftTopCorner=$(document.getElementById('coord')).find('.cell').offset(); // координаты левого верхнего угла рабочей области
		var workarea=document.getElementById('workarea').style; workarea.top=(leftTopCorner.top)+'px'; workarea.left=(leftTopCorner.left-1)+'px'; // смещаем workarea в нужное место
	};
	function divmaker(line,start,duration,text,gr,order) { // i-номер строки, start-время начала относительно сегодня 00:00 (минуты), duration-длительность в минутах, сolor-цвет, gr -номер (отвечает за имя и цвет) подсвечиваемой группы
		start=start*(onedaywidth)/1440;  // координата старта полоски в пикселях (относ. workarea)
		duration=duration*(onedaywidth)/1440-6;  // длина полоски в пикселях
		var div='<div data-ord="'+order+'" onmouseover="lighteron(this)" onmouseout="lighteroff()" name="gr'+gr+'" class="elem" style="height: '+(dheight)+'px; background-color: #'+colors[gr]+'; top: '+(line*(dheight+1))+'px; left: '+start+'px; max-width: '+duration+'px; min-width: '+duration+'px;">'+text+'<br>'+(duration/60).toFixed(1)+'ч</div>';
		document.getElementById('workarea').innerHTML+=div; // вывод полоски в workarea
	};

	setCoord(); // вывести координатную сетку
	diagramData.forEach(function(machine,m){machine.operations.forEach(function(operation){
		divmaker(m,operation.start,operation.duration,operation.text,operation.type,operation.order);
	})}); // вывести полоски

	$('.matype').on('mouseover',function(){
		var top=$(this).offset().top, left=$(this).offset().left, width=this.offsetWidth-1, minheight=this.offsetHeight-1;
		if (document.getElementsByClassName('mainfo').length==0) {$(document.getElementById('main')).append('<div class="mainfo"></div>');}
		$('.mainfo').html(this.innerHTML);
		$('.mainfo').css({'top':top}); $('.mainfo').css({'left':left}); $('.mainfo').css({'width':width}); $('.mainfo').css({'min-height':minheight});
		$('.mainfo').show();
		if($(this).hasClass('badmachine')) {$('.mainfo').addClass('badmachine')}else{$('.mainfo').removeClass('badmachine')}
		$('.mainfo').on('mouseleave',function(){$(this).hide()});	
	});

	deadLiner(); // отобразить deadLine опции
}

function deadLiner() {
	$(document.getElementById('workarea')).prepend('<div id="deadline"></div>');
	var start=(deadLine.getTime()-new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime())*onedaywidth/86400000+2; // коордната красной полоски в пикселях относительно workarea
	var deadDiv=document.getElementById('deadline'), coord=document.getElementById('coord');
	deadDiv.innerHTML='<p>'+((deadLine.getHours().toString().length==1)?' 0':' ')+deadLine.getHours()+':'+((deadLine.getMinutes().toString().length==1)?'0':'')+deadLine.getMinutes()+'</p>';  // вывод даты ДЛ
	deadDiv.style.left=start+'px'; // размещение красной полоски в нужном месте
	deadDiv.style.width=$(coord).find('.cell').last().offset().left-deadDiv.offsetLeft-$(coord).find('.date').first().offset().left+$(coord).find('.cell').last()[0].offsetWidth+'px'; // установка ширины красного поля
	deadDiv.style.height=$(coord).find('tr').last().offset().top-$(coord).find('.cell').first().offset().top+$(coord).find('tr').last()[0].offsetHeight+1+'px'; // установка высоты расного поля
	var deadMinutes=(deadLine-today)/60000; // минуты красной полоски
	for (var i=0;i<diagramData.length;i++){ //для каждого станка (forEach неприемлем из-за break)
		for (var j=0;j<diagramData[i].operations.length;j++){ //для каждой операции
			var endTime=diagramData[i].operations[j].start+diagramData[i].operations[j].duration; // минута окончания операции
			if(endTime>deadMinutes){ $($('.matype')[i]).addClass('badmachine');break;}; // если операция закончена позже ДЛ, присвоить ее станку класс badmachine
		};
	};

	diagramData.forEach(function(machine){ // расчет коэффициента загрузки для каждого станка
		var workMinutes=0; // время непосредственной работы станка до ДЛ
		machine.operations.forEach(function(operation){ // для каждой операции
			workMinutes+=operation.duration // добавляем длительность операции к рабочим минутам станка
		});
		load.push((workMinutes*100/deadMinutes).toFixed(2)+'%'); // расчет коэф. загрузки станка, запоминаем в load
	});

	load.forEach(function(load,i){ // Вывод коэф. загрузки в описание стана
		($($('.matype')[i]).find('div')[0]).innerHTML+='<br><p>Загрузка '+load+'</p>';
		$('.badmachine p').css({'color':'#922e2e'});
	})
}

function lighteron(targ) { // Подсветка и изменение полос группы
 	var name=targ.attributes.name.value, arr=document.getElementsByName(name), l=arr.length;
 	$(arr).addClass('group'); // помечаем группу класом group
 	for (var w=0; w<l; w++) { // для каждого элемента группы
 		var target=arr[w], order=$(target).data('ord'); //определяем порядковый номер в группе
 		$(target).css({'background-color':'white'});
 		target.innerHTML+=' (№'+order+')'; // дописываем порядковый номер в полоску
 	}
}
function lighteroff() { // Отключение подсветки группы
	var arr=document.getElementsByClassName('group'); l=arr.length; // находим все элементы группы
	if (l>0) { // если они есть
		var name=arr[0].attributes.name.value.slice(2); //определяем номер группы
		for (var w=0; w<l; w++) { // для каждого элемента группы
			var target=arr[w];
			$(target).css({'background-color':'#'+colors[name]}); // возвращаем исходный цвет по номеру группы
			target.innerHTML=arr[w].innerHTML.slice(0,arr[w].innerHTML.indexOf('(№')); // удаляем из полоски порядковый номер в группе
	 	}
		$('.group').removeClass('group'); //убираем пометку группы
	}
}

function save() { // Сохранение json данных диаграмы на комп
	var jsonDiagramData=JSON.stringify(diagramData);
	var blob = new Blob([jsonDiagramData], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "DiagramData.txt");
}

function openthis() { // Загрузка json данных диаграмы с компа
	var file=this.files[0];
	var reader = new FileReader();
	reader.onload = function (e) {
    	diagramData = JSON.parse(e.target.result);
    	setDiagram();
	};
	reader.readAsText(file);
	this.value='';
}

$(document.getElementById('save')).on('click',save); // слушаем клик по "Сохранить"
$(document.getElementById('open')).on('click',function(){document.getElementById('fileload').click()}); // слушаем клик по "Открыть"
$(document.getElementById('fileload')).on('change',openthis); // слушаем изменение скрытого инпута

setDiagram(); // Вывести диаграмму

function mainfo(targ){
	$(document.getElementById('main')).append('<div class="mainfo">111</div>');

	$('.mainfo').css({'top':'20px'});	
}

function grid(input) {
	if(input.checked) {$('.cell:not(.edge)').css({'border-right':'1px dashed #8C9797'})} else {$('.cell:not(.edge)').css({'border-right':'none'})}
}


/*

function minutesToPx(min) {
	return px=$(workarea).offset().left+min*500/1440;
}

function getData() {
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