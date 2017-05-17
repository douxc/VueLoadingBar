/**
 * 自动给vue的请求添加loading框
 * Created by xinchao.dou on 2016/10/27.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.VueLoadingBar = factory());
})(this, (function () {
    'use strict';
    var requestCount = 0;// 请求数量
    var delayTimeoutId = 0;
    var loadingEle = document.createElement('div');
    var loadingBarDelay = 300;

    /**
     * 隐藏loading框
     * @private
     */
    function _hideLoading() {
        if (requestCount <= 1) {
            window.clearTimeout(delayTimeoutId);
            loadingEle.classList.remove('show');
        }
        requestCount--;
    }

    /**
     * 延迟显示loading框
     * @param request
     * @param next
     * @private
     */
    function _showLoading(request, next) {
        if (requestCount === 0) {
            delayTimeoutId = setTimeout(function () {
                loadingEle.classList.add('show');
            }, loadingBarDelay); // 延迟显示，当请求响应时间过快时不需要显示loading
        }
        requestCount++;
        next && next(_hideLoading); // 如果是vue-resource则有next
    }

    /**
     * 初始化loading框、添加loadingBarDelay属性
     * @param Vue
     * @constructor
     */
    function LoadingBar(Vue) {
        Object.defineProperties(Vue.prototype, {
            loadingBarDelay: {
                get: function () {
                    return loadingBarDelay;
                },
                set: function (_loadingBarDelay) {
                    loadingBarDelay = Number(_loadingBarDelay);
                }
            }
        });
        if (!document.getElementById('LoadingBar')) {
            loadingEle.id = 'LoadingBar';
            loadingEle.innerHTML = '<div class="loading-content">' +
                '<icon class="loading-icon"></icon></div>';
            document.body.appendChild(loadingEle);
        }
        /**
         * 判断使用的是vue-resource还是axios
         */
        if (Vue.http) {
            Vue.http.interceptors.push(_showLoading);
        } else if (Vue.axios || Vue.$axios || axios) {
            // axios 支持不绑定到Vue属性上或者绑定为Vue.axios、Vue.$axios
            var _axios = Vue.axios || Vue.$axios || axios;
            _axios.interceptors.request.use(function (request) {
                _showLoading();
                return request;
            }, function (err) {
                _hideLoading();
                return Promise.reject(err);
            });
            _axios.interceptors.response.use(function (response) {
                _hideLoading();
                return response;
            }, function (err) {
                _hideLoading();
                return Promise.reject(err);
            });
        } else {
            console.error('only vue-resource or axios support');
        }
    }

    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(LoadingBar);
    }
    return LoadingBar;
}));
