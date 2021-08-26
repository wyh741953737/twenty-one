class SnapsHotBox {
  constructor() {
    this.proxy = window;
    this.modifyPropsMap = {}; //记录在window上的更改
    this.active();
  }
  active() {
    this.windowSnapshot = {}; // 拍照
    for (let prop in window) {
      if (window.hasOwnProperty(prop)) {
        this.windowSnapshot[prop] = window[prop];
      }
    }
    Object.keys(this.modifyPropsMap).forEach(p => {
      window[p] = this.modifyPropsMap[p];
    })
  }
  inactive() {
    for (let prop in window) {
      if (window, hasOwnProperty(prop)) {
        if (window[prop] !== this.windowSnapshot[props]) {
          this.modifyPropsMap[prop] = window[prop];
          window[prop] = this.windowSnapshot[prop]
        }
      }
    }
  }
}

let sanbox = new SnapsHotBox();
((window) => {
  window.a = 1;
  window.b = 2;
  console.log(window.a, window.b);
  sanbox.inactive();
  console.log(window.a, window.b);
  sanbox.active();
  console.log(window.a, window.b);
})(sanbox.proxy)