

//创建地图
var map = new AMap.Map('container', {
    resizeEnable: true,
    center:[120.087,30.3],
    zoom:16,
    /*pitch:75, // 地图俯仰角度，有效范围 0 度- 83 度
    viewMode:'3D' // 地图模式*/
});

AMapUI.loadUI(['control/BasicControl'], function(BasicControl) {

    //图层切换控件
    map.addControl(new BasicControl.LayerSwitcher({
        position: 'rt'
    }));
});

AMap.plugin([
    'AMap.ToolBar',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.MapType',
], function(){
    // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
    map.addControl(new AMap.ToolBar());

    // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
    map.addControl(new AMap.Scale());

    // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
    map.addControl(new AMap.OverView({isOpen:true}));

    // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    map.addControl(new AMap.MapType());

});