<!DOCTYPE html>
<html>
<head>
<Title>Chat</Title>
<script type="text/javascript">
	
</script>
<head>
<meta http-equiv="Cache-Control"
	content="no-cache, must-revalidate, private, no-store, s-maxage=0, max-age=0" />
        <meta http-equiv="Pragma" content="no-cache" />
        <title>Chat</title>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/resources/css/style.css"  />
        <script type="application/javascript">
            var nickname = '${user.usrLogin}';
        </script>   
        <script src="${pageContext.request.contextPath}/assets/resources/js/chat.js"></script>
        

    </head>
</head>

<body>
	<div id="main">
		<div id="header">
			<h2>Welcome to chat, ${user.usrLogin}!</h2>
		</div>
		<div id="console-container">
			<div id="console"></div>
		</div>
		<div>
			<input type="text" placeholder="type and press enter to chat"
				id="chat" />
		</div>
	</div>
	<div id="aside">
		<h3>Users Online</h3>
		<div id="loggedUsers"></div>
	</div>

</body>
</html>