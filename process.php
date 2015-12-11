<?php

$razdel = json_decode($_POST['arg']);

echo json_encode(array(
    'ok' => $razdel,
    'x' => 11111,
    'y' => array(1,2,3),
    'z' => 'lorem ipsum dolor'
));
?>
