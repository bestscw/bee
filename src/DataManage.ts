/**
 * Created by mebius on 14-7-22.
 */
class DataManage
{
    public static _rects:Array<any> = [];  //所有的盒子
    public static _data:Array<any> = [];   //所有的数据
    public static _nousedata:Array<any> = [];  //位数用的数据
    public static isRunning:boolean = false;   //是否运行中
    public static mode:number = 0;   //玩法

    public static  score:number = 0;   //分数
    public static  move:number = 0;         //操作步数

    public static  top_score:number = 0;    // 历史最高得分
    public static  add_score:number = 5;    // 每次得分加5

    public static  time_limit:number = 30000;  // 时间模式限制最大时间

    public static  move_limit:number = 30;         // 步数模式限制最大步数
    public static  move_limit2:number = 50;         // 步数模式限制最大步数

    public static  collect_time:number;      // 收集模式用时

    public static  collect_step_limit:number = 50;      // 收集模式2限制最大步数

    public static  max_row:number = 5;   //最大行数
    public static  max_col:number = 5;   //最大列数

    public static name_list:Array<any>=[];
    public static index_list:Array<any>=[];
    public static stageW:number = 0;  //场景宽度
    public static stageH:number = 0;  //场景高度

    public static sw:number = 0;  //每个格子宽度
    public static sh:number = 0;
    public static num:number =  0; //  当前点击颜色
    public static titleColor1:number =  0xF0bd01; //  当前点击颜色
    public static titleColor2:number =  0xBBE300; //  当前点击颜色
    public static titleColor3:number =  0x00D70B; //  当前点击颜色
    public static titleColor4:number =  0x00e3e1; //  当前点击颜

    public static color1_num:number =  10; //
    public static color2_num:number =  20; //  颜色1触摸上限
    public static color3_num:number =  25; //  颜色1触摸上限
    public static color4_num:number =  17; //  颜色1触摸上限

    public static color1_limit:number =  10; //  颜色1触摸上限
    public static color2_limit:number =  20; //  颜色2触摸上限
    public static color3_limit:number =  25; //  颜色3触摸上限
    public static color4_limit:number =  17; //  颜色4触摸上限
    public static platform:number =  1; //  0 ishanku 1 4399


    //创建所有的方块
    public static createAllRect(rootLayout:egret.DisplayObjectContainer):void
    {
        for( var i:number = 0; i<DataManage.max_row; i++)
        {
            for(var j:number = 0; j<DataManage.max_row; j++)
            {
                var rect:NewRect = new NewRect();
                rect.isUsed = true;
                rect.num = Math.ceil(4 * Math.random());
                rect.name = i+"_"+j+"_"+rect.num;
                rect.row = i;
                rect.column = j;
                rect.width = DataManage.sw;
                rect.height = DataManage.sh;
                var rect_post = Util.getPosByRect(rect);
                rect.x = rect_post.x;
                rect.y = rect_post.y;

                rect.touchEnabled = true;
                rect.addEventListener(egret.TouchEvent.TOUCH_MOVE, DataManage.onTouchMove, this);

                var index:number = Util.getIndexByLineRow( rect.row, rect.column );
                DataManage._rects[ index ] = rect;
                DataManage._data[ index ] = rect;

                rootLayout.addChild( rect );
            }
        }

    }

    public static onTouchMove(evt:egret.TouchEvent)
    {

        if(!DataManage.isRunning)
        {
            return;
        }

        var name:string = evt.target.name;
        if(this.name_list.indexOf(name) < 0)
        {
            this.name_list.push(name);

            var arr:string[] = name.split('_');
            var row:number = parseInt(arr[0]);
            var col:number = parseInt(arr[1]);
            DataManage.num = parseInt(arr[2]);

            var index:number = Util.getIndexByLineRow(row,col);
            DataManage._rects[index].playEffect();

            var sound:egret.Sound = RES.getRes("click");
            sound.play();
        }
    }

    //找一个未使用的方块
    public static selectNewRect():NewRect
    {
        for( var i:number=0; i<16; i++ )
        {
            if( DataManage._rects[i].isUsed == false )
            {
                return DataManage._rects[i];
            }
        }
        return null;
    }

