import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Score } from '../../models/score';
import { ScoreService } from '../../shared/services/score.service';

@Component({
  selector: 'app-memory-matrix',
  templateUrl: './memory-matrix.component.html',
  styleUrls: ['./memory-matrix.component.css']
})
export class MemoryMatrixComponent implements OnInit {
  
  // basic variables
  rows!: number;
  columns!: number;
  lightTiles!: number;
  lightTileArray!: any[]
  // helping variables
  squares!: any[];
  isWin!: boolean;
  isLoss!: boolean;
  isPlayable!: boolean;
  guesses!: number;
  currentUser!: any;
  difficulty!: string;
  maxLevel!: number;
  // level and score counting
  level!: number;
  score!: number;
  right!: number;
  wrong!: number;
  // scores table
  scores!: Score[];
  // audio
  correctSound = new Audio();
  wrongSound = new Audio();

  constructor(public dialog: MatDialog, private scoreService: ScoreService) { }

  ngOnInit(): void {
    // initialize the fix variables
    this.scores = [];
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    this.correctSound.src = "../../../assets/correct.wav";
    this.correctSound.load();
    this.wrongSound.src = "../../../assets/wrong.wav";
    this.wrongSound.load();
  }

  startGame(stepper: MatStepper) {
    // calculate difficulty
    this.scoreService.getAllScores(this.currentUser.email, 'mm').then(scores =>{
      if (scores.size < 5) {
        this.difficulty = 'könnyű';
        this.maxLevel = 5;
      } else if (scores.size < 10) {
        this.difficulty = 'közepes';
        this.maxLevel = 10;
      } else {
        this.difficulty = 'nehéz';
        this.maxLevel = 15;
      }
      this.level = 0;
      this.score = 0;
      this.right = 0;
      this.wrong = 0;
      this.rows = 6;
      this.columns = 8;
      stepper.selected!.completed = true;
      stepper.next();
      this.newGame();
    });
  }

  // start a new round
  newGame() {
    // if it was not the last round, go to the next
    if (this.level<this.maxLevel) {
      this.level++;
    }

    // initialize variables
    if (this.level > this.maxLevel) return;
    this.lightTiles = 4+this.level;
    this.squares = Array(this.rows*this.columns).fill('0');
    this.isWin = false;
    this.isLoss = false;
    this.isPlayable = false;
    this.lightTileArray = [];
    this.guesses = 0;
    
    // choose the light tiles
    let random: number;
    for(let i=0; i<this.lightTiles; i++){
      random = Math.floor(Math.random() * this.rows*this.columns);
      if (this.lightTileArray.includes(random)) {
        i--;
      } else {
        this.lightTileArray.push(random);
        this.squares.splice(random, 1, '3');
      }     
    }

    // show tiles to player
    this.showTiles();
  }

  // make the move
  makeMove(idx: number, stepper: MatStepper) {
    // if the game isn't started or over do nothing
    if (!this.isPlayable) return;

    // make the move
    if (this.squares[idx] === '0') {
      this.squares.splice(idx, 1, '2');
      this.guesses++;
    } else if (this.squares[idx] === '3') {
      this.squares.splice(idx, 1, '1');
      this.guesses++;
    }

    // calculate, if the game is over
    this.isWin = this.calculateWin();
    this.isLoss = this.calculateLoss();
    if (this.isWin || this.isLoss) {
      this.isPlayable = false;
      this.showRightTiles();
      if (this.isWin) this.correctSound.play();
      else this.wrongSound.play();
      if (this.level == this.maxLevel ) {
        setTimeout(() =>{
          const now = new Date();
          this.scoreService.create( { userEmail: this.currentUser.email, game: 'mm', score: this.score, difficulty: this.difficulty, date: now.toLocaleDateString() } );
          this.scoreService.getUserScores(this.currentUser.email, 'mm').then(scores =>{
            this.scores = scores.docs.map(doc => doc.data());
          });
          stepper.selected!.completed = true;
          stepper.next();
        },3000);
      } else {
        setTimeout(() =>{
          this.newGame();
        },3000);
      }
    }
  }

  // show the light tiles to the player
  showTiles() {
    setTimeout(() =>{
      for (var i of this.lightTileArray) {
        this.squares[i] = '1';
      }
    },2000);
    setTimeout(() =>{
      for (var i of this.lightTileArray) {
        this.squares[i] = '3';
      }
      this.isPlayable = true;
    },5000);
  }

  // show the light tiles and wheater or not they found them
  showRightTiles() {
    setTimeout(() =>{
      for (var i of this.lightTileArray) {
        if (this.squares[i] === '3') {
          this.squares[i] = '5';
        } else if (this.squares[i] === '1') {
          this.squares[i] = '4';
        }
      }
    },1000);
  }

  // calculate victory
  calculateWin() {
    for (var i of this.lightTileArray) {
      if (this.squares[i] !== '1') {
        return false;
      }
    }
    this.score += this.lightTiles * 100; 
    this.right += this.lightTiles;
    return true;
  }

  // calculate loss
  calculateLoss() {
    if (this.lightTiles <= this.guesses && !this.isWin){
      for (var i of this.lightTileArray) {
        if (this.squares[i] === '1') {
          this.score += 100;
          this.right++;
        } else if (this.squares[i] === '3') {
          this.score -= 100;
          this.wrong++;
        }
      }
      return true;
    }
    return false;
  }

  // play again
  restart(stepper: MatStepper) {
    stepper.reset();
  }

  // open rules dialog
  openDialog() {
    this.dialog.open(MemoryMatrixDialog);
  }
}

@Component({
  selector: 'memory-matrix-dialog',
  templateUrl: 'memory-matrix-dialog.html',
})
export class MemoryMatrixDialog {
  
  constructor(public dialog: MatDialog) {}

  // close rules dialog
  closeDialog() {
    this.dialog.closeAll();
  }
}
