var static=[{caption:'Список производимых деталей', heads:['Название детали','Отпускная цена','Шифр','Название маршрута','Себестоимость производства','Название операции','Длительность операции','Длительность переналадки','Стоимость оснастки','Оборудование']},{caption:'Список типов оборудования',heads:['Название станка','Шифр','Стоимость','Стоимость<br>обслуживания','Длина','Ширина','Имеется<br>на производстве']},{caption:'Список производственных заказов',heads:['Название заказа','Бюджет на оборудование','Срок выполнения','Желаемая прибыль','Стоимость заказа','Деталь','Шифр','Размер парти','Можно исключить','Оценить количество станков']},{caption:'Список доступных деталей',heads:['Название<br>детали','Шифр','Отпускная<br>цена']},{caption:'Производственные схемы',heads:['Название<br>схемы','Cтанок','Шифр','Количество<br>станков','В наличии<br>на производстве','Длина цеха','Ширина цеха']}], page=0, pageType='tab';

window.oncontextmenu = function () {
    return false;
};
$('body').on('mousedown',function(){$('#menu').css('display','none')});
$('#main').on('scroll',function(){$('#menu').css('display','none')});


function pager(num){ // действия при переключении страниц
	pagePointer(num); // переключатель указателя страниц
	pageCreate(num); // Содержимое страницы
	wronger(); // Подсвечивает недозаполненные элементы
};

function pageCreate(num){ // Содержимое страницы
	if (pageType=='tab') {
		if (num==0) {
			document.getElementById('main').innerHTML=conttab(0)+conttab(1);
			if(currentLine!=undefined) {$(document.getElementsByName(currentLine)).click();}
		};
		if (num==1) {
			document.getElementById('main').innerHTML=conttab(2)+conttab(3);
			if(currentLine!=undefined) {$(document.getElementsByName(currentLine)).click();}
		};
		if (num==2) {
			document.getElementById('main').innerHTML=conttab(4)+conttab(1);
			if(currentLine!=undefined) {$(document.getElementsByName(currentLine)).click();}
		};
	} else {
		if (num==0) {
			document.getElementById('main').innerHTML=contsch(0)+contsch(1);
			if(currentLine!=undefined) {$(document.getElementsByName(currentLine)).click();}
		};
		if (num==1) {
			document.getElementById('main').innerHTML=contsch(2)+contsch(3);
			if(currentLine!=undefined) {$(document.getElementsByName(currentLine)).click();}
		};
		if (num==2) {
			document.getElementById('main').innerHTML=contsch(4)+contsch(1);
			if(currentLine!=undefined) {$(document.getElementsByName(currentLine)).click();}
		};
	}
	if (num==3) {diagramPrepare()}
};

function pagePointer(num){ // переключатель указателя страниц
	page=num;
	var $navTd=$('#nav').find('td');
	for (var i=0;i<4;i++){$('.arrow')[i].src='img/argr.png'}
	$navTd.css('background-color','');
	if (page!=4){$('.arrow')[page].src="img/arbl.png"}
	$($navTd[page]).css('background-color','#e4f9f9');
};

function conttab(n) { // создает любую конттаб, n указывает какую именно
	return('<table class="conttab"><caption>'+static[n].caption+'</caption><tbody><tr>'+static[n].heads.reduce(function(all,head){return(all+'<td>'+head+'</td>')},'')+'</tr>'+conts(n)+'</tbody></table>');
};

function maselect(value) {
	var cl='', sl='', value=value.toString();
	if (value==='') {cl='class="wrong"'; sl='selected'};
	return('<select '+cl+' value="'+value+'" onchange="resel(this,\'equip\')"><option value="" disabled '+sl+'>Не выбран</option>'+machines.reduce(function(maopts,machine,ma){return(maopts+'<option value="'+ma+'" '+((ma.toString()===value)? 'selected':'')+'>'+machine.name+'</option>')},'')+'</select>');
};

function itselect(value) {
	var cl='', sl='', value=value.toString();
	if (value==='') {cl='class="wrong"'; sl='selected'};
	return('<select '+cl+' value="'+value+'" onchange="resel(this,\'it\')"><option value="" disabled '+sl+'>Не выбрана</option>'+items.reduce(function(itopts,item,it){return(itopts+'<option value="'+it+'" '+((it.toString()===value)? 'selected':'')+'>'+item.name+'</option>')},'')+'</select>');
};

