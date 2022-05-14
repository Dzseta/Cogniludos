import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Score } from '../../models/score';
import { ScoreService } from '../../shared/services/score.service';

type numberTile = {
  number: number;
  id: number;
  temp?: boolean;
};

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.css']
})
export class SequenceComponent implements OnInit {

  // helping variables
  random!: number;
  isPlayable!: boolean;
  currentUser!: any;
  difficulty!: string;
  maxLevel!: number;
  // level and score variables
  level!: number;
  score!: number;
  scores!: Score[];
  right!: number;
  wrong!: number;
  // sequence
  potencialNumbers: Array<numberTile> = [];
  sequence: Array<numberTile> = [];
  playerSequence: Array<numberTile> = [];
  origPlayerSequence: Array<numberTile> = [];
  borderColors!: string[];
  startingNumber!: number;
  diff!: number;
  // audio
  correctSound = new Audio();
  wrongSound = new Audio();

  @ViewChild('dropListRef', { static: true}) dropListRef!: ElementRef;

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
    this.scoreService.getAllScores(this.currentUser.email, 'sq').then(scores =>{
      if (scores.size < 5) {
        this.difficulty = 'könnyű';
        this.maxLevel = 4;
      } else if (scores.size < 10) {
        this.difficulty = 'közepes';
        this.maxLevel = 5;
      } else {
        this.difficulty = 'nehéz';
        this.maxLevel = 6;
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
    this.startingNumber = Math.floor(Math.random() * 10) + 1;
    this.sequence = [];
    this.playerSequence = [];
    this.potencialNumbers = [];
    this.random = Math.floor(Math.random() * 4);
    switch (this.random) {
      // arithmetic sequence
      case 0:
        this.diff = Math.floor(Math.random() * 20) + 1;
        for (let i=0; i<(3+this.level); i++) {
          this.sequence.push({ number: (this.startingNumber + i * this.diff), id: i });
        }
        break;
      // geometric sequence
      case 1:
        this.diff = Math.floor(Math.random() * 4) + 2;
        for (let i=0; i<(3+this.level); i++) {
          this.sequence.push({ number: (this.startingNumber *  Math.pow(this.diff, i)), id: i});
        }
        break;
      // fibonacci
      case 2:
        this.diff = Math.floor(Math.random() * 10) + 1;
        this.sequence.push({ number: this.startingNumber, id: 0});
        this.sequence.push({ number: (this.startingNumber+this.diff), id: 1});
        for (let i=0; i<(3+this.level-2); i++) {
          this.sequence.push({ number: (this.sequence[i].number+this.sequence[i+1].number), id: i+2 });
        }
        break;
      // combined sequence
      case 3:
        this.diff = Math.floor(Math.random() * 5) + 1;
        for (let i=0; i<(3+this.level); i++) {
          this.sequence.push({ number: (this.startingNumber + i * (i/2+0.5) * this.diff), id: i });
        }
        break;
    } 
    // create sequence arrays
    this.borderColors = Array(this.sequence.length).fill('white');
    for (let i=0; i<this.sequence.length; i++) {
      if (i%2 == 0) {
        this.playerSequence.push(this.sequence[i]);
        this.borderColors[i] = 'rgb(171,171,171)';
      } else {
        this.playerSequence.push({ number: 0, id: 99});
        this.potencialNumbers.push(this.sequence[i]);
        this.potencialNumbers.push({ number: (this.sequence[i].number + Math.floor(Math.random() * 20) - 10 ), id: this.sequence[i].id+100});
      }
    }
    this.potencialNumbers = this.shuffle(this.potencialNumbers);
    this.origPlayerSequence = [...this.playerSequence];
    if (this.level > this.maxLevel) return;
    this.isPlayable = true;
  }

  // confirm sequence
  confirm(stepper: MatStepper) {
    if (!this.isPlayable) return;
    this.isPlayable = false;
    let correct = 0;

    for (var i = 0; i < this.sequence.length; ++i) {
      if (this.sequence[i].number == this.playerSequence[i].number) {
        if (i%2 !== 0) {
          correct++;
          this.right++;
        }
        this.borderColors[i] = 'green';
      } else {
        this.wrong++;
        this.borderColors[i] = 'red';
      }
    }
    if (correct === Math.floor(this.sequence.length/2)) this.correctSound.play();
    else this.wrongSound.play();
    this.score += Math.floor(100 * correct / Math.floor(this.sequence.length/2));

    // end game if at maxLevel
    if (this.level >= this.maxLevel ) {
      setTimeout(() =>{
        const now = new Date();
        this.scoreService.create( { userEmail: this.currentUser.email, game: 'sq', score: this.score, difficulty: this.difficulty, date: now.toLocaleDateString() } );
        this.scoreService.getUserScores(this.currentUser.email, 'sq').then(scores =>{
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
  drop(event: any) {
    const previousIdx = event.previousContainer.data.findIndex(
      (f: any) => f.id === event.item.data.id
    );
    if ((event.currentIndex-1) % 2 !== 0 && event.container != event.previousContainer)  {
      event.container.data[event.currentIndex-1] = JSON.parse(JSON.stringify(event.previousContainer.data[previousIdx]));
    }
    if (event.previousContainer.data) {
      this.potencialNumbers = this.potencialNumbers.filter((f) => !f.temp);
    }
  }

  exited(event: any) {
    const currentIdx = event.container.data.findIndex(
      (f: any) => f.id === event.item.data.id
    );
    this.potencialNumbers.splice(currentIdx + 1, 0, {
      ...event.item.data,
      temp: true,
    });
  }

  entered() {
    this.potencialNumbers = this.potencialNumbers.filter((f) => !f.temp);
  }

}

@Component({
  selector: 'sequence-dialog',
  templateUrl: 'sequence-dialog.html',
})
export class MemoryMatrixDialog {
  
  constructor(public dialog: MatDialog) {}

  // close rules dialog
  closeDialog() {
    this.dialog.closeAll();
  }
}