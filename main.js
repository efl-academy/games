// uuid.min
!function(n){"use strict";function e(){var e=n.crypto||n.msCrypto;if(!f&&e&&e.getRandomValues)try{var r=new Uint8Array(16);s=f=function(){return e.getRandomValues(r),r},f()}catch(n){}if(!f){var o=new Array(16);i=f=function(){for(var n,e=0;e<16;e++)0===(3&e)&&(n=4294967296*Math.random()),o[e]=n>>>((3&e)<<3)&255;return o},"undefined"!=typeof console&&console.warn&&console.warn("[SECURITY] node-uuid: crypto not usable, falling back to insecure Math.random()")}}function r(){if("function"==typeof require)try{var n=require("crypto").randomBytes;c=f=n&&function(){return n(16)},f()}catch(n){}}function o(n,e,r){var o=e&&r||0,t=0;for(e=e||[],n.toLowerCase().replace(/[0-9a-f]{2}/g,function(n){t<16&&(e[o+t++]=y[n])});t<16;)e[o+t++]=0;return e}function t(n,e){var r=e||0,o=v;return o[n[r++]]+o[n[r++]]+o[n[r++]]+o[n[r++]]+"-"+o[n[r++]]+o[n[r++]]+"-"+o[n[r++]]+o[n[r++]]+"-"+o[n[r++]]+o[n[r++]]+"-"+o[n[r++]]+o[n[r++]]+o[n[r++]]+o[n[r++]]+o[n[r++]]+o[n[r++]]}function u(n,e,r){var o=e&&r||0,u=e||[];n=n||{};var a=null!=n.clockseq?n.clockseq:g,f=null!=n.msecs?n.msecs:(new Date).getTime(),i=null!=n.nsecs?n.nsecs:C+1,c=f-h+(i-C)/1e4;if(c<0&&null==n.clockseq&&(a=a+1&16383),(c<0||f>h)&&null==n.nsecs&&(i=0),i>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");h=f,C=i,g=a,f+=122192928e5;var s=(1e4*(268435455&f)+i)%4294967296;u[o++]=s>>>24&255,u[o++]=s>>>16&255,u[o++]=s>>>8&255,u[o++]=255&s;var l=f/4294967296*1e4&268435455;u[o++]=l>>>8&255,u[o++]=255&l,u[o++]=l>>>24&15|16,u[o++]=l>>>16&255,u[o++]=a>>>8|128,u[o++]=255&a;for(var d=n.node||w,v=0;v<6;v++)u[o+v]=d[v];return e?e:t(u)}function a(n,e,r){var o=e&&r||0;"string"==typeof n&&(e="binary"===n?new d(16):null,n=null),n=n||{};var u=n.random||(n.rng||f)();if(u[6]=15&u[6]|64,u[8]=63&u[8]|128,e)for(var a=0;a<16;a++)e[o+a]=u[a];return e||t(u)}var f,i,c,s,l;n?e():r();for(var d="function"==typeof Buffer?Buffer:Array,v=[],y={},m=0;m<256;m++)v[m]=(m+256).toString(16).substr(1),y[v[m]]=m;var p=f(),w=[1|p[0],p[1],p[2],p[3],p[4],p[5]],g=16383&(p[6]<<8|p[7]),h=0,C=0,R=a;R.v1=u,R.v4=a,R.parse=o,R.unparse=t,R.BufferClass=d,R._rng=f,R._mathRNG=i,R._nodeRNG=c,R._whatwgRNG=s,"undefined"!=typeof module&&module.exports?module.exports=R:"function"==typeof define&&define.amd?define(function(){return R}):(l=n.uuid,R.noConflict=function(){return n.uuid=l,R},n.uuid=R)}("undefined"!=typeof window?window:null);

// Developer: @intersteller(telegram)
function shuffle(array) {
  const arrayCopy = array.slice();
  let counter = arrayCopy.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = arrayCopy[counter];
    arrayCopy[counter] = arrayCopy[index];
    arrayCopy[index] = temp;
  }

  return arrayCopy;
};

Vue.component('mc-answer', {
  props: {
    'verb': String,
    'id': Number,
    'status': String,
    'disabled': Boolean,
  },
  methods: {
    handleClick() {
      this.$emit('check-answer', this.id);
    }
  },
  template: `
    <button
      class="mc-answer mc-button"
      :class="{success: status === 'success', error: status === 'error'}"
      :disabled="disabled"
      @click="handleClick"
    >
      {{verb}}
    </button>
  `,
});

Vue.component('mc-verb-form', {
  props: ['verb', 'postfix', 'status'],
  template: `
    <button
      class="mc-verb-form mc-button"
      :class="{success: status === 'success', error: status === 'error'}"
      @click="$emit('check-verb-form', verb)"
    >
      {{verb + ' ' + postfix}}
    </button>
  `,
});

const initialState = () => ({
  wordIndex: 0,
  correctAnswerCount: 0,
  oWords,
  verbForms,
  wordsSet: null,
  verbFormSet: null,
  selectedAnswer: null,
  correctForm: null,
  answered: false,
  isNextQuestion: false,
  isGameFinished: false,
  showVerbForms: false,
});

new Vue({
  el: '#root',

  data() {
    return {
      ...initialState(),
    }
  },

  created() {
    this.oWords = this.oWords.map((w) => ({
      ...w,
      used: false,
    }));
  },

  mounted() {
    this.initGame();
  },

  computed: {
    currentWord() {
      return this.oWords[this.wordIndex];
    },

    highlightedSentence() {
      let sentence = this.currentWord.answer;

      this.getCorrectForm().split(' ').forEach(w => {
        if (sentence.split(' ')[0].toLowerCase() === w) {
          w = w.charAt(0).toUpperCase() + w.slice(1);
        }
        sentence = sentence.replace(new RegExp(`\\b${w}\\b`, 'g'), `<span class='success'>${w}</span>`);
      });

      return sentence;
    },

    sentence() {
      return (this.answered || this.isNextQuestion)
        ? this.highlightedSentence
        : this.currentWord.sentence;
    },

    postfix() {
      return this.currentWord.verb.split(' ').slice(1).join(' ');
    },
  },

  methods: {
    nextQuestion() {
      if (this.oWords.filter(w => w.used).length === this.oWords.length) {
        this.isGameFinished = true;
        return;
      }

      this.generateNewWordIndex();
      this.createUniqueAnswersSet();
      this.createVerbFormSet();
      this.isNextQuestion = false;
      this.showVerbForms = false;
      this.answered = false;
      this.correctForm = null;
      this.selectedAnswer = null;

      if (!this.verbFormSet.length) {
        this.nextQuestion();
      }
    },

    initGame() {
      this.generateNewWordIndex();
      this.createUniqueAnswersSet();
      this.createVerbFormSet();

      if (!this.verbFormSet) {
        this.initGame();
      }
    },

    resetGame() {
      Object.assign(this.$data, initialState());
      this.initGame();
    },

    generateNewWordIndex() {
      if (this.oWords.length < 1) {
        console.error('generateNewWordIndex: no data');
        return 0;
      }

      while(true) {
        const index = Math.floor(Math.random() * this.oWords.length);
        const oWord = this.oWords[index];

        if (!oWord.used) {
          oWord.used = true;
          this.wordIndex = index;
          break;
        }
      }
    },

    getCorrectForm() {
      let correctForm = '';

      this.verbFormSet.forEach((form) => {
        const fullVerb = `${form.verb} ${this.postfix}`;

        let regexpString = '^';
        fullVerb.split(' ').forEach(w => {
          regexpString += '(?=.*\\b' + w.toLowerCase() + '\\b)';
        });
        regexpString += '.*$';
        const regexp = new RegExp(regexpString, 'i');

        const word = this.wordsSet.find(w =>
          regexp.test(w.answer.toLowerCase())
        );

        if (word) {
          correctForm = fullVerb;
        }
      });

      return correctForm;
    },

    checkVerbForm(verb) {
      const selectedForm = this.verbFormSet.find(f => f.verb === verb);
      const fullVerb = `${verb} ${this.postfix}`;
      let regexpString = '^';

      fullVerb.split(' ').forEach(w => {
        regexpString += `(?=.*\\b${w.toLowerCase()}\\b)`;
      });

      regexpString += '.*$';
      const regexp = new RegExp(regexpString);

      const word = this.wordsSet.find(w =>
        regexp.test(w.answer.toLowerCase())
      )

      if (word) {
        this.correctAnswerCount++;
        this.correctForm = fullVerb;
        selectedForm.status = 'success';
      } else {
        selectedForm.status = 'error';
      }

      this.answered = true;
      this.isNextQuestion = true;
    },

    createVerbFormSet() {
      const verb = this.currentWord.verb.split(' ')[0];
      const forms = verbForms[verb];

      this.verbFormSet = forms
        ? [...new Set(Object.values(forms))].map(f => ({verb: f, status: ''}))
        : null;
    },

    checkAnswer(id) {
      const selectedWord = this.wordsSet.find(w => w.id === id);

      if (this.currentWord.id === id) {
        selectedWord.status = 'success';
        if (this.verbFormSet) {
          this.showVerbForms = true;
        } else {
          this.correctAnswerCount++;
          this.isNextQuestion = true;
        }
      } else {
        selectedWord.status = 'error';
        this.isNextQuestion = true;
      }
      this.selectedAnswer = selectedWord;
    },

    createUniqueAnswersSet() {
      let uniqueSet = [];

      const usedWords = this.oWords.filter(w => w.used);

      uniqueSet.push(this.currentWord || this.oWords[this.wordIndex]);

      while (uniqueSet.length < 4) {
        const index = Math.floor(Math.random() * this.oWords.length);
        const word = this.oWords[index];
        const isAlreadyAdded = uniqueSet.find(w => w.verb === word.verb);

        if (!isAlreadyAdded) {
          uniqueSet.push(word);
        }
      }

      uniqueSet = shuffle(uniqueSet);

      this.wordsSet = uniqueSet
        .map(w => {
          w.status = '';
          return w;
        });
    }
  }
});
