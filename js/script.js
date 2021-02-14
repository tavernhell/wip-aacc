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
  //scaleChart();
  console.log(colNum*imgSize);
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

function scaleChart() {
  if (colNum*imgSize > 600 || rowNum*imgSize > 600) {
    chart.style.transform = `scale(0.5)`;
  }
};

optionsContainer.addEventListener('click', (e) => {
  //scaleChart();
  const elem = e.target;
  
  //rownum++
  if (elem.matches('#row-num-btn-plus')) {
    general.setCSSVar('rowNum', ++rowNum);
    chartFuncs.addCells(colNum);
  }
  //rownum--
  if (elem.matches('#row-num-btn-minus')) {
    if (rowNum != 1) {
      general.setCSSVar('rowNum', --rowNum);
      chartFuncs.removeCells(colNum);
    }
  }
  //colnum++
  if (elem.matches('#col-num-btn-plus')) {
    general.setCSSVar('colNum', ++colNum);
    chartFuncs.addCells(rowNum);
  }
  //colnum--
  if (elem.matches('#col-num-btn-minus')) {
    if (colNum != 1) {
      general.setCSSVar('colNum', --colNum);
      chartFuncs.removeCells(rowNum);
    }
  }
});

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
    gutter = elem.value;
    general.setCSSVarPx('gutter',gutter);
    document.querySelector('#gutter-span').textContent = elem.value;
  },

  changeImgSize(elem) {
    imgSize = elem.value;
    general.setCSSVarPx('imgSize',imgSize);
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
  generateInitialGrid()  {
    this.addCells(colNum*rowNum);
  },

  addCells(cellsToAdd) {
    for (let i = 1; i<=cellsToAdd; i++) {
      //chart-cell div
      const div = document.createElement('div');
      div.classList.add('bordered', 'white', 'chart-cell');
      //rank grid
      const rankDiv = document.createElement('div');
      rankDiv.classList.add('cc-rank');
      const coverpicDiv = document.createElement('div');
      coverpicDiv.classList.add('cc-coverpic', 'placeholder');
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('cc-title');
      //append operations
      div.appendChild(rankDiv);
      div.appendChild(coverpicDiv);
      div.appendChild(titleDiv);
      chartCovers.appendChild(div);
    }
  },

  removeCells(cellsToRemove)  {
    for (let i = 1; i<=cellsToRemove; i++) {
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
chartFuncs.generateInitialGrid();