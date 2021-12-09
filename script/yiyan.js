get()
function get(){
  let url = `https://v1.hitokoto.cn?c=d&c=i`;
  let myRequest = {
      url: url
  };
  $httpClient.get(myRequest, (err, resp, data) => {
    let title = '一言';
    let content = '';
    let icon = 'bookmark.circle';
    let color = '#45b97c';
    let dataObj = JSON.parse(data);
    console.log(dataObj)
    if(resp.status == 200){
      content = dataObj.hitokoto;
      title += ' | ' + dataObj['from']
    }
    $done({
      title: title,
      content: content,
      icon: icon,
      "icon-color": "#007aff",
    });
  })
}