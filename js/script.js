//! GLOBAL VARIABLES
const optionsContainer = document.querySelector('#options-container');
const chartTitle = document.querySelector('#chart-title');
const chartTitleInput = document.querySelector('#chart-title-input');
const chart = document.querySelector('#chart');
const root = document.documentElement;

//! EVENT LISTENERS
optionsContainer.addEventListener('input', (e) => {
  const elem = e.target;
  //img size
  if (elem.matches('#img-size')) {
    options.changeImgSize(elem);
  }
  //gutter
  if (elem.matches('#gutter')) {
    options.changeGutter(elem);
  }
  //input for image url
  if (elem.matches('#bg-img-url-input')) {
    options.changeBgImage(elem);
  }
  //repeat bg checkbox
  if (elem.matches('#bg-repeat-chk')) {
    options.repeatBgImage();
  }
  //title input
  if (elem.matches('#chart-title-input')) {
    options.modifyChartTitle(elem);
  }
});


//! FUNCTIONS
const options = {
  changeBgColor() {
    chart.style.backgroundColor = this.toHEXString();
  },

  changeImgSize(elem) {
    //TODO set of CSS variables
    document.querySelector('#img-size-span').textContent = elem.value;
  },

  changeGutter(elem) {
    //TODO set of CSS variables
    document.querySelector('#gutter-span').textContent = elem.value;
  },

  changeBgImage(elem) {
    const url = elem.value;
    chart.style.backgroundImage = `url(${url})`;
  },

  modifyChartTitle(elem) {
    chartTitle.textContent = elem.value;
  },

  repeatBgImage() {
    chart.classList.toggle('repeat-bg');
  }
}

//! COLORPICKER
//shared options
jscolor.presets.default = {
  alphaChannel: false,
  backgroundColor: '#000', //picker's bg color
  padding: 0
  
};

//specific options
const bgColorPicker = new JSColor('#bg-color-btn', { 
  value: '#000',
  onInput: options.changeBgColor,
});

const textColorPicker = new JSColor('#text-color-btn', { 
  value: '#fff',
  previewElement:  '#text-color-btn'
}); 

