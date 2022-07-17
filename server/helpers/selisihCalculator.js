function selisihCalculator(data) {
  let tempSelisihArr = [];

  if (data.PregnancyDatum) {
    if (data.PregnancyDatum.beratBulanan.length > 0) {
      const beratBulananArr = data.PregnancyDatum.beratBulanan.split(",");

      tempSelisihArr.push(
        (beratBulananArr[0] - data.PregnancyDatum.beratAwal) * 1000
      );

      if (beratBulananArr.length > 1) {
        for (let i = 0; i < beratBulananArr.length - 1; i++) {
          tempSelisihArr.push(
            (beratBulananArr[i + 1] - beratBulananArr[i]) * 1000
          );
        }
      }
    }
  }

  let tempSelisihArr1 = [];

  if (data.BabyDatum) {
    if (data.BabyDatum.beratBulanan.length > 0) {
      const beratBayiBulananArr = data.BabyDatum.beratBulanan.split(",");

      tempSelisihArr1.push(
        (beratBayiBulananArr[0] - data.BabyDatum.beratAwal) * 1000
      );

      if (beratBayiBulananArr.length > 1) {
        for (let i = 0; i < beratBayiBulananArr.length - 1; i++) {
          tempSelisihArr1.push(
            (beratBayiBulananArr[i + 1] - beratBayiBulananArr[i]) * 1000
          );
        }
      }
    }
  }
  return [tempSelisihArr, tempSelisihArr1];
}

module.exports = { selisihCalculator };
