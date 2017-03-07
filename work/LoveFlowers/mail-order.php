<?php 
$recepient = "tzvetov.magazin@yandex.ru";
$sitename = "LoveFlowers";

$name = trim($_POST["name"]);
$tel = trim($_POST["tel"]);
$email = trim($_POST["email"]);
$adress = trim($_POST["adress"]);

$count = trim($_POST["count"]);
$size = trim($_POST["size"]);
$color = trim($_POST["color"]);
$box = trim($_POST["box"]);
$price = trim($_POST["price"]);


$message = "Имя: $name \nТелефон: $tel \nE-mail: $email \nАдрес доставки: $adress \n\nДетали заказа\nКоличество: $count \nРазмер: $size \nЦвет: $color \nУпаковка: $box \nЦена: $price " ;

$pagetitle = "Оформление заказа с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