function resel(select,prop) {
	$(select).removeClass('wrong');
	currentObject[prop]=select.value;
	pager(page);
};

function conts(n){ // создает внутренности для конттаб, n указывает для какую именно 
	function trStart(name) {return ('<tr name="'+name+'" onclick="selectline(this)" oncontextmenu="selectline(this); right(this)">')};
	if (n==0) {
		return items.reduce(function(itlines,item,it){return(itlines+trStart('it'+it)+'<td>'+item.name+'</td><td>'+item.price+'</td><td>'+item.shifr+'</td><td colspan="7"></td></tr>'+item.routes.reduce(function(rolines,route,ro){return(rolines+trStart('it'+it+'.'+ro)+'<td colspan="3"></td><td>'+route.name+'</td><td>'+route.price+'</td><td colspan="5"></tr>'+route.operations.reduce(function(oplines,operation,op){return(oplines+trStart('it'+it+'.'+ro+'.'+op)+'<td colspan="5"></td><td>'+operation.name+'</td><td>'+operation.dur+'</td><td>'+operation.prepdur+'</td><td>'+operation.price+'</td><td class="center">'+maselect(operation.equip)+'</td></tr>')},''))},''))},'');
	};
	if (n==1) {
		return machines.reduce(function(malines,machine,ma){return(malines+trStart('ma'+ma)+'<td>'+machine.name+'</td><td>'+machine.shifr+'</td><td>'+machine.price+'</td><td>'+machine.servprice+'</td><td>'+machine.x+'</td><td>'+machine.y+'</td><td>'+machine.have+'</td></tr>')},'');
	};
	if (n==2) {
		return orders.reduce(function(orlines,order,or){return(orlines+trStart('or'+or)+'<td>'+order.name+'</td><td>'+order.debet+'</td><td>'+order.dur+'</td><td>'+order.profw+'</td><td>'+order.price+'</td><td colspan="4" class="center"><input type="button" value="+" onclick="orders['+or+'].positions.push(new Position); pager(page);" oncontextmenu="selectline(this); right(this)"></td><td class="center"><input type="checkbox" '+((order.mark)?'checked':'')+' onchange="orders['+or+'].mark=this.checked; features(currentObject);" /></td></tr>'+order.positions.reduce(function(polines,position,po){return(polines+trStart('or'+or+'.'+po)+'<td colspan="5"></td>'+positionCells(or,po)+'<td>'+position.em+'</td><td class="center"><input type="checkbox" '+((position.exc)?'checked':'')+' onchange="orders['+or+'].positions['+po+'].exc=this.checked; features(currentObject);" /></td><td></td></tr>');},''))},'');
	};
	if (n==3) {
		return items.reduce(function(itlines,item,it){return(itlines+trStart('it'+it)+'<td>'+item.name+'</td><td>'+item.shifr+'</td><td>'+item.price+'</td></tr>')},'');
	};
	if (n==4) {
		return lists.reduce(function(lilines,list,li){return (lilines+trStart('li'+li)+'<td>'+list.name+'</td><td colspan="4" class="center"><input type="button" value="+" onclick="lists['+li+'].units.push(new Unit); pager(page);"></td><td>'+list.x+'</td><td>'+list.y+'</td></tr>'+list.units.reduce(function(unlines,unit,un){return(unlines+trStart('li'+li+'.'+un)+'<td></td>'+unitCells(li,un)+'<td colspan="2"></td></tr>')},''))},'');
	};
};

function unitCells(li,un) {
	var ma=lists[li].units[un].equip;
	if (ma==='') {return ('<td colspan="4" class="center">'+maselect(ma)+'</td>');} else {return ('<td>'+machines[ma].name+'</td><td>'+machines[ma].shifr+'</td><td>'+lists[li].units[un].count+'</td><td>'+machines[ma].have+'</td>');}

};

function positionCells(or,po) {
	var it=orders[or].positions[po].it;
	if (it==='') {return ('<td colspan="2" class="center">'+itselect(it)+'</td>');} else {return ('<td>'+items[it].name+'</td><td>'+items[it].shifr+'</td>');}

};


