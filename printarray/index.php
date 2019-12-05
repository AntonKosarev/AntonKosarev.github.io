<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, maximum-scale=1.0, user-scalable=0">
    <meta name="viewport" content="width=device-width, initial-scale=yes">
    <title>Object List</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/main.css">
    <script src="js/main.js"></script>
	<?php
	require('php/Objectlist.php');
	?>
</head>
<body>
<!--[if lt IE 10]><p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a
        href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p><![endif]-->
<div class="page-wrapper">
<?php ?>

<!--    --><?php //echo $this->getTree($objectForList, 'tree_toggle()'); ?>

</div>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        new ObjectList().getObjectList();
    }, false);
</script>
</body>
</html>

