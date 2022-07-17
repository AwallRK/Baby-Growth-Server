function calculateStatistics(categoriesPerRT) {
  const giziKurangTerbanyak = { noRT: [], jumlah: 0 };
  const giziBerlebihTerbanyak = { noRT: [], jumlah: 0 };
  const giziCukupTerbanyak = { noRT: [], jumlah: 0 };

  categoriesPerRT.forEach((rt) => {
    if (rt.categories.kurang > giziKurangTerbanyak.jumlah) {
      giziKurangTerbanyak.noRT = [rt.noRT];
      giziKurangTerbanyak.jumlah = rt.categories.kurang;
    } else if (rt.categories.kurang === giziKurangTerbanyak.jumlah) {
      giziKurangTerbanyak.noRT.push(rt.noRT);
    }
    if (rt.categories.cukup > giziCukupTerbanyak.jumlah) {
      giziCukupTerbanyak.noRT = [rt.noRT];
      giziCukupTerbanyak.jumlah = rt.categories.cukup;
    } else if (rt.categories.cukup === giziCukupTerbanyak.jumlah) {
      giziCukupTerbanyak.noRT.push(rt.noRT);
    }
    if (rt.categories.berlebih > giziBerlebihTerbanyak.jumlah) {
      giziBerlebihTerbanyak.noRT = [rt.noRT];
      giziBerlebihTerbanyak.jumlah = rt.categories.berlebih;
    } else if (rt.categories.berlebih === giziBerlebihTerbanyak.jumlah) {
      giziBerlebihTerbanyak.noRT.push(rt.noRT);
    }
  });

  return { giziKurangTerbanyak, giziBerlebihTerbanyak, giziCukupTerbanyak };
}

module.exports = { calculateStatistics };
