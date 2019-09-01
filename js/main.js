let a = 0;

const introScreen = document.getElementById('intro');
const buttonUp1 = document.getElementById('buttonUp1');
const buttonUp2 = document.getElementById('buttonUp2');
const buttonDown1 = document.getElementById('buttonDown1');
const buttonDown2 = document.getElementById('buttonDown2');
const buttonRand = document.getElementById('buttonRand');

const fragment1 = document.querySelector('.fragment1');
const fragment2 = document.querySelector('.fragment2');

const headlineContainer = document.getElementById('headlineContainer');
const headlineText = document.getElementsByClassName('headline-container-text');

const list1 = [
  'the only way to be pure',
  'total submission',
  'often you should act like you',
  'the more you know',
  'symbols',
  'description',
  "it's better to study the fact",
  'eating too much',
  'you should enjoy yourself because you',
  "there's a fine line",
  'chasing the new',
  "you can't expect people",
  'sometimes all you can do',
  'anything',
  'habitual contempt or disgust',
  'you can pull yourself out of any hole',
  "imposing order is man's vocation; chaos",
  'hiding your motives',
  'trading a life for a life',
  'redistributing wealth',
  'change is valuable because it',
  'it',
  'you get the face',
  'thinking too much',
  'you are responsible',
  'you are completely guileless',
  'children',
  'people',
  "you don't know what",
  'you must disagree',
  'violence',
  'in some instances it',
  'you have no more responsibility',
  'you should raise boys and girls',
  'at times inactivity',
  "it's good to try",
  "it's crucial",
  'the most profound things',
  'self-awareness',
  'abstraction',
  'being bored',
  'drama',
  'crimes against property',
  'dying',
  'the world',
  "there's nothing",
  'expiring for love',
  'fathers',
  "if you're not political, your personal life",
  'slipping into madness',
  'learn to trust',
  'teasing people sexually',
  "there's no sense being anywhere",
  'your actions',
  'a strong sense of duty',
  'repetition'
];
const list2 = [
  'is to stay by yourself',
  'can be a form of freedom',
  'are sexless',
  'the better off you are',
  'are more meaningful than things themselves',
  'is more valuable than metaphor',
  'than to analyze its history',
  'is criminal',
  "can't change anything anyway",
  'between information and propaganda',
  'is dangerous',
  "to be something they're not",
  'is look the other way',
  'is a legitimate area of investigation',
  "doesn't reflect a finer sensibility",
  'if you are determined enough',
  'is a version of hell',
  'is despicable',
  'is fair enough',
  'is mandatory',
  'gives the oppressed a chance to be tyrants',
  'is heroic to try to stop time',
  'you deserve',
  'can only cause trouble',
  'for constituting the meaning of things',
  'in your dreams',
  'are the hope of the future',
  "are boring unless they're extremists",
  'is what until you support yourself',
  'with authority figures',
  'is permissable, even desirable occasionally',
  'is better to die than to continue',
  'to your family than to other people',
  'in the same way',
  'is preferable to mindless functioning',
  'to stay clean on all levels',
  'to have an active fantasy life',
  'are inexpressible',
  'can be crippling',
  'is a type of decadence',
  'can make you do crazy things',
  'often obscures the real issues',
  'are relatively unimportant',
  'should be as easy as falling off a log',
  'operates according to discoverable laws',
  'redeeming in toil',
  'is beautiful but stupid',
  'often use too much force',
  'should be exemplary',
  'is valuable for the sake of comparison',
  'your own eyes',
  'can have ugly consequences',
  'but the top of the heap',
  'are pointless if no one notices them',
  'can imprison you',
  'is the best way to learn things'
];
const headlineList = [];

const scrollTo = (element, to, duration) => {
  const start = element.scrollLeft;
  const change = to - start;
  const startDate = +new Date();
  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };
  const animateScroll = () => {
    const currentDate = +new Date();
    const currentTime = currentDate - startDate;
    element.scrollLeft = Number(easeInOutQuad(currentTime, start, change, duration));
    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      element.scrollLeft = to;
    }
  };
  animateScroll();
};

const marquee = () => {
  const headlineWidth = headlineContainer.clientWidth;
  const textWidth = headlineText[0].offsetWidth + headlineText[1].offsetWidth + headlineWidth;
  if (a > textWidth) {
    a = headlineWidth + headlineText[0].offsetWidth + 3;
  } else {
    a += 3;
  }
  for (let i = 0, n = headlineText.length; i < n; i++) {
    headlineText[i].style.transform = `translateX(${-a}px)`;
  }
  window.requestAnimationFrame(marquee);
};

