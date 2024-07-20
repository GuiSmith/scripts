<?php

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	require 'PHPMailer/src/Exception.php';
	require 'PHPMailer/src/PHPMailer.php';
	require 'PHPMailer/src/SMTP.php';

	if (isset($_POST["submit"])) {
		
		$name = $_POST["name"];
		$email = $_POST["email"];
		$subject = $_POST["subject"];
		$content = $_POST["content"];

		$mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = 'smtp.gmail.com';
		$mail->SMTPAuth = true;
		$mail->Username = 'guilhermessmith2014@gmail.com';
		$mail->Password = 'juhzwxsfszqilmgm';
		$mail->Port = 465;
		$mail->SMTPSecure = 'ssl';
		$mail->isHTML (true);
		$mail->setFrom("",$name, $auto = false);
		$mail->addAddress($email);
		$mail->Subject = $subject;
		$mail->Body = $content;
		$mail->send();

		echo "Worked!";

	}

?>

<!-- HTML form to get the email address -->
<form method="POST" action="#">
    
	<p>
    	<label for = "name" >Name:</label><br>
    	<input id = "name" type = "text" name = "name">
    </p>

    <p>
    	<label for = "email" >E-mail:</label><br>
    	<input id = "email" type = "email" name = "email">
    </p>

    <p>
    	<label for = "subject" >Subject:</label><br>
    	<input id = "subject" type = "text" name = "subject">
    </p>

    <p>
    	<label for = "content" >Content:</label><br>
    	<textarea id = "content" name = "content" ></textarea>
    </p>

    <button type="submit" name="submit">Send</button>
</form>
