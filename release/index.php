<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>方块大扫除</title>
    <meta name="viewport"
          content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no,target-densitydpi=device-dpi"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>

    <meta name="full-screen" content="true"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>

    <style>
        body {
            text-align: center;
            background: #ffffff;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
        html {
            -ms-touch-action: none; /* Direct all pointer events to JavaScript code. */
            overflow: hidden;
        }
        div, canvas {
            display:block;
            position:absolute;
            margin: 0 auto;
            padding: 0;
            border: 0;
        }
		#spn{
		margin-top:-50px;
		}
    </style>
</head>
<body>
 <script src="http://static.adwo.com/jssdk/jssdk.min.js"></script>
    <script type="text/javascript">      
        var test = new adwojs({
            eid: 'spn',
			aid: 'f6ffa8681e744fc6a1ebd76063706ef1', //申请的android平台pid
            pid: '35dc48fbca244807a3660f9be1a3ed5c', //申请的iphone平台pid
            bt: false,
            af:true, //是否自动适合ipad平板广告，默认值为true。
            width: 320, //广告图片宽度(除320外，还有720宽度，用于ipad中显示)
            height: 50  //广告图片高度(除50外，还有110高度，用于ipad中显示)
        });
        test.send();
    </script>
<div style="position:relative;" id="gameDiv"></div>
<div id="spn"></div>
<script>var document_class = "Main";</script><!--这部分内容在编译时会被替换，要修改文档类，请到工程目录下的egretProperties.json内编辑。-->
<script src="launcher/egret_require.js"></script>
<script src="launcher/egret_loader.js?v=10291"></script>
<script src="launcher/game-min.js?v=10301"></script>
<script src="launcher/WeixinAPI.js"></script>

<script>
    egret_h5.startGame();
</script>

<script id="shanku_api" src="http://h.qhimg.com/shanku/js/shanku-api.js?toolbar=hide"></script>

</body>
</html>