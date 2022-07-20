function babiesWeightConverter(arr) {
  let result = {
    kurang: 0,
    cukup: 0,
    berlebih: 0,
  };

  for (let i = 0; i < arr.length; i++) {
    const weightData = arr[i];
    const month = arr[i].length;
    const lastWeight = weightData[month - 1];
    if (month === 1 || month === 2) {
      if (lastWeight < 750) {
        result.kurang++;
      } else if (lastWeight > 850) {
        result.berlebih++;
      } else {
        result.cukup++;
      }
    } else if (month === 3) {
      if (lastWeight < 550) {
        result.kurang++;
      } else if (lastWeight > 650) {
        result.berlebih++;
      } else {
        result.cukup++;
      }
    } else if (month === 4) {
      if (lastWeight < 450) {
        result.kurang++;
      } else if (lastWeight > 550) {
        result.berlebih++;
      } else {
        result.cukup++;
      }
    } else if (month === 5) {
      if (lastWeight < 350) {
        result.kurang++;
      } else if (lastWeight > 450) {
        result.berlebih++;
      } else {
        result.cukup++;
      }
    } else if (month >= 6 && month <= 16) {
      if (lastWeight < 250) {
        result.kurang++;
      } else if (lastWeight > 350) {
        result.berlebih++;
      } else {
        result.cukup++;
      }
    } else if (month >= 17 && month <= 23) {
      if (lastWeight < 150) {
        result.kurang++;
      } else if (lastWeight > 250) {
        result.berlebih++;
      } else {
        result.cukup++;
      }
    }
  }
  return result;
}

module.exports = { babiesWeightConverter };
