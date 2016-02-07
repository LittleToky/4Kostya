var receivedData;

function sendData() {
	console.log('Отправляем данные на сервер');
	console.log(JSON.stringify(allData));
	function getData() {
		$.ajax({
    	type: 'POST',
   		url: 'process.php',
    	dataType: 'json',
    	data: {arg: JSON.stringify(allData)},
    	success: function(data) {
    		receivedData=data;
    		make4thTab();
    		}
		});
	};
	getData();
}

function createForth() {
	var main=document.getElementById('main');
	main.innerHTML='';
	$(main).append('<div class="buttoninpage" id="startcount">Начать расчёт</div>');
	$(document.getElementById('startcount')).on('click',sendData);
}

function make4thTab() {
	var main=document.getElementById('main');
	main.innerHTML='';
	var str='<table class="conttab"><caption>'+static[5].caption+'</caption><tbody id="tab1"><tr>'+static[5].heads.reduce(function(all,head){return(all+'<td>'+head+'</td>')},'')+'</tr></tbody></table>';
	$(main).append(str);
	receivedData.forEach(function(obj) {
    	$('.conttab').find('tr').last().after('<tr><td>'+obj.OrderName+'</td><td>'+obj.EquipmentScheme+'</td><td>'+obj.EquipmentCost+'</td><td>'+obj.ProcessTime+'</td><td>'+obj.Income+'</td><td>'+obj.ServicePrice+'</td><td>'+obj.ProcessTime+'</td><td><input type="button" value="Отчёт" class="butfortab"/><br><input type="button" class="butfortab" value="Расписание"/></td></tr>');
    	$('.butfortab').last().on('click',todiag);
    	function todiag() {
    		loads=[];
    		diagramData=obj.DiagramData;
    		setDiagram();
    	}		
    });    			
}