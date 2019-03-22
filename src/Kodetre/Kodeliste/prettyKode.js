function prettyKode(kode) {
  kode = kode.replace("NN-NA-LKM-", "");
  kode = kode.replace("NN-LA-KLG-", "");
  kode = kode.replace("NN-", "");
  kode = kode.replace("AO-", "");
  return kode;
}

export default prettyKode;
