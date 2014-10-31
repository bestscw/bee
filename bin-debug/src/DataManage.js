/**
 * Created by mebius on 14-7-22.
 */
var DataManage = (function () {
    function DataManage() {
    }
    //创建所有的方块
    DataManage.createAllRect = function (rootLayout) {
        for (var i = 0; i < DataManage.max_row; i++) {
            for (var j = 0; j < DataManage.max_row; j++) {
                var rect = new NewRect();
                rect.isUsed = true;
                rect.num = Math.ceil(4 * Math.random());
                rect.name = i + "_" + j + "_" + rect.num;
                rect.row = i;
                rect.column = j;
                rect.width = DataManage.sw;
                rect.height = DataManage.sh;
                var rect_post = Util.getPosByRect(rect);
                rect.x = rect_post.x;
                rect.y = rect_post.y;
                rect.touchEnabled = true;
                rect.addEventListener(egret.TouchEvent.TOUCH_MOVE, DataManage.onTouchMove, this);
                var index = Util.getIndexByLineRow(rect.row, rect.column);
                DataManage._rects[index] = rect;
                DataManage._data[index] = rect;
                rootLayout.addChild(rect);
            }
        }
    };
    DataManage.onTouchMove = function (evt) {
        if (!DataManage.isRunning) {
            return;
        }
        var name = evt.target.name;
        if (this.name_list.indexOf(name) < 0) {
            this.name_list.push(name);
            var arr = name.split('_');
            var row = parseInt(arr[0]);
            var col = parseInt(arr[1]);
            DataManage.num = parseInt(arr[2]);
            var index = Util.getIndexByLineRow(row, col);
            DataManage._rects[index].playEffect();
            var sound = RES.getRes("click");
            sound.play();
        }
    };
    //找一个未使用的方块
    DataManage.selectNewRect = function () {
        for (var i = 0; i < 16; i++) {
            if (DataManage._rects[i].isUsed == false) {
                return DataManage._rects[i];
            }
        }
        return null;
    };
    //重新开始游戏
    DataManage.Restart = function () {
        this.score = 0;
        if (this.mode == 2) {
            this.move = this.move_limit;
        }
        else if (this.mode == 1) {
            this.move = 0;
        }
        else if (this.mode == 3) {
            this.move = 0;
            this.color1_num = this.color1_limit;
            this.color2_num = this.color2_limit;
            this.color3_num = this.color3_limit;
            this.color4_num = this.color4_limit;
            this.collect_time = 0;
        }
        this.isRunning = true;
    };
    //重新开始游戏
    DataManage.restartAllRect = function () {
        this.isRunning = true;
        for (var i = 0; i < (DataManage.max_row * DataManage.max_row); i++) {
            DataManage._data[i] = 0;
            DataManage._rects[i].restart();
        }
        //this.restartAllRect();
    };
    //下
    DataManage.xia = function () {
        var ar = DataManage.selectArr(0);
        for (var i = 0; i < DataManage.max_row; i++) {
            ar[i] = ar[i].reverse();
            DataManage.moveArr(ar[i]);
        }
        //DataManage.restartAllRect( );
        DataManage.playAllRect();
    };
    //判断游戏是否结束
    DataManage.isGameOver = function () {
        return false;
        /**
        var rel:boolean = true;

        var ar:Array<any> = DataManage.selectArr(0);
        for( var i:number=0;i<ar.length;i++)
        {
            for( var t:number=0;t<3;t++)
            {
                if( DataManage._data[ar[i][t]].num == DataManage._data[ar[i][t+1]].num )
                {
                    rel = false;
                }
            }
        }
        ar = DataManage.selectArr(1);
        for( var i:number=0;i<ar.length;i++)
        {
            for( var t:number=0;t<3;t++)
            {
                if( DataManage._data[ar[i][t]].num == DataManage._data[ar[i][t+1]].num )
                {
                    rel = false;
                }
            }
        }
         **/
        //return rel;
    };
    //移动方块,val是一个1维数组
    DataManage.moveArr = function (val) {
        var karr = [];
        for (var i = 0; i < val.length; i++) {
            if (DataManage._data[val[i]] != 0) {
                karr.push(DataManage._data[val[i]]);
            }
        }
        var calnum = [];
        for (var t = 0; t < DataManage.max_row; t++) {
            if (karr[t]) {
                DataManage._data[val[t]] = karr[t];
                var pos = Util.getPosByIndex(val[t]);
                DataManage._data[val[t]].row = pos.x;
                DataManage._data[val[t]].column = pos.y;
                var point = Util.getPosByRect(DataManage._data[val[t]]);
                //DataManage._data[val[t]].x = pos.x;
                //DataManage._data[val[t]].y = pos.y;
                var arr = karr[t].name.split('_');
                var num = parseInt(arr[2]);
                DataManage._data[val[t]].name = pos.x + "_" + pos.y + "_" + num;
                DataManage._data[val[t]].num = num;
                DataManage._rects[val[t]] = DataManage._data[val[t]];
            }
            else {
                DataManage._data[val[t]] = 0;
            }
        }
        /*
        var len:number = val.length -1;
        for( var startindex:number=0;startindex<len;startindex++)
        {
            for( var i:number=0;i<len;i++)
            {
                if( DataManage._data[val[i]] == 0 && DataManage._data[val[i+1]] != 0 )
                {
                    DataManage._data[val[i]] = DataManage._data[val[i+1]];
                    var pos:egret.Point = Util.getPosByIndex( val[i] );
                    DataManage._data[val[i]].line = pos.x;
                    DataManage._data[val[i]].row = pos.y;
                    DataManage._data[val[i+1]] = 0;
                }
            }
        }*/
    };
    //0纵向,1横向,返回二维数组
    DataManage.selectArr = function (dir) {
        var arr = [];
        for (var i = 0; i < DataManage.max_row; i++) {
            var ar = [];
            for (var t = 0; t < 5; t++) {
                if (dir == 0) {
                    ar.push(Util.getIndexByLineRow(t, i));
                }
                else {
                    ar.push(Util.getIndexByLineRow(i, t));
                }
            }
            arr.push(ar);
        }
        return arr;
    };
    //播放所有方块的动画
    DataManage.playAllRect = function () {
        var rel = false;
        for (var i = 0; i < (DataManage.max_row * DataManage.max_row); i++) {
            //DataManage._rects[i].playAnimation();
            rel = DataManage._rects[i].playAnimationok();
            if (rel == true) {
                DataManage.isHaveMoveRect = true;
            }
        }
    };
    DataManage._rects = []; //所有的盒子
    DataManage._data = []; //所有的数据
    DataManage._nousedata = []; //位数用的数据
    DataManage.isRunning = false; //是否运行中
    DataManage.mode = 0; //玩法
    DataManage.score = 0; //分数
    DataManage.move = 0; //操作步数
    DataManage.top_score = 0; // 历史最高得分
    DataManage.add_score = 5; // 每次得分加5
    DataManage.time_limit = 30000; // 时间模式限制最大时间
    DataManage.move_limit = 30; // 步数模式限制最大步数
    DataManage.move_limit2 = 50; // 步数模式限制最大步数
    DataManage.collect_step_limit = 50; // 收集模式2限制最大步数
    DataManage.max_row = 5; //最大行数
    DataManage.max_col = 5; //最大列数
    DataManage.name_list = [];
    DataManage.index_list = [];
    DataManage.stageW = 0; //场景宽度
    DataManage.stageH = 0; //场景高度
    DataManage.sw = 0; //每个格子宽度
    DataManage.sh = 0;
    DataManage.num = 0; //  当前点击颜色
    DataManage.titleColor1 = 0xF0bd01; //  当前点击颜色
    DataManage.titleColor2 = 0xBBE300; //  当前点击颜色
    DataManage.titleColor3 = 0x00D70B; //  当前点击颜色
    DataManage.titleColor4 = 0x00e3e1; //  当前点击颜
    DataManage.color1_num = 10; //
    DataManage.color2_num = 20; //  颜色1触摸上限
    DataManage.color3_num = 25; //  颜色1触摸上限
    DataManage.color4_num = 17; //  颜色1触摸上限
    DataManage.color1_limit = 10; //  颜色1触摸上限
    DataManage.color2_limit = 20; //  颜色2触摸上限
    DataManage.color3_limit = 25; //  颜色3触摸上限
    DataManage.color4_limit = 17; //  颜色4触摸上限
    DataManage.platform = 1; //  0 ishanku 1 4399
    DataManage.isHaveMoveRect = false;
    return DataManage;
})();
