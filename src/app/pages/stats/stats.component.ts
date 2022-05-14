import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ScoreService } from '../../shared/services/score.service';
import * as echarts from 'echarts';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  // current user
  currentUser!: any;
  // user avarages
  mmAvarage!: number;
  smAvarage!: number;
  oooAvarage!: number;
  cmAvarage!: number;
  sqAvarage!: number;
  coAvarage!: number;
  cbAvarage!: number;
  // user ratings
  mmRating!: number;
  smRating!: number;
  oooRating!: number;
  cmRating!: number;
  sqRating!: number;
  coRating!: number;
  cbRating!: number;
  // best scores
  mmBest!: number | undefined;
  smBest!: number | undefined;
  oooBest!: number | undefined;
  cmBest!: number | undefined;
  sqBest!: number | undefined;
  coBest!: number | undefined;
  cbBest!: number | undefined;
  // number of games
  mmPlayed!: number;
  smPlayed!: number;
  oooPlayed!: number;
  cmPlayed!: number;
  sqPlayed!: number;
  coPlayed!: number;
  cbPlayed!: number;
  // data of played games
  mmData: any[] = [];
  smData: any[] = [];
  oooData: any[] = [];
  cmData: any[] = [];
  sqData: any[] = [];
  coData: any[] = [];
  cbData: any[] = [];
  // helping variables
  scoreSumm!: number;
  scoreArray!: any;
  gameFormControl = new FormControl('');
  defaultValue = 'mm';
  // charts
  lineChart!: any;
  radarChart!: any;
  frequencyChart!: any;
  scatterChart!: any;

  games = [
    { value:'mm', viewValue: 'Memória Mátrix'},
    { value:'sm', viewValue: 'Gyors Párosítás'},
    { value:'ooo', viewValue: 'Kakukktojás'},
    { value:'cm', viewValue: 'Szín Párosítás'},
    { value:'sq', viewValue: 'Sorozat'},
    { value:'co', viewValue: 'Folytonosság'},
    { value:'cb', viewValue: 'Krétatábla'}
  ];
  
  @ViewChild('lineChart') lineChartRef!: ElementRef;
  @ViewChild('radarChart') radarChartRef!: ElementRef;
  @ViewChild('frequencyChart') frequencyChartRef!: ElementRef;
  @ViewChild('scatterChart') scatterChartRef!: ElementRef;

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    // calculate user avarages
    this.scoreService.getAllScores(this.currentUser.email, 'mm').then(scores =>{
      this.scoreArray = scores.docs;
      this.scoreSumm = 0;
      for (let i=0; i<this.scoreArray.length; i++) {
        this.scoreSumm += this.scoreArray[i].data().score;
        this.mmData.push([new Date(this.scoreArray[i].data().date), this.scoreArray[i].data().score]);
      }
      this.mmPlayed = this.scoreArray.length;
      this.mmAvarage = this.scoreSumm / this.scoreArray.length;
    });
    this.scoreService.getAllScores(this.currentUser.email, 'sm').then(scores =>{
      this.scoreArray = scores.docs;
      this.scoreSumm = 0;
      for (let i=0; i<this.scoreArray.length; i++) {
        this.smData.push([new Date(this.scoreArray[i].data().date), this.scoreArray[i].data().score]);
        this.scoreSumm += this.scoreArray[i].data().score!;
      }
      this.smPlayed = this.scoreArray.length;
      this.smAvarage = this.scoreSumm / this.scoreArray.length;
    });
    this.scoreService.getAllScores(this.currentUser.email, 'ooo').then(scores =>{
      this.scoreArray = scores.docs;
      this.scoreSumm = 0;
      for (let i=0; i<this.scoreArray.length; i++) {
        this.oooData.push([new Date(this.scoreArray[i].data().date), this.scoreArray[i].data().score]);
        this.scoreSumm += this.scoreArray[i].data().score!;
      }
      this.oooPlayed = this.scoreArray.length;
      this.oooAvarage = this.scoreSumm / this.scoreArray.length;
    });
    this.scoreService.getAllScores(this.currentUser.email, 'cm').then(scores =>{
      this.scoreArray = scores.docs;
      this.scoreSumm = 0;
      for (let i=0; i<this.scoreArray.length; i++) {
        this.cmData.push([new Date(this.scoreArray[i].data().date), this.scoreArray[i].data().score]);
        this.scoreSumm += this.scoreArray[i].data().score!;
      }
      this.cmPlayed = this.scoreArray.length;
      this.cmAvarage = this.scoreSumm / this.scoreArray.length;
    });
    this.scoreService.getAllScores(this.currentUser.email, 'sq').then(scores =>{
      this.scoreArray = scores.docs;
      this.scoreSumm = 0;
      for (let i=0; i<this.scoreArray.length; i++) {
        this.sqData.push([new Date(this.scoreArray[i].data().date), this.scoreArray[i].data().score]);
        this.scoreSumm += this.scoreArray[i].data().score!;
      }
      this.sqPlayed = this.scoreArray.length;
      this.sqAvarage = this.scoreSumm / this.scoreArray.length;
    });
    this.scoreService.getAllScores(this.currentUser.email, 'co').then(scores =>{
      this.scoreArray = scores.docs;
      this.scoreSumm = 0;
      for (let i=0; i<this.scoreArray.length; i++) {
        this.coData.push([new Date(this.scoreArray[i].data().date), this.scoreArray[i].data().score]);
        this.scoreSumm += this.scoreArray[i].data().score!;
      }
      this.coPlayed = this.scoreArray.length;
      this.coAvarage = this.scoreSumm / this.scoreArray.length;
    });
    this.scoreService.getAllScores(this.currentUser.email, 'cb').then(scores =>{
      this.scoreArray = scores.docs;
      this.scoreSumm = 0;
      for (let i=0; i<this.scoreArray.length; i++) {
        this.cbData.push([new Date(this.scoreArray[i].data().date), this.scoreArray[i].data().score]);
        this.scoreSumm += this.scoreArray[i].data().score!;
      }
      this.cbPlayed = this.scoreArray.length;
      this.cbAvarage = this.scoreSumm / this.scoreArray.length;
    });
    // get best scores
    this.scoreService.getBestScore('mm').then(score =>{
      this.mmBest = score.docs[0].data().score;
    });
    this.scoreService.getBestScore('sm').then(score =>{
      this.smBest = score.docs[0].data().score;
    });
    this.scoreService.getBestScore('ooo').then(score =>{
      this.oooBest = score.docs[0].data().score;
    });
    this.scoreService.getBestScore('cm').then(score =>{
      this.cmBest = score.docs[0].data().score;
    });
    this.scoreService.getBestScore('sq').then(score =>{
      this.sqBest = score.docs[0].data().score;
    });
    this.scoreService.getBestScore('co').then(score =>{
      this.coBest = score.docs[0].data().score;
    });
    this.scoreService.getBestScore('cb').then(score =>{
      this.cbBest = score.docs[0].data().score;
    });
  }

  ngAfterViewInit() {
    this.lineChart = echarts.init(this.lineChartRef.nativeElement);
    this.radarChart = echarts.init(this.radarChartRef.nativeElement);
    this.frequencyChart = echarts.init(this.frequencyChartRef.nativeElement);
    this.scatterChart = echarts.init(this.scatterChartRef.nativeElement);
    setTimeout(() =>{
      this.refreshDevelopment();
      this.refreshFrequency();
      this.refreshRating();
    },1000);
  }

  refreshRating() {
    // user ratings
    this.mmRating = this.mmAvarage/this.mmBest!*100;
    this.smRating = this.smAvarage/this.smBest!*100;
    this.oooRating = this.oooAvarage/this.oooBest!*100;
    this.cmRating = this.cmAvarage/this.cmBest!*100;
    this.sqRating = this.sqAvarage/this.sqBest!*100;
    this.coRating = this.coAvarage/this.coBest!*100;
    this.cbRating = this.cbAvarage/this.cbBest!*100;
    // refresh linechart
    const ratingChartOption = {
      title: {
        text: 'Játék Értékelési Pontszám'
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['Memória Mátrix', 'Gyors Párosítás', 'Kakukktojás', 'Szín Párosítás', 'Sorozat', 'Folytonosság', 'Krétatábla']
      },
      grid: { containLabel: true },
      series: [
        {
          data: [this.mmRating, this.smRating, this.oooRating, this.cmRating, this.sqRating, this.coRating, this.cbRating],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.4)'
          },
          itemStyle: {
            color: 'rgb(255, 193, 7)',
            borderWidth: 1,
            borderColor: "#000"
          }
        }
      ]
    };
    this.lineChart.setOption(ratingChartOption);
    // refresh radar chart
    const radarOption = {
      title: {
        text: 'Játék Értékelési Pontszám'
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Memória Mátrix', max: 100 },
          { name: 'Gyors Párosítás', max: 100 },
          { name: 'Kakukktojás', max: 100 },
          { name: 'Szín Párosítás', max: 100 },
          { name: 'Sorozat', max: 100 },
          { name: 'Folytonosság', max: 100 },
          { name: 'Krétatábla', max: 100 }
        ]
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [this.mmRating, this.smRating, this.oooRating, this.cmRating, this.sqRating, this.coRating, this.cbRating],
              areaStyle: {
                color: 'rgba(255, 193, 7, 1)'
              },
            },
          ],
          itemStyle: {
            color: 'black'
          }
        }
      ]
    };
    this.radarChart.setOption(radarOption);
  }

  refreshFrequency() {
    const frequencyChartOption = {
      title: {
        text: 'Lejátszott játékok'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Memória\nMátrix', 'Gyors\nPárosítás', 'Kakukktojás', 'Szín\nPárosítás', 'Sorozat', 'Folytonosság', 'Krétatábla'],
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
          },
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [this.mmPlayed, this.smPlayed, this.oooPlayed, this.cmPlayed, this.sqPlayed, this.coPlayed, this.cbPlayed],
          itemStyle: {
            color: 'rgb(255, 193, 7)',
            borderWidth: 1,
            borderColor: "#000"
          }
        }
      ]
    };
    this.frequencyChart.setOption(frequencyChartOption);
  }

  refreshDevelopment() {
    let data;
    switch(this.gameFormControl.value) { 
      case 'cb': { 
         data = this.cbData;
         break; 
      } 
      case 'cm': { 
        data = this.cmData;
        break; 
      }
      case 'co': { 
        data = this.coData;
        break; 
      } 
      case 'mm': { 
        data = this.mmData;
        break; 
      } 
      case 'ooo': { 
        data = this.oooData;
        break; 
      } 
      case 'sq': { 
        data = this.sqData;
        break; 
      } 
      case 'sm': { 
        data = this.smData;
        break; 
      } 
    } 
    // played data
    const scatterChartOption = {
      title: {
        text: 'Fejlődés'
      },
      xAxis : [
      {
        type: 'time',
        boundaryGap: false,
      }
    ],
      yAxis: {},
      series: [
        {
          symbolSize: 20,
          data: data,
          type: 'scatter',
          itemStyle: {
            color: 'rgba(255, 193, 7, 0.5)',
            borderColor: "#000"
          }
        }
      ]
    };
    this.scatterChart.setOption(scatterChartOption);
  }
  
  // default ratingChart
  ratingChartOptionDefault: EChartsOption = {
    title: {
      text: 'Játék Értékelési Pontszám'
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: ['Memória Mátrix', 'Gyors Párosítás', 'Kakukktojás', 'Szín Párosítás', 'Sorozat', 'Folytonosság', 'Krétatábla'],
    },
    grid: { containLabel: true },
    series: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.3)'
        }
      }
    ]
  };

  // radar default
  radarOptionDefault: EChartsOption = {
    title: {
      text: 'Játék Értékelési Pontszám'
    },
    radar: {
      indicator: [
        { name: 'Memória Mátrix', max: 100 },
        { name: 'Gyors Párosítás', max: 100 },
        { name: 'Kakukktojás', max: 100 },
        { name: 'Szín Párosítás', max: 100 },
        { name: 'Sorozat', max: 100 },
        { name: 'Folytonosság', max: 100 },
        { name: 'Krétatábla', max: 100 }
      ]
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [0, 0, 0, 0, 0, 0],
          },
        ]
      }
    ]
  };

  // frequency default
  frequencyChartOptionDefault: EChartsOption = {
    title: {
      text: 'Lejátszott játékok'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Memória\nMátrix', 'Gyors\nPárosítás', 'Kakukktojás', 'Szín\nPárosítás', 'Sorozat', 'Folytonosság', 'Krétatábla'],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0,
        },
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [0, 0, 0, 0, 0, 0, 0],
      }
    ]
  };
  // played data
  scatterChartOptionDefault: EChartsOption = {
    title: {
      text: 'Fejlődés'
    },
    xAxis: {},
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        data: [0, 0],
        type: 'scatter',
        itemStyle: {
          color: 'rgba(255, 193, 7, 0.5)',
          borderColor: "#000"
        }
      }
    ]
  };
}