const generateHeadline = () => {
  let text = '';
  const index1 = list1.indexOf(document.querySelector('.fragment1 > h1').innerHTML);
  const index2 = list2.indexOf(document.querySelector('.fragment2 > h1').innerHTML);
  localStorage.setItem('text1', index1);
  localStorage.setItem('text2', index2);
  const newHeadline = `${list1[index1]} ${list2[index2]}`;
  headlineList.push(newHeadline);
  headlineList.forEach((headline) => {
    text += `<h4>${headline}</h4>`;
  });
  for (let i = 0, n = headlineText.length; i < n; i++) {
    headlineText[i].innerHTML = text;
  }
  a = 0;
  scrollTo(headlineContainer, headlineText[0].offsetWidth, 500);
};

const randomInt = max => Math.floor(Math.random() * max);

class ButtonPress {
  constructor(list, section) {
    this.list = list;
    this.section = document.querySelector(`${section}`);
    this.index = list.indexOf(document.querySelector(`${section} > h1`).innerHTML);
  }
  up() {
    if (typeof this.list[this.index - 1] === 'undefined') {
      this.section.innerHTML = `<h1>${this.list[this.list.length - 1]}</h1>`;
    } else {
      this.section.innerHTML = `<h1>${this.list[this.index - 1]}</h1>`;
    }
    generateHeadline();
  }
  down() {
    if (typeof this.list[this.index + 1] === 'undefined') {
      this.section.innerHTML = `<h1>${this.list[0]}</h1>`;
    } else {
      this.section.innerHTML = `<h1>${this.list[this.index + 1]}</h1>`;
    }
    generateHeadline();
  }
}

const intro = () => {
  if (localStorage.getItem('initialized') !== 'yes') {
    introScreen.innerHTML =
    `<div id="closeButton"></div>
    <header>
      <h3>Truism Generator</h3>
    </header>
    <section>
      <p class="text-gray2"><small>This is a collection of Jenny Holzer's "Truisms," but with each truism split into two parts. Click on the arrows to cycle through each sentence fragment in order, or click on the "update" button to generate a completely random truism.</small></p>
      <p class="text-gray2"><small>Feel free to spend as much time on this website as you'd like until you find something better to do with your life.</small></p>
    </section>`;
    introScreen.style.top = `${window.scrollY + 1.5}em`;
    document.querySelectorAll('.submodule').forEach((value) => {
      value.style.opacity = '0.25';
    });
    localStorage.setItem('initialized', 'yes');
    document.getElementById('closeButton').addEventListener('click', () => {
      introScreen.classList.remove('slideDown');
      window.requestAnimationFrame(() => {
        introScreen.classList.add('slideUp');
        document.querySelectorAll('.submodule').forEach((value) => {
          value.style.opacity = '';
        });
        marquee();
        generateHeadline();
        setTimeout(() => {
          document.getElementById('intro').remove();
        }, 500);
      });
    });
  } else {
    introScreen.remove();
    marquee();
    generateHeadline();
  }
};

buttonRand.addEventListener('click', () => {
  fragment1.innerHTML = `<h1>${list1[randomInt(list1.length)]}</h1>`;
  fragment2.innerHTML = `<h1>${list2[randomInt(list2.length)]}</h1>`;
  generateHeadline();
});
buttonUp1.addEventListener('click', () => {
  new ButtonPress(list1, '.fragment1').up();
});
buttonDown1.addEventListener('click', () => {
  new ButtonPress(list1, '.fragment1').down();
});
buttonUp2.addEventListener('click', () => {
  new ButtonPress(list2, '.fragment2').up();
});
buttonDown2.addEventListener('click', () => {
  new ButtonPress(list2, '.fragment2').down();
});

for (let i = 0, n = headlineContainer.clientWidth / headlineText[0].offsetWidth * 3; i < n; i += headlineText[0].offsetWidth) {
  headlineContainer.appendChild(headlineContainer.lastElementChild.cloneNode(true));
}
for (let i = 0, n = headlineText.length; i < n; i++) {
  headlineText[i].style.left = '100%';
}
const text1 = localStorage.getItem('text1');
const text2 = localStorage.getItem('text2');
if ((text1 === null) || (text2 === null)) {
  fragment1.innerHTML = `<h1>${list1[0]}</h1>`;
  fragment2.innerHTML = `<h1>${list2[0]}</h1>`;
} else {
  fragment1.innerHTML = `<h1>${list1[text1]}</h1>`;
  fragment2.innerHTML = `<h1>${list2[text2]}</h1>`;
}
intro();
