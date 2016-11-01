## add loading bar for Vue-resource
vuejs and vue-resource required;

```javascript
<script src='dist/loadingbar.js'></script>
```
or
```javascript
require('dist/loadingbar.js')(Vue);
```
with webpack
```javascript
...
require('vueLoadingBar/dist/loadingbar.css');
import Vue from 'vue';
import VueResource from 'vue-resource';
import vueLoadingBar from 'vueLoadingBar';
Vue.use(VueResource);
Vue.use(vueLoadingBar);
```