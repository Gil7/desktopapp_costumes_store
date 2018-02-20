import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import modules from './modules'
import router from '../router/'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
