var _mm = {
    //网络请求
    request: function (param) {
        //缓存一下this，解决ajax中取不到this的问题
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                switch (res.status) {
                    case 0://请求成功
                        //类型是function时调用回调函数
                        typeof param.success === 'function' && param.success(res.data, res.msg);
                        break;
                    case 10://未登录，强制跳转到登录页面
                        _this.doLogin();
                        break;
                    case 1://请求数据错误
                        typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(error.statusText);
            }
        });
    },
    //统一登录处理
    doLogin: function () {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    }
}