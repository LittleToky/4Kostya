var fullDiagramData=[];

function sendData() {
	console.log('Отправляем данные на сервер');
	function getData() {
		$.ajax({
    	type: 'POST',
   		url: 'process.php',
    	dataType: 'json',
    	data: {arg: JSON.stringify(allData)},
    	success: function(data) {
    			console.log(data);
    			fullDiagramData.push(JSON.parse(data.data));
    			forthCount(data);
    		}
		});
	};
	getData();
}

function forthCount(data) {
	var main=document.getElementById('main');
	main.innerHTML='';
	$(main).append('<p id="generalStatus">Идет моделирование производственной системы</p>');
	$(main).append('<p id="status">'+data.status+'</p>');
	var str='<table class="conttab"><caption>'+static[5].caption+'</caption><tbody id="tab1"><tr>'+static[5].heads.reduce(function(all,head){return(all+'<td>'+head+'</td>')},'')+'</tr></tbody></table>';
	$(main).append(str);
	addLines();
}

function createForth() {
	var main=document.getElementById('main');
	main.innerHTML='';
	$(main).append('<div class="buttoninpage" id="startcount">Начать расчёт</div>');
	$(document.getElementById('startcount')).on('click',sendData);
}

function addLines() {
	var str=fullDiagramData.reduce(function(all,order,or){return(all+'<tr><td>111</td><td>222</td><td>333</td><td>444</td><td>555</td><td>666</td><td><input type="button" value="Отчёт" class="butfortab"><br><input type="button" value="Расписание" onclick="diagramData=fullDiagramData['+or+'];setDiagram();"></td></tr>')},'');
	$(document.getElementById('tab1')).append(str);
}
