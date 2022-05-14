import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Subscription, take, timer } from 'rxjs';
import { Score } from '../../models/score';
import { ScoreService } from '../../shared/services/score.service';

@Component({
  selector: 'app-odd-one-out',
  templateUrl: './odd-one-out.component.html',
  styleUrls: ['./odd-one-out.component.css']
})
export class OddOneOutComponent implements OnInit {

  // variables depending on difficulty
  rows!: number;
  columns!: number;
  numberOfShapes!: number;
  currentUser!: any;
  difficulty!: string;
  maxNumberOfShapes!: number;

  // helping variables
  shapes!: any[];
  oddOne!: string;
  
  // fix variables
  score!: number;
  right!: number;
  wrong!: number;

  // countdown
  countDown!: Subscription | null;
  counter!: number;

  // scores table
  scores!: Score[];

  // shapelist
  shapeList = [
    '../../../assets/oooBlueCircle.png',
    '../../../assets/oooBlueLeftRect.png',
    '../../../assets/oooBlueRedRombus.png',
    '../../../assets/oooBlueRedSquare.png',
    '../../../assets/oooBlueRightRect.png',
    '../../../assets/oooBlueRombus.png',
    '../../../assets/oooBlueSquare.png',
    '../../../assets/oooBlueStar.png',
    '../../../assets/oooBlueTriangle.png',
    '../../../assets/oooRedCircle.png',
    '../../../assets/oooRedLeftRect.png',
    '../../../assets/oooRedRightRect.png',
    '../../../assets/oooRedRombus.png',
    '../../../assets/oooRedSquare.png',
    '../../../assets/oooRedStar.png',
    '../../../assets/oooRedTriangle.png',
    '../../../assets/oooRedYellowRombus.png',
    '../../../assets/oooRedYellowSquare.png',
    '../../../assets/oooYellowBlueRombus.png',
    '../../../assets/oooYellowBlueSquare.png',
    '../../../assets/oooYellowCircle.png',
    '../../../assets/oooYellowLeftRect.png',
    '../../../assets/oooYellowRightRect.png',
    '../../../assets/oooYellowRombus.png',
    '../../../assets/oooYellowSquare.png',
    '../../../assets/oooYellowStar.png',
    '../../../assets/oooYellowTriangle.png'
  ];

  constructor(public dialog: MatDialog, private scoreService: ScoreService) { }

  ngOnInit(): void {
    // initialize the fix variables
    this.scores = [];
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    this.loadImages();
  }

  // start the game
  startGame(stepper: MatStepper) {
    // calculate difficulty
    this.scoreService.getAllScores(this.currentUser.email, 'ooo').then(scores =>{
      if (scores.size < 5) {
        this.difficulty = 'könnyű';
        this.maxNumberOfShapes = 4;
      } else if (scores.size < 10) {
        this.difficulty = 'közepes';
        this.maxNumberOfShapes = 5;
      } else {
        this.difficulty = 'nehéz';
        this.maxNumberOfShapes = 6;
      }
    });

    this.counter = 60;
    this.rows = 6;
    this.columns = 8;
    this.right = 0;
    this.wrong = 0;
    this.score = 0;
    this.shapes = Array(this.rows*this.columns).fill('../../../assets/oooEmpty.png');
    stepper.selected!.completed = true;
    stepper.next();
    setTimeout(() =>{
      this.newGame();
      this.countDown = timer(0, 1000).pipe(take(this.counter)).subscribe(() => {--this.counter; if(this.counter<=0) {this.endGame(stepper)}} );
    },3000);
  }

  // start a new round
  newGame() {
    // initialize variables
    this.numberOfShapes = Math.floor(Math.random() * this.maxNumberOfShapes) + 1;;
    this.shapes = Array(this.rows*this.columns).fill('../../../assets/oooEmpty.png');
    
    // choose odd one
    let shapeNumber = Math.floor(Math.random() * this.shapeList.length);
    this.oddOne = this.shapeList[shapeNumber];

    // choose the positions for the shapes
    for(let i=0; i<this.numberOfShapes; i++){
      shapeNumber = Math.floor(Math.random() * this.shapeList.length);
      if (this.shapeList[shapeNumber] !== this.oddOne && !this.shapes.includes(this.shapeList[shapeNumber])) {
        for (let j=0; j<3; j++) {
          let placement = Math.floor(Math.random() * this.rows*this.columns);
          if (this.shapes[placement] !== '../../../assets/oooEmpty.png') {
            j--;
          } else {
            this.shapes[placement] = this.shapeList[shapeNumber];
          } 
        }
      } else {
        i--;
      }
    }
    let placement = Math.floor(Math.random() * this.rows*this.columns);
    this.shapes[placement] = this.oddOne;
  }

  // make the move
  chooseOdd(idx: number, stepper: MatStepper) {
    // if empty do nothing
    if (this.shapes[idx] === '../../../assets/oooEmpty.png') return;
    // make the move
    if (this.shapes[idx] === this.oddOne) {
      this.score += 100;
      this.right++;
    } else {
      this.score -= 100;
      this.wrong++;
    }
    this.newGame();
  }

  // end the game
  endGame(stepper: MatStepper) {
    const now = new Date();
    this.scoreService.create( { userEmail: this.currentUser.email, game: 'ooo', score: this.score, difficulty: this.difficulty, date: now.toLocaleDateString() } );
    this.scoreService.getUserScores(this.currentUser.email, 'ooo').then(scores =>{
      this.scores = scores.docs.map(doc => doc.data());
    });
    stepper.selected!.completed = true;
    stepper.next();
  }

  // play again
  restart(stepper: MatStepper) {
    this.score = 0;
    stepper.reset();
  }

  // load images
  loadImages(){
    for(let i = 0; i < this.shapeList.length; i++){
      let img = new Image();
      img.src = this.shapeList[i];
    }
  }

  // open rules dialog
  openDialog() {
    this.dialog.open(MemoryMatrixDialog);
  }

}

@Component({
  selector: 'odd-one-out-dialog',
  templateUrl: 'odd-one-out-dialog.html',
})
export class MemoryMatrixDialog {
  
  constructor(public dialog: MatDialog) {}

  // close rules dialog
  closeDialog() {
    this.dialog.closeAll();
  }
}