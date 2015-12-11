function Machine() {
	this.name="Станок";
	this.shifr="";
	this.price='0';
	this.servprice='0';
	this.x='0';
	this.y='0';
	this.have='0';
	this.type='Machine';
}
function Item() {
	this.name='Деталь';
	this.price='0';
	this.routes=[new Route];
	this.shifr='';
	this.type='Item';
}
function Route() {
	this.name='Маршрут';
	this.price='0';
	this.operations=[new Operation];
	this.type='Route';
}
function Operation() {
	this.name='Операция';
	this.dur='0';
	this.prepdur='0';
	this.price='0';
	this.equip='';
	this.type='Operation';
}
function Order() {
	this.name='Заказ';
	this.debet='0';
	this.profw='0';
	this.dur='0';
	this.price='Авто';
	this.positions=[];
	this.mark=false;
	this.type='Order';
}
function Position() {
	this.it='';
	this.em='0';
	this.exc=false;
	this.type='Position';
}
function Unit() {
	this.equip='';
	this.em='0';
	this.count="0";
	this.type='Unit';
}
function List() {
	this.name='Схема';
	this.units=[];
	this.x='0';
	this.y='0';
	this.type='List';
}

var currentObject,currentLine,bufer={};

function defobj(name){ // возвращает объект по имени tr
	var typeID=name.slice(0,2), indexes=name.slice(2).split('.');
	if (typeID=='it') {
		if (indexes.length==1) {return items[indexes[0]]};
		if (indexes.length==2) {return items[indexes[0]].routes[indexes[1]]};
		if (indexes.length==3) {return items[indexes[0]].routes[indexes[1]].operations[indexes[2]]}	;
	};
	if (typeID=='ma') {
		return machines[indexes[0]];	
	};
	if (typeID=='or') {
		if (indexes.length==1) {return orders[indexes[0]]};
		if (indexes.length==2) {return orders[indexes[0]].positions[indexes[1]]};
	};
	if (typeID=='li') {
		if (indexes.length==1) {return lists[indexes[0]]};
		if (indexes.length==2) {return lists[indexes[0]].units[indexes[1]]};
	};
};

function copyJSON() {
	bufer.content=JSON.stringify(currentObject);
	bufer.type=currentObject.type;
};

function del(type) {
	var indexes=currentLine.slice(2).split('.');
	if (type=='Item') {
		items.splice(indexes[0]*1,1);
		orders.forEach(function(order){order.positions.forEach(function(position){
			if (position.it===indexes[0]) {position.it=''};
			if (position.it*1>indexes[0]*1) {position.it=(position.it*1-1).toString()}
		})});
	};
	if (type=='Route') {items[indexes[0]].routes.splice(indexes[1]*1,1);};
	if (type=='Operation') {items[indexes[0]].routes[indexes[1]].operations.splice(indexes[2]*1,1);};
	if (type=='Machine') {
		machines.splice(indexes[0]*1,1);
		lists.forEach(function(list){list.units.forEach(function(unit){
			if (unit.equip===indexes[0]) {unit.equip=''};
			if (unit.equip*1>indexes[0]*1) {unit.equip=(unit.equip-1).toString()}
		})});
		items.forEach(function(item){item.routes.forEach(function(route){route.operations.forEach(function(operation){
			if (operation.equip===indexes[0]) {operation.equip=''};
			if (operation.equip*1>indexes[0]*1) {operation.equip=(operation.equip*1-1).toString()};
		})})});
	};
	if (type=='Order') {orders.splice((indexes[0].slice(2)*1),1);};
	if (type=='Position') {orders[indexes[0]].positions.splice(indexes[1]*1,1);};
	if (type=='List') {lists.splice(indexes[0]*1,1);};
	if (type=='Unit') {lists[indexes[0]].units.splice(indexes[1]*1,1);};
	pager(page);
};

function move(s){ // s=-1 вверх, s=1 вниз
	var type=currentObject.type, indexes=currentLine.slice(2).split('.'), mirror;
	if (type=='Item'){
		mirror=items[indexes[0]];
		items[indexes[0]]=items[indexes[0]*1+s];
		items[indexes[0]*1+s]=mirror;
		orders.forEach(function(order){order.positions.forEach(function(position){
			if (position.it===indexes[0]) {position.it=(indexes[0]*1+s).toString()}
			else {if (position.it===(indexes[0]*1+s).toString()) {position.it=indexes[0]}};
		})});
	};
	if (type=='Route'){
		mirror=items[indexes[0]].routes[indexes[1]];
		items[indexes[0]].routes[indexes[1]]=items[indexes[0]].routes[indexes[1]*1+s];
		items[indexes[0]].routes[indexes[1]*1+s]=mirror;
	};
	if (type=='Operation'){
		mirror=items[indexes[0]].routes[indexes[1]].operations[indexes[2]];
		items[indexes[0]].routes[indexes[1]].operations[indexes[2]]=items[indexes[0]].routes[indexes[1]].operations[indexes[2]*1+s];
		items[indexes[0]].routes[indexes[1]].operations[indexes[2]*1+s]=mirror;
	};
	if (type=='Machine'){
		mirror=machines[indexes[0]];
		machines[indexes[0]]=machines[indexes[0]*1+s];
		machines[indexes[0]*1+s]=mirror;
		lists.forEach(function(list){list.units.forEach(function(unit){
			if (unit.equip===indexes[0]) {unit.equip=(indexes[0]*1+s).toString()}
			else {if (unit.equip===(indexes[0]*1+s).toString()) {unit.equip=indexes[0]}};
		})});
		items.forEach(function(item){item.routes.forEach(function(route){route.operations.forEach(function(operation){
			if (operation.equip===indexes[0]) {operation.equip=(indexes[0]*1+s).toString()}
			else {if (operation.equip===(indexes[0]*1+s).toString()) {operation.equip=indexes[0]}};
		})})});
		
	};
	if (type=='Order'){
		mirror=orders[indexes[0]];
		orders[indexes[0]]=orders[indexes[0]*1+s];
		orders[indexes[0]*1+s]=mirror;
	};
	if (type=='Position'){
		mirror=orders[indexes[0]].positions[indexes[1]];
		orders[indexes[0]].positions[indexes[1]]=orders[indexes[0]].positions[indexes[1]*1+s];
		orders[indexes[0]].positions[indexes[1]*1+s]=mirror;
	};
	if (type=='List'){
		mirror=lists[indexes[0]];
		lists[indexes[0]]=lists[indexes[0]*1+s];
		lists[indexes[0]*1+s]=mirror;
	};
	if (type=='Unit'){
		mirror=lists[indexes[0]].units[indexes[1]];
		lists[indexes[0]].units[indexes[1]]=lists[indexes[0]].units[indexes[1]*1+s];
		lists[indexes[0]].units[indexes[1]*1+s]=mirror;
	};
	pager(page);
};