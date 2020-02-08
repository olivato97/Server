<?php
/*
Visto che useremo solo questa pagina per caricare tutte le altre viste
conviene creare la sessione e dopo usarla in tutti gli handler
*/
include_once('Management/InitSession.php');
if (!isset($_SESSION["databaseKey"])) {
    $_SESSION["databaseKey"] = "localhostLocale";
}

?>

<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="https://i.pinimg.com/originals/97/62/a5/9762a53ccc777ca0edb6a1d2717b8c6c.png">
    <title>Moaschetto</title>
    <link rel="stylesheet" href="/plugins/bootstrap-material-design-dist/css/bootstrap-material-design.css">
    <link rel="stylesheet" href="/plugins/fontawesome/css/all.css">
    <link rel="stylesheet" href="/plugins/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/style.css">

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<body>
    <nav class="navbar navbar-expand-lg">
        <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <!-- <div id="1Link" class="nav-item nav-link nav-class">Home <span class="sr-only">(current)</span></div>
                <div id="2Link" class="nav-item nav-link nav-class">Meme</div>
                <a class="nav-item nav-link" href="#">Pricing</a> -->
            </div>
        </div>
        <i id="LogInForm" class="fas fa-user"></i>
    </nav>
    <div id="wrap" class="wrap"></div>
    <div id="mySidenav" class="sidenav">
        <div class="nav-item nav-link nav-class menu-element" data-pagename="home">Home</div>

    </div>

    <div id="page-wrapper">


    </div>
</body>

<script src="/plugins/jquery/jquery-3.4.1.min.js"></script>
<script src="js/main.js"></script>
<script>
    $(document).ready(function() {
        loadScript("/plugins/popper/popper.min.js");
        loadScript("/plugins/bootstrap-material-design-dist/js/bootstrap-material-design.js");
        loadScript("/plugins/bootstrap/js/bootstrap.min.js");
        loadScript("/plugins/bootbox/bootbox.min.js");
        loadScript("/plugins/bootbox/bootbox.locales.min.js");
        loadScript('/plugins/bootstrap-notify/bootstrap-notify.min.js');
        setPermision("#mySidenav")
        SetButtonHandler("home")
        ChangePage("home");
    });
</script>

</html>