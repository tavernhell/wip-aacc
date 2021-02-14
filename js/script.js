//! GLOBAL VARIABLES
const optionsContainer = document.querySelector('#options-container');
const chart = document.querySelector('#chart');
const chartTitle = document.querySelector('#chart-title');
const chartTitleInput = document.querySelector('#chart-title-input');
const chartCovers = document.querySelector('#chart-covers');
const placeholderImg = "imgs/placeholder.jpg";
let colNum = document.querySelector('#col-num').dataset.value;
let rowNum = document.querySelector('#row-num').dataset.value;
let imgSize = document.querySelector('#img-size').value;
let gutter = document.querySelector('#gutter').value;


//! CSS VARIABLES
const root = document.documentElement;

//! EVENT LISTENERS
optionsContainer.addEventListener('input', (e) => {
  const elem = e.target;
  //img size range
  if (elem.matches('#img-size')) {
    options.changeImgSize(elem);
  }
  //gutter range
  if (elem.matches('#gutter')) {
    options.changeGutter(elem);
  }
  //bg img url input
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

optionsContainer.addEventListener('click', (e) => {
  const elem = e.target;

  
  //rownum++
  if (elem.matches('#row-num-btn-plus')) {
    general.setCSSVar('rowNum', ++rowNum);
    chartFuncs.addRow();
  }
  //rownum--
  if (elem.matches('#row-num-btn-minus')) {
    if (rowNum != 1) {
      general.setCSSVar('rowNum', --rowNum);
      chartFuncs.removeRow();
    }
  }
  //colnum++
  if (elem.matches('#col-num-btn-plus')) {
    general.setCSSVar('colNum', ++colNum);
    chartFuncs.addCol();
  }
  //colnum--
  if (elem.matches('#col-num-btn-minus')) {
    if (colNum != 1) {
      general.setCSSVar('colNum', --colNum);
      chartFuncs.removeCol();
    }
  }
});


function countElems() {
  document.querySelectorAll('.count').forEach((el,idx) => {
    el.textContent = idx.toString();
  });
}

//! FUNCTIONS
const options = {
  changeBgColor() {
    chart.style.backgroundColor = this.toHEXString();
  },

  changeBgImage(elem) {
    const url = elem.value;
    chart.style.backgroundImage = `url(${url})`;
  },

  changeGutter(elem) {
    general.setCSSVarPx('gutter',elem.value);
    document.querySelector('#gutter-span').textContent = elem.value;
  },

  changeImgSize(elem) {
    general.setCSSVarPx('imgSize',elem.value);
    document.querySelector('#img-size-span').textContent = elem.value;
  },
  
  changeTextColor() {
    chart.style.color = this.toHEXString();
  },

  modifyChartTitle(elem) {
    chartTitle.textContent = elem.value;
  },

  repeatBgImage() {
    chart.classList.toggle('repeat-bg');
  }
}

const chartFuncs = {
  generateGrid()  {
    for (let r = 1; r<=rowNum; r++) {
      for (let c = 1; c<=colNum; c++) {
        const div = document.createElement('div');
        div.classList.add('bordered', 'white');
        chartCovers.appendChild(div);
      }
    }
  },

  addRow()  {
    for (let i = 1; i<=colNum; i++) {
      const div = document.createElement('div');
      div.classList.add('bordered', 'white', 'count');
      chartCovers.appendChild(div);
    }
  },

  removeRow()  {
    for (let i = 1; i<=colNum; i++) {
      chartCovers.removeChild(chartCovers.lastChild);
    }
  },

  addCol()  {
    for (let i = 1; i<=rowNum; i++) {
      const div = document.createElement('div');
      div.classList.add('bordered', 'white');
      chartCovers.appendChild(div);
    }
  },

  removeCol()  {
    for (let i = 1; i<=rowNum; i++) {
      chartCovers.removeChild(chartCovers.lastChild);
    }
  },
}


const general = {
  setCSSVarPx(cssvar, jsvar) {
    root.style.setProperty(`--${cssvar}`, `${jsvar}px`);
  },

  setCSSVar(cssvar, jsvar) {
    root.style.setProperty(`--${cssvar}`, jsvar);
  },

  setInitialCSSVariablesValue() {
    this.setCSSVar('colNum',colNum);
    this.setCSSVar('rowNum',rowNum);
    this.setCSSVarPx('imgSize',imgSize);
    this.setCSSVarPx('gutter',gutter);
  },
};

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
  onInput: options.changeTextColor,
}); 

general.setInitialCSSVariablesValue();
chartFuncs.generateGrid();