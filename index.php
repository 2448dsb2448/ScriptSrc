<?php
function console_log ($output, $with_script_tags = true) {
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';
    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}

$link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']
    === 'on' ? "https" : "http") . "://" .
    $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];

if (strpos($link, "dev") !== false) {
    $dev_mode = true;
} else {
    $dev_mode = false;
}

if (strpos($link, "redesign") !== false) {
    $redesign_mode = true;
} else {
    $redesign_mode = false;
}

console_log("IS DEV MODE ON: " . ($dev_mode === true ? "TRUE" : "FALSE"));
console_log("IS REDESIGN MODE ON: " . ($dev_mode === true ? "TRUE" : "FALSE"));

if($dev_mode) {
    include 'development_index.php';
} elseif ($redesign_mode) {
    include 'redesign/index.php';
} else {
    include 'production_index.php';
}
