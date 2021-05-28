import {Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { HomeService } from './shared/home.service';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';

import { faStar as outlineStar} from '@fortawesome/free-regular-svg-icons';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import {registerMap} from 'echarts'

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  providers:[HomeService]
})
export class HomeComponent implements OnDestroy {

  faStarHalfAlt = faStarHalfAlt;
  solidStar = solidStar;
  outlineStar = outlineStar;

  rating = 3.5;

  private alive = true;
  userId = JSON.parse(localStorage.getItem('currentUser')).user.id;
  artistName = JSON.parse(localStorage.getItem('currentUser')).artist.artistName;

  imageUrl;

  activity = [];

  counterAF = 0; counterAX = 2; counterAL = 0; counterDZ = 0; counterAS = 0; counterAD = 0; counterAO = 0; counterAI = 0;
  counterAQ = 0; counterAG = 0; counterAR = 0; counterAM = 0; counterAW = 0; counterAU = 0; counterAT = 0; counterAZ = 0; counterBS = 0; counterBH = 0; counterBD = 0; counterBB = 0; counterBY = 0; counterBE = 0; counterBZ = 0; counterBJ = 0; counterBM = 0; counterBT = 0; counterBO = 0; counterBQ = 0; counterBA = 0; counterBW = 0; counterBV = 0; counterBR = 0; counterIO = 0; counterBN = 0; counterBG = 0; counterBF = 0; counterBI = 0; counterKH = 0; counterCM = 0; counterCA = 0; counterCV = 0; counterKY = 0; counterCF = 0; counterTD = 0; counterCL = 0; counterCN = 0; counterCX = 0; counterCC = 0; counterCO = 0; counterKM = 0; counterCG = 0; counterCD = 0; counterCK = 0; counterCR = 0; counterCI = 0; counterHR = 0; counterCU = 0; counterCW = 0; counterCY = 0; counterCZ = 0; counterDK = 0; counterDJ = 0; counterDM = 0; counterDO = 0; counterEC = 0; counterEG = 0; counterSV = 0; counterGQ = 0; counterER = 0; counterEE = 0; counterET = 0; counterFK = 0; counterFO = 0; counterFJ = 0; counterFI = 0; counterFR = 0; counterGF = 0; counterPF = 0; counterTF = 0; counterGA = 0; counterGM = 0; counterGE = 0; counterDE = 0; counterGH = 0; counterGI = 0; counterGR = 0; counterGL = 0; counterGD = 0; counterGP = 0; counterGU = 0; counterGT = 0; counterGG = 0; counterGN = 0; counterGW = 0; counterGY = 0; counterHT = 0; counterHM = 0; counterVA = 0; counterHN = 0; counterHK = 0; counterHU = 0; counterIS = 0; counterIN = 0; counterID = 0; counterIR = 0; counterIQ = 0; counterIE = 0; counterIM = 0;
  counterIL = 1; counterIT = 3; counterJM = 0; counterJP = 0; counterJE = 0; counterJO = 0; counterKZ = 0; counterKE = 0; counterKI = 0; counterKP = 0; counterKR = 0; counterKW = 0; counterKG = 0; counterLA = 0; counterLV = 0; counterLB = 0; counterLS = 0; counterLR = 0; counterLY = 0; counterLI = 0; counterLT = 0; counterLU = 0; counterMO = 0; counterMK = 0; counterMG = 0; counterMW = 0; counterMY = 0; counterMV = 0; counterML = 0; counterMT = 0; counterMH = 0; counterMQ = 0; counterMR = 0; counterMU = 0; counterYT = 0; counterMX = 0; counterFM = 0; counterMD = 0; counterMC = 0; counterMN = 0; counterME = 0; counterMS = 0; counterMA = 0; counterMZ = 0; counterMM = 0; counterNA = 0; counterNR = 0; counterNP = 0; counterNL = 0; counterNC = 0; counterNZ = 0; counterNI = 0; counterNE = 0; counterNG = 0; counterNU = 0; counterNF = 0; counterMP = 0; counterNO = 0; counterOM = 0; counterPK = 0; counterPW = 0; counterPS = 0; counterPA = 0; counterPG = 0; counterPY = 0; counterPE = 0; counterPH = 0; counterPN = 0; counterPL = 0; counterPT = 0; counterPR = 0; counterQA = 0; counterRE = 0; counterRO = 0; counterRU = 0; counterRW = 0; counterBL = 0; counterSH = 0; counterKN = 0; counterLC = 0; counterMF = 0; counterPM = 0; counterVC = 0; counterWS = 0; counterSM = 0; counterST = 0; counterSA = 0; counterSN = 0; counterRS = 0; counterSC = 0; counterSL = 0; counterSG = 0; counterSX = 0; counterSK = 0; counterSI = 0; counterSB = 0; counterSO = 0; counterZA = 0; counterGS = 0; counterSS = 0; counterES = 5; counterLK = 0; counterSD = 0; counterSR = 0; counterSJ = 0; counterSZ = 0; counterSE = 0; counterCH = 0; counterSY = 0; counterTW = 0; counterTJ = 0; counterTZ = 0; counterTH = 0; counterTL = 0; counterTG = 0; counterTK = 0; counterTO = 0; counterTT = 0; counterTN = 0; counterTR = 0;
  counterTM = 0; counterTC = 0; counterTV = 0; counterUG = 0; counterUA = 0; counterAE = 0; counterGB = 0; counterUS = 0; counterUM = 0; counterUY = 0; counterUZ = 0; counterVU = 0; counterVE = 0; counterVN = 0; counterVG = 0; counterVI = 0; counterWF = 0; counterEH = 0; counterYE = 0; counterZM = 0; counterZW = 0;

