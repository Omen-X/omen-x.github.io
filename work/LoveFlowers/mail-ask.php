<?php 
$recepient = "tzvetov.magazin@yandex.ru";
$sitename = "LoveFlowers";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$msg = trim($_POST["msg"]);
$message = "Имя: $name \nEmail: $email \nСообщение: $msg";

$pagetitle = "Вопрос с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
