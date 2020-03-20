function wordExtraction(){
    var word = document.getElementById("result_output").innerText;

    //var word = "白沙有什么植物";

    if(word==='')
        return;

    var times = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '春', '夏', '秋', '冬'];
    var areas = ['云峰','丹青','大食堂','翠柏','留学生公寓','白沙','校医院','游泳馆','体育馆','风雨操场','运动场','校友林','月牙楼','小剧场','西区理科实验楼','图书馆','蒙民伟楼','东区教学楼','西区教学楼','农生环团组','生科院','医药学院','启真湖'];
    var Out_times = new Array();
    var Out_areas = new Array();

    var OutSelect_time='';
    var OutSelect_area='';

    var i;
    for(i = 0;i < times.length;i++)
    {
        if(word.indexOf(times[i])!=-1)
        {
            if(times[i] == '春')
            {
                Out_times[Out_times.length] = '3';
                Out_times[Out_times.length] = '4';
                Out_times[Out_times.length] = '5';
            }
            else if(times[i] == '夏')
            {
                Out_times[Out_times.length] = '6';
                Out_times[Out_times.length] = '7';
                Out_times[Out_times.length] = '8';
            }
            else if(times[i] == '秋')
            {
                Out_times[Out_times.length] = '9';
                Out_times[Out_times.length] = '10';
                Out_times[Out_times.length] = '11';
            }
            else if(times[i] == '冬')
            {
                Out_times[Out_times.length] = '12';
                Out_times[Out_times.length] = '1';
                Out_times[Out_times.length] = '2';
            }
            else if(times[i] == '1月')
            {
                Out_times[Out_times.length] = '1';
            }
            else if(times[i] == '2月')
            {
                Out_times[Out_times.length] = '2';
            }
            else if(times[i] == '3月')
            {
                Out_times[Out_times.length] = '3';
            }
            else if(times[i] == '4月')
            {
                Out_times[Out_times.length] = '4';
            }
            else if(times[i] == '5月')
            {
                Out_times[Out_times.length] = '5';
            }
            else if(times[i] == '6月')
            {
                Out_times[Out_times.length] = '6';
            }
            else if(times[i] == '7月')
            {
                Out_times[Out_times.length] = '7';
            }
            else if(times[i] == '8月')
            {
                Out_times[Out_times.length] = '8';
            }
            else if(times[i] == '9月')
            {
                Out_times[Out_times.length] = '9';
            }
            else if(times[i] == '10月')
            {
                Out_times[Out_times.length] = '10';
            }
            else if(times[i] == '11月')
            {
                Out_times[Out_times.length] = '11';
            }
            else if(times[i] == '12月')
            {
                Out_times[Out_times.length] = '12';
            }
        }
    }
    for(i = 0; i < areas.length; i++)
    {
        if(word.indexOf(areas[i])!=-1)
        {
            Out_areas[Out_areas.length] = areas[i];
        }
    }

    for(i = 0;i < Out_areas.length ;i++)
    {
        OutSelect_area += "zone = '"  + Out_areas[i] +"' ";
        if(i < Out_areas.length -1)
            OutSelect_area += ' OR';
    }

    for(i = 0;i < Out_times.length ;i++)
    {
        OutSelect_time += " creationTi LIKE (\'%/" + Out_times[i] + "/%')" ;
        if(i < Out_times.length -1)
            OutSelect_time += ' OR';
    }

    if(OutSelect_area===''&&OutSelect_time===''){
        alert("我不懂你在说啥。。。");
        return;
    }

    if(OutSelect_area===''||OutSelect_time===''){
        fliter ="select * from zjgplant where ("+OutSelect_area+OutSelect_time+")";
    }
    else{
        fliter ="select * from zjgplant where ("+OutSelect_area+") and ("+OutSelect_time+")";
    }

    return fliter;

}