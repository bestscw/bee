/**
 * Created by mebius on 14-7-22.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.apply(this, arguments);
    }
    //创建全局静态界面
    GameView.prototype.createStaticView = function (rootLayout, res) {
        //this.createTitleBitmap( rootLayout, res );
        //this.createRectBackground( rootLayout, res );
        this.createShareBitmap(rootLayout, res);
        this.createGameBeginLayout(rootLayout);
        this.createGameOverLayout(rootLayout, res);
        this.createScoreText(rootLayout);
        var str = "小伙伴,敢不敢试试你能消除多少彩色方块！";
        this.weixinShare(str);
    };
    //创建分享界面界面
    GameView.prototype.createShareBitmap = function (rootLayout, res) {
        var titleBitmap = new egret.Bitmap();
        titleBitmap.texture = res.getTexture("shareTips");
        titleBitmap.width = egret.MainContext.instance.stage.stageWidth;
        titleBitmap.height = egret.MainContext.instance.stage.stageHeight;
        titleBitmap.touchEnabled = true;
        titleBitmap.alpha = 50;
        titleBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeShareTips, this);
        this.shareTips = titleBitmap;
        //rootLayout.addChild( titleBitmap );
    };
    GameView.prototype.closeShareTips = function () {
        this._gameOverLayoutParent.removeChild(this.shareTips);
    };
    //创建标题界面
    GameView.prototype.createTitleBitmap = function (rootLayout, res) {
        var titleBitmap = new egret.Bitmap();
        titleBitmap.texture = res.getTexture("menu");
        titleBitmap.width = egret.MainContext.instance.stage.stageWidth;
        rootLayout.addChild(titleBitmap);
    };
    GameView.prototype.createGameBeginLayout = function (rootLayout) {
        this._gameOverLayoutParent = rootLayout;
        this._gameBeginLayout = new egret.Sprite();
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        this._gameBeginLayout.graphics.beginFill(0xffffff, 1);
        this._gameBeginLayout.graphics.drawRect(0, 0, w, h);
        this._gameBeginLayout.x = 0;
        this._gameBeginLayout.y = 0;
        this._gameBeginLayout.width = w;
        this._gameBeginLayout.height = h;
        this._gameBeginLayout.graphics.endFill();
        var btnPlay1 = new egret.Bitmap();
        btnPlay1.texture = RES.getRes("start1");
        btnPlay1.x = 160;
        btnPlay1.y = 170;
        btnPlay1.width = 160;
        btnPlay1.height = 160;
        btnPlay1.name = "mode_1";
        this._gameBeginLayout.addChild(btnPlay1);
        btnPlay1.touchEnabled = true;
        btnPlay1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchOver, this, false, 1);
        /**
        var btnPlay1:egret.Sprite = new egret.Sprite();
        btnPlay1.graphics.beginFill(0xfBBE300, 1);
        btnPlay1.graphics.drawCircle( 0, 0, 80 );
        btnPlay1.graphics.endFill();
        btnPlay1.x = 160;
        btnPlay1.y = 170;
        btnPlay1.width=160;
        btnPlay1.height=160;
        btnPlay1.name = "mode_1";
        this._gameBeginLayout.addChild( btnPlay1 );
        btnPlay1.touchEnabled = true;
        btnPlay1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchOver, this,false,1);

        var txt1:egret.TextField = new egret.TextField();
        txt1.x = -10;
        txt1.y = 2;
        txt1.fontFamily = '微软雅黑';
        txt1.text = "时间";
        txt1.textColor = 0xFFFFFF;
        btnPlay1.addChild( txt1 );
         **/
        var btnPlay2 = new egret.Bitmap();
        btnPlay2.texture = RES.getRes("start2");
        btnPlay2.x = 320;
        btnPlay2.y = 170;
        btnPlay2.width = 120;
        btnPlay2.height = 120;
        btnPlay2.name = "mode_2";
        this._gameBeginLayout.addChild(btnPlay2);
        btnPlay2.touchEnabled = true;
        btnPlay2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchOver, this, false, 1);
        /**

        var btnPlay2:egret.Sprite = new egret.Sprite();
        btnPlay2.graphics.beginFill(0x00D70B, 1);
        btnPlay2.graphics.drawCircle( 0, 0, 60 );
        btnPlay2.graphics.endFill();
        btnPlay2.x = 320;
        btnPlay2.y = 170;
        btnPlay2.width=120;
        btnPlay2.height=120;
        btnPlay2.name = "mode_2";
        this._gameBeginLayout.addChild( btnPlay2 );
        btnPlay2.touchEnabled = true;
        btnPlay2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchOver,  this,false,1);

        var txt2:egret.TextField = new egret.TextField();
        txt2.x = -10;
        txt2.y = 2;
        txt2.fontFamily = '微软雅黑';
        txt2.text = "步数";
        txt2.textColor = 0xFFFFFF;
        btnPlay2.addChild( txt2 );

         **/
        var btnPlay3 = new egret.Bitmap();
        btnPlay3.texture = RES.getRes("start3");
        btnPlay3.x = 220;
        btnPlay3.y = 330;
        btnPlay3.width = 140;
        btnPlay3.height = 140;
        btnPlay3.name = "mode_3";
        this._gameBeginLayout.addChild(btnPlay3);
        btnPlay3.touchEnabled = true;
        btnPlay3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchOver, this, false, 1);
        var sm = new egret.TextField();
        this._gameBeginLayout.addChild(sm);
        sm.size = 20;
        sm.text = '滑动或者移动即可消除，至少选择两个颜色\n相同的块即可消除\n\n时间模式，在指定的时间内消除的方块越多\n，得分越高\n\n步数模式，在指定的步数内，消除的方块越\n多，得分越高\n\n收集模式，收集完各种方块的时间越短越优秀';
        sm.lineSpacing = 3;
        sm.fontFamily = "微软雅黑";
        sm.textColor = 0x000000;
        sm.x = 30;
        sm.y = 470;
        sm.textAlign = egret.HorizontalAlign.LEFT;
        /**
        var btnPlay3:egret.Sprite = new egret.Sprite();
        btnPlay3.graphics.beginFill(0xF0BD01, 1);
        btnPlay3.graphics.drawCircle( 0, 0, 70 );
        btnPlay3.graphics.endFill();
        btnPlay3.x = 220;
        btnPlay3.y = 330;
        btnPlay3.width=140;
        btnPlay3.height=140;
        btnPlay3.name = "mode_3";
        this._gameBeginLayout.addChild( btnPlay3 );
        btnPlay3.touchEnabled = true;
        btnPlay3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchOver,  this,false,1);

        var txt3:egret.TextField = new egret.TextField();
        txt3.x = -10;
        txt3.y = 2;
        txt3.fontFamily = '微软雅黑';
        txt3.text = "收集";
        txt3.textColor = 0xFFFFFF;
        btnPlay3.addChild( txt3 );

         **/
        //rootLayout.addChild(this._gameBeginLayout);
    };
    //创建盒子背景
    GameView.prototype.createRectBackground = function (rootLayout, res) {
        var scale = new egret.Rectangle(16, 13, 69, 70);
        var bg = new egret.Bitmap();
        bg.texture = res.getTexture("background");
        bg.width = egret.MainContext.instance.stage.stageWidth;
        bg.height = egret.MainContext.instance.stage.stageWidth;
        bg.scale9Grid = scale;
        bg.y = 105;
        rootLayout.addChild(bg);
        for (var i = 0; i < 4; i++) {
            for (var t = 0; t < 4; t++) {
                var bit = new egret.Bitmap();
                bit.texture = res.getTexture("backtile");
                bit.x = 10 + (10 + bit.width) * t;
                bit.y = 105 + 10 + (10 + bit.height) * i;
                rootLayout.addChild(bit);
            }
        }
    };
    GameView.prototype.createGameOverLayout = function (rootLayout, res) {
        this._gameOverLayoutParent = rootLayout;
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        this._gameOverLayout = new egret.Sprite();
        this._gameOverLayout.graphics.beginFill(DataManage.titleColor2, 1);
        this._gameOverLayout.graphics.drawRect(0, 0, w, h);
        this._gameOverLayout.x = 0;
        this._gameOverLayout.y = 0;
        this._gameOverLayout.width = w;
        this._gameOverLayout.height = h;
        this._gameOverLayout.graphics.endFill();
        var record = new egret.TextField();
        this._gameOverLayout.addChild(record);
        record.width = w;
        record.height = h * 0.3;
        record.size = 50;
        record.text = '当前记录:0';
        record.italic = true;
        record.lineSpacing = 3;
        record.fontFamily = "微软雅黑";
        record.textColor = 0x000000;
        record.x = 0;
        record.y = 1 * (h * 0.15);
        record.textAlign = egret.HorizontalAlign.CENTER;
        record.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.txtRecord = record;
        var newRecord = new egret.TextField();
        this._gameOverLayout.addChild(newRecord);
        newRecord.width = w;
        newRecord.height = h * 0.3;
        newRecord.size = 50;
        newRecord.fontFamily = "微软雅黑";
        newRecord.text = "最佳记录:0";
        newRecord.textColor = 0xFFFFFF;
        newRecord.x = 0;
        newRecord.y = 1 * (h * 0.3);
        newRecord.textAlign = egret.HorizontalAlign.CENTER;
        newRecord.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.txtNewRecord = newRecord;
        var sprReplay = new egret.Sprite();
        sprReplay.graphics.beginFill(DataManage.titleColor2, 1);
        sprReplay.graphics.lineStyle(2, 0xFFFFFF);
        sprReplay.graphics.drawRoundRect(0, 0, w * 0.25, 60, 20, 20);
        sprReplay.graphics.endFill();
        sprReplay.x = w * 0.2;
        sprReplay.y = 2 * (h * 0.3);
        sprReplay.width = w * 0.25;
        sprReplay.height = 60;
        sprReplay.touchEnabled = true;
        sprReplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
        this._gameOverLayout.addChild(sprReplay);
        var txtReplay = new egret.TextField();
        sprReplay.addChild(txtReplay);
        txtReplay.x = sprReplay.width * 0.26;
        txtReplay.y = 12;
        txtReplay.bold = true;
        txtReplay.size = 25;
        txtReplay.text = '重玩';
        txtReplay.fontFamily = "微软雅黑";
        txtReplay.textColor = 0xffffff;
        txtReplay.textAlign = egret.HorizontalAlign.CENTER;
        txtReplay.verticalAlign = egret.VerticalAlign.MIDDLE;
        txtReplay.touchEnabled = true;
        txtReplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
        sprReplay.addChild(txtReplay);
        var sprReturn = new egret.Sprite();
        this._gameOverLayout.addChild(sprReturn);
        sprReturn.graphics.beginFill(DataManage.titleColor2, 1);
        sprReturn.graphics.lineStyle(2, 0xFFFFFF);
        sprReturn.graphics.drawRoundRect(0, 0, w * 0.25, 60, 20, 20);
        sprReturn.graphics.endFill();
        sprReturn.x = w * 0.5;
        sprReturn.y = 2 * (h * 0.3);
        sprReturn.width = w * 0.25;
        sprReturn.height = 60;
        sprReturn.touchEnabled = true;
        sprReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameStart, this);
        var txtReturn = new egret.TextField();
        sprReturn.addChild(txtReturn);
        txtReturn.size = 25;
        txtReturn.x = sprReturn.width * 0.26;
        txtReturn.y = 12;
        txtReturn.bold = true;
        txtReturn.fontFamily = "微软雅黑";
        txtReturn.text = '返回';
        txtReturn.textColor = 0xffffff;
        txtReturn.textAlign = egret.HorizontalAlign.CENTER;
        txtReturn.verticalAlign = egret.VerticalAlign.MIDDLE;
        txtReturn.touchEnabled = true;
        txtReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameStart, this);
        var sprShare = new egret.Sprite();
        this._gameOverLayout.addChild(sprShare);
        sprShare.graphics.beginFill(DataManage.titleColor2, 1);
        sprShare.graphics.lineStyle(1, 0xFFFFFF);
        sprShare.graphics.drawRoundRect(0, 0, w / 4, 50, 20, 20);
        sprShare.graphics.endFill();
        sprShare.x = w * 0.7;
        sprShare.y = 2 * (h * 0.3);
        sprShare.width = w / 3;
        sprShare.height = 60;
        var txtShare = new egret.TextField();
        sprShare.addChild(txtShare);
        txtShare.x = sprShare.width * 0.26;
        txtShare.y = 9;
        txtShare.size = 25;
        txtShare.fontFamily = "微软雅黑";
        txtShare.text = '更多游戏';
        txtShare.textColor = 0xffffff;
        txtShare.textAlign = egret.HorizontalAlign.CENTER;
        txtShare.verticalAlign = egret.VerticalAlign.MIDDLE;
        txtShare.touchEnabled = true;
        txtShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moreGame, this, false, 1);
    };
    GameView.prototype.moreGame = function () {
        moreGame();
    };
    GameView.prototype.onGameStart = function () {
        this._gameOverLayoutParent.removeChild(this._gameOverLayout);
        this._gameOverLayoutParent.addChild(this._gameBeginLayout);
    };
    GameView.prototype.createTxtField = function (x, y, width, height, fontsize, fontFamily, text, textColor, touchEnabled, callback) {
        var txtField = new egret.TextField();
        txtField.width = width;
        txtField.height = height;
        txtField.size = fontsize;
        txtField.fontFamily = fontFamily;
        txtField.text = text;
        txtField.textColor = textColor;
        txtField.x = x;
        txtField.y = y;
        txtField.textAlign = egret.HorizontalAlign.CENTER;
        txtField.verticalAlign = egret.VerticalAlign.MIDDLE;
        if (touchEnabled) {
            txtField.touchEnabled = true;
            txtField.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, this, false, 1);
        }
    };
    //显示游戏结束画面
    GameView.prototype.showGameOverLayout = function () {
        DataManage.restartAllRect();
        var key = "beeGameMode_" + DataManage.mode;
        ;
        var best = Number(egret.localStorage.getItem(key));
        if (DataManage.mode == 1) {
            if (DataManage.score > best) {
                best = Number(DataManage.score);
            }
            this.txtRecord.text = '当前记录:' + String(DataManage.score);
            var str = '我在【方块大扫除】指定时间内一口气消了' + DataManage.score + '个彩色方块，小伙伴们快来超越我吧！';
        }
        else if (DataManage.mode == 2) {
            if (DataManage.score > best) {
                best = Number(DataManage.score);
            }
            this.txtRecord.text = '当前记录:' + String(DataManage.score);
            var str = '我在【方块大扫除】指定步数内一口气消了' + DataManage.score + '个彩色方块，小伙伴们快来超越我吧！';
        }
        else if (DataManage.mode == 3) {
            if ((DataManage.collect_time < best) || (best == 0)) {
                best = Number(DataManage.collect_time);
            }
            this.txtRecord.text = '当前记录:' + String(DataManage.collect_time) + '"';
            var str = '我在【方块大扫除】收集各种彩色方块耗时' + DataManage.collect_time + '，小伙伴们快来超越我吧！';
        }
        if (DataManage.platform == 0) {
            this.weixinShare(str);
        }
        else {
            shareGame(str);
        }
        this.txtNewRecord.text = '最佳记录' + String(best);
        egret.localStorage.setItem(key, String(best));
        DataManage.Restart();
        this._gameOverLayoutParent.addChild(this._gameOverLayout);
    };
    //显示游戏进入画面
    GameView.prototype.showGameBeginLayout = function () {
        this._gameOverLayoutParent.addChild(this._gameBeginLayout);
    };
    GameView.prototype.weixinShare = function (str) {
        WeixinApi.ready(function (Api) {
            // 微信分享的数据
            var wxData = {
                "appId": "",
                "imgUrl": 'http://app.easymobi.cn/game/bee/logo.png',
                "link": 'http://beegame.jd-app.com/',
                "desc": str,
                "title": "小伙伴们和我一起玩[方块大扫除]游戏吧!"
            };
            // 分享的回调
            var wxCallbacks = {
                // 分享操作开始之前
                ready: function () {
                    // 你可以在这里对分享的数据进行重组
                    //alert("准备分享");
                },
                // 分享被用户自动取消
                cancel: function (resp) {
                    // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
                    //alert("分享被取消");
                },
                // 分享失败了
                fail: function (resp) {
                    // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
                    //alert("分享失败");
                },
                // 分享成功
                confirm: function (resp) {
                    //创建GET请求
                    //alert("分享成功");
                },
                // 整个分享过程结束
                all: function (resp) {
                    // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
                    //alert("分享结束");
                }
            };
            // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
            Api.shareToFriend(wxData, wxCallbacks);
            // 点击分享到朋友圈，会执行下面这个代码
            Api.shareToTimeline(wxData, wxCallbacks);
            // 点击分享到腾讯微博，会执行下面这个代码
            Api.shareToWeibo(wxData, wxCallbacks);
        });
    };
    //
    GameView.prototype.onRestart = function () {
        DataManage.Restart();
        if (this._gameOverLayout.parent) {
            this._gameOverLayout.parent.removeChild(this._gameOverLayout);
        }
        var evt = new egret.Event("gameRestart");
        this.dispatchEvent(evt);
    };
    GameView.prototype.onTouchOver = function (evt) {
        var arr = evt.target.name.split('_');
        DataManage.mode = parseInt(arr[1]);
        console.log('mode:' + DataManage.mode);
        this._gameOverLayoutParent.removeChild(this._gameBeginLayout);
        this._gameOverLayoutParent.addChild(this._gameMenuLayout);
        if (DataManage.mode == 1) {
            if (!this.time_name.parent) {
                this._gameMenuLayout.addChild(this.time_name);
            }
            if (!this.txt_time.parent) {
                this._gameMenuLayout.addChild(this.txt_time);
            }
            if (this.colorContainer.parent) {
                this.colorContainer.parent.removeChild(this.colorContainer);
            }
        }
        else if (DataManage.mode == 2) {
            if (this.colorContainer.parent) {
                this.colorContainer.parent.removeChild(this.colorContainer);
            }
            if (this.time_name.parent) {
                this.time_name.parent.removeChild(this.time_name);
            }
            if (this.txt_time.parent) {
                this.txt_time.parent.removeChild(this.txt_time);
            }
            this.move.text = String(DataManage.move_limit);
            DataManage.move = DataManage.move_limit;
        }
        else if (DataManage.mode == 3) {
            if (!this.colorContainer.parent) {
                this._gameMenuLayout.addChild(this.colorContainer);
            }
        }
        DataManage.Restart();
        var evt2 = new egret.Event("gamePlay");
        this.dispatchEvent(evt2);
        /**
        var tw = egret.Tween.get(this._gameBeginLayout.getChildByName(evt.target.name),true);
        tw.to({scaleX:1.3,scaleY:1.3,alpha:0.1},100);
        tw.to({scaleX:1,scaleY:1,alpha:1},100).call(this.onGamePlay,this,evt);
         **/
    };
    GameView.prototype.createScoreText = function (rootLayout) {
        this._gameMenuLayout = new egret.Sprite();
        this.time_name = new egret.TextField();
        this.time_name.x = 10;
        this.time_name.y = 30;
        this.time_name.fontFamily = '微软雅黑';
        this.time_name.text = "时间";
        this.time_name.textColor = 0xF0BD01;
        this._gameMenuLayout.addChild(this.time_name);
        this.txt_time = new egret.TextField();
        this.txt_time.x = DataManage.stageW * 0.17;
        this.txt_time.y = 30;
        this.txt_time.textColor = 0x666666;
        this._gameMenuLayout.addChild(this.txt_time);
        this.txt_name = new egret.TextField();
        this.txt_name.x = DataManage.stageW * 0.43;
        this.txt_name.y = 30;
        this.txt_name.fontFamily = '微软雅黑';
        this.txt_name.text = "积分";
        this.txt_name.textColor = 0xBBE300;
        this._gameMenuLayout.addChild(this.txt_name);
        this.txt = new egret.TextField();
        this.txt.x = DataManage.stageW * 0.57;
        this.txt.y = 30;
        this.txt.textColor = 0x666666;
        this._gameMenuLayout.addChild(this.txt);
        this.move_name = new egret.TextField();
        this.move_name.x = DataManage.stageW * 0.7;
        this.move_name.y = 30;
        this.move_name.text = "步数";
        this.move_name.fontFamily = '微软雅黑';
        this.move_name.textColor = 0x00D70B;
        this._gameMenuLayout.addChild(this.move_name);
        this.move = new egret.TextField();
        this.move.x = DataManage.stageW * 0.85;
        this.move.y = 30;
        this.move.textColor = 0x666666;
        this._gameMenuLayout.addChild(this.move);
        this.createColorContainer();
        this._gameMenuLayout.addChild(this.colorContainer);
        this.updateScrore();
    };
    // 创建模式3需要的颜色容器
    GameView.prototype.createColorContainer = function () {
        var width = 20;
        this.colorContainer = new egret.Sprite();
        this.colorContainer.graphics.beginFill(0xededed, 1);
        this.colorContainer.graphics.drawRoundRect(0, 0, DataManage.stageW / 2, 45, 10, 10);
        this.colorContainer.graphics.endFill();
        this.colorContainer.x = DataManage.stageW * 0.5;
        this.colorContainer.y = 80;
        this.colorContainer.width = DataManage.stageW / 2;
        this.colorContainer.height = 100;
        var sp1 = new egret.Sprite();
        sp1.graphics.beginFill(DataManage.titleColor1, 0.5);
        sp1.graphics.drawCircle(0, 0, width / 2);
        sp1.graphics.endFill();
        sp1.x = 20;
        sp1.y = 20;
        sp1.width = width;
        sp1.height = width;
        this.colorContainer.addChild(sp1);
        this.txtColor1 = new egret.TextField();
        this.txtColor1.x = 35;
        this.txtColor1.y = 10;
        this.txtColor1.size = 18;
        this.txtColor1.textColor = 0x666666;
        this.colorContainer.addChild(this.txtColor1);
        var sp2 = new egret.Sprite();
        sp2.graphics.beginFill(DataManage.titleColor2, 0.5);
        sp2.graphics.drawCircle(0, 0, width / 2);
        sp2.graphics.endFill();
        sp2.x = 80;
        sp2.y = 20;
        sp2.width = width;
        sp2.height = width;
        this.colorContainer.addChild(sp2);
        this.txtColor2 = new egret.TextField();
        this.txtColor2.x = 95;
        this.txtColor2.y = 10;
        this.txtColor2.size = 18;
        this.txtColor2.textColor = 0x666666;
        this.colorContainer.addChild(this.txtColor2);
        var sp3 = new egret.Sprite();
        sp3.graphics.beginFill(DataManage.titleColor3, 0.5);
        sp3.graphics.drawCircle(0, 0, width / 2);
        sp3.graphics.endFill();
        sp3.x = 135;
        sp3.y = 20;
        sp3.width = width;
        sp3.height = width;
        this.colorContainer.addChild(sp3);
        this.txtColor3 = new egret.TextField();
        this.txtColor3.x = 150;
        this.txtColor3.y = 10;
        this.txtColor3.size = 18;
        this.txtColor3.textColor = 0x666666;
        this.colorContainer.addChild(this.txtColor3);
        var sp4 = new egret.Sprite();
        sp4.graphics.beginFill(DataManage.titleColor4, 0.5);
        sp4.graphics.drawCircle(0, 0, width / 2);
        sp4.graphics.endFill();
        sp4.x = 195;
        sp4.y = 20;
        sp4.width = width;
        sp4.height = width;
        this.colorContainer.addChild(sp4);
        this.txtColor4 = new egret.TextField();
        this.txtColor4.x = 210;
        this.txtColor4.y = 10;
        this.txtColor4.size = 18;
        this.txtColor4.textColor = 0x666666;
        this.colorContainer.addChild(this.txtColor4);
    };
    //更新分数
    GameView.prototype.updateScrore = function () {
        this.txt.text = String(DataManage.score);
        this.move.text = String(DataManage.move);
        this.txt_time.text = String(DataManage.time_limit / 1000) + "''";
        this.txtColor1.text = String(DataManage.color1_num);
        this.txtColor2.text = String(DataManage.color2_num);
        this.txtColor3.text = String(DataManage.color3_num);
        this.txtColor4.text = String(DataManage.color4_num);
    };
    return GameView;
})(egret.EventDispatcher);
