/**
 * Created by admin on 14-10-22.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.beginTime = 0; /**游戏开始时间**/
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
    }
    Main.prototype.onAddStage = function () {
        //egret.Profiler.getInstance().run();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("preload");
    };
    //加载完成
    Main.prototype.onGroupComp = function () {
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageWidth;
        this.readyTxt = new egret.TextField;
        //生成纹理集
        this.res = RES.getRes("res_json");
        //创建游戏层
        this.gameLayout = new egret.Sprite();
        this.gameLayout.y = 150;
        this.gameLayout.x = 5;
        this.gameLayout.width = this.stageW;
        this.gameLayout.height = this.stageH - this.gameLayout.y;
        DataManage.stageW = this.gameLayout.width;
        DataManage.stageH = this.gameLayout.height;
        //创建游戏静态界面
        this.gameView = new GameView();
        this.gameView.createStaticView(this, this.res);
        this.gameView.addEventListener("gameRestart", this.onRestart, this);
        this.gameView.addEventListener("gamePlay", this.onGamePlay, this);
        this.addChild(this.gameLayout);
        this.gameLayout.touchEnabled = true;
        this.gameLayout.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this, false, 1);
        //计时器
        this._time = new egret.Timer(110);
        this._time.addEventListener(egret.TimerEvent.TIMER, this.onTimerComplete, this);
        DataManage.sw = this.gameLayout.width / (DataManage.max_row + 1);
        DataManage.sh = this.gameLayout.height / (DataManage.max_row + 1);
        this.gameView.showGameBeginLayout();
        //初始化游戏数据
        //DataManage.createAllRect(this.gameLayout);
    };
    // 结束触摸
    Main.prototype.onTouchEnd = function () {
        if (!DataManage.isRunning) {
            return;
        }
        var len = DataManage.name_list.length;
        if (len >= 2) {
            for (var i = 0; i < len; i++) {
                var arr = DataManage.name_list[i].split('_');
                var index = arr[2];
                if (DataManage.index_list.indexOf(index) < 0) {
                    DataManage.index_list.push(index);
                }
            }
            if (DataManage.index_list.length == 1) {
                for (var i = 0; i < len; i++) {
                    var name = DataManage.name_list[i];
                    var arr = name.split('_');
                    var row = parseInt(arr[0]);
                    var col = parseInt(arr[1]);
                    var index2 = Util.getIndexByLineRow(row, col);
                    DataManage._data[index2].nextIsRemove = true;
                    DataManage._data[index2].nextIsAnm = false;
                    DataManage._data[index2] = 0;
                }
                this.playAnimation(len);
                DataManage.score += len;
                DataManage.xia();
                this.createNewRect(len);
            }
        }
        DataManage.name_list = [];
        DataManage.index_list = [];
    };
    Main.prototype.removeSpr = function (name) {
        var spr = this.gameLayout.getChildByName(name);
        this.gameLayout.removeChild(spr);
    };
    Main.prototype.createNewRect = function (len) {
        for (var i = 0; i < (DataManage.max_row * DataManage.max_row); i++) {
            if (DataManage._data[i] == 0) {
                var rect = new NewRect();
                rect.isUsed = true;
                rect.num = Math.ceil(4 * Math.random());
                var pointX = Math.floor(i / DataManage.max_row);
                var pointY = Math.floor(i % DataManage.max_row);
                rect.name = pointX + "_" + pointY + "_" + rect.num;
                rect.row = pointX;
                rect.column = pointY;
                rect.width = DataManage.sw;
                rect.height = DataManage.sh;
                var rectX = 20 + rect.width / 2 + (10 + rect.width) * rect.column;
                var rectY = 20 + rect.height / 2 + (10 + rect.height) * rect.row;
                var rect_post = Util.getPosByRect(rect);
                rect.x = rectX;
                rect.y = -DataManage.sh;
                rect.touchEnabled = true;
                rect.addEventListener(egret.TouchEvent.TOUCH_MOVE, DataManage.onTouchMove, DataManage);
                DataManage._rects[i] = rect;
                DataManage._data[i] = rect;
                this.gameLayout.addChild(rect);
                var y1 = rectY;
                var y2 = rectY - 30;
                DataManage._rects[i].playEffect2(y1, y2);
            }
        }
        if (DataManage.mode == 1) {
            DataManage.move += 1;
            this.gameView.updateScrore();
        }
        else if (DataManage.mode == 2) {
            DataManage.move -= 1;
            this.gameView.updateScrore();
            if (DataManage.move <= 0) {
                this.gameView.showGameOverLayout();
            }
        }
        else if (DataManage.mode == 3) {
            DataManage.move += 1;
            if (DataManage.num == 1) {
                DataManage.color1_num -= len;
                DataManage.color1_num = Math.max(0, DataManage.color1_num);
            }
            else if (DataManage.num == 2) {
                DataManage.color2_num -= len;
                DataManage.color2_num = Math.max(0, DataManage.color2_num);
            }
            else if (DataManage.num == 3) {
                DataManage.color3_num -= len;
                DataManage.color3_num = Math.max(0, DataManage.color3_num);
            }
            else if (DataManage.num == 4) {
                DataManage.color4_num -= len;
                DataManage.color4_num = Math.max(0, DataManage.color4_num);
            }
            this.gameView.updateScrore();
            if (DataManage.color1_num == 0 && DataManage.color2_num == 0 && DataManage.color3_num == 0 && DataManage.color4_num == 0) {
                this._time.stop();
                this.gameView.showGameOverLayout();
            }
        }
    };
    // 加分动画
    Main.prototype.playAnimation = function (score) {
        this.addChild(this.readyTxt);
        this.readyTxt.text = "+" + String(score);
        this.readyTxt.size = 60;
        this.readyTxt.fontFamily = '微软雅黑';
        this.readyTxt.textColor = 0x000000;
        this.readyTxt.scaleX = this.readyTxt.scaleY = 5;
        this.readyTxt.alpha = 0;
        this.readyTxt.anchorX = this.readyTxt.anchorY = 0.5;
        this.readyTxt.x = (this.stageW - this.readyTxt.width) / 2 + this.readyTxt.width / 2;
        this.readyTxt.y = this.stageH / 2;
        this.tw = egret.Tween.get(this.readyTxt, {
            loop: !1
        });
        this.tw.to({
            scaleX: 1,
            scaleY: 1,
            alpha: 0.8
        }, 500, egret.Ease.circInOut).call(this.removeReadtTxtEvent, this);
    };
    Main.prototype.removeReadtTxtEvent = function () {
        egret.Tween.removeTweens(this.tw);
        if (this.readyTxt.parent) {
            this.readyTxt.parent.removeChild(this.readyTxt);
        }
    };
    //键盘按下，或者移动事件发生
    Main.prototype.keyDowns = function () {
        this.gameView.updateScrore();
        //判断是否游戏结束
        if (DataManage.isGameOver()) {
            console.log("游戏结束"); //弹出结束面板
            this.gameView.showGameOverLayout();
        }
        else {
            this._time.start();
        }
    };
    //计时器完成
    Main.prototype.onTimerComplete = function () {
        var time_diff = egret.getTimer() - this.beginTime;
        if (DataManage.mode == 1) {
            var max_time = DataManage.time_limit;
            if (time_diff < max_time) {
                var left_time = DataManage.time_limit - time_diff;
                this.gameView.txt_time.text = String(left_time / 1000) + "''";
            }
            else {
                this._time.stop();
                this.gameView.showGameOverLayout();
            }
        }
        else {
            DataManage.collect_time = time_diff / 1000;
            this.gameView.txt_time.text = String(time_diff / 1000) + "''";
        }
    };
    //开始游戏
    Main.prototype.onGamePlay = function () {
        //初始化游戏数据
        DataManage.createAllRect(this.gameLayout);
        DataManage.isRunning = true;
        this.beginTime = egret.getTimer();
        if (DataManage.mode == 1) {
            this._time.start();
        }
        else if (DataManage.mode == 2) {
        }
        else if (DataManage.mode == 3) {
            this._time.start();
        }
    };
    //重新开始游戏
    Main.prototype.onRestart = function () {
        //DataManage.Restart();
        DataManage.createAllRect(this.gameLayout);
        this.beginTime = egret.getTimer();
        this._time.start();
        this.gameView.updateScrore();
    };
    return Main;
})(egret.DisplayObjectContainer);
