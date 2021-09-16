var counter;
var dataSource;

updateCounter = async (count) => {
  counter.update(count);
};

setCounter = async (count) => {
  counter = new countUp.CountUp('currentCount', count, {
    startVal: count,
    easingF: function (t, b, c, d) {
      var ts = (t /= d) * t;
      var tc = ts * t;
      return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
    },
  });

  if (!counter.error) {
    counter.start();
  } else {
    console.log(counter.error);

    setTimeout(() => {
      setCounter(count);
    }, 1000);
  }
};

window.addEventListener('onSessionUpdate', function (obj) {
  const session = obj.detail.session;

  var value = session['data'][dataSource]['count'];
  value = value || session['data'][dataSource]['amount'];
  
  if (session && value) {
    updateCounter(value);
  }
});

window.addEventListener('onWidgetLoad', async (obj) => {
  const fieldData = obj.detail.fieldData;
  dataSource = fieldData.dataSource;

  const session = obj.detail.session;
  
  var value = session['data'][dataSource]['count'];
  value = value || session['data'][dataSource]['amount'];
 
  if (session && value) {
    setCounter(value);
  }
});
