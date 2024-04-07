import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/styles/style.scss'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

import 'datatables.net-bs4/css/dataTables.bootstrap4.css'
import 'datatables.net/js/jquery.dataTables.js'
import 'datatables.net-bs4/js/dataTables.bootstrap4.js'

import BaseCard from './components/ui-elements/BaseCard.vue'
import AuthCard from './components/ui-elements/AuthCard.vue'
import BaseBadge from './components/ui-elements/BaseBadge.vue'
import BaseButton from './components/ui-elements/BaseButton.vue'
import AuthButton from './components/ui-elements/AuthButton.vue'
import BaseSpinner from './components/ui-elements/BaseSpinner.vue'
import BaseDialog from './components/ui-elements/BaseDialog.vue'

const app = createApp(App)

app.component('BaseCard', BaseCard)
app.component('AuthCard', AuthCard)
app.component('BaseBadge', BaseBadge)
app.component('BaseButton', BaseButton)
app.component('AuthButton', AuthButton)
app.component('BaseSpinner', BaseSpinner)
app.component('BaseDialog', BaseDialog)

app.use(store)
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)

app.mount('#app')
