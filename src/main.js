import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

router.afterEach(to => {
    if (to.meta && to.meta.bgImage) {
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.overflowX = "hidden";
      document.body.style.height = "100%";
      document.body.style.backgroundImage = `url(${to.meta.bgImage})`;
  
    } else {
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundImage = "";
    }
});

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App).use(router).mount('#app')