function selectline(tr){ // реакция на клик по строке в таблице

	currentLine=tr.attributes.name.value;
	$('.selected').css('background-color','');
	$('.selected').removeClass('selected');
	$(document.getElementsByName(currentLine)).addClass('selected');
	features(defobj(currentLine));
}

function features(obj){ // отображает таблицу характеристик
	var feat=document.getElementById('feat');
	currentObject=obj;
	type=(obj.type);
	if (type=='Item') {feat.innerHTML='<table class="feattab"><tr><td>Деталь</td><td><input onchange="currentObject.name=this.value;  pageCreate(page);" type="text" value="'+obj.name+'" /></td></tr><tr><td>Отпускная цена</td><td><input onchange="currentObject.price=this.value;  pageCreate(page);" type="text" value="'+obj.price+'" /></td></tr><tr><td>Шифр</td><td><input onchange="currentObject.shifr=this.value; pageCreate(page);" type="text" value="'+obj.shifr+'" /></td></tr></table>'};
	if (type=='Route') {feat.innerHTML='<table class="feattab"><tr><td>Маршрут</td><td><input onchange="currentObject.name=this.value;  pageCreate(page);" type="text" value="'+obj.name+'" /></td></tr><tr><td>Себестоимость производства</td><td><input onchange="currentObject.price=this.value;  pageCreate(page);" type="text" value="'+obj.price+'" /></tr></table>'};
	if (type=='Operation') {feat.innerHTML='<table class="feattab"><tr><td>Операция</td><td><input onchange="currentObject.name=this.value;  pageCreate(page);" type="text" value="'+obj.name+'" /></td></tr><tr><td>Длительность операции</td><td><input onchange="currentObject.dur=this.value;  pageCreate(page);" type="text" value="'+obj.dur+'" /></tr><tr><td>Длительность переналадки</td><td><input onchange="currentObject.prepdur=this.value;  pageCreate(page);" type="text" value="'+obj.prepdur+'" /></tr><tr><td>Стоимость оснастки</td><td><input onchange="currentObject.price=this.value;  pageCreate(page);" type="text" value="'+obj.price+'" /></tr><tr><td>Оборудование</td><td>'+maselect(obj.equip)+'</td></tr></table>'};
	if (type=='Machine') {feat.innerHTML='<table class="feattab"><tr><td>Станок</td><td><input onchange="currentObject.name=this.value; pageCreate(page);" type="text" value="'+obj.name+'" /></td></tr><tr><td>Шифр</td><td><input onchange="currentObject.shifr=this.value; pageCreate(page);" type="text" value="'+obj.shifr+'" /></td></tr><tr><td>Цена</td><td><input onchange="currentObject.price=this.value; pageCreate(page);" type="text" value="'+obj.price+'" /></td></tr><tr><td>Стоимость обслуживания</td><td><input onchange="currentObject.servprice=this.value; pageCreate(page);" type="text" value="'+obj.servprice+'" /></td></tr><tr><td>Длина</td><td><input onchange="currentObject.x=this.value; pageCreate(page);" type="text" value="'+obj.x+'" /></td></tr><tr><td>Ширина</td><td><input onchange="currentObject.y=this.value; pageCreate(page);" type="text" value="'+obj.y+'" /></td></tr><tr><td>Цена</td><td><input onchange="currentObject.have=this.value; pageCreate(page);" type="text" value="'+obj.have+'" /></td></tr></table>'};
	if (type=='Order') {featHTML='<table class="feattab"><tr><td>Заказ</td><td><input onchange="currentObject.name=this.value; pageCreate(page);" type="text" value="'+obj.name+'" /></td></tr><tr><td>Число позиций</td><td>'+obj.positions.length+'</td></tr><tr><td>Бюджет</td><td><input onchange="currentObject.debet=this.value; pageCreate(page);" type="text" value="'+obj.debet+'" /></td></tr><tr><td>Желаемая прибыль</td><td><input onchange="currentObject.profw=this.value; pageCreate(page);" type="text" value="'+obj.profw+'" /></td></tr><tr><td>Стоимость заказа</td><td>'+obj.price+'</td></tr><tr><td>Срок выполнения</td><td><input onchange="currentObject.dur=this.value; pageCreate(page);" type="text" value="'+obj.dur+'" /></td></tr><tr><td>Оценить количество станков</td><td><input type="checkbox" '+((obj.mark)?'checked':'')+' onchange="currentObject.mark=this.checked; pageCreate(page)" /></td></tr></table>'};
	if (type=='Position') {feat.innerHTML='<table class="feattab"><tr><td>Позиция</td><td></td></tr><tr><td>Деталь</td><td>'+itselect(obj.it)+'</td></tr><tr><td>Размер партии</td><td><input onchange="currentObject.em=this.value; pageCreate(page);" type="text" value="'+obj.em+'" /></td></tr><tr><td>Можно исключить</td><td><input type="checkbox" '+((obj.exc)?'checked':'')+' onchange="currentObject.exc=this.checked; pageCreate(page)" /></td></tr></table>'};
	if (type=='List') {feat.innerHTML='<table class="feattab"><tr><td>Схема</td><td><input onchange="currentObject.name=this.value; pageCreate(page);" type="text" value="'+obj.name+'" /></td></tr><tr><td>Число позиций</td><td>'+obj.units.length+'</td></tr><tr><td>Длина цеха</td><td><input onchange="currentObject.x=this.value; pageCreate(page);" type="text" value="'+obj.x+'" /></td></tr><tr><td>Ширина цеха</td><td><input onchange="currentObject.y=this.value; pageCreate(page);" type="text" value="'+obj.y+'" /></td></tr></table>'};
	if (type=='Unit') {feat.innerHTML='<table class="feattab"><tr><td>Ресурс</td><td></td></tr><tr><td>Станок</td><td>'+maselect(obj.equip)+'</td></tr><tr><td>Количество станков</td><td><input onchange="currentObject.count=this.value; pageCreate(page);" type="text" value="'+obj.count+'" /></td></tr></table>'};
}

