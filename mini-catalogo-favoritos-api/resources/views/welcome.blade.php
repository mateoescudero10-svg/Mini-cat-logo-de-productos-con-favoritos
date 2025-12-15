<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Mini Catálogo</title> 

    <meta name="csrf-token" content="{{ csrf_token() }}"> 

    @viteReactRefresh
    @vite('resources/js/main.jsx') 

</head>
<body>
    <div id="root"></div> 
</body>
</html>