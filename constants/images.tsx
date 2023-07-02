import { StaticImageData } from "next/image";

import loginBackground from "../public/assets/background/login.webp";
import logoDesktop from "../public/assets/logo/desktop.webp";

import cocaine from "../public/assets/dealer/Cocaine.webp";
import heroin from "../public/assets/dealer/Heroin.webp";
import lsd from "../public/assets/dealer/LSD.webp";
import marijuana from "../public/assets/dealer/Marijuana.webp";
import meth from "../public/assets/dealer/Meth.webp";

import pills from "../public/assets/hospital/pills.webp";
import potion from "../public/assets/hospital/potion.webp";
import vaccine from "../public/assets/hospital/vaccine.webp";

import bailout from "../public/assets/prison/bailout.webp";
import escape from "../public/assets/prison/escape.webp";

import avatar1 from "../public/assets/avatars/av1.webp";
import avatar10 from "../public/assets/avatars/av10.webp";
import avatar11 from "../public/assets/avatars/av11.webp";
import avatar12 from "../public/assets/avatars/av12.webp";
import avatar13 from "../public/assets/avatars/av13.webp";
import avatar14 from "../public/assets/avatars/av14.webp";
import avatar15 from "../public/assets/avatars/av15.webp";
import avatar16 from "../public/assets/avatars/av16.webp";
import avatar17 from "../public/assets/avatars/av17.webp";
import avatar18 from "../public/assets/avatars/av18.webp";
import avatar19 from "../public/assets/avatars/av19.webp";
import avatar2 from "../public/assets/avatars/av2.webp";
import avatar20 from "../public/assets/avatars/av20.webp";
import avatar3 from "../public/assets/avatars/av3.webp";
import avatar4 from "../public/assets/avatars/av4.webp";
import avatar5 from "../public/assets/avatars/av5.webp";
import avatar6 from "../public/assets/avatars/av6.webp";
import avatar7 from "../public/assets/avatars/av7.webp";
import avatar8 from "../public/assets/avatars/av8.webp";
import avatar9 from "../public/assets/avatars/av9.webp";

import alley from "../public/assets/sections/alley.webp";
import bank from "../public/assets/sections/bank.webp";
import buildings from "../public/assets/sections/buildings.webp";
import casino from "../public/assets/sections/casino.webp";
import credit from "../public/assets/sections/credit.webp";
import dealer from "../public/assets/sections/dealer.webp";
import district from "../public/assets/sections/district.webp";
import gang from "../public/assets/sections/gang.webp";
import help from "../public/assets/sections/help.webp";
import home from "../public/assets/sections/home.webp";
import hospital from "../public/assets/sections/hospital.webp";
import market from "../public/assets/sections/market.webp";
import nightclub from "../public/assets/sections/nightclub.webp";
import prison from "../public/assets/sections/prison.webp";
import profile from "../public/assets/sections/profile.webp";
import robbery from "../public/assets/sections/robbery.webp";
import sabotage from "../public/assets/sections/sabotage.webp";
import statistics from "../public/assets/sections/statistics.webp";
import stockmarket from "../public/assets/sections/stockmarket.webp";
import university from "../public/assets/sections/university.webp";
import whores from "../public/assets/sections/whores.webp";

export interface IImages {
  [key: string]: StaticImageData;
}

const images: IImages = {
  loginBackground,
  logoDesktop,
  marijuana,
  cocaine,
  heroin,
  meth,
  lsd,
  escape,
  bailout,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
  avatar17,
  avatar18,
  avatar19,
  avatar20,
  alley,
  bank,
  buildings,
  casino,
  credit,
  dealer,
  district,
  gang,
  help,
  home,
  hospital,
  market,
  nightclub,
  prison,
  profile,
  robbery,
  sabotage,
  statistics,
  stockmarket,
  university,
  whores,
  pills,
  potion,
  vaccine,
};

export default images;
