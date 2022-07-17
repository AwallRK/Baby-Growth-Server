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
      } else if (750 < lastWeight < 850) {
        result.cukup++;
      } else if (lastWeight > 850) {
        result.berlebih++;
      }
    } else if (month === 1) {
      if (lastWeight < 850) {
        result.kurang++;
      } else if (850 < lastWeight < 950) {
        result.cukup++;
      } else if (lastWeight > 950) {
        result.berlebih++;
      }
    } else if (month === 3) {
      if (lastWeight < 550) {
        result.kurang++;
      } else if (550 < lastWeight < 650) {
        result.cukup++;
      } else if (lastWeight > 650) {
        result.berlebih++;
      }
    } else if (month === 4) {
      if (lastWeight < 450) {
        result.kurang++;
      } else if (450 < lastWeight < 550) {
        result.cukup++;
      } else if (lastWeight > 550) {
        result.berlebih++;
      }
    } else if (month === 5) {
      if (lastWeight < 350) {
        result.kurang++;
      } else if (350 < lastWeight < 450) {
        result.cukup++;
      } else if (lastWeight > 450) {
        result.berlebih++;
      }
    } else if (6 <= month <= 16) {
      if (lastWeight < 250) {
        result.kurang++;
      } else if (250 < lastWeight < 350) {
        result.cukup++;
      } else if (lastWeight > 350) {
        result.berlebih++;
      }
    } else if (17 <= month <= 23) {
      if (lastWeight < 150) {
        result.kurang++;
      } else if (150 < lastWeight < 250) {
        result.cukup++;
      } else if (lastWeight > 250) {
        result.berlebih++;
      }
    }
  }
  return result;
}

module.exports = { babiesWeightConverter };
