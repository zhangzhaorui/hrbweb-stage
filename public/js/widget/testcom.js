////Vue.component('t1', {
////  template: "<span>尺寸{{a}}</span>",
////  props: {
////      t1: Object,
////      t2: Array,
////      t3: Boolean
////  },
////  data: function () {
////	  return { a: 33333 }
////  }
////})
Vue.component('t2', {
  template: "#t2"
})
////Vue.component('t3', {
////  template: "<span>尺寸3</span>",
////  methods: {
////	
////  }
////})
////
////new Vue({
////  el: '#app'
////})
//


Vue.component('demo-grid', {
        template: '#grid-template',
        props: {
            tableHeader: Array,
            test1:Object
        },
        data: function() {
            //对于实例数据的处理
            return {
            	}
        }
    });


//
