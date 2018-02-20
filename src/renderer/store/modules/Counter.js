import axios from 'axios'
import router from '../../router'
const state = {
  main: 0,
  products: [],
  productsForRental: [],
  token: null,
  apiUrl:'https://localhost:8000/api',
  config: null,
  user: null
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  setToken (state, payload) {
    state.token = payload
  },
  setUser (state, payload) {
    state.user = payload
  },
  logoutUser (state) {
    localStorage.clear()
    state.token = null
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  loadTokenFromLocalStorage({commit} , payload){
    commit('setToken', payload)
  },
  loadUserFromLocalStorage({commit} , payload){
      commit('setUser', payload)
  },
  loginUser ({ commit, state }, payload) {
    axios.post(state.apiUrl + '/users/authenticate', payload)
      .then(response => {
        const token = response.data.token
        const user = response.data.user
        commit('setToken', token)
        commit('setUser', user)
        localStorage.setItem('jwt',token)

        localStorage.setItem('user', JSON.stringify(user))
        if (user.isAdmin === 1) {
          router.push('/dashboard')
        } else {
          router.push('/sales')
        }
      })
      .catch(error => {
        console.log(error)
        alert('Usuario y/o contraseña incorrecta.')
      })
  },
  logout ({commit}) {
    commit('logoutUser')
    router.push('/')
  }
}
const getters = {
  token (state) {
    return state.token
  },
  user (state) {
    return state.user
  },
  apiUrl (state) {
    return state.apiUrl
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
