(function(window) {
    const PENDING = 'pending';
    const RESOLVED = 'resolved';
    const REJECTED = 'rejected';

    function Promise(excutor) {
        this.status = PENDING;
        this.data  = undefined;
        this.callbacks = [];
        const that = this;
        function resolve(value) {
            if (that.status !== PENDING) return;
            that.status = RESOLVED;
            that.data = value;
            if(that.callbacks.length > 0) {
                setTimeout(() => {
                    that.callbacks.forEach(callback => {
                        callback.onResolved(value);
                    })
                });
            }
        }
        function reject(error) {
            if (that.status !== PENDING) return;
            that.status = REJECTED;
            that.data = value;
            if(that.callbacks.length > 0) {
                setTimeout(() => {
                    that.callbacks.forEach(callback => {
                        callback.onRejected(error);
                    })
                });
            }
        }
        try {
            excutor(resolve, reject);
        } catch(error) {
            reject(error)
        }
    }

    Promise.resolve = function(value) {
        return new Promise((resolve, reject) => {
            if(value instanceof Promise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        })
    }
    Promise.reject = function(reason) {
        return new Promise((resolve,reject) => {
            reject(reason)
        })
    }

    Promise.race = function(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                Promise.resolve(p).then(
                    value => {
                        resolve(value);
                    },
                    reason => {
                        reject(reason)
                    }
                )
            })
        })
    }

    Promise.all = function(promises) {
        let values = new Array(promises.length);
        let count = 0;
        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                Promise.resolve(p).then(
                    value => {
                        count++;
                        values[index] = value;
                        if(promises.length === count) {
                            resolve(values);
                        }
                    },
                    reason => {
                        reject(reason)
                    }
                )
            })
        })
    }


    Promise.resolveDelay = function(value, time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(value instanceof Promise) {
                    value.then(resolve, reject);
                } else {
                    resolve(value);
                }
            }, time);
        })
    }

    Promise.rejectDelay = function(reason, time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(reason);
            }, time);
        })
    }

    Promise.prototype.then = function(onResolved, onRejected) {
        onResolved = typeof onResolved === 'function' ? onResolved : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
        const that = this;
        return new Promise((resolve, reject) => {
            function handle(callback) {
                try {
                    const result = callback(that.data);
                    if(result instanceof Promise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch(error) {
                    reject(error);
                } 
            }
            if(that.status === PENDING) {
                that.callbacks.push({
                    onResolved(value) {
                        handle(onResolved)
                    },
                    onRejected(reason) {
                        handle(onRejected)
                    }
                })
            } else if(that.status === RESOLVED) {
                setTimeout(() => {
                    handle(onResolved) 
                });
            } else {
                setTimeout(() => {
                    handle(onRejected)
                });
            }
        })
    }

    Promise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected);
    }
})(window);


const first = () => (new Promise((resolve, reject) => {
  console.log(3);
  let p = new Promise((resolve, reject) => {
    console.log(7);
    setTimeout(() => {
      console.log(5);
      resolve(6)
    }, 0);
    resolve(1)
  })
  resolve(2)
  p.then((arg) => {
    console.log(arg)
  })
}))
first().then((arg => {
  console.log(arg)
}))
console.log(4)

// 3 7 4， 1，2，5
// 宏任务： 定时器打印6，改状态
// 微任务p.then打印1， 外层打印2
// p1有了结果1，此时first的有了结果2