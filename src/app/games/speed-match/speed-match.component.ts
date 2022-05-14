import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Subscription, take, timer } from 'rxjs';
import { Score } from '../../models/score';
import { ScoreService } from '../../shared/services/score.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-speed-match',
  templateUrl: './speed-match.component.html',
  styleUrls: ['./speed-match.component.css'],
  animations: [
    trigger('cardState', [
      state('left', style({
        transform: 'rotateY(0deg)',
      })),
      state('right', style({
        transform: 'rotateY(180deg)',
      })),
      transition('* => *', animate('200ms ease')),
    ])
  ]
})
export class SpeedMatchComponent implements OnInit, OnDestroy {

  // helping variables
  cards!: string[];
  card!: string;
  right!: number;
  wrong!: number;
  score!: number;
  started!: boolean;
  isCompleted!: boolean;
  currentUser!: any;
  difficulty!: string;
  sameRatio!: number;
  // countdown
  countDown!: Subscription | null;
  counter!: number;
  // animation
  animState!: boolean;
  // scores table
  scores!: Score[];
  // shapes
  shapes = [
    '../../../assets/smRectangle.png',
    '../../../assets/smCircle.png',
    '../../../assets/smFlower.png',
    '../../../assets/smStar.png',
    '../../../assets/smSuperellipse.png',
    '../../../assets/smTriangle.png'
    ];

  constructor(public dialog: MatDialog, private scoreService: ScoreService) { }

  ngOnInit() {
    this.scores = [];
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnDestroy() {
    this.countDown = null;
  }
  
  // animation
  get stateName() {
    return this.animState ? 'right' : 'left';
  }

  // start a new game
  startGame(stepper: MatStepper) {
    // calculate difficulty
    this.scoreService.getAllScores(this.currentUser.email, 'sm').then(scores =>{
      if (scores.size < 5) {
        this.difficulty = 'könnyű';
        this.sameRatio = 0.125;
      } else if (scores.size < 10) {
        this.difficulty = 'közepes';
        this.sameRatio = 0.2;
      } else {
        this.difficulty = 'nehéz';
        this.sameRatio = 0.4;
      }
    });

    stepper.selected!.completed = true
    stepper.next();

    this.animState = true;
    this.cards = [];
    this.cards.push('../../../assets/smRectangle.png');
    this.card = this.cards[0];
    this.started = false;
    this.right = 0;
    this.wrong = 0;
    this.score = 0;
    this.counter = 60;
    this.isCompleted = false;
    setTimeout(() =>{
      this.countDown = timer(0, 1000).pipe(take(this.counter)).subscribe(() => {--this.counter; if(this.counter<=0) {this.endGame(stepper)}} );
      this.cards.push( this.shapes[Math.floor(Math.random() * this.shapes.length)] );
      this.card = this.cards[this.right + this.wrong + 1];
      this.started = true;
      this.animState = !this.animState;
    },3000);
  }

  // determinate whether or not the player is right
  matches(isMatches: boolean) {
    this.animState = !this.animState;
    let matchesPrevious = (this.cards[this.right + this.wrong] === this.cards[this.right + this.wrong + 1]);
    if (matchesPrevious === isMatches) {
      this.right++;
      this.score += 100;
    } else {
      this.wrong++;
      this.score -= 100;
    }
    if (Math.random() < (this.sameRatio)) {
      this.cards.push( this.card );
    } else {
      this.cards.push( this.shapes[Math.floor(Math.random() * this.shapes.length)] );
    }
    this.card = this.cards[this.right + this.wrong + 1];
  }

  // end the game
  endGame(stepper: MatStepper) {
    const now = new Date();
    this.scoreService.create( { userEmail: this.currentUser.email, game: 'sm', score: this.score, difficulty: this.difficulty, date: now.toLocaleDateString() } );
    this.scoreService.getUserScores(this.currentUser.email, 'sm').then(scores =>{
      this.scores = scores.docs.map(doc => doc.data());
    });
    stepper.selected!.completed = true;
    stepper.next();
  }

  // restart the game
  restart(stepper: MatStepper) {
    stepper.reset();
  }

  // open rules
  openDialog() {
    this.dialog.open(SpeedMatchDialog);
  }
}

@Component({
  selector: 'speed-match-dialog',
  templateUrl: 'speed-match-dialog.html',
})
export class SpeedMatchDialog {
  
  constructor(public dialog: MatDialog) {}

  // close rules dialog
  closeDialog() {
    this.dialog.closeAll();
  }
}
