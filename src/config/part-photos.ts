import type { StaticImageData } from "next/image";
import akuTablasi from "@/assets/parts/aku-tablasi-37150-c7000.jpg";
import arkaKapiKilidi from "@/assets/parts/arka-kapi-kilidi-81420-2l000.jpg";
import aynaUcgenKapagi from "@/assets/parts/ayna-ucgen-kapagi-86190-a5100.jpg";
import bagajKilidi from "@/assets/parts/bagaj-kilidi-81230-d3000.jpg";
import camAltiDavlumbaz from "@/assets/parts/cam-alti-davlumbaz.jpg";
import camurlukDavlumbazi from "@/assets/parts/camurluk-davlumbazi.jpg";
import devirdaimPompasi from "@/assets/parts/devirdaim-pompasi-25100-07501.jpg";
import elFreniDugmePaneli from "@/assets/parts/el-freni-dugme-paneli-93300-d30304x.jpg";
import fanDavlumbazi from "@/assets/parts/fan-davlumbazi-25350-q0300.jpg";
import hizSensoru from "@/assets/parts/hiz-sensoru-96420-4a600.jpg";
import kaplamaParcasi1 from "@/assets/parts/kaplama-parcasi-1.jpg";
import kaplamaParcasi2 from "@/assets/parts/kaplama-parcasi-2.jpg";
import plakaLambasi from "@/assets/parts/plaka-lambasi-92501-1j000.jpg";
import sigortaKutusuKapagi from "@/assets/parts/sigorta-kutusu-kapagi-91213-25401.jpg";
import yedekSuDeposu from "@/assets/parts/yedek-su-deposu-25431-25100.jpg";

export type PartPhoto = {
  image: StaticImageData;
  name: string;
  partNumber?: string;
};

export const featuredPartPhotos: PartPhoto[] = [
  {
    image: elFreniDugmePaneli,
    name: "El Freni Ve Sürüş Modu Düğme Paneli",
    partNumber: "93300-D30304X",
  },
  {
    image: devirdaimPompasi,
    name: "Devirdaim Pompası",
    partNumber: "25100-07501",
  },
  { image: bagajKilidi, name: "Bagaj Kilidi", partNumber: "81230-D3000" },
  {
    image: arkaKapiKilidi,
    name: "Arka Kapı Kilit Mekanizması",
    partNumber: "81420-2L000",
  },
  { image: fanDavlumbazi, name: "Fan Davlumbazı", partNumber: "25350-Q0300" },
  { image: akuTablasi, name: "Akü Tablası", partNumber: "37150-C7000" },
];

export const filmstripPartPhotos: PartPhoto[] = [
  { image: hizSensoru, name: "Hız Sensörü", partNumber: "96420-4A600" },
  {
    image: aynaUcgenKapagi,
    name: "Ayna Üçgen Kapağı",
    partNumber: "86190-A5100",
  },
  {
    image: sigortaKutusuKapagi,
    name: "Sigorta Kutusu Kapağı",
    partNumber: "91213-25401",
  },
  { image: camurlukDavlumbazi, name: "Çamurluk Davlumbazı" },
  { image: plakaLambasi, name: "Plaka Lambası", partNumber: "92501-1J000" },
  { image: kaplamaParcasi1, name: "Plastik Kaplama Parçası" },
  {
    image: yedekSuDeposu,
    name: "Radyatör Yedek Su Deposu",
    partNumber: "25431-25100",
  },
  { image: camAltiDavlumbaz, name: "Ön Cam Altı Davlumbaz Parçası" },
  { image: kaplamaParcasi2, name: "Plastik Kaplama Parçası" },
];

export function getPartPhotoAlt(photo: PartPhoto) {
  return photo.partNumber
    ? `${photo.name}, parça no ${photo.partNumber} – orijinal sıfır ürün`
    : `${photo.name} – orijinal sıfır ürün`;
}