function right (targ) { //(li&un added)
	var name=targ.attributes.name.value, type=defobj(name).type, indexes=name.slice(2).split('.'), trMoveUp='<tr><td onmousedown="move(-1)">Сдвинуть выше</td></tr>', trMoveDo='<tr><td onmousedown="move(1)">Сдвинуть ниже</td></tr>', trCopy='<tr><td onmousedown="copyJSON()">Копировать</td></tr>', tdPaste='push(JSON.parse(bufer.content));pager(page);">';
	str='<table><tr><td onmousedown=';
	switch (type) {
		case 'Item':
			str+='"items.push(new Item);pager(page);">Новая деталь</td></tr><tr><td onmousedown="items['+indexes[0]+'].routes.push(new Route);pager(page);">Новый маршрут</td></tr>'+((indexes[0]!=0)?trMoveUp:'')+((indexes[0]!=items.length-1)?trMoveDo:'')+trCopy+((bufer!=undefined && bufer.type=='Item')?'<tr><td onmousedown="items.'+tdPaste+'Вставить деталь</td></tr>':'')+((bufer!=undefined && bufer.type=='Route')?'<tr><td onmousedown="items['+indexes[0]+'].routes.'+tdPaste+'Вставить маршрут</td></tr>':'');
		break;
		case 'Route':
			str+='"items['+indexes[0]+'].routes.push(new Route);pager(page);">Новый маршрут</td></tr><tr><td onmousedown="items['+indexes[0]+'].routes['+indexes[1]+'].operations.push(new Operation);pager(page);">Новая операция</td></tr>'+((indexes[1]!=0)?trMoveUp:'')+((indexes[1]!=items[indexes[0]].routes.length-1)?trMoveDo:'')+trCopy+((bufer!=undefined && bufer.type=='Route')?'<tr><td onmousedown="items['+indexes[0]+'].routes.'+tdPaste+'Вставить маршрут</td></tr>':'')+((bufer!=undefined && bufer.type=='Operation')?'<tr><td onmousedown="items['+indexes[0]+'].routes['+indexes[1]+'].operations.'+tdPaste+'Вставить операцию</td></tr>':'');
		break;
		case 'Operation':
			str+='"items['+indexes[0]+'].routes['+indexes[1]+'].operations.push(new Operation);pager(page);">Новая операция</td></tr>'+((indexes[2]!=0)?trMoveUp:'')+((indexes[2]!=items[indexes[0]].routes[indexes[1]].operations.length-1)?trMoveDo:'')+trCopy+((bufer!=undefined && bufer.type=='Operation')?'<tr><td onmousedown="items['+indexes[0]+'].routes['+indexes[1]+'].operations.'+tdPaste+'Вставить операцию</td></tr>':'');
		break;
		case 'Machine':
			str+='"machines.push(new Machine);pager(page);">Новый станок</td></tr>'+((indexes[0]!=0)?trMoveUp:'')+((indexes[0]!=machines.length-1)?trMoveDo:'')+trCopy+((bufer!=undefined && bufer.type=='Machine')?'<tr><td onmousedown="machines.'+tdPaste+'Вставить станок</td></tr>':'');
		break;
		case 'Order':
			str+='"orders.push(new Order);pager(page);">Новый заказ</td></tr><tr><td onmousedown="orders['+indexes[0]+'].positions.push(new Position);pager(page);">Новая позиция</td></tr>'+((indexes[0]!=0)?trMoveUp:'')+((indexes[0]!=orders.length-1)?trMoveDo:'')+trCopy+((bufer!=undefined && bufer.type=='Order')?'<tr><td onmousedown="orders.'+tdPaste+'Вставить заказ</td></tr>':'')+((bufer!=undefined && bufer.type=='Position')?'<tr><td onmousedown="orders['+indexes[0]+'].positions.'+tdPaste+'Вставить позицию</td></tr>':'');
		break;
		case 'Position':
			str+='"orders['+indexes[0]+'].positions.push(new Position);pager(page);">Новая позиция</td></tr>'+((indexes[1]!=0)?trMoveUp:'')+((indexes[1]!=orders[indexes[0]].positions.length-1)?trMoveDo:'')+trCopy+((bufer!=undefined && bufer.type=='Position')?'<tr><td onmousedown="orders['+indexes[0]+'].positions.'+tdPaste+'Вставить позицию</td></tr>':'');
		break;
		case 'List':
			str+='"lists.push(new List);pager(page);">Новая схема</td></tr><tr><td onmousedown="lists['+indexes[0]+'].units.push(new Unit);pager(page);">Новый ресурс</td></tr>'+((indexes[0]!=0)?trMoveUp:'')+((indexes[0]!=lists.length-1)?trMoveDo:'')+'<tr><td onmousedown="copyJSON()">Копировать</td></tr><tr><td onmousedown="saveListJSON()">Сохранить</td></tr>'+((bufer!=undefined && bufer.type=='List')?'<tr><td onmousedown="lists.'+tdPaste+'Вставить схему</td></tr>':'')+((bufer!=undefined && bufer.type=='Unit')?'<tr><td onmousedown="lists['+indexes[0]+'].units.'+tdPaste+'Вставить ресурс</td></tr>':'');
		break;
		case 'Unit':
			str+='"lists['+indexes[0]+'].units.push(new Unit);pager(page);">Новый ресурс</td></tr>'+((indexes[1]!=0)?trMoveUp:'')+((indexes[1]!=lists[indexes[0]].units.length-1)?trMoveDo:'')+trCopy+((bufer!=undefined && bufer.type=='Unit')?'<tr><td onmousedown="lists['+indexes[0]+'].units.'+tdPaste+'Вставить ресурс</td></tr>':'');
	}
	str+='<tr><td onmousedown="del(\''+type+'\')">Удалить</td></tr></table>';
	var menu=document.getElementById('menu');
	menu.innerHTML=str;
	$(menu).css('display','block');
	$(menu).css('left',event.clientX+'px');
	$(menu).css('top',event.clientY+'px');
};

