var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NewRect = (function (_super) {
    __extends(NewRect, _super);
    function NewRect() {
        _super.call(this);
        this.isUsed = false; //是否使用
        this._num = -1; //颜色索引
        this.row = 0; //行
        this.column = 0; //列
        this.nextIsRemove = false; //到达下一次位置后是否删除
        this.nextIsAnm = false; //到达下一次位置后是否播放动画特效
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.addEventListener(egret.Event.ADDED, this.onAddChild, this);
    }
    //重置
    NewRect.prototype.restart = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.isUsed = false;
        this._num = -1;
        this.row = 0;
        this.column = 0;
        this.nextIsAnm = false;
        this.nextIsRemove = false;
    };
    //添加到显示列表
    NewRect.prototype.onAddChild = function () {
        this.scaleX = 0;
        this.scaleY = 0;
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 100);
    };
    Object.defineProperty(NewRect.prototype, "num", {
        //当期代表的数字
        get: function () {
            return this._num;
        },
        //
        set: function (value) {
            this._num = value;
            this.texture = RES.getRes("tilesColor" + this._num);
            //this.texture = this.textures.getTexture("number"+this._num);
        },
        enumerable: true,
        configurable: true
    });
    //播放动画,返回布尔值表示当前是否有动画移动
    NewRect.prototype.playAnimationok = function () {
        var rel = false;
        if (this.isUsed) {
            var tw = egret.Tween.get(this);
            var pos = Util.getPosByRect(this);
            if (this.x != pos.x || this.y != pos.y) {
                rel = true;
            }
            tw.to({ x: pos.x, y: pos.y }, 100);
            tw.call(this.animationOver2, this);
        }
        return rel;
    };
    NewRect.prototype.playEffect = function () {
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 1.3, scaleY: 1.3, alpha: 0.1 }, 200);
        tw.call(this.backScale2);
    };
    NewRect.prototype.playEffect2 = function (y1, y2) {
        egret.Tween.get(this).to({ y: y1 }, 200).to({ y: y2 }, 100).to({ y: y1 }, 100);
        //egret.Tween.get(this).to({y:y1},200);
    };
    //动画结束后
    NewRect.prototype.animationOver2 = function () {
        if (this.nextIsAnm) {
            var tw = egret.Tween.get(this);
            tw.to({ scaleX: 1.1, scaleY: 1.1 }, 100);
            tw.call(this.backScale2);
        }
        if (this.nextIsRemove) {
            this.parent.removeChild(this);
            this.num = -1;
            this.row = 0;
            this.column = 0;
            this.isUsed = false;
            this.texture = null;
        }
        this.nextIsAnm = false;
        this.nextIsRemove = false;
    };
    //返回标准样式
    NewRect.prototype.backScale2 = function () {
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
    };
    //播放动画,返回布尔值表示当前是否有动画移动
    NewRect.prototype.playAnimation = function () {
        var rel = false;
        if (this.isUsed) {
            var tw = egret.Tween.get(this);
            tw.to({ scaleX: 1.1, scaleY: 1.1 }, 100);
            tw.to({ scaleX: 1, scaleY: 1 }, 100);
            tw.to({ alpha: 0, scaleX: 0, scaleY: 0 }, 100);
            tw.call(this.backScale);
        }
        return rel;
    };
    //返回标准样式
    NewRect.prototype.backScale = function () {
        this.parent.removeChild(this);
        this.num = -1;
        this.row = 0;
        this.column = 0;
        this.isUsed = false;
        this.texture = null;
    };
    return NewRect;
})(egret.Bitmap);
