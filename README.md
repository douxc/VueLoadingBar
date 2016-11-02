## add loading bar for Vue-resource
vuejs and vue-resource required;

## start
> npm install vueLoadingBar --save

```javascript
<link href="src/loadingbar.min.css" rel="stylesheet" type="text/css" />
<script src='src/loadingbar.js'></script>
```

or

```javascript
require('src/loadingbar.js')(Vue);
```

with webpack

```javascript
...
require('vueLoadingBar/src/loadingbar.css');
import Vue from 'vue';
import VueResource from 'vue-resource';
import vueLoadingBar from 'vueLoadingBar';
Vue.use(VueResource);
Vue.use(vueLoadingBar);
```

## config

```javascript
// 设置请求超过多少毫秒才显示，默认300毫秒
new Vue({...}).loadingBarDelay = 100;
```
