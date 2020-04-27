import Vue from 'vue'
const contexts = require.context('./', true, /^\.\/(\w*\/)+index\.vue$/)

contexts.keys().forEach(file => {
  const component = contexts(file).default
  Vue.component(component.name, component)
})
