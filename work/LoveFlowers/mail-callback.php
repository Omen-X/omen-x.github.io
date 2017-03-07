<?php 

$recepient = "tzvetov.magazin@yandex.ru";
$sitename = "LoveFlowers";

$name = trim($_POST["name"]);
$tel = trim($_POST["tel"]);
$message = "Имя: $name \nТелефон: $tel \n";

$pagetitle = "Заказ обратного звонка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
