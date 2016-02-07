<?php

$content = json_decode($_POST['arg']);

$diagramdata1=json_decode('[{"name":"Токарный многорезцовый полуавтомат - 1731.Станок 2|SN=7|","operations":[{"order":"9","text":"Диск","start":480,"duration":97,"type":3},{"order":"10","text":"Кулачок","start":577,"duration":159,"type":0},{"order":"11","text":"Штуцер","start":871,"duration":116,"additionaltime":0,"type":1},{"order":"12","text":"Гайка","start":1036,"duration":172,"type":2},{"order":"13","text":"Штуцер","start":1615,"duration":213,"additionaltime":0,"type":1},{"order":"14","text":"Штуцер","start":1828,"duration":115,"additionaltime":0,"type":1}]},{"name":"Токарный копировальный полуавтомат - 1722|SN=6|","operations":[{"order":"15","text":"Кольцо","start":480,"duration":132,"type":4},{"order":"16","text":"Диск","start":612,"duration":345,"type":3},{"order":"17","text":"Кольцо","start":957,"duration":36,"type":4},{"order":"18","text":"Штуцер","start":993,"duration":231,"additionaltime":0,"type":1},{"order":"19","text":"Шайба","start":1224,"duration":189,"type":5}]},{"name":"Токарный многорезцовый полуавтомат с двусторонним приводом для обработки шатунных коренных шеек коленчатого вала - МК-139|SN=8|","operations":[{"order":"20","text":"Коленчатый вал","start":542,"duration":63,"type":7},{"order":"21","text":"Ступица","start":794,"duration":132,"type":6},{"order":"22","text":"Штуцер","start":1224,"duration":391,"additionaltime":0,"type":1}]},{"name":"Одношпиндельный револьверный автомат - 1А136|SN=10|","operations":[{"order":"23","text":"Кольцо","start":1269,"duration":312,"type":4},{"order":"24","text":"Шайба","start":1581,"duration":108,"type":5},{"order":"25","text":"Штуцер","start":1943,"duration":34,"additionaltime":0,"type":1}]},{"name":"Долбежный - 7417|SN=25|","operations":[{"order":"26","text":"Штуцер","start":1977,"duration":206,"additionaltime":0,"type":1}]},{"name":"Вертикально-фрезерный - 6H13|SN=19|","operations":[{"order":"27","text":"Шайба","start":1689,"duration":189,"type":5}]},{"name":"Револьверный (с горизонтальной осью револьверной головки) -1336M|SN=4|","operations":[]}]'
);
$diagramdata2=json_decode('[{"name":"Токарный многорезцовый полуавтомат - 1731.Станок 1|SN=7|","operations":[{"order":"3","text":"Диск","start":480,"duration":97,"type":3},{"order":"4","text":"Кулачок","start":577,"duration":159,"type":0},{"order":"5","text":"Штуцер","start":871,"duration":116,"additionaltime":0,"type":1},{"order":"6","text":"Гайка","start":1036,"duration":172,"type":2},{"order":"7","text":"Штуцер","start":1615,"duration":213,"additionaltime":0,"type":1},{"order":"8","text":"Штуцер","start":1828,"duration":115,"additionaltime":0,"type":1}]},{"name":"Токарный многорезцовый полуавтомат - 1731.Станок 2|SN=7|","operations":[{"order":"9","text":"Диск","start":480,"duration":97,"type":3},{"order":"10","text":"Кулачок","start":577,"duration":159,"type":0},{"order":"11","text":"Штуцер","start":871,"duration":116,"additionaltime":0,"type":1},{"order":"12","text":"Гайка","start":1036,"duration":172,"type":2},{"order":"13","text":"Штуцер","start":1615,"duration":213,"additionaltime":0,"type":1},{"order":"14","text":"Штуцер","start":1828,"duration":115,"additionaltime":0,"type":1}]},{"name":"Токарный копировальный полуавтомат - 1722|SN=6|","operations":[{"order":"15","text":"Кольцо","start":480,"duration":132,"type":4},{"order":"16","text":"Диск","start":612,"duration":345,"type":3},{"order":"17","text":"Кольцо","start":957,"duration":36,"type":4},{"order":"18","text":"Штуцер","start":993,"duration":231,"additionaltime":0,"type":1},{"order":"19","text":"Шайба","start":1224,"duration":189,"type":5}]},{"name":"Токарный многорезцовый полуавтомат с двусторонним приводом для обработки шатунных коренных шеек коленчатого вала - МК-139|SN=8|","operations":[{"order":"20","text":"Коленчатый вал","start":542,"duration":63,"type":7},{"order":"21","text":"Ступица","start":794,"duration":132,"type":6},{"order":"22","text":"Штуцер","start":1224,"duration":391,"additionaltime":0,"type":1}]},{"name":"Одношпиндельный револьверный автомат - 1А136|SN=10|","operations":[{"order":"23","text":"Кольцо","start":1269,"duration":312,"type":4},{"order":"24","text":"Шайба","start":1581,"duration":108,"type":5},{"order":"25","text":"Штуцер","start":1943,"duration":34,"additionaltime":0,"type":1}]},{"name":"Долбежный - 7417|SN=25|","operations":[{"order":"26","text":"Штуцер","start":1977,"duration":206,"additionaltime":0,"type":1}]},{"name":"Вертикально-фрезерный - 6H13|SN=19|","operations":[{"order":"27","text":"Шайба","start":1689,"duration":189,"type":5}]},{"name":"Револьверный (с горизонтальной осью револьверной головки) -1336M|SN=4|","operations":[]}]'
);

$object1=array(
"OrderName"=>"Заказы за январь",
"EquipmentScheme"=>"Имеющийся набор оборудования",
"EquipmentCost"=>"120 млн руб",
"ProcessTime"=>"4000 минут",
"Income"=>"500 тыс руб",
"ServicePrice"=>"50 тыс руб",
"CalculationTime"=>"20 мин",
"DiagramData"=>$diagramdata1
);

$object2=array(
"OrderName"=>"Заказы за январь",
"EquipmentScheme"=>"Имеющийся набор оборудования",
"EquipmentCost"=>"120 млн руб",
"ProcessTime"=>"4000 минут",
"Income"=>"500 тыс руб",
"ServicePrice"=>"50 тыс руб",
"CalculationTime"=>"20 мин",
"DiagramData"=>$diagramdata2
);

$result=[];
$result[]=$object1;
$result[]=$object2;

echo json_encode($result);
?>
