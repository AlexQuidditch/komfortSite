<?php
header("Content-type: text/html; charset=utf-8");
//**********************************************
if(empty($_POST['js'])){

$log ="";
$error="no"; //флаг наличия ошибки

		$formName = addslashes($_POST['formName']);
		$formName = htmlspecialchars($formName);
		$formName = stripslashes($formName);
		$formName = trim($formName);

		$formPhone = addslashes($_POST['formPhone']);
		$formPhone = htmlspecialchars($formPhone);
		$formPhone = stripslashes($formPhone);
		$formPhone = trim($formPhone););

		$formText = addslashes($_POST['formText']);
		$formText = htmlspecialchars($formText);
		$formText = stripslashes($formText);
		$formText = trim($formText);

//	Telegram Sender

	//Array of request parameters
$params = array(
'api_token'  => "insert token here",
'msg' =>
"Новый заказ звонка с сайта Komfort124:

Имя: $formName
Телефон: $formPhone

Сообщение:
$formText

Ваша служба доставки уведомлений :)"
);
// Generate URL-encoded query string from $params
$post = http_build_query($params);

// Preparing request
$context = stream_context_create(array(
                'http' => array(
                    'method' => 'POST', //Set it to GET to perform a GET request
                    'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                    'content' => $post,
                    'timeout' => 10,
                ),
            ));

// Perform the request
$response = file_get_contents("https://tg-notifcaster.rhcloud.com/api/v1/selfMessage", false, $context);
	echo "1";
}
