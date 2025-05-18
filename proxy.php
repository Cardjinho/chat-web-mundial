<?php
header('Content-Type: text/html');
header('Access-Control-Allow-Origin: *');

$url = 'https://www.placard.co.mz/#/';
$options = [
    'http' => [
        'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\r\n",
        'timeout' => 30
    ]
];

$context = stream_context_create($options);
$content = @file_get_contents($url, false, $context);

if ($content === FALSE) {
    die("Não foi possível carregar o conteúdo");
}

// Corrige links relativos
$content = preg_replace('/href="\/([^"]*)"/', 'href="https://www.placard.co.mz/$1"', $content);
$content = preg_replace('/src="\/([^"]*)"/', 'src="https://www.placard.co.mz/$1"', $content);
$content = preg_replace('/url\(\/([^\)]*)\)/', 'url(https://www.placard.co.mz/$1)', $content);

echo $content;
?>
