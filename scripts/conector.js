$(document.getElementById('save')).on('click',save);
$(document.getElementById('open')).on('click',function(){document.getElementById('fileload').click()});
$(document.getElementById('fileload')).on('change',openthis);


function save() {
	allData=[items,machines,orders,lists];
	var allDataJSON=JSON.stringify(allData);
	var blob = new Blob([allDataJSON], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "allData.txt");
}

function openthis() {
	var file=this.files[0];
	var reader = new FileReader();
	reader.onload = function (e) {
    	allData = JSON.parse(e.target.result);
    	items=allData[0];
    	machines=allData[1];
    	orders=allData[2];
    	lists=allData[3];
    	pager(page);
	};
	reader.readAsText(file);
	this.value='';
}

function saveListJSON() {
	var restructure={FacilityWidth: (currentObject.y)*1,FacilityLength: (currentObject.x)*1,FacilityEquipment:[]};
	restructure.FacilityEquipment=currentObject.units.map(function(unit){return({name: machines[unit.equip].name,serial: machines[unit.equip].shifr,width: machines[unit.equip].y,length: machines[unit.equip].x,count: unit.count})});
	var listRestructJSON=JSON.stringify(restructure), num=currentLine.slice(2).split('.')[0];
	var blob = new Blob([listRestructJSON], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "list"+num+"Restruct.txt");
}



// <input id="fileload" type="file" />