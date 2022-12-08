
<?php

$nombre = '';
$empresa =  '';
$email = '';
$telefono = '';
$requerimiento = '';

if (isset($_POST['nombre'])) {
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
}
if (isset($_POST['empresa'])) {
    $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
}
if (isset($_POST['email'])) {
    $email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['email']);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
}
if (isset($_POST['telefono'])) {
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_NUMBER_INT);
}
if (isset($_POST['requerimiento'])) {
    $requerimiento = htmlspecialchars($_POST['requerimiento']);
}

if ($nombre && $empresa && $email && $telefono && $requerimiento) {
    $headers  = 'MIME-Version: 1.0' . "\r\n"
        . 'Content-type: text/html; charset=utf-8' . "\r\n"
        . 'From: ' . $email . "\r\n".
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    $subject = "Contacto desde el sitio web";
    mail("contacto@impact.cl", $subject, $requerimiento, $headers);
    echo json_encode(array("sent" => true));
}else{
    echo json_encode(["sent" => false, "message" => "Por favor complete todos los campos"]);
}


?>