  constructor(private router: Router, private homeService: HomeService,
    private http: HttpClient,
    private theme: NbThemeService) {
    this.imageUrl = "https://artists-tfg.s3.us-east-2.amazonaws.com/" + this.userId + ".png";

    this.homeService.getUserConcertsActivityByArtist().pipe().subscribe((data: any)=>{
      console.log(data)
      this.activity = data;
      this.activity = this.activity.slice(0, 5);
    });

    this.generateMap();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  createConcert(){
    this.router.navigate(["/pages/new/concert"]);
  }

  mapWithDataActive = false;
  bubbleTheme = null;
  geoColors = [];
  latlong = {};
  mapData = [];

  max = -Infinity;
  min = Infinity;

  optionsMap:any;
  options66: any;
  
  generateMap() {
    /* If no map points don't generate map */
    if (this.checkIfMapData()) {
      this.mapWithDataActive = true;
    }

    combineLatest([
      this.http.get('assets/map/world.json'),
      this.theme.getJsTheme(),
    ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(([map, config]: [any, any]) => {

        registerMap('world', map);

        const colors = config.variables;
        this.bubbleTheme = config.variables.bubbleMap;
        this.geoColors = ["rgb(174, 228, 249)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(174, 228, 249)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)", "rgb(173, 189, 196)", "rgb(135, 215, 247)"];

        this.latlong = {
          'AD': { 'latitude': 42.5, 'longitude': 1.5 },
          'AE': { 'latitude': 24, 'longitude': 54 },
          'AF': { 'latitude': 33, 'longitude': 65 },
          'AG': { 'latitude': 17.05, 'longitude': -61.8 },
          'AI': { 'latitude': 18.25, 'longitude': -63.1667 },
          'AL': { 'latitude': 41, 'longitude': 20 },
          'AM': { 'latitude': 40, 'longitude': 45 },
          'AN': { 'latitude': 12.25, 'longitude': -68.75 },
          'AO': { 'latitude': -12.5, 'longitude': 18.5 },
          'AP': { 'latitude': 35, 'longitude': 105 },
          'AQ': { 'latitude': -90, 'longitude': 0 },
          'AR': { 'latitude': -34, 'longitude': -64 },
          'AS': { 'latitude': -14.3333, 'longitude': -170 },
          'AT': { 'latitude': 47.3333, 'longitude': 13.3333 },
          'AU': { 'latitude': -27, 'longitude': 133 },
          'AW': { 'latitude': 12.5, 'longitude': -69.9667 },
          'AZ': { 'latitude': 40.5, 'longitude': 47.5 },
          'BA': { 'latitude': 44, 'longitude': 18 },
          'BB': { 'latitude': 13.1667, 'longitude': -59.5333 },
          'BD': { 'latitude': 24, 'longitude': 90 },
          'BE': { 'latitude': 50.8333, 'longitude': 4 },
          'BF': { 'latitude': 13, 'longitude': -2 },
          'BG': { 'latitude': 43, 'longitude': 25 },
          'BH': { 'latitude': 26, 'longitude': 50.55 },
          'BI': { 'latitude': -3.5, 'longitude': 30 },
          'BJ': { 'latitude': 9.5, 'longitude': 2.25 },
          'BM': { 'latitude': 32.3333, 'longitude': -64.75 },
          'BN': { 'latitude': 4.5, 'longitude': 114.6667 },
          'BO': { 'latitude': -17, 'longitude': -65 },
          'BR': { 'latitude': -10, 'longitude': -55 },
          'BS': { 'latitude': 24.25, 'longitude': -76 },
          'BT': { 'latitude': 27.5, 'longitude': 90.5 },
          'BV': { 'latitude': -54.4333, 'longitude': 3.4 },
          'BW': { 'latitude': -22, 'longitude': 24 },
          'BY': { 'latitude': 53, 'longitude': 28 },
          'BZ': { 'latitude': 17.25, 'longitude': -88.75 },
          'CA': { 'latitude': 54, 'longitude': -100 },
          'CC': { 'latitude': -12.5, 'longitude': 96.8333 },
          'CD': { 'latitude': 0, 'longitude': 25 },
          'CF': { 'latitude': 7, 'longitude': 21 },
          'CG': { 'latitude': -1, 'longitude': 15 },
          'CH': { 'latitude': 47, 'longitude': 8 },
          'CI': { 'latitude': 8, 'longitude': -5 },
          'CK': { 'latitude': -21.2333, 'longitude': -159.7667 },
          'CL': { 'latitude': -30, 'longitude': -71 },
          'CM': { 'latitude': 6, 'longitude': 12 },
          'CN': { 'latitude': 35, 'longitude': 105 },
          'CO': { 'latitude': 4, 'longitude': -72 },
          'CR': { 'latitude': 10, 'longitude': -84 },
          'CU': { 'latitude': 21.5, 'longitude': -80 },
          'CV': { 'latitude': 16, 'longitude': -24 },
          'CX': { 'latitude': -10.5, 'longitude': 105.6667 },
          'CY': { 'latitude': 35, 'longitude': 33 },
          'CZ': { 'latitude': 49.75, 'longitude': 15.5 },
          'DE': { 'latitude': 51, 'longitude': 9 },
          'DJ': { 'latitude': 11.5, 'longitude': 43 },
          'DK': { 'latitude': 56, 'longitude': 10 },
          'DM': { 'latitude': 15.4167, 'longitude': -61.3333 },
          'DO': { 'latitude': 19, 'longitude': -70.6667 },
          'DZ': { 'latitude': 28, 'longitude': 3 },
          'EC': { 'latitude': -2, 'longitude': -77.5 },
          'EE': { 'latitude': 59, 'longitude': 26 },
          'EG': { 'latitude': 27, 'longitude': 30 },
          'EH': { 'latitude': 24.5, 'longitude': -13 },
          'ER': { 'latitude': 15, 'longitude': 39 },
          'ES': { 'latitude': 40, 'longitude': -4 },
          'ET': { 'latitude': 8, 'longitude': 38 },
          'EU': { 'latitude': 47, 'longitude': 8 },
          'FI': { 'latitude': 62, 'longitude': 26 },
          'FJ': { 'latitude': -18, 'longitude': 175 },
          'FK': { 'latitude': -51.75, 'longitude': -59 },
          'FM': { 'latitude': 6.9167, 'longitude': 158.25 },
          'FO': { 'latitude': 62, 'longitude': -7 },
          'FR': { 'latitude': 46, 'longitude': 2 },
          'GA': { 'latitude': -1, 'longitude': 11.75 },
          'GB': { 'latitude': 54, 'longitude': -2 },
          'GD': { 'latitude': 12.1167, 'longitude': -61.6667 },
          'GE': { 'latitude': 42, 'longitude': 43.5 },
          'GF': { 'latitude': 4, 'longitude': -53 },
          'GH': { 'latitude': 8, 'longitude': -2 },
          'GI': { 'latitude': 36.1833, 'longitude': -5.3667 },
          'GL': { 'latitude': 72, 'longitude': -40 },
          'GM': { 'latitude': 13.4667, 'longitude': -16.5667 },
          'GN': { 'latitude': 11, 'longitude': -10 },
          'GP': { 'latitude': 16.25, 'longitude': -61.5833 },
          'GQ': { 'latitude': 2, 'longitude': 10 },
          'GR': { 'latitude': 39, 'longitude': 22 },
          'GS': { 'latitude': -54.5, 'longitude': -37 },
          'GT': { 'latitude': 15.5, 'longitude': -90.25 },
          'GU': { 'latitude': 13.4667, 'longitude': 144.7833 },
          'GW': { 'latitude': 12, 'longitude': -15 },
          'GY': { 'latitude': 5, 'longitude': -59 },
          'HK': { 'latitude': 22.25, 'longitude': 114.1667 },
          'HM': { 'latitude': -53.1, 'longitude': 72.5167 },
          'HN': { 'latitude': 15, 'longitude': -86.5 },
          'HR': { 'latitude': 45.1667, 'longitude': 15.5 },
          'HT': { 'latitude': 19, 'longitude': -72.4167 },
          'HU': { 'latitude': 47, 'longitude': 20 },
          'ID': { 'latitude': -5, 'longitude': 120 },
          'IE': { 'latitude': 53, 'longitude': -8 },
          'IL': { 'latitude': 31.5, 'longitude': 34.75 },
          'IN': { 'latitude': 20, 'longitude': 77 },
          'IO': { 'latitude': -6, 'longitude': 71.5 },
          'IQ': { 'latitude': 33, 'longitude': 44 },
          'IR': { 'latitude': 32, 'longitude': 53 },
          'IS': { 'latitude': 65, 'longitude': -18 },
          'IT': { 'latitude': 42.8333, 'longitude': 12.8333 },
          'JM': { 'latitude': 18.25, 'longitude': -77.5 },
          'JO': { 'latitude': 31, 'longitude': 36 },
          'JP': { 'latitude': 36, 'longitude': 138 },
          'KE': { 'latitude': 1, 'longitude': 38 },
          'KG': { 'latitude': 41, 'longitude': 75 },
          'KH': { 'latitude': 13, 'longitude': 105 },
          'KI': { 'latitude': 1.4167, 'longitude': 173 },
          'KM': { 'latitude': -12.1667, 'longitude': 44.25 },
          'KN': { 'latitude': 17.3333, 'longitude': -62.75 },
          'KP': { 'latitude': 40, 'longitude': 127 },
          'KR': { 'latitude': 37, 'longitude': 127.5 },
          'KW': { 'latitude': 29.3375, 'longitude': 47.6581 },
          'KY': { 'latitude': 19.5, 'longitude': -80.5 },
          'KZ': { 'latitude': 48, 'longitude': 68 },
          'LA': { 'latitude': 18, 'longitude': 105 },
          'LB': { 'latitude': 33.8333, 'longitude': 35.8333 },
          'LC': { 'latitude': 13.8833, 'longitude': -61.1333 },
          'LI': { 'latitude': 47.1667, 'longitude': 9.5333 },
          'LK': { 'latitude': 7, 'longitude': 81 },
          'LR': { 'latitude': 6.5, 'longitude': -9.5 },
          'LS': { 'latitude': -29.5, 'longitude': 28.5 },
          'LT': { 'latitude': 55, 'longitude': 24 },
          'LU': { 'latitude': 49.75, 'longitude': 6 },
          'LV': { 'latitude': 57, 'longitude': 25 },
          'LY': { 'latitude': 25, 'longitude': 17 },
          'MA': { 'latitude': 32, 'longitude': -5 },
          'MC': { 'latitude': 43.7333, 'longitude': 7.4 },
          'MD': { 'latitude': 47, 'longitude': 29 },
          'ME': { 'latitude': 42.5, 'longitude': 19.4 },
          'MG': { 'latitude': -20, 'longitude': 47 },
          'MH': { 'latitude': 9, 'longitude': 168 },
          'MK': { 'latitude': 41.8333, 'longitude': 22 },
          'ML': { 'latitude': 17, 'longitude': -4 },
          'MM': { 'latitude': 22, 'longitude': 98 },
          'MN': { 'latitude': 46, 'longitude': 105 },
          'MO': { 'latitude': 22.1667, 'longitude': 113.55 },
          'MP': { 'latitude': 15.2, 'longitude': 145.75 },
          'MQ': { 'latitude': 14.6667, 'longitude': -61 },
          'MR': { 'latitude': 20, 'longitude': -12 },
          'MS': { 'latitude': 16.75, 'longitude': -62.2 },
          'MT': { 'latitude': 35.8333, 'longitude': 14.5833 },
          'MU': { 'latitude': -20.2833, 'longitude': 57.55 },
          'MV': { 'latitude': 3.25, 'longitude': 73 },
          'MW': { 'latitude': -13.5, 'longitude': 34 },
          'MX': { 'latitude': 23, 'longitude': -102 },
          'MY': { 'latitude': 2.5, 'longitude': 112.5 },
          'MZ': { 'latitude': -18.25, 'longitude': 35 },
          'NA': { 'latitude': -22, 'longitude': 17 },
          'NC': { 'latitude': -21.5, 'longitude': 165.5 },
          'NE': { 'latitude': 16, 'longitude': 8 },
          'NF': { 'latitude': -29.0333, 'longitude': 167.95 },
          'NG': { 'latitude': 10, 'longitude': 8 },
          'NI': { 'latitude': 13, 'longitude': -85 },
          'NL': { 'latitude': 52.5, 'longitude': 5.75 },
          'NO': { 'latitude': 62, 'longitude': 10 },
          'NP': { 'latitude': 28, 'longitude': 84 },
          'NR': { 'latitude': -0.5333, 'longitude': 166.9167 },
          'NU': { 'latitude': -19.0333, 'longitude': -169.8667 },
          'NZ': { 'latitude': -41, 'longitude': 174 },
          'OM': { 'latitude': 21, 'longitude': 57 },
          'PA': { 'latitude': 9, 'longitude': -80 },
          'PE': { 'latitude': -10, 'longitude': -76 },
          'PF': { 'latitude': -15, 'longitude': -140 },
          'PG': { 'latitude': -6, 'longitude': 147 },
          'PH': { 'latitude': 13, 'longitude': 122 },
          'PK': { 'latitude': 30, 'longitude': 70 },
          'PL': { 'latitude': 52, 'longitude': 20 },
          'PM': { 'latitude': 46.8333, 'longitude': -56.3333 },
          'PR': { 'latitude': 18.25, 'longitude': -66.5 },
          'PS': { 'latitude': 32, 'longitude': 35.25 },
          'PT': { 'latitude': 39.5, 'longitude': -8 },
          'PW': { 'latitude': 7.5, 'longitude': 134.5 },
          'PY': { 'latitude': -23, 'longitude': -58 },
          'QA': { 'latitude': 25.5, 'longitude': 51.25 },
          'RE': { 'latitude': -21.1, 'longitude': 55.6 },
          'RO': { 'latitude': 46, 'longitude': 25 },
          'RS': { 'latitude': 44, 'longitude': 21 },
          'RU': { 'latitude': 60, 'longitude': 100 },
          'RW': { 'latitude': -2, 'longitude': 30 },
          'SA': { 'latitude': 25, 'longitude': 45 },
          'SB': { 'latitude': -8, 'longitude': 159 },
          'SC': { 'latitude': -4.5833, 'longitude': 55.6667 },
          'SD': { 'latitude': 15, 'longitude': 30 },
          'SE': { 'latitude': 62, 'longitude': 15 },
          'SG': { 'latitude': 1.3667, 'longitude': 103.8 },
          'SH': { 'latitude': -15.9333, 'longitude': -5.7 },
          'SI': { 'latitude': 46, 'longitude': 15 },
          'SJ': { 'latitude': 78, 'longitude': 20 },
          'SK': { 'latitude': 48.6667, 'longitude': 19.5 },
          'SL': { 'latitude': 8.5, 'longitude': -11.5 },
          'SM': { 'latitude': 43.7667, 'longitude': 12.4167 },
          'SN': { 'latitude': 14, 'longitude': -14 },
          'SO': { 'latitude': 10, 'longitude': 49 },
          'SR': { 'latitude': 4, 'longitude': -56 },
          'ST': { 'latitude': 1, 'longitude': 7 },
          'SV': { 'latitude': 13.8333, 'longitude': -88.9167 },
          'SY': { 'latitude': 35, 'longitude': 38 },
          'SZ': { 'latitude': -26.5, 'longitude': 31.5 },
          'TC': { 'latitude': 21.75, 'longitude': -71.5833 },
          'TD': { 'latitude': 15, 'longitude': 19 },
          'TF': { 'latitude': -43, 'longitude': 67 },
          'TG': { 'latitude': 8, 'longitude': 1.1667 },
          'TH': { 'latitude': 15, 'longitude': 100 },
          'TJ': { 'latitude': 39, 'longitude': 71 },
          'TK': { 'latitude': -9, 'longitude': -172 },
          'TM': { 'latitude': 40, 'longitude': 60 },
          'TN': { 'latitude': 34, 'longitude': 9 },
          'TO': { 'latitude': -20, 'longitude': -175 },
          'TR': { 'latitude': 39, 'longitude': 35 },
          'TT': { 'latitude': 11, 'longitude': -61 },
          'TV': { 'latitude': -8, 'longitude': 178 },
          'TW': { 'latitude': 23.5, 'longitude': 121 },
          'TZ': { 'latitude': -6, 'longitude': 35 },
          'UA': { 'latitude': 49, 'longitude': 32 },
          'UG': { 'latitude': 1, 'longitude': 32 },
          'UM': { 'latitude': 19.2833, 'longitude': 166.6 },
          'US': { 'latitude': 38, 'longitude': -97 },
          'UY': { 'latitude': -33, 'longitude': -56 },
          'UZ': { 'latitude': 41, 'longitude': 64 },
          'VA': { 'latitude': 41.9, 'longitude': 12.45 },
          'VC': { 'latitude': 13.25, 'longitude': -61.2 },
          'VE': { 'latitude': 8, 'longitude': -66 },
          'VG': { 'latitude': 18.5, 'longitude': -64.5 },
          'VI': { 'latitude': 18.3333, 'longitude': -64.8333 },
          'VN': { 'latitude': 16, 'longitude': 106 },
          'VU': { 'latitude': -16, 'longitude': 167 },
          'WF': { 'latitude': -13.3, 'longitude': -176.2 },
          'WS': { 'latitude': -13.5833, 'longitude': -172.3333 },
          'YE': { 'latitude': 15, 'longitude': 48 },
          'YT': { 'latitude': -12.8333, 'longitude': 45.1667 },
          'ZA': { 'latitude': -29, 'longitude': 24 },
          'ZM': { 'latitude': -15, 'longitude': 30 },
          'ZW': { 'latitude': -20, 'longitude': 30 },
        };

        this.mapData = [
          { 'code': 'AF', 'name': 'Afghanistan', 'value': this.counterAF, 'color': '#589a9ca1' },
          { 'code': 'AL', 'name': 'Albania', 'value': this.counterAL, 'color': '#589a9ca1' },
          { 'code': 'DZ', 'name': 'Algeria', 'value': this.counterDZ, 'color': '#589a9ca1' },
          { 'code': 'AO', 'name': 'Angola', 'value': this.counterAO, 'color': '#589a9ca1' },
          { 'code': 'AR', 'name': 'Argentina', 'value': this.counterAR, 'color': '#589a9ca1' },
          { 'code': 'AM', 'name': 'Armenia', 'value': this.counterAM, 'color': '#589a9ca1' },
          { 'code': 'AU', 'name': 'Australia', 'value': this.counterAU, 'color': '#589a9ca1' },
          { 'code': 'AT', 'name': 'Austria', 'value': this.counterAT, 'color': '#589a9ca1' },
          { 'code': 'AZ', 'name': 'Azerbaijan', 'value': this.counterAZ, 'color': '#589a9ca1' },
          { 'code': 'BH', 'name': 'Bahrain', 'value': this.counterBH, 'color': '#589a9ca1' },
          { 'code': 'BD', 'name': 'Bangladesh', 'value': this.counterBD, 'color': '#589a9ca1' },
          { 'code': 'BY', 'name': 'Belarus', 'value': this.counterBY, 'color': '#589a9ca1' },
          { 'code': 'BE', 'name': 'Belgium', 'value': this.counterBE, 'color': '#589a9ca1' },
          { 'code': 'BJ', 'name': 'Benin', 'value': this.counterBJ, 'color': '#589a9ca1' },
          { 'code': 'BT', 'name': 'Bhutan', 'value': this.counterBT, 'color': '#589a9ca1' },
          { 'code': 'BO', 'name': 'Bolivia', 'value': this.counterBO, 'color': '#589a9ca1' },
          { 'code': 'BA', 'name': 'Bosnia and Herzegovina', 'value': this.counterBA, 'color': '#589a9ca1' },
          { 'code': 'BW', 'name': 'Botswana', 'value': this.counterBW, 'color': '#589a9ca1' },
          { 'code': 'BR', 'name': 'Brazil', 'value': this.counterBR, 'color': '#589a9ca1' },
          { 'code': 'BN', 'name': 'Brunei', 'value': this.counterBN, 'color': '#589a9ca1' },
          { 'code': 'BG', 'name': 'Bulgaria', 'value': this.counterBG, 'color': '#589a9ca1' },
          { 'code': 'BF', 'name': 'Burkina Faso', 'value': this.counterBF, 'color': '#589a9ca1' },
          { 'code': 'BI', 'name': 'Burundi', 'value': this.counterBI, 'color': '#589a9ca1' },
          { 'code': 'KH', 'name': 'Cambodia', 'value': this.counterKH, 'color': '#589a9ca1' },
          { 'code': 'CM', 'name': 'Cameroon', 'value': this.counterCM, 'color': '#589a9ca1' },
          { 'code': 'CA', 'name': 'Canada', 'value': this.counterCA, 'color': '#589a9ca1' },
          { 'code': 'CV', 'name': 'Cape Verde', 'value': this.counterCV, 'color': '#589a9ca1' },
          { 'code': 'CF', 'name': 'Central African Rep.', 'value': this.counterCF, 'color': '#589a9ca1' },
          { 'code': 'TD', 'name': 'Chad', 'value': this.counterTD, 'color': '#589a9ca1' },
          { 'code': 'CL', 'name': 'Chile', 'value': this.counterCL, 'color': '#589a9ca1' },
          { 'code': 'CN', 'name': 'China', 'value': this.counterCN, 'color': '#589a9ca1' },
          { 'code': 'CO', 'name': 'Colombia', 'value': this.counterCO, 'color': '#589a9ca1' },
          { 'code': 'KM', 'name': 'Comoros', 'value': this.counterKM, 'color': '#589a9ca1' },
          { 'code': 'CD', 'name': 'Congo, Dem. Rep.', 'value': this.counterCD, 'color': '#589a9ca1' },
          { 'code': 'CG', 'name': 'Congo, Rep.', 'value': this.counterCG, 'color': '#589a9ca1' },
          { 'code': 'CR', 'name': 'Costa Rica', 'value': this.counterCR, 'color': '#589a9ca1' },
          { 'code': 'CI', 'name': 'Cote d\'Ivoire', 'value': this.counterCI, 'color': '#589a9ca1' },
          { 'code': 'HR', 'name': 'Croatia', 'value': this.counterHR, 'color': '#589a9ca1' },
          { 'code': 'CU', 'name': 'Cuba', 'value': this.counterCU, 'color': '#589a9ca1' },
          { 'code': 'CY', 'name': 'Cyprus', 'value': this.counterCY, 'color': '#589a9ca1' },
          { 'code': 'CZ', 'name': 'Czech Rep.', 'value': this.counterCZ, 'color': '#589a9ca1' },
          { 'code': 'DK', 'name': 'Denmark', 'value': this.counterDK, 'color': '#589a9ca1' },
          { 'code': 'DJ', 'name': 'Djibouti', 'value': this.counterDJ, 'color': '#589a9ca1' },
          { 'code': 'DO', 'name': 'Dominican Rep.', 'value': this.counterDO, 'color': '#589a9ca1' },
          { 'code': 'EC', 'name': 'Ecuador', 'value': this.counterEC, 'color': '#589a9ca1' },
          { 'code': 'EG', 'name': 'Egypt', 'value': this.counterEG, 'color': '#589a9ca1' },
          { 'code': 'SV', 'name': 'El Salvador', 'value': this.counterSV, 'color': '#589a9ca1' },
          { 'code': 'GQ', 'name': 'Equatorial Guinea', 'value': this.counterGQ, 'color': '#589a9ca1' },
          { 'code': 'ER', 'name': 'Eritrea', 'value': this.counterER, 'color': '#589a9ca1' },
          { 'code': 'EE', 'name': 'Estonia', 'value': this.counterEE, 'color': '#589a9ca1' },
          { 'code': 'ET', 'name': 'Ethiopia', 'value': this.counterET, 'color': '#589a9ca1' },
          { 'code': 'FJ', 'name': 'Fiji', 'value': this.counterFJ, 'color': '#589a9ca1' },
          { 'code': 'FI', 'name': 'Finland', 'value': this.counterFI, 'color': '#589a9ca1' },
          { 'code': 'FR', 'name': 'France', 'value': this.counterFR, 'color': '#589a9ca1' },
          { 'code': 'GA', 'name': 'Gabon', 'value': this.counterGA, 'color': '#589a9ca1' },
          { 'code': 'GM', 'name': 'Gambia', 'value': this.counterGM, 'color': '#589a9ca1' },
          { 'code': 'GE', 'name': 'Georgia', 'value': this.counterGE, 'color': '#589a9ca1' },
          { 'code': 'DE', 'name': 'Germany', 'value': this.counterDE, 'color': '#589a9ca1' },
          { 'code': 'GH', 'name': 'Ghana', 'value': this.counterGH, 'color': '#589a9ca1' },
          { 'code': 'GR', 'name': 'Greece', 'value': this.counterGR, 'color': '#589a9ca1' },
          { 'code': 'GT', 'name': 'Guatemala', 'value': this.counterGT, 'color': '#589a9ca1' },
          { 'code': 'GN', 'name': 'Guinea', 'value': this.counterGN, 'color': '#589a9ca1' },
          { 'code': 'GW', 'name': 'Guinea-Bissau', 'value': this.counterGW, 'color': '#589a9ca1' },
          { 'code': 'GY', 'name': 'Guyana', 'value': this.counterGY, 'color': '#589a9ca1' },
          { 'code': 'HT', 'name': 'Haiti', 'value': this.counterHT, 'color': '#589a9ca1' },
          { 'code': 'HN', 'name': 'Honduras', 'value': this.counterHN, 'color': '#589a9ca1' },
          { 'code': 'HK', 'name': 'Hong Kong, China', 'value': this.counterHK, 'color': '#589a9ca1' },
          { 'code': 'HU', 'name': 'Hungary', 'value': this.counterHU, 'color': '#589a9ca1' },
          { 'code': 'IS', 'name': 'Iceland', 'value': this.counterIS, 'color': '#589a9ca1' },
          { 'code': 'IN', 'name': 'India', 'value': this.counterIN, 'color': '#589a9ca1' },
          { 'code': 'ID', 'name': 'Indonesia', 'value': this.counterID, 'color': '#589a9ca1' },
          { 'code': 'IR', 'name': 'Iran', 'value': this.counterIR, 'color': '#589a9ca1' },
          { 'code': 'IQ', 'name': 'Iraq', 'value': this.counterIQ, 'color': '#589a9ca1' },
          { 'code': 'IE', 'name': 'Ireland', 'value': this.counterIE, 'color': '#589a9ca1' },
          { 'code': 'IL', 'name': 'Israel', 'value': this.counterIL, 'color': '#589a9ca1' },
          { 'code': 'IT', 'name': 'Italy', 'value': this.counterIT, 'color': '#589a9ca1' },
          { 'code': 'JM', 'name': 'Jamaica', 'value': this.counterJM, 'color': '#589a9ca1' },
          { 'code': 'JP', 'name': 'Japan', 'value': this.counterJP, 'color': '#589a9ca1' },
          { 'code': 'JO', 'name': 'Jordan', 'value': this.counterJO, 'color': '#589a9ca1' },
          { 'code': 'KZ', 'name': 'Kazakhstan', 'value': this.counterKZ, 'color': '#589a9ca1' },
          { 'code': 'KE', 'name': 'Kenya', 'value': this.counterKE, 'color': '#589a9ca1' },
          { 'code': 'KP', 'name': 'Korea, Dem. Rep.', 'value': this.counterKP, 'color': '#589a9ca1' },
          { 'code': 'KR', 'name': 'Korea, Rep.', 'value': this.counterKR, 'color': '#589a9ca1' },
          { 'code': 'KW', 'name': 'Kuwait', 'value': this.counterKW, 'color': '#589a9ca1' },
          { 'code': 'KG', 'name': 'Kyrgyzstan', 'value': this.counterKG, 'color': '#589a9ca1' },
          { 'code': 'LA', 'name': 'Laos', 'value': this.counterLA, 'color': '#589a9ca1' },
          { 'code': 'LV', 'name': 'Latvia', 'value': this.counterLV, 'color': '#589a9ca1' },
          { 'code': 'LB', 'name': 'Lebanon', 'value': this.counterLB, 'color': '#589a9ca1' },
          { 'code': 'LS', 'name': 'Lesotho', 'value': this.counterLS, 'color': '#589a9ca1' },
          { 'code': 'LR', 'name': 'Liberia', 'value': this.counterLR, 'color': '#589a9ca1' },
          { 'code': 'LY', 'name': 'Libya', 'value': this.counterLY, 'color': '#589a9ca1' },
          { 'code': 'LT', 'name': 'Lithuania', 'value': this.counterLT, 'color': '#589a9ca1' },
          { 'code': 'LU', 'name': 'Luxembourg', 'value': this.counterLU, 'color': '#589a9ca1' },
          { 'code': 'MK', 'name': 'Macedonia, FYR', 'value': this.counterMK, 'color': '#589a9ca1' },
          { 'code': 'MG', 'name': 'Madagascar', 'value': this.counterMG, 'color': '#589a9ca1' },
          { 'code': 'MW', 'name': 'Malawi', 'value': this.counterMW, 'color': '#589a9ca1' },
          { 'code': 'MY', 'name': 'Malaysia', 'value': this.counterMY, 'color': '#589a9ca1' },
          { 'code': 'ML', 'name': 'Mali', 'value': this.counterML, 'color': '#589a9ca1' },
          { 'code': 'MR', 'name': 'Mauritania', 'value': this.counterMR, 'color': '#589a9ca1' },
          { 'code': 'MU', 'name': 'Mauritius', 'value': this.counterMU, 'color': '#589a9ca1' },
          { 'code': 'MX', 'name': 'Mexico', 'value': this.counterMX, 'color': '#589a9ca1' },
          { 'code': 'MD', 'name': 'Moldova', 'value': this.counterMD, 'color': '#589a9ca1' },
          { 'code': 'MN', 'name': 'Mongolia', 'value': this.counterMN, 'color': '#589a9ca1' },
          { 'code': 'ME', 'name': 'Montenegro', 'value': this.counterME, 'color': '#589a9ca1' },
          { 'code': 'MA', 'name': 'Morocco', 'value': this.counterMA, 'color': '#589a9ca1' },
          { 'code': 'MZ', 'name': 'Mozambique', 'value': this.counterMZ, 'color': '#589a9ca1' },
          { 'code': 'MM', 'name': 'Myanmar', 'value': this.counterMM, 'color': '#589a9ca1' },
          { 'code': 'NA', 'name': 'Namibia', 'value': this.counterNA, 'color': '#589a9ca1' },
          { 'code': 'NP', 'name': 'Nepal', 'value': this.counterNP, 'color': '#589a9ca1' },
          { 'code': 'NL', 'name': 'Netherlands', 'value': this.counterNL, 'color': '#589a9ca1' },
          { 'code': 'NZ', 'name': 'New Zealand', 'value': this.counterNZ, 'color': '#589a9ca1' },
          { 'code': 'NI', 'name': 'Nicaragua', 'value': this.counterNI, 'color': '#589a9ca1' },
          { 'code': 'NE', 'name': 'Niger', 'value': this.counterNE, 'color': '#589a9ca1' },
          { 'code': 'NG', 'name': 'Nigeria', 'value': this.counterNG, 'color': '#589a9ca1' },
          { 'code': 'NO', 'name': 'Norway', 'value': this.counterNO, 'color': '#589a9ca1' },
          { 'code': 'OM', 'name': 'Oman', 'value': this.counterOM, 'color': '#589a9ca1' },
          { 'code': 'PK', 'name': 'Pakistan', 'value': this.counterPK, 'color': '#589a9ca1' },
          { 'code': 'PA', 'name': 'Panama', 'value': this.counterPA, 'color': '#589a9ca1' },
          { 'code': 'PG', 'name': 'Papua New Guinea', 'value': this.counterPG, 'color': '#589a9ca1' },
          { 'code': 'PY', 'name': 'Paraguay', 'value': this.counterPY, 'color': '#589a9ca1' },
          { 'code': 'PE', 'name': 'Peru', 'value': this.counterPE, 'color': '#589a9ca1' },
          { 'code': 'PH', 'name': 'Philippines', 'value': this.counterPH, 'color': '#589a9ca1' },
          { 'code': 'PL', 'name': 'Poland', 'value': this.counterPL, 'color': '#589a9ca1' },
          { 'code': 'PT', 'name': 'Portugal', 'value': this.counterPT, 'color': '#589a9ca1' },
          { 'code': 'PR', 'name': 'Puerto Rico', 'value': this.counterPR, 'color': '#589a9ca1' },
          { 'code': 'QA', 'name': 'Qatar', 'value': this.counterQA, 'color': '#589a9ca1' },
          { 'code': 'RO', 'name': 'Romania', 'value': this.counterRO, 'color': '#589a9ca1' },
          { 'code': 'RU', 'name': 'Russia', 'value': this.counterRU, 'color': '#589a9ca1' },
          { 'code': 'RW', 'name': 'Rwanda', 'value': this.counterRW, 'color': '#589a9ca1' },
          { 'code': 'SA', 'name': 'Saudi Arabia', 'value': this.counterSA, 'color': '#589a9ca1' },
          { 'code': 'SN', 'name': 'Senegal', 'value': this.counterSN, 'color': '#589a9ca1' },
          { 'code': 'RS', 'name': 'Serbia', 'value': this.counterRS, 'color': '#589a9ca1' },
          { 'code': 'SL', 'name': 'Sierra Leone', 'value': this.counterSL, 'color': '#589a9ca1' },
          { 'code': 'SG', 'name': 'Singapore', 'value': this.counterSG, 'color': '#589a9ca1' },
          { 'code': 'SK', 'name': 'Slovak Republic', 'value': this.counterSK, 'color': '#589a9ca1' },
          { 'code': 'SI', 'name': 'Slovenia', 'value': this.counterSI, 'color': '#589a9ca1' },
          { 'code': 'SB', 'name': 'Solomon Islands', 'value': this.counterSB, 'color': '#589a9ca1' },
          { 'code': 'SO', 'name': 'Somalia', 'value': this.counterSO, 'color': '#589a9ca1' },
          { 'code': 'ZA', 'name': 'South Africa', 'value': this.counterZA, 'color': '#589a9ca1' },
          { 'code': 'ES', 'name': 'Spain', 'value': this.counterES, 'color': '#589a9ca1' },
          { 'code': 'LK', 'name': 'Sri Lanka', 'value': this.counterLK, 'color': '#589a9ca1' },
          { 'code': 'SD', 'name': 'Sudan', 'value': this.counterSD, 'color': '#589a9ca1' },
          { 'code': 'SR', 'name': 'Suriname', 'value': this.counterSR, 'color': '#589a9ca1' },
          { 'code': 'SZ', 'name': 'Swaziland', 'value': this.counterSZ, 'color': '#589a9ca1' },
          { 'code': 'SE', 'name': 'Sweden', 'value': this.counterSE, 'color': '#589a9ca1' },
          { 'code': 'CH', 'name': 'Switzerland', 'value': this.counterCH, 'color': '#589a9ca1' },
          { 'code': 'SY', 'name': 'Syria', 'value': this.counterSY, 'color': '#589a9ca1' },
          { 'code': 'TW', 'name': 'Taiwan', 'value': this.counterTW, 'color': '#589a9ca1' },
          { 'code': 'TJ', 'name': 'Tajikistan', 'value': this.counterTJ, 'color': '#589a9ca1' },
          { 'code': 'TZ', 'name': 'Tanzania', 'value': this.counterTZ, 'color': '#589a9ca1' },
          { 'code': 'TH', 'name': 'Thailand', 'value': this.counterTH, 'color': '#589a9ca1' },
          { 'code': 'TG', 'name': 'Togo', 'value': this.counterTG, 'color': '#589a9ca1' },
          { 'code': 'TT', 'name': 'Trinidad and Tobago', 'value': this.counterTT, 'color': '#589a9ca1' },
          { 'code': 'TN', 'name': 'Tunisia', 'value': this.counterTN, 'color': '#589a9ca1' },
          { 'code': 'TR', 'name': 'Turkey', 'value': this.counterTR, 'color': '#589a9ca1' },
          { 'code': 'TM', 'name': 'Turkmenistan', 'value': this.counterTM, 'color': '#589a9ca1' },
          { 'code': 'UG', 'name': 'Uganda', 'value': this.counterUG, 'color': '#589a9ca1' },
          { 'code': 'UA', 'name': 'Ukraine', 'value': this.counterUA, 'color': '#589a9ca1' },
          { 'code': 'AE', 'name': 'United Arab Emirates', 'value': this.counterAE, 'color': '#589a9ca1' },
          { 'code': 'GB', 'name': 'United Kingdom', 'value': this.counterGB, 'color': '#589a9ca1' },
          { 'code': 'US', 'name': 'United States', 'value': this.counterUS, 'color': '#589a9ca1' },
          { 'code': 'UY', 'name': 'Uruguay', 'value': this.counterUY, 'color': '#589a9ca1' },
          { 'code': 'UZ', 'name': 'Uzbekistan', 'value': this.counterUZ, 'color': '#589a9ca1' },
          { 'code': 'VE', 'name': 'Venezuela', 'value': this.counterVE, 'color': '#589a9ca1' },
          { 'code': 'PS', 'name': 'West Bank and Gaza', 'value': this.counterPS, 'color': '#589a9ca1' },
          { 'code': 'VN', 'name': 'Vietnam', 'value': this.counterVN, 'color': '#589a9ca1' },
          { 'code': 'YE', 'name': 'Yemen, Rep.', 'value': this.counterYE, 'color': '#589a9ca1' },
          { 'code': 'ZM', 'name': 'Zambia', 'value': this.counterZM, 'color': '#589a9ca1' },
          { 'code': 'ZW', 'name': 'Zimbabwe', 'value': this.counterZW, 'color': '#589a9ca1' }];

        this.mapData.forEach((itemOpt) => {
          if (itemOpt.value > this.max) {
            this.max = itemOpt.value;
          }
          if (itemOpt.value < this.min) {
            this.min = itemOpt.value;
          }
        });

        this.optionsMap = {
          showValues: 1,
          title: {
            left: 'center',
            top: 'top',
            textStyle: {
              color: this.bubbleTheme.titleColor,
            },
          },
          tooltip: {
            showValues: 1,
            trigger: 'item',
            formatter: params => {
              return `${params.name}: ${params.value[2]}`;
            },
          },
          visualMap: {
            showValues: 1,
            show: false,
            min: 0,
            max: this.max,
            inRange: {
              symbolSize: [0, 50],
            },
          },
          geo: {
            name: 'Visitors Location',
            type: 'map',
            map: 'world',
            showValues: 1,
            scaleLimit: {
              min: 1.1,
              max: 3
            },
            roam: true,
            label: {
              showValues: 1,
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              showValues: 1,
              normal: {
                showValues: 1,
                areaColor: this.bubbleTheme.areaColor,
                borderColor: this.bubbleTheme.areaBorderColor,
              },
              emphasis: {
                areaColor: this.bubbleTheme.areaColor,
              },
            },
          },
          series: [
            {
              showValues: 1,
              type: 'effectScatter',
              scaleLimit: {
                min: 1.1,
                max: 3
              },
              label:{
                show: true,
                formatter: function (params) {
                 return params.value[2];
              }
              },
              coordinateSystem: 'geo',
              data: this.mapData.map(itemOpt => {
                return {
                  name: itemOpt.name,
                  value: [
                    this.latlong[itemOpt.code].longitude,
                    this.latlong[itemOpt.code].latitude,
                    itemOpt.value,
                  ],
                  itemStyle: {
                    normal: {
                      color: "#000000",
                    },
                  },
                };
              }),
            },
          ],
        };

        this.options66 = {
          showValues: 1,
          title: {
            left: 'center',
            top: 'top',
            textStyle: {
              color: this.bubbleTheme.titleColor,
            },
          },
          tooltip: {
            showValues: 1,
            trigger: 'item',
            formatter: params => {
              return `${params.name}: ${params.value[2]}`;
            },
          },
          visualMap: {
            showValues: 1,
            show: false,
            min: 0,
            max: this.max,
            inRange: {
              symbolSize: [0, 50],
            },
          },
          geo: {
            name: 'Visitors Location',
            type: 'map',
            map: 'world',
            showValues: 1,
            scaleLimit: {
              min: 1.1,
              max: 3
            },
            roam: true,
            label: {
              showValues: 1,
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              showValues: 1,
              normal: {
                showValues: 1,
                areaColor: this.bubbleTheme.areaColor,
                borderColor: this.bubbleTheme.areaBorderColor,
              },
              emphasis: {
                areaColor: this.bubbleTheme.areaHoverColor,
              },
            },
          },
          series: [
            {
              showValues: 1,
              type: 'effectScatter',
              scaleLimit: {
                min: 1.1,
                max: 3
              },
              coordinateSystem: 'geo',
              label:{
                show: true
              }
            },
          ],
        };
      });
  }

  checkIfMapData() {
    return this.counterAF == 0 && this.counterAX == 0 && this.counterAL == 0 && this.counterDZ == 0 && this.counterAS == 0 && this.counterAD == 0 &&
      this.counterAO == 0 && this.counterAI == 0 && this.counterAQ == 0 && this.counterAG == 0 && this.counterAR == 0 && this.counterAM == 0 &&
      this.counterAW == 0 && this.counterAU == 0 && this.counterAT == 0 && this.counterAZ == 0 && this.counterBS == 0 && this.counterBH == 0 &&
      this.counterBD == 0 && this.counterBB == 0 && this.counterBY == 0 && this.counterBE == 0 && this.counterBZ == 0 && this.counterBJ == 0 && this.counterBM == 0 && this.counterBT == 0 && this.counterBO == 0 && this.counterBQ == 0 &&
      this.counterBA == 0 && this.counterBW == 0 && this.counterBV == 0 && this.counterBR == 0 && this.counterIO == 0 && this.counterBN == 0 && this.counterBG == 0 &&
      this.counterBF == 0 && this.counterBI == 0 && this.counterKH == 0 && this.counterCM == 0 && this.counterCA == 0 && this.counterCV == 0 && this.counterKY == 0 && this.counterCF == 0 &&
      this.counterTD == 0 && this.counterCL == 0 && this.counterCN == 0 && this.counterCX == 0 && this.counterCC == 0 && this.counterCO == 0 && this.counterKM == 0 && this.counterCG == 0 && this.counterCD == 0 && this.counterCK == 0 && this.counterCR == 0 && this.counterCI == 0 &&
      this.counterHR == 0 && this.counterCU == 0 && this.counterCW == 0 && this.counterCY == 0 && this.counterCZ == 0 && this.counterDK == 0 && this.counterDJ == 0 &&
      this.counterDM == 0 && this.counterDO == 0 && this.counterEC == 0 && this.counterEG == 0 && this.counterSV == 0 && this.counterGQ == 0 && this.counterER == 0 && this.counterEE == 0 &&
      this.counterET == 0 && this.counterFK == 0 && this.counterFO == 0 && this.counterFJ == 0 && this.counterFI == 0 && this.counterFR == 0 && this.counterGF == 0 && this.counterPF == 0 && this.counterTF == 0 && this.counterGA == 0 && this.counterGM == 0 && this.counterGE == 0 && this.counterDE == 0 && this.counterGH == 0 && this.counterGI == 0 && this.counterGR == 0 && this.counterGL == 0 && this.counterGD == 0 && this.counterGP == 0 &&
      this.counterGU == 0 && this.counterGT == 0 && this.counterGG == 0 && this.counterGN == 0 && this.counterGW == 0 && this.counterGY == 0 &&
      this.counterHT == 0 && this.counterHM == 0 && this.counterVA == 0 && this.counterHN == 0 && this.counterHK == 0 && this.counterHU == 0 && this.counterIS == 0 && this.counterIN == 0 &&
      this.counterID == 0 && this.counterIR == 0 && this.counterIQ == 0 && this.counterIE == 0 && this.counterIM == 0 && this.counterIL == 0 && this.counterIT == 0 && this.counterJM == 0 &&
      this.counterJP == 0 && this.counterJE == 0 && this.counterJO == 0 && this.counterKZ == 0 && this.counterKE == 0 && this.counterKI == 0 && this.counterKP == 0 &&
      this.counterKR == 0 && this.counterKW == 0 && this.counterKG == 0 && this.counterLA == 0 && this.counterLV == 0 && this.counterLB == 0 && this.counterLS == 0 &&
      this.counterLR == 0 && this.counterLY == 0 && this.counterLI == 0 && this.counterLT == 0 && this.counterLU == 0 && this.counterMO == 0 && this.counterMK == 0 && this.counterMG == 0 &&
      this.counterMW == 0 && this.counterMY == 0 && this.counterMV == 0 && this.counterML == 0 && this.counterMT == 0 && this.counterMH == 0 && this.counterMQ == 0 && this.counterMR == 0 &&
      this.counterMU == 0 && this.counterYT == 0 && this.counterMX == 0 && this.counterFM == 0 && this.counterMD == 0 && this.counterMC == 0 && this.counterMN == 0 && this.counterME == 0 &&
      this.counterMS == 0 && this.counterMA == 0 && this.counterMZ == 0 && this.counterMM == 0 && this.counterNA == 0 && this.counterNR == 0 && this.counterNP == 0 && this.counterNL == 0 && this.counterNC == 0 &&
      this.counterNZ == 0 && this.counterNI == 0 && this.counterNE == 0 && this.counterNG == 0 && this.counterNU == 0 && this.counterNF == 0 &&
      this.counterMP == 0 && this.counterNO == 0 && this.counterOM == 0 && this.counterPK == 0 && this.counterPW == 0 && this.counterPS == 0 && this.counterPA == 0 && this.counterPG == 0 && this.counterPY == 0 && this.counterPE == 0 && this.counterPH == 0 && this.counterPN == 0 && this.counterPL == 0 && this.counterPT == 0 &&
      this.counterPR == 0 && this.counterQA == 0 && this.counterRE == 0 && this.counterRO == 0 && this.counterRU == 0 && this.counterRW == 0 && this.counterBL == 0 && this.counterSH == 0 && this.counterKN == 0 && this.counterLC == 0 && this.counterMF == 0 && this.counterPM == 0 && this.counterVC == 0 && this.counterWS == 0 && this.counterSM == 0 && this.counterST == 0 && this.counterSA == 0 &&
      this.counterSN == 0 && this.counterRS == 0 && this.counterSC == 0 && this.counterSL == 0 && this.counterSG == 0 && this.counterSX == 0 &&
      this.counterSK == 0 && this.counterSI == 0 && this.counterSB == 0 && this.counterSO == 0 && this.counterZA == 0 && this.counterGS == 0 &&
      this.counterSS == 0 && this.counterES == 0 && this.counterLK == 0 && this.counterSD == 0 && this.counterSR == 0 && this.counterSJ == 0 && this.counterSZ == 0 && this.counterSE == 0 && this.counterCH == 0 && this.counterSY == 0 && this.counterTW == 0 && this.counterTJ == 0 && this.counterTZ == 0 &&
      this.counterTH == 0 && this.counterTL == 0 && this.counterTG == 0 && this.counterTK == 0 && this.counterTO == 0 && this.counterTT == 0 && this.counterTN == 0 && this.counterTR == 0 && this.counterTM == 0 && this.counterTC == 0 &&
      this.counterTV == 0 && this.counterUG == 0 && this.counterUA == 0 && this.counterAE == 0 && this.counterGB == 0 && this.counterUS == 0 && this.counterUM == 0 && this.counterUY == 0 && this.counterUZ == 0 &&
      this.counterVU == 0 && this.counterVE == 0 && this.counterVN == 0 && this.counterVG == 0 && this.counterVI == 0 && this.counterWF == 0 &&
      this.counterEH == 0 && this.counterYE == 0 && this.counterZM == 0 && this.counterZW == 0;
  }
}
