class NewRect extends egret.Bitmap
{
    public isUsed:boolean = false; //是否使用
    private _num:number = -1;   //颜色索引
    public row:number = 0; //行
    public column:number = 0;  //列
    public nextIsRemove:boolean = false; //到达下一次位置后是否删除
    public nextIsAnm:boolean = false; //到达下一次位置后是否播放动画特效
    public textures:egret.SpriteSheet;

    public constructor()
    {
        super();

        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.addEventListener(egret.Event.ADDED, this.onAddChild, this);
    }

    //重置
    public restart()
    {
        if( this.parent )
        {
            this.parent.removeChild( this );
        }

        this.isUsed = false;
        this._num = -1;
        this.row = 0;
        this.column = 0;
        this.nextIsAnm = false;
        this.nextIsRemove = false;
    }

    //添加到显示列表
    private onAddChild():void
    {
        this.scaleX = 0;
        this.scaleY = 0;
        egret.Tween.get(this).to({scaleX:1,scaleY:1},100);
    }

    //当期代表的数字
    public get num():number {
        return this._num;
    }

    //
    public set num(value:number) {
        this._num = value;
        this.texture = RES.getRes("tilesColor"+this._num);
        //this.texture = this.textures.getTexture("number"+this._num);
    }

    //播放动画,返回布尔值表示当前是否有动画移动
    public playAnimationok():boolean
    {
        var rel:boolean = false;
        if(this.isUsed)
        {

            var tw = egret.Tween.get(this);
            var pos:egret.Point = Util.getPosByRect( this );

            if( this.x != pos.x || this.y != pos.y )
            {
                rel = true;
            }
            tw.to({x:pos.x,y:pos.y},100);
            tw.call(this.animationOver2,this);

        }
        return rel
    }

    public playEffect()
    {
        var tw = egret.Tween.get(this);
        tw.to({scaleX:1.3,scaleY:1.3,alpha:0.1},200);
        tw.call(this.backScale2);
    }

    public playEffect2(y1,y2)
    {
        egret.Tween.get(this).to({y:y1},200).to({y:y2},100).to({y:y1},100);
        //egret.Tween.get(this).to({y:y1},200);

    }

    //动画结束后
    public animationOver2()
    {

        if(this.nextIsAnm)
        {
            var tw = egret.Tween.get(this);
            tw.to({scaleX:1.1,scaleY:1.1},100);
            tw.call(this.backScale2);
        }
        if(this.nextIsRemove)
        {
            this.parent.removeChild(this);
            this.num = -1;
            this.row = 0;
            this.column = 0;
            this.isUsed = false;
            this.texture = null;

        }
        this.nextIsAnm = false;
        this.nextIsRemove = false;
    }

    //返回标准样式
    public backScale2():void
    {
        egret.Tween.get(this).to({scaleX:1,scaleY:1,alpha:1},200);
    }


    //播放动画,返回布尔值表示当前是否有动画移动
    public playAnimation():boolean
    {
        var rel:boolean = false;
        if(this.isUsed)
        {
            var tw = egret.Tween.get(this);
            tw.to({scaleX:1.1,scaleY:1.1},100);
            tw.to({scaleX:1,scaleY:1},100);
            tw.to({alpha:0,scaleX:0,scaleY:0},100);
            tw.call(this.backScale);

        }
        return rel
    }

    //返回标准样式
    public backScale():void
    {
        this.parent.removeChild(this);
        this.num = -1;
        this.row = 0;
        this.column = 0;
        this.isUsed = false;
        this.texture = null;
    }

}