function contsch(n) {
	var emptyTd='<td class="empty"></td>', listeners=' class="tile" onclick="selectline(this)">';
	if (n==0) {
		return '<table class="contsch leftsch"><tr><td class="plus" colspan="3" onclick="items.push(new Item);pager(page)">+</td><td colspan="2"></td></tr>'+items.reduce(function(itlines,item,it){return(itlines+'<tr><td colspan="3" name="it'+it+'"'+listeners+item.name+'</td><td class="plus" onclick="items['+it+'].routes.push(new Route);pager(page)">+</td><td></td><td colspan="2"></td></tr>'+item.routes.reduce(function(rolines,route,ro){return(rolines+'<tr>'+emptyTd+'<td colspan="2" name="it'+it+'.'+ro+'"'+listeners+route.name+'</td><td class="plus" onclick="items['+it+'].routes['+ro+'].operations.push(new Operation);pager(page)">+</td><td></td></tr>'+route.operations.reduce(function(oplines,operation,op){return(oplines+'<tr>'+emptyTd+emptyTd+'<td name="it'+it+'.'+ro+'.'+op+'"'+listeners+operation.name+'</td><td colspan="2"'+((operation.equip==='')?'>':' name="ma'+operation.equip+'"'+listeners+machines[operation.equip].name)+'</td></tr>')},''))},''))},'')+'</table>';
	};
	if (n==1) {
		return '<table class="contsch rightsch"><tr><td class="plus" onclick="machines.push(new Machine);pager(page)">+</td><td colspan="2"></td></tr>'+machines.reduce(function(malines,machine,ma){return(malines+'<tr><td name="ma'+ma+'"'+listeners+machine.name+'</td></tr>')},'')+'</table>';
	};
	if (n==2) {
		return '<table class="contsch leftsch"><tr><td class="plus" colspan="2" onclick="orders.push(new Order);pager(page)">+</td><td colspan="2"></td></tr>'+orders.reduce(function(orlines,order,or){return(orlines+'<tr><td colspan="2" name="or'+or+'"'+listeners+order.name+'</td><td class="plus" onclick="orders['+or+'].positions.push(new Position);pager(page)">+</td><td></td></tr>'+order.positions.reduce(function(polines,position,po){return(polines+'<tr>'+emptyTd+'<td name="or'+or+'.'+po+'"'+listeners+'Позиция №'+(po*1+1).toString()+'</td><td colspan="2"'+((position.it==='')?'>':' name="it'+position.it+'"'+listeners+items[position.it].name)+'</td></tr>')},''))},'')+'</table>';
	};
	if (n==3) {
		return '<table class="contsch rightsch"><tr><td class="plus" onclick="items.push(new Item);pager(page)">+</td><td colspan="2"></td></tr>'+items.reduce(function(itlines,item,it){return(itlines+'<tr><td name="it'+it+'"'+listeners+item.name+'</td></tr>')},'')+'</table>'
	};
	if (n==4) {
		return '<table class="contsch leftsch"><tr><td class="plus" colspan="2" onclick="lists.push(new List);pager(page)">+</td><td colspan="2"></td></tr>'+lists.reduce(function(lilines,list,li){return(lilines+'<tr><td colspan="2" name="li'+li+'"'+listeners+list.name+'</td><td class="plus" onclick="lists['+li+'].units.push(new Unit);pager(page)">+</td><td></td></tr>'+list.units.reduce(function(unlines,unit,un){return(unlines+'<tr>'+emptyTd+'<td name="li'+li+'.'+un+'"'+listeners+'Ресурс №'+(un*1+1).toString()+'</td><td colspan="2"'+((unit.equip==='')?'>':' name="ma'+unit.equip+'"'+listeners+machines[unit.equip].name)+'<td></td></tr>')},''))},'')+'</table>'
	};
}

