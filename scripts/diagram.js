function diagramPrepare() {
	document.getElementById('main').innerHTML="Данные обрабатываются. Пожалуйста, подождите.";
	$.ajax({
    type: 'POST',
    url: 'process.php',
    dataType: 'json',
    data: {
        arg: 22
    },
    success: function(data) {console.log(data);}
	});
};

function createDiagram() {
	document.getElementById('main').innerHTML="Готово.";
}