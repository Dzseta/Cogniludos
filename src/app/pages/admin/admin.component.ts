import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../shared/services/question.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { ScoreService } from '../../shared/services/score.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // charts
  genders = [
    { value:'', viewValue: ''},
    { value:'male', viewValue: 'Férfi'},
    { value:'female', viewValue: 'Nő'},
    { value:'other', viewValue: 'Egyéb'}
  ]; 
  educations = [
    { value:'', viewValue: ''},
    { value:'nothing', viewValue: '-'},
    { value:'primary', viewValue: 'Általános iskola'},
    { value:'vocational', viewValue: 'Szakgimnázium'},
    { value:'secondary', viewValue: 'Gimnázium'},
    { value:'collage', viewValue: 'Főiskola (Bsc.)'},
    { value:'university', viewValue: 'Egyetem (Msc.)'},
    { value:'phd', viewValue: 'PhD.'}
  ]; 
  games = [
    { viewValue:'', value: ''},
    { viewValue:'Memória Mátrix', value: 'mm'},
    { viewValue:'Gyors Párosítás', value: 'sm'},
    { viewValue:'Kakukktojás', value: 'ooo'},
    { viewValue:'Szín Párosítás', value: 'cm'},
    { viewValue:'Sorozat', value: 'sq'},
    { viewValue:'Folytonosság', value: 'co'},
    { viewValue:'Krétatábla', cvalueode: 'cb'}
  ]; 
  difficulties = [
    { viewValue:'', value: ''},
    { viewValue:'Könnyű', value: 'könnyű'},
    { viewValue:'Közepes', value: 'közepes'},
    { viewValue:'Nehéz', value: 'nehéz'}
  ]; 
  filterForm!: FormGroup;
  chosenUsers: any[] = [];
  chosenScores: any[] = [];
  chosenUsersData = new MatTableDataSource();
  chosenScoresData = new MatTableDataSource();
  displayedColumns: string[] = ['username', 'birthdate', 'gender', 'education', 'premium'];
  displayedColumns2: string[] = ['username', 'game', 'score', 'difficulty', 'date'];
  // make question
  categories = [
    {value: 'profile', viewValue: 'Profil'},
    {value: 'rules', viewValue: 'Szabályok'},
    {value: 'stats', viewValue: 'Statisztikák'}
  ]
  questionForm!: FormGroup;
  // charts
  lineChart!: any;
  mmRatingAll!: number;
  smRatingAll!: number;
  oooRatingAll!: number;
  cmRatingAll!: number;
  sqRatingAll!: number;
  coRatingAll!: number;
  cbRatingAll!: number;
  
  constructor(private questionService: QuestionService, private scoreService: ScoreService, private authService: AuthService, private toastr: ToastrService) { }

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  @ViewChild('lineChart') lineChartRef!: ElementRef;

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
    });
    this.filterForm = new FormGroup({
      username: new FormControl(''),
      dateMin: new FormControl(''),
      dateMax: new FormControl(''),
      gender: new FormControl(''),
      education: new FormControl(''),
      game: new FormControl(''),
      difficulty: new FormControl(''),
      premium: new FormControl('')
    });
  }

  ngAfterViewInit() {
    this.chosenUsersData.paginator = this.paginator.toArray()[0];
    this.chosenUsersData.sort = this.sort.toArray()[0];
    this.chosenScoresData.paginator = this.paginator.toArray()[1];
    this.chosenScoresData.sort = this.sort.toArray()[1];
    this.lineChart = echarts.init(this.lineChartRef.nativeElement);
    this.submitSearch();
  }

  submitQuestion() {
    if (!this.validateForm()) return;
    this.questionService.addQuestion( { category: this.questionForm.get('category')?.value, question: this.questionForm.get('question')?.value, answer: this.questionForm.get('answer')?.value } ).then(() => {
      this.toastr.success('', 'Kérdés sikeresen létrehozva!', {positionClass: 'toast-bottom-center'});
      this.questionForm.get('category')?.setValue('');
      this.questionForm.get('question')?.setValue('');
      this.questionForm.get('answer')?.setValue('');
    }).catch((error: any) => {
      console.error(error);
    });;
  }

  submitSearch() {
    this.chosenUsers = [];
    this.chosenScores = [];
    let minDate = this.filterForm.get('dateMin')?.value;
    if (minDate == '') {
      minDate = '1800-01-01';
    }
    let maxDate = this.filterForm.get('dateMax')?.value;
    if (maxDate == '') {
      maxDate = '3000-01-01';
    }
    this.authService.getAllUsers().then(users =>{
      const usersArray = users.docs;
      for (let i=0; i<usersArray.length; i++) {
        console.log(this.filterForm.get('username')?.value.toLowerCase());
        if (usersArray[i].data().username.toLocaleLowerCase().includes(this.filterForm.get('username')?.value.toLowerCase()) && usersArray[i].data().birthdate! > minDate && usersArray[i].data().birthdate! < maxDate && usersArray[i].data().gender!.includes(this.filterForm.get('gender')?.value) && usersArray[i].data().education!.includes(this.filterForm.get('education')?.value)) {
          this.chosenUsers.push(usersArray[i].data());
        }
      }
      this.scoreService.getAll().get().subscribe(scores =>{
        const scoresArray = scores.docs;
        for (let i=0; i<scoresArray.length; i++) {
          let usernameOfChosen;
          let userIsChosen = this.chosenUsers.some(function(user) {
            usernameOfChosen = user.username;
            return user.email === scoresArray[i].data().userEmail;
          });
          if (scoresArray[i].data().game!.includes(this.filterForm.get('game')?.value) && scoresArray[i].data().difficulty!.includes(this.filterForm.get('difficulty')?.value) && userIsChosen) {
            this.chosenScores.push({username: usernameOfChosen, game: scoresArray[i].data().game, score: scoresArray[i].data().score, difficulty: scoresArray[i].data().difficulty, date: scoresArray[i].data().date});
          }
        }
        this.chosenUsersData = new MatTableDataSource(this.chosenUsers);
        this.chosenScoresData = new MatTableDataSource(this.chosenScores);
        this.chosenUsersData.paginator = this.paginator.toArray()[0];
        this.chosenUsersData.sort = this.sort.toArray()[0];
        this.chosenScoresData.paginator = this.paginator.toArray()[1];
        this.chosenScoresData.sort = this.sort.toArray()[1];
        this.refreshRating();
      });
    });
    
  }

  validateForm() {
    var valid = true;
    valid = valid && this.questionForm.get('category')!.valid;
    valid = valid && this.questionForm.get('question')!.valid;
    valid = valid && this.questionForm.get('answer')!.valid;
    return valid;
  }

  refreshRating() {
    // user rating helping variables
    let mmSum = 0;
    let smSum = 0;
    let oooSum = 0;
    let cmSum = 0;
    let sqSum = 0;
    let coSum = 0;
    let cbSum = 0;
    let mmCount = 0;
    let smCount = 0;
    let oooCount = 0;
    let cmCount = 0;
    let sqCount = 0;
    let coCount = 0;
    let cbCount = 0;
    // summ and count
    for (let i=0; i<this.chosenScores.length; i++) {
      switch(this.chosenScores[i].game) {
        case 'mm':
          mmSum += this.chosenScores[i].score;
          mmCount++;
          break;
        case 'sm':
          smSum += this.chosenScores[i].score;
          smCount++;
          break;
        case 'ooo':
          oooSum += this.chosenScores[i].score;
          oooCount++;
          break;
        case 'cm':
          cmSum += this.chosenScores[i].score;
          cmCount++;
          break;
        case 'sq':
          sqSum += this.chosenScores[i].score;
          sqCount++;
          break;
        case 'co':
          coSum += this.chosenScores[i].score;
          coCount++;
          break;
        case 'cb':
          cbSum += this.chosenScores[i].score;
          cbCount++;
          break;
      }
    }
    // avg
    let mmRating = Math.floor(mmSum / mmCount);
    let smRating = Math.floor(smSum / smCount);
    let oooRating = Math.floor(oooSum / oooCount);
    let cmRating = Math.floor(cmSum / cmCount);
    let sqRating = Math.floor(sqSum / sqCount);
    let coRating = Math.floor(coSum / coCount);
    let cbRating = Math.floor(cbSum / cbCount);
    if (this.mmRatingAll === undefined) {
      this.mmRatingAll = mmRating;
      this.smRatingAll = smRating;
      this.oooRatingAll = oooRating;
      this.cmRatingAll = cmRating;
      this.sqRatingAll = sqRating;
      this.coRatingAll = coRating;
      this.cbRatingAll = cbRating;
    }

    // refresh linechart
    const ratingChartOption = {
      title: {
        text: 'Játékosok Átlagos Pontszáma'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
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
          data: [mmRating, smRating, oooRating, cmRating, sqRating, coRating, cbRating],
          type: 'bar',
          name: 'Kiválasztott meccsek átlaga',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.4)'
          },
          itemStyle: {
            color: 'rgb(255, 193, 7)',
            borderWidth: 1,
            borderColor: "#000"
          }
        },
        {
          data: [this.mmRatingAll, this.smRatingAll, this.oooRatingAll, this.cmRatingAll, this.sqRatingAll, this.coRatingAll, this.cbRatingAll],
          type: 'bar',
          name: 'Összes meccs átlaga',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.4)'
          },
          itemStyle: {
            color: 'rgb(50, 50, 200)',
            borderWidth: 1,
            borderColor: "#000"
          }
        }
      ]
    };
    this.lineChart.setOption(ratingChartOption);
  }

  // default ratingChart
  ratingChartOptionDefault: EChartsOption = {
    title: {
      text: 'Játékosok Átlagos Pontszáma'
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
}
