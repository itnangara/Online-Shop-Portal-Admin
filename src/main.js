import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

import 'datatables.net-bs4/css/dataTables.bootstrap4.css'
import 'datatables.net/js/jquery.dataTables.js'
import 'datatables.net-bs4/js/dataTables.bootstrap4.js'

import BaseCard from './components/ui-elements/BaseCard.vue'
import BaseBadge from './components/ui-elements/BaseBadge.vue'
import BaseButton from './components/ui-elements/BaseButton.vue'
import BaseSpinner from './components/ui-elements/BaseSpinner.vue'
import BaseDialog from './components/ui-elements/BaseDialog.vue'
import SideBar from './components/layouts/SideBar.vue'
// import EmptyData from '@/components/reponses/EmptyData.vue'

import NavBar from './components/layouts/NavBar.vue';

const app = createApp(App)

app.component('base-card', BaseCard);
app.component('base-badge', BaseBadge);
app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('nav-bar', NavBar);
app.component('side-bar', SideBar)
// app.component('empty-data', EmptyData);

app.use(store)
app.use(router)
app.mount('#app')