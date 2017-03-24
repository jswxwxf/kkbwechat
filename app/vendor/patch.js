(function() {

  // 处理 QQ 转发: http://localhost:3000/event/#/plg_nld=1&plg_uin=1&plg_auth=1&plg_usr=1&plg_dev=1&plg_nld=1&plg_vkey=1&/stolen/intro?source=A01
  var qq_route = location.hash.split('&/')[1];
  if (qq_route) {
    return location.replace(location.origin + location.pathname + '#/' + qq_route);
  }

})();
