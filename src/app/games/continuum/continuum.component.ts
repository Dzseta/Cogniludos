import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Score } from '../../models/score';
import { ScoreService } from '../../shared/services/score.service';
import { writeSync } from 'fs';

@Component({
  selector: 'app-continuum',
  templateUrl: './continuum.component.html',
  styleUrls: ['./continuum.component.css']
})
export class ContinuumComponent implements OnInit {

  // helping variables
  random!: number;
  isPlayable!: boolean;
  currentUser!: any;
  difficulty!: string;
  maxLevel!: number;
  // fix variables
  level!: number;
  score!: number;
  right!: number;
  wrong!: number;
  // scores table
  scores!: Score[];
  // audio
  correctSound = new Audio();
  wrongSound = new Audio();
  // words
  words = [
    ['gyönyörű', 'szép', 'átlagos', 'csúnya', 'ocsmány'],
    ['zseniális', 'okos', 'buta', 'hülye'],
    ['monumentális', 'óriási', 'nagy', 'kicsi', 'apró'],
    ['elhízott', 'kövér', 'testes', 'karcsú', 'vékony', 'girhes'],
    ['szélsebes', 'gyors', 'lassú', 'lomha'],
    ['egyértelmű', 'értelmezhető', 'érthetetlen', 'felfoghatatlan'],
    ['rettenthetetlen', 'bátor', 'bátortalan', 'gyáva'],
    ['ambiciózus', 'szorgalmas', 'lusta', 'semmittevő'],
    ['nagyvonalú', 'méltányos', 'fukar', 'kapzsi'],
    ['ellenállhatatlan', 'társasági', 'tartózkodó', 'félénk'],
    ['őszinte', 'szavahihető', 'sumák', 'hazug'],
    ['igazságos', 'elfogult', 'igazságtalan'],
    ['robusztus', 'erős', 'gyenge', 'törékeny']
  ];
  currentWords!: string[];
  borderColors!: string[];

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
    this.scoreService.getAllScores(this.currentUser.email, 'co').then(scores =>{
      if (scores.size < 5) {
        this.difficulty = 'könnyű';
        this.maxLevel = 3;
      } else if (scores.size < 10) {
        this.difficulty = 'közepes';
        this.maxLevel = 4;
      } else {
        this.difficulty = 'nehéz';
        this.maxLevel = 5;
      }
      this.level = 0;
      this.score = 0;
      this.right = 0;
      this.wrong = 0;
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
    this.random = Math.floor(Math.random() * this.words.length);
    if (this.currentWords != this.words[this.random]) this.currentWords = [...this.words[this.random]];
    this.currentWords = this.shuffle(this.currentWords);
    this.borderColors = Array(this.currentWords.length).fill('white');
    this.isPlayable = true;
  }

  // make the move
  confirm(stepper: MatStepper) {
    this.isPlayable = false;
    let correct = 0;
    for (var i = 0; i < this.currentWords.length; ++i) {
      if (this.currentWords[i] == this.words[this.random][i]) {
        correct++;
        this.borderColors[i] = 'green';
      } else {
        this.borderColors[i] = 'red';
      }
    }
    this.score += Math.floor(100 * correct / this.currentWords.length);
    this.right += correct;
    this.wrong += this.currentWords.length-correct;
    if (correct === this.currentWords.length) this.correctSound.play();
    else this.wrongSound.play();
    if (this.level == this.maxLevel ) {
      setTimeout(() =>{
        const now = new Date();
        this.scoreService.create( { userEmail: this.currentUser.email, game: 'co', score: this.score, difficulty: this.difficulty, date: now.toLocaleDateString() } );
        this.scoreService.getUserScores(this.currentUser.email, 'co').then(scores =>{
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

  shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  // play again
  restart(stepper: MatStepper) {
    stepper.reset();
  }

  // open rules dialog
  openDialog() {
    this.dialog.open(MemoryMatrixDialog);
  }

  // drop event
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.currentWords, event.previousIndex, event.currentIndex);
  }

}

@Component({
  selector: 'continuum-dialog',
  templateUrl: 'continuum-dialog.html',
})
export class MemoryMatrixDialog {
  
  constructor(public dialog: MatDialog) {}

  // close rules dialog
  closeDialog() {
    this.dialog.closeAll();
  }
}