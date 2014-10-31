/**
 * Created by admin on 14-10-22.
 */

class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
    }

    private onAddStage():void {
        //egret.Profiler.getInstance().run();

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("preload");
    }

    private gameView:GameView;      //游戏视图

    private res:egret.SpriteSheet;  //资源 纹理集
    private gameLayout:egret.Sprite; //游戏层
    private _time:egret.Timer;      //操作计时器
    private readyTxt:egret.TextField;
    private tw:egret.Tween;
    private stageW:number;
    private stageH:number;

    private beginTime:number = 0; /**游戏开始时间**/

    //加载完成
    private onGroupComp() {

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
        this.gameLayout.height = this.stageH-this.gameLayout.y;

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

        DataManage.sw = this.gameLayout.width/(DataManage.max_row+1);
        DataManage.sh = this.gameLayout.height/(DataManage.max_row+1);

        this.gameView.showGameBeginLayout();
        //初始化游戏数据
        //DataManage.createAllRect(this.gameLayout);
    }

    // 结束触摸
    private onTouchEnd()
    {
        if(!DataManage.isRunning)
        {
            return;
        }

        var len:number = DataManage.name_list.length;
        if (len >= 2)
        {
            for (var i:number = 0; i < len; i++)
            {
                var arr:string[] = DataManage.name_list[i].split('_');
                var index:string = arr[2];
                if (DataManage.index_list.indexOf(index) < 0)
                {
                    DataManage.index_list.push(index);
                }
            }

            if (DataManage.index_list.length == 1)
            {
                for (var i:number = 0; i < len; i++)
                {
                    var name:string = DataManage.name_list[i];
                    var arr:string[] = name.split('_');
                    var row:number = parseInt(arr[0]);
                    var col:number = parseInt(arr[1]);

                    var index2:number = Util.getIndexByLineRow(row,col);
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
    }

    private removeSpr(name)
    {
        var spr:egret.Sprite = <egret.Sprite> this.gameLayout.getChildByName(name);
        this.gameLayout.removeChild(spr);
    }

    private createNewRect(len)
    {
        for( var i:number=0; i<(DataManage.max_row*DataManage.max_row); i++ )
        {
            if( DataManage._data[i] == 0 )
            {
                var rect:NewRect = new NewRect();
                rect.isUsed = true;
                rect.num = Math.ceil(4 * Math.random());

                var pointX:number=Math.floor( i / DataManage.max_row );
                var pointY:number=Math.floor( i % DataManage.max_row );

                rect.name = pointX+"_"+pointY+"_"+rect.num;
                rect.row = pointX;
                rect.column = pointY;
                rect.width = DataManage.sw;
                rect.height = DataManage.sh;

                var rectX:number = 20 +rect.width/2 + ( 10 + rect.width )*rect.column;
                var rectY:number = 20 + rect.height/2 +( 10 + rect.height )*rect.row;

                var rect_post = Util.getPosByRect(rect);
                rect.x = rectX;
                rect.y = -DataManage.sh;

                rect.touchEnabled = true;
                rect.addEventListener(egret.TouchEvent.TOUCH_MOVE, DataManage.onTouchMove, DataManage);

                DataManage._rects[ i ] = rect;
                DataManage._data[ i ] = rect;

                this.gameLayout.addChild( rect );
                var y1:number = rectY;
                var y2:number = rectY - 30;

                DataManage._rects[i].playEffect2(y1,y2);

            }

        }

        if(DataManage.mode == 1)
        {
            DataManage.move += 1;
            this.gameView.updateScrore();
        }
        else if(DataManage.mode == 2)
        {
            DataManage.move -= 1;
            this.gameView.updateScrore();

            if(DataManage.move <=0)
            {
                this.gameView.showGameOverLayout();
            }
        }
        else if(DataManage.mode == 3)
        {
            DataManage.move += 1;

            if(DataManage.num == 1)
            {
                DataManage.color1_num -=len;
                DataManage.color1_num = Math.max(0,DataManage.color1_num);
            }
            else if(DataManage.num == 2)
            {
                DataManage.color2_num -=len;
                DataManage.color2_num = Math.max(0,DataManage.color2_num);
            }
            else if(DataManage.num == 3)
            {
                DataManage.color3_num -=len;
                DataManage.color3_num = Math.max(0,DataManage.color3_num);

            }
            else if(DataManage.num == 4)
            {
                DataManage.color4_num -=len;
                DataManage.color4_num = Math.max(0,DataManage.color4_num);
            }

            this.gameView.updateScrore();

            if(DataManage.color1_num == 0 && DataManage.color2_num == 0 &&DataManage.color3_num == 0 && DataManage.color4_num == 0)
            {
                this._time.stop();
                this.gameView.showGameOverLayout();
            }

        }
    }

    // 加分动画
    private playAnimation(score):void
    {
        this.addChild(this.readyTxt);
        this.readyTxt.text = "+"+String(score);
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
            },
            500, egret.Ease.circInOut).call(this.removeReadtTxtEvent, this)
    }

    private removeReadtTxtEvent():void
    {
        egret.Tween.removeTweens(this.tw);
        if(this.readyTxt.parent)
        {
            this.readyTxt.parent.removeChild(this.readyTxt);
        }

    }


    //键盘按下，或者移动事件发生
    private keyDowns():void
    {
        this.gameView.updateScrore();
        //判断是否游戏结束
        if( DataManage.isGameOver() )
        {
            console.log("游戏结束");//弹出结束面板
            this.gameView.showGameOverLayout();
        }
        else
        {
            this._time.start();
        }
    }

    //计时器完成
    private onTimerComplete():void
    {
        var time_diff:number = egret.getTimer() - this.beginTime;

        if(DataManage.mode == 1)
        {
            var max_time:number = DataManage.time_limit;
            if(time_diff < max_time)
            {
                var left_time:number = DataManage.time_limit - time_diff;
                this.gameView.txt_time.text = String(left_time/1000)+"''";
            }
            else
            {
                this._time.stop();
                this.gameView.showGameOverLayout();
            }
        }
        else
        {
            DataManage.collect_time = time_diff/1000;
            this.gameView.txt_time.text = String(time_diff/1000)+"''";
        }
    }

    //开始游戏
    private onGamePlay()
    {

        //初始化游戏数据
        DataManage.createAllRect(this.gameLayout);

        DataManage.isRunning = true;
        this.beginTime = egret.getTimer();

        if(DataManage.mode == 1)
        {
            this._time.start();
        }
        else if(DataManage.mode == 2)
        {

        }
        else  if(DataManage.mode == 3)
        {
            this._time.start();
        }
    }

    //重新开始游戏
    private onRestart()
    {
        //DataManage.Restart();
        DataManage.createAllRect(this.gameLayout);
        this.beginTime = egret.getTimer();
        this._time.start();
        this.gameView.updateScrore();
    }

}