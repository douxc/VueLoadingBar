/**
 * 自动给vue的请求添加loading框
 * Created by xinchao.dou on 2016/10/27.
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.VueLoadingBar = factory());
})(this, (function() {
    'use strict';
    var delay = 0;// 请求多久没有返回显示loading
    var requestCount = 0;// 请求数量
    var delayTimeoutId = 0;
    var loadingEle = document.createElement('div');

    function LoadingBar(Vue) {
        if (!document.getElementById('LoadingBar')) {
            loadingEle.id = 'LoadingBar';
            loadingEle.innerHTML = '<div class="loading-content"></div>';
            document.body.appendChild(loadingEle);
        }
        Vue.http.interceptors.push((request, next) => {
            if (requestCount === 0) {
                delayTimeoutId = setTimeout(() => {
                    loadingEle.classList.add('show');
                }, delay);
            }
            requestCount++;
            next(() => {
                if (requestCount <= 1) {
                    window.clearTimeout(delayTimeoutId);
                    loadingEle.classList.remove('show');
                }
                requestCount--;
            });
        });
    }

    if (window.Vue && window.VueResource) {
        window.Vue.use(LoadingBar);
    }
    return LoadingBar;
}));