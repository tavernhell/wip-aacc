//! GLOBAL VARIABLES
const imagesizeGutterContainer = document.querySelector('#imgsize-gutter-container');
const root = document.documentElement;


//! EVENT LISTENERS
imagesizeGutterContainer.addEventListener('input', (e) => {
  const elem = e.target;
  if (elem.matches('#img-size')) {
    chartFunctions.changeImgSize(elem);
  }
  if (elem.matches('#gutter')) {
    chartFunctions.changeGutter(elem);
  }
});


//! FUNCTIONS
const chartFunctions = {
  changeBgColorVar() {
    //targets the css variable
    root.style.setProperty('--chart-bg-color', this.toHEXString());
  },

  changeImgSize(elem) {
    //TODO set of CSS variables
    document.querySelector('#img-size-span').textContent = elem.value;
  },

  changeGutter(elem) {
    //TODO set of CSS variables
    document.querySelector('#gutter-span').textContent = elem.value;
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
  onInput: chartFunctions.changeBgColorVar,
});

const textColorPicker = new JSColor('#text-color-btn', { 
  value: '#fff',
  previewElement:  '#text-color-btn'
}); 

