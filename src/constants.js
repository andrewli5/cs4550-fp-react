export const APP_NAME = "cat collector";
export const CAT_API_KEY =
  "live_VlKOzc3U7YxQZLBU4kkFMkS0LqnyaHzXq6B7LGTopTf4yPrwLhvKOMlnDO3YG64n";
export const LOCAL_API_URL = "http://localhost:4000/api";
export const CAT_API_URL_BREEDS = "https://api.thecatapi.com/v1/breeds";
export const CAT_API_URL_IMAGE =
  "https://api.thecatapi.com/v1/images/search?breed_ids=";
export const CAT_API_URL_IMAGES =
  "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids={}&api_key=" +
  CAT_API_KEY;
export const BREEDID_TO_CATICON = {
  abys: "abyssinian.png",
  aege: "aegean.png",
  abob: "american_bobtail.png",
  acur: "american_curl.png",
  asho: "american_shorthair.png",
  amis: "american_wirehair.png",
  bali: "balinese.png",
  bamb: "bambino.png",
  beng: "bengal.png",
  birm: "birman.png",
  bomb: "bombay.png",
  bslo: "british_longhair.png",
  bsho: "british_shorthair.png",
  bure: "burmese.png",
  buri: "burmilla.png",
  cspa: "california_spangled.png",
  ctif: "chartreux.png",
  chau: "chausie.png",
  chee: "cheetoh.png",
  csho: "colorpoint_shorthair.png",
  crex: "cornish_rex.png",
  cymr: "cymric.png",
  cypr: "cyprus.png",
  drex: "devon_rex.png",
  dons: "donskoy.png",
  lihu: "dwarf_lionhead.png",
  emau: "egyptian_mau.png",
  ebur: "european_burmese.png",
  esho: "exotic_shorthair.png",
  hbro: "havana_brown.png",
  hima: "himalayan.png",
  jbob: "japanese_bobtail.png",
  java: "javanese.png",
  khao: "khao_manee.png",
  kora: "korat.png",
  kuri: "korean_bobtail.png",
  kral: "kornish_rex.png",
  lape: "laperm.png",
  mcoo: "maine_coon.png",
  mala: "malayan.png",
  manx: "manx.png",
  munc: "munchkin.png",
  nebe: "nebelung.png",
  norw: "norwegian_forest.png",
  ocic: "ocicat.png",
  orie: "oriental.png",
  pers: "persian.png",
  pixi: "pixiebob.png",
  raga: "ragamuffin.png",
  ragd: "ragdoll.png",
  rblu: "russian_blue.png",
  sava: "savannah.png",
  siam: "siamese.png",
  sibe: "siberian.png",
  sing: "singapura.png",
  snow: "snowshoe.png",
  soma: "somali.png",
  sphy: "sphynx.png",
  tonk: "tonkinese.png",
  toyg: "toyger.png",
  tvan: "turkish_van.png",
  ycho: "york_chocolate.png",
};

export const CATICON_TO_BREEDID = {};
for (const [breedId, catIcon] of Object.entries(BREEDID_TO_CATICON)) {
  CATICON_TO_BREEDID[catIcon] = breedId;
}
