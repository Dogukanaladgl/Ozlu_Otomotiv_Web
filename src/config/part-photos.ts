import type { StaticImageData } from "next/image";
import akuTablasi from "@/assets/parts/aku-tablasi-37150-c7000.webp";
import bagajKilidi from "@/assets/parts/bagaj-kilidi.webp";
import beyazPlastikKapak from "@/assets/parts/beyaz-plastik-kapak.webp";
import davlumbazParcasi from "@/assets/parts/davlumbaz-parcasi.webp";
import devirdaimPompasi from "@/assets/parts/devirdaim-pompasi.webp";
import elFreniDugmePaneli from "@/assets/parts/el-freni-dugme-paneli.webp";
import fanDavlumbazi from "@/assets/parts/fan-davlumbazi.webp";
import havaFiltresiKutusu from "@/assets/parts/hava-filtresi-kutusu.webp";
import hizSensoru from "@/assets/parts/hiz-sensoru.webp";
import icPanelParcasi from "@/assets/parts/ic-panel-parcasi.webp";
import kapiKilitMekanizmasi from "@/assets/parts/kapi-kilit-mekanizmasi.webp";
import plakaLambasi from "@/assets/parts/plaka-lambasi.webp";
import plastikBaglantiParcasi from "@/assets/parts/plastik-baglanti-parcasi.webp";
import plastikKapak from "@/assets/parts/plastik-kapak.webp";
import plastikKaplama from "@/assets/parts/plastik-kaplama.webp";
import sigortaKutusuKapagi from "@/assets/parts/sigorta-kutusu-kapagi-91213-25401.webp";
import surusModuDugmePaneli from "@/assets/parts/surus-modu-dugme-paneli.webp";
import ucgenKaplama from "@/assets/parts/ucgen-kaplama.webp";

export type PartPhoto = {
  image: StaticImageData;
  name: string;
  partNumber?: string;
};

export const featuredPartPhotos: PartPhoto[] = [
  {
    image: elFreniDugmePaneli,
    name: "El Freni Ve Sürüş Modu Düğme Paneli",
  },
  { image: devirdaimPompasi, name: "Devirdaim Pompası" },
  { image: bagajKilidi, name: "Bagaj Kilidi" },
  { image: kapiKilitMekanizmasi, name: "Kapı Kilit Mekanizması" },
  { image: fanDavlumbazi, name: "Fan Davlumbazı" },
  {
    image: akuTablasi,
    name: "Akü Tablası",
    partNumber: "37150-C7000",
  },
];

export const filmstripPartPhotos: PartPhoto[] = [
  { image: havaFiltresiKutusu, name: "Hava Filtresi Kutusu" },
  { image: plakaLambasi, name: "Plaka Lambası" },
  { image: hizSensoru, name: "Hız Sensörü" },
  {
    image: sigortaKutusuKapagi,
    name: "Sigorta Kutusu Kapağı",
    partNumber: "91213-25401",
  },
  { image: surusModuDugmePaneli, name: "Sürüş Modu Düğme Paneli" },
  { image: ucgenKaplama, name: "Üçgen Kaplama Parçası" },
  { image: icPanelParcasi, name: "İç Panel Parçası" },
  { image: davlumbazParcasi, name: "Davlumbaz Parçası" },
  { image: plastikKaplama, name: "Plastik Kaplama Parçası" },
  { image: plastikKapak, name: "Plastik Kapak" },
  { image: beyazPlastikKapak, name: "Beyaz Plastik Kapak" },
  { image: plastikBaglantiParcasi, name: "Plastik Bağlantı Parçası" },
];

export function getPartPhotoAlt(photo: PartPhoto) {
  return photo.partNumber
    ? `${photo.name}, parça no ${photo.partNumber} – orijinal sıfır ürün`
    : `${photo.name} – orijinal sıfır ürün`;
}
