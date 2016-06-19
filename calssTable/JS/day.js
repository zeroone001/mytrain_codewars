$(function(){
    var obj1 = {
        'a':['JAVA','101','C','D'],
        'b':['D','C','B','A']
    };
    var obj2 = {
        'a':['A','B','C','D'],
        'b':['QQQ','C','B','A']
    };
    var obj3 = {
        'a':['A','B','C','D'],
        'b':['M','H','B','A']
    };
    var obj4 = {
        'a':['A','B','C','D'],
        'b':['KKK','C','B','A']
    };
    var obj5 = {
        'a':['A','B','C','D'],
        'b':['TYU','C','B','A']
    };
    var obj6 = {
        'a':['A','B','C','D'],
        'b':['KKSKS','C','B','A']
    };
    var obj7 = {
        'a':['A','B','C','D'],
        'b':['sa','HSHJD','B','A']
    };
    //函数定义
    function Day(){
        //li循环遍历
        $('.day-ul li').each(function(index){
            //这是回调函数
            //index从0开始
            var that = this,obj;
            index = index + 1;
            switch (index){
                case 1:
                    obj = obj1;
                    break;
                case 2:
                    obj = obj2;
                    break;
                case 3:
                    obj = obj3;
                    break;
                case 4:
                    obj = obj4;
                    break;
                case 5:
                    obj = obj5;
                    break;
                case 6:
                    obj = obj6;
                    break;
                case 7:
                    obj = obj7;
                    break;
            }
            //给a绑定点击事件
            $(that).bind('click','a',function(){
                var s;
                for(var i in obj){
                    var str = '<tr class="hover-tr"><td>'+obj[i][0]
                        +'</td><td>'+obj[i][1]
                        +'</td><td>'+obj[i][2]
                        +'</td><td>'+obj[i][3]
                        +'</td></tr>';
                    s = s + str;
                }
                $('.con-right table').find('.hover-tr').remove();
                $('.con-right table').append(s);
            });
        });
    }
    //调用
    Day();
});
