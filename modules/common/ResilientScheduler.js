module.exports = function(every, f) {

  var scheduleNext = () => {
    setTimeout(() => {
      f().then(scheduleNext);
    }, every);
  };

  scheduleNext();


};
