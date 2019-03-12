function prettyKode(kode) {
  kode = kode.replace("NN-NA-LKM-", "");
  kode = kode.replace("NN-NA-", "");
  kode = kode.replace("NN-LA-", "");
  kode = kode.replace("AO-", "");
  return kode;
}

export default prettyKode;