function wronger() {
	items.forEach(function(item,it){if (item.routes.length==0) {$(document.getElementsByName('it'+it)).addClass('wrong');} else {item.routes.forEach(function(route,ro) {if (route.operations.length==0) {$(document.getElementsByName('it'+it+'.'+ro)).addClass('wrong');} else {route.operations.forEach(function(operation,op){if (operation.equip==="") {$(document.getElementsByName('it'+it+'.'+ro+'.'+op)).addClass('wrong');}})}})}});
	orders.forEach(function(order,or){if (order.positions.length==0) {$(document.getElementsByName('or'+or)).addClass('wrong');} else {order.positions.forEach(function(position,po){if (position.it===""){$(document.getElementsByName('or'+or+'.'+po)).addClass('wrong');}})}});
	lists.forEach(function(list,li){if (list.units.length==0) {$(document.getElementsByName('li'+li)).addClass('wrong');} else {list.units.forEach(function(unit,un){if (unit.equip===""){$(document.getElementsByName('li'+li+'.'+un)).addClass('wrong');}})}});
}

$(document.getElementById('nav')).find('td').on('click',function(){pager(this.attributes.num.value)}); // Эвент листенеры на кнопках разделов
$(document.getElementById('nav')).find('td').first().click(); // Эмуляция клика по указателю первой страницы
$(document.getElementById('sch')).on('click',function(){pageType='sch'; pager(page)});
$(document.getElementById('tab')).on('click',function(){pageType='tab'; pager(page)});
