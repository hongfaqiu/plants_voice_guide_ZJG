<?php
$q = $_GET['q'];
$mysql_server_name = "localhost";
$mysql_username="root";
$mysql_password="123456";
$mysql_database="plant";
$json = '';
$data = array();

//判断是否为空。_POST是post请求方式，_GET是get请求方式。客户端请求
if(isset($_POST['name'])){
    $name = $_POST['name'];
}
//连接数据库
$conn = mysqli_connect($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}
echo "连接成功<br />";
//查询表
echo $q;
$sql = $q;
//遍历表
$result = $conn->query($sql);

if($result){
    echo "查询成功<br />";
    while ($row = mysqli_fetch_array($result,MYSQLI_ASSOC))
    {
        array_push($data,$row);
    }
    $json = json_encode($data,JSON_PRETTY_PRINT);//把数据转换为JSON数据.
    $file = fopen("../plant/plant.json","w");
    echo fwrite($file,$json);
    fclose($file);
    echo "done!";
}else{
    echo "查询失败";
}
mysqli_close($conn);
?>