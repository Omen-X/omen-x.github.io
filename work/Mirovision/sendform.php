<?php

$data = json_decode( str_replace( '\\\\', '\\', str_replace( '\\"', '"', $_POST['data'] ) ) );

// отправка уведомления админу
$emailSender = 'aviatorflyok@gmail.com';
$siteName    = '';


$headers = "From: info@site.ru\r\n";
$headers .= "X-Mailer: Content Manager - PHP/" . phpversion();
$headers .= "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=utf-8\r\n";
$headers .= "Content-Transfer-Encoding: quoted-printable\r\n";

$subject = "=?UTF-8?Q?" . $siteName . ". Поступило новое сообщение?=";

$message = "<h4>Вам поступило новое сообщение</h4><br />";
$message .= "<b>Имя:</b> " . $data->name . "<br />";
$message .= "<b>Телефон:</b> " . $data->phone . "<br />";
$message .= "<b>E-mail:</b> " . $data->theme . "<br />";
$message .= "<br /> С уважением, Администрация сайта.";

mail( $emailSender, $subject, $message, $headers );

echo 'Success';

exit;





