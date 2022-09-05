/*
 *Last modified: 2022-06-25 17:14:44
 *Url: https://www.axui.cn
*/
//自定义地图
var mapTile = new BMap.Map("map-pickup",{
    enableMapClick: false,
});
var x = 112.74776564403146;
var y = 37.74811011364706;
var center = new BMap.Point(x,y);
var zoom =17;
mapTile.centerAndZoom(center, zoom);
document.getElementById('center').value=mapTile.getCenter().lng + ',' + mapTile.getCenter().lat;
document.getElementById('zoom').innerHTML=zoom;
mapTile.setDefaultCursor("crosshair");
mapTile.disableDoubleClickZoom();
mapTile.addControl(new BMap.MapTypeControl({
    anchor:BMAP_ANCHOR_TOP_RIGHT,
    offset : new BMap.Size(14,14),
}));
mapTile.addControl(new BMap.NavigationControl(
    {
        type : BMAP_NAVIGATION_CONTROL_LARGE,
        anchor : BMAP_ANCHOR_TOP_LEFT,
        offset : new BMap.Size(14,14)
    }
));
mapTile.setCurrentCity("山西");
mapTile.enableScrollWheelZoom(true);
//瓦片地图
var tileLayer = new BMap.TileLayer();
tileLayer.getTilesUrl = function(tileCoord, zoom) {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return 'https://src.axui.cn/v2.0/public/tiles/' + zoom + '/tile-' + x + '_' + y + '.png';
};
//
var checkNow = document.getElementById("check");
if(checkNow.checked){
    mapTile.addTileLayer(tileLayer);
}else{
    mapTile.removeTileLayer(tileLayer);
}
function checkTile() {
    var check = document.getElementById("check");
    if(check.checked){
        mapTile.addTileLayer(tileLayer);
    }else{
        mapTile.removeTileLayer(tileLayer);
    }
};
// 检索
var local = new BMap.LocalSearch(mapTile, {
    renderOptions: {
        map: mapTile
    }
});
function placeSearch() {
    var place = document.getElementById("place").value;
    if (place != "") {
        local.search(place);
    }
};
//获得经纬度
mapTile.addEventListener("click", function(e) {
    var value=e.point.lng + ',' + e.point.lat;
    document.getElementById('coordinate').value = value;
    var marker = new BMap.Marker(new BMap.Point(e.point.lng,e.point.lat));
    mapTile.addOverlay(marker);
    var hot='{"lng":'+e.point.lng+',"lat":'+e.point.lat+',"count":'+parseInt(Math.random()*200)+'},';
    document.getElementById("hot").value+=hot;
});
function copyCoordinate() {
    var coordinate=document.getElementById("coordinate");
    coordinate.select();
    document.execCommand("Copy");
}
//获得缩放级别
mapTile.addEventListener("zoomend", function(e){
    var ZoomNum = mapTile.getZoom();
    document.getElementById('zoom').innerHTML = ZoomNum;
    var centerPoint=mapTile.getCenter().lng + ',' + mapTile.getCenter().lat;
    document.getElementById('center').value = centerPoint;
});
//获得中心坐标
mapTile.addEventListener("moveend", function(e){
    var centerPoint=mapTile.getCenter().lng + ',' + mapTile.getCenter().lat;
    document.getElementById('center').value = centerPoint;
});
mapTile.addEventListener("resize", function(e){
    var centerPoint=mapTile.getCenter().lng + ',' + mapTile.getCenter().lat;
    document.getElementById('center').value = centerPoint;
});
//复位
function refresh() {
    mapTile.centerAndZoom(center, zoom);
    document.getElementById('zoom').innerHTML = zoom;
    document.getElementById('center').value = x+','+y;
}
//热点
function copyHot() {
    var hot=document.getElementById("hot");
    hot.select();
    document.execCommand("Copy");
}
//定位
function positionCenter() {
    var centerPoint=document.getElementById('center').value;
    var split = centerPoint.split(",");
    var xPoint = split[0];
    var yPoint = split[1];
    var centerPoint2 = new BMap.Point(xPoint,yPoint);
    var zoomNum =document.getElementById('zoom').innerHTML;
    mapTile.centerAndZoom(centerPoint2, zoomNum);
    document.getElementById('center').value=xPoint + ',' + yPoint;
}
//清空热点
function deleteHot() {
    document.getElementById('hot').value = '';
    mapTile.clearOverlays();
}
//跟随坐标
var ox = document.createElement('div');
var oy = document.createElement('div');
ox.style.width = '100%';
ox.style.height = '1px';
ox.style.zIndex = '9999';
ox.style.backgroundColor = 'red';
ox.style.position = 'fixed';
ox.style.left = 0;
document.body.appendChild(ox);
oy.style.height = '100%';
oy.style.width = '1px';
oy.style.zIndex = '9999';
oy.style.backgroundColor = 'red';
oy.style.position = 'fixed';
oy.style.top = 0;
document.body.appendChild(oy);
document.onmousemove = function(e){
    var e = e || event;
    var x = e.pageX;
    var y = e.pageY;
    ox.style.top = y - 1 + 'px';
    oy.style.left = x - 1 + 'px';
};