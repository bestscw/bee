/**
 * Created by mebius on 14-7-22.
 */
class Util
{
    //通过行和列得到0-15之间的编号
    public static  getIndexByLineRow(row:number,column:number):number
    {
        return row*DataManage.max_row+column;
    }

    //通过盒子中的 行和列 的值，返回盒子的 坐标
    public static getPosByRect(val:NewRect):egret.Point
    {
        var point:egret.Point = new egret.Point();
        point.x = 20 +val.width/2 + ( 10 + val.width )*val.column;
        point.y = 20 + val.height/2 +( 10 + val.height )*val.row;
        return point;

    }

    //通过 0-15之间的编号，返回 行和列
    public static getPosByIndex(index:number):egret.Point
    {
        var point:egret.Point = new egret.Point();
        point.x = Math.floor( index / DataManage.max_row );
        point.y = Math.floor( index % DataManage.max_row );
        return point;
    }
}