    //重新开始游戏
    public static Restart()
    {
        this.score = 0;

        if(this.mode == 2)
        {
            this.move = this.move_limit;
        }
        else if(this.mode == 1)
        {
            this.move = 0;
        }
        else if(this.mode == 3)
        {
            this.move = 0;
            this.color1_num = this.color1_limit;
            this.color2_num = this.color2_limit;
            this.color3_num = this.color3_limit;
            this.color4_num = this.color4_limit;
            this.collect_time = 0;
        }

        this.isRunning = true;

    }
    //重新开始游戏
    public static restartAllRect()
    {

        this.isRunning = true;

         for(var i:number=0; i<(DataManage.max_row*DataManage.max_row); i++)
         {
             DataManage._data[i] = 0;
             DataManage._rects[i].restart();
         }

        //this.restartAllRect();
    }


    //下
    public static xia()
    {
        var ar:Array<any> = DataManage.selectArr(0);
        for( var i:number=0;i<DataManage.max_row;i++ )
        {
            ar[i] = ar[i].reverse();
            DataManage.moveArr(ar[i]);
            //DataManage.unite( ar[i] );
            //DataManage.moveArr(ar[i]);
        }
        //DataManage.restartAllRect( );
        DataManage.playAllRect();
    }

    //判断游戏是否结束
    public static isGameOver():boolean
    {
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
    }

    //移动方块,val是一个1维数组
    private static moveArr(val:Array<number>)
    {
        var karr:Array<any> = [];

        for( var i:number=0;i<val.length;i++ )
        {
            if( DataManage._data[val[i]] != 0 )
            {
                karr.push( DataManage._data[val[i]] );
            }
        }

        var calnum:Array<any> = [];
        for( var t:number =0;t<DataManage.max_row;t++ )
        {
            if( karr[t] )
            {
                DataManage._data[val[t]] = karr[t];
                var pos:egret.Point = Util.getPosByIndex( val[t] );
                DataManage._data[val[t]].row = pos.x;
                DataManage._data[val[t]].column = pos.y;

                var point:egret.Point = Util.getPosByRect(DataManage._data[val[t]]);
                //DataManage._data[val[t]].x = pos.x;
                //DataManage._data[val[t]].y = pos.y;

                var arr:string[] = karr[t].name.split('_');
                var num:number = parseInt(arr[2]);
                DataManage._data[val[t]].name = pos.x+"_"+pos.y+"_"+num;
                DataManage._data[val[t]].num = num;
                DataManage._rects[val[t]] = DataManage._data[val[t]];

                /**
                var pos:egret.Point = Util.getPosByIndex( val[t] );
                DataManage._data[val[t]].row = 4-t;
                DataManage._data[val[t]].column = karr[t].column;
                **/

                //calnum[DataManage._data[val[t]]._num]++;

            }
            else
            {
                DataManage._data[val[t]] = 0;
                //DataManage._rects[val[t]] = 0;

                /**

                var pos:egret.Point = Util.getPosByIndex( val[t] );


                var rect:NewRect = new NewRect();
                rect.isUsed = true;
                rect.num = Math.ceil(4 * Math.random());
                rect.row = pos.y;
                rect.column = pos.x;
                rect.width =  DataManage._rects[val[t]].width;
                rect.height =  DataManage._rects[val[t]].height
                var rectpost = Util.getPosByRect(rect);
                rect.x = (20 + ( 80 *pos.y));
                rect.y = -90;

                rect.nextIsAnm = true;
                rect.nextIsRemove = false;

                rect.touchEnabled = true;
                rect.addEventListener(egret.TouchEvent.TOUCH_MOVE, DataManage.onTouchMove, this);

                //var index:number = Util.getIndexByLineRow( rect.row, rect.column );
                DataManage._rects[ val[t] ] = rect;
                //DataManage._data[val[t]] = rect;

                console.log('valt'+val[t]+'_put'+val[t]+"_row"+rect.row+"col_"+rect.column);

                **/
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
    }

    //0纵向,1横向,返回二维数组
    private static selectArr(dir:number):Array<any>
    {
        var arr:Array<any>=[];
        for( var i:number=0;i<DataManage.max_row;i++ )
        {
            var ar:Array<any> = [];
            for( var t:number=0;t<5;t++)
            {
                if( dir == 0 )
                {
                    ar.push( Util.getIndexByLineRow(t,i) );
                }
                else
                {
                    ar.push( Util.getIndexByLineRow(i,t) );

                }
            }
            arr.push(ar);
        }
        return arr;
    }


    public static isHaveMoveRect:boolean = false;
    //播放所有方块的动画
    private static playAllRect():void
    {
        var rel:boolean = false;
        for( var i:number=0; i<(DataManage.max_row*DataManage.max_row); i++ )
        {
            //DataManage._rects[i].playAnimation();
            rel = DataManage._rects[i].playAnimationok();
            if( rel == true )
            {
                DataManage.isHaveMoveRect = true;
            }
        }


    }
    //
}