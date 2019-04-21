import Vue from 'vue'
import App from './App.vue'
import wrap from '@vue/web-component-wrapper';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faTimesCircle, faCheckCircle, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes)
library.add(faTimesCircle)
library.add(faCheck)
library.add(faCheckCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// const dataset = {
//   valid: [
//     'He looks down on anyone who doesn’t have a University education',
//     'She’s not happy that I went out without her, but she’ll get over it.',
//     'When I went home at Christmas I caught up with my old friends.',
//     "It isn't easy to bring up children nowadays.",
//   ],
//   invalid: [
//     'She tried on lots of dresses before she found one that she liked.',
//     "My brother borrowed my car. I have a feeling he's not about to give it back.",
//     "The students handed in their papers and left the room",
//   ],
// };

const dataset = {
  correct: [
      "The students handed in their papers and left the room",
      "My brother borrowed my car. I have a feeling he's not about to give it back.",
      "Correct 1",
      "Correct 1",
      "Correct 1",
  ],
  incorrect: [
      {
          sentence: 'sentence X 1',
          answer: 'sentence Y 1',
          correction: 'Y',
      },
      {
          sentence: 'sentence GF 2',
          answer: 'sentence SS 2',
          correction: 'SS',
      },
      {
          sentence: 'sentence YY 2',
          answer: 'sentence XX 2',
          correction: 'XX',
      },
  ],
}

// const CustomElement = wrap(Vue, App);

// window.customElements.define('swipe-cards', CustomElement);

new Vue({
  render: h => h(App, { props: { dataset } }),
}).$mount('#app');
