var lat,lng,result,name,url,marker2=[];
var i1,i2,maxi=20;

function UpdateData(fliter){
    i1=1;
    i2=20;
    $.ajax({
        url:'/plant/dbtojson.php',
        data:{q:fliter},
        success:function(data) {
            console.log(data);
        }
    });

    $.getJSON("plant.json",function(data){
        var jsonLength = 0;
        for(var item in data){
            jsonLength++;
        }
        maxi=jsonLength;
    });
    refresh();
}

function refresh() {
    map.remove(marker2);

    $.getJSON("plant.json",function(data){
        $.each(data, function(i,row){
            if(i<=i2 && i>=i1 ) {
                $.each(row, function (j, field) {
                    if (j === 'lat') {
                        result = JSON.stringify(field);
                        result=result.replace(/"/,"");
                        result=result.replace(/"/,"");
                        lat = result;
                    }
                    if (j === 'lng') {
                        result = JSON.stringify(field);
                        result=result.replace(/"/,"");
                        result=result.replace(/"/,"");
                        lng = result;
                    }
                    if (j === 'name') {
                        result = JSON.stringify(field);
                        result=result.replace(/"/,"");
                        result=result.replace(/"/,"");
                        name = result;
                    }
                    if (j === 'pictureURL') {
                        result = JSON.stringify(field);
                        result=result.replace(/"/,"");
                        result=result.replace(/"/,"");
                        url=result;
                    }
                });
                //坐标系转换
                gps=[parseFloat(lng), parseFloat(lat)];
                AMap.convertFrom(gps,'gps', function (status, result) {
                    if (result.info === 'ok') {
                        gps = result.locations[0]; // Array.<LngLat>
                    }
                });
                var marker = new AMap.Marker({

                    position: gps,
                    // 将 html 传给 content
                    content: markerContent,
                    // 以 icon 的 [center bottom] 为原点
                    offset: new AMap.Pixel(-13, -30)
                });
                //鼠标点击marker弹出自定义的信息窗体
                var url1="https://baike.baidu.com/item/"+name;
                encodeURIComponent(url1);
                marker.content=name+
                    "<div ><img width='200px' src='"+url+"' ></div>"+
                    "<a target = \"_blank\" href='https://baike.baidu.com/item/"+name+"'>详细信息</a>";
                //鼠标点击marker弹出自定义的信息窗体
                marker.on('click', markerClick);
                marker.emit('click', {target: marker});
                // 将 markers 添加到地图
                map.add(marker);
                marker2.push(marker);
            }
        });
    });
    console.log("共查询到"+maxi+"条记录");
    console.log("现在是第"+i1+"到第"+i2+"条记录")

    i1 += 20;
    i2=(i1+19);
    if(i1>maxi){
        i1=1;
        i2=i1+19;
    }
}