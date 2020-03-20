import requests        #导入requests包
import json
import csv
import datetime

def getdata(n,jsonpath):
    url = 'https://lv.nongbangzhu.cn/rest/classifylogs?lat=0.0&lng=0.0' + \
          '&maxLat=30.311393798490386' + \
          '&minLat=30.29586804332317' + \
          '&maxLng=120.09256526827811' + \
          '&minLng=120.08141532540324' + \
          '&currentPage=0' + \
          '&pageSize={}'.format(n) + \
          '&maxId=0'

    # 请求表单数据
    res = requests.get(url)  # Get方式获取网页数据
    # 将Json格式字符串转字典
    dict = json.loads(res.text)
    str_json = json.dumps(dict['payload']['list'])

    with open(jsonpath, 'w', encoding='utf-8') as file:
        file.write(str_json)

    file.close()

def trans(jsonpath, csvpath):
    json_file = open(jsonpath, 'r', encoding='utf-8')
    csv_file = open(csvpath, 'w', newline='', encoding='utf-8')
    keys = []
    writer = csv.writer(csv_file)

    json_data = json_file.read()
    dic_data = json.loads(json_data)

    keys = ['id', 'picId', 'plant', 'creationTime', 'lat', 'lng', 'score', 'pictureURL']
    # 写入列名
    writer.writerow(keys)

    i=1
    for dic in dic_data:
        for key in keys:
            if key not in dic:
                dic[key] = ''
            if key=='creationTime':
                # 使用datetime
                timeStamp = dic['creationTime']/1000
                dateArray = datetime.datetime.fromtimestamp(timeStamp)
                dic['creationTime'] = dateArray.strftime("%Y-%m-%d %H:%M:%S")
        writer.writerow([str(i),dic['id'],dic['plant'],dic['creationTime'],dic['lat'],dic['lng'],dic['score'],'https://lv.nongbangzhu.cn/resources/image/'+dic['picture']])
        i+=1
    print('一共爬取了%d个植物数据' %(i-1))
    json_file.close()
    csv_file.close()

if __name__=='__main__':
    getdata(10000,'json.txt')
    trans('json.txt', 'plant.csv')
