var walking = new AMap.Walking({
    map: map,
    panel: "panel"
});
//根据起终点坐标规划步行路线
walking.search([120.092468, 30.300148], [120.082956, 30.308375], function(status, result) {
    // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
    if (status === 'complete') {
        log.success('绘制步行路线完成')
    } else {
        log.error('步行路线数据查询失败' + result)
    }
});