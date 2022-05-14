import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Subscription, take, timer } from 'rxjs';
import { Score } from 'src/app/models/score';
import { ScoreService } from 'src/app/shared/services/score.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-colour-match',
  templateUrl: './colour-match.component.html',
  styleUrls: ['./colour-match.component.css'],
  animations: [
    trigger('cardState', [
      state('up', style({
        transform: 'rotateX(0deg)',
      })),
      state('down', style({
        transform: 'rotateX(360deg)',
      })),
      transition('* => *', animate('200ms ease')),
    ])
  ]
})
export class ColourMatchComponent implements OnInit {

  // helping variables
  meaningCardLeft!: { colour: string, text: string};
  colourCardLeft!: { colour: string, text: string};
  meaningCardRight!: { colour: string, text: string};
  colourCardRight!: { colour: string, text: string};
  right!: number;
  wrong!: number;
  score!: number;
  started!: boolean;
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
  // colours
  colours = [
    { colour:'red', text: 'piros'},
    { colour:'green', text: 'zöld'},
    { colour:'blue', text: 'kék'},
    { colour:'#F4D03F', text: 'sárga'},
    { colour:'black', text: 'fekete'}
  ];

  constructor(public dialog: MatDialog, private scoreService: ScoreService) { }

  ngOnInit() {
    this.scores = [];
    this.colourCardLeft = { colour:'black', text: ''};
    this.meaningCardLeft = { colour:'black', text: ''};
    this.colourCardRight = { colour:'black', text: ''};
    this.meaningCardRight = { colour:'black', text: ''};
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnDestroy() {
    this.countDown = null;
  }

  // animation
  get stateName() {
    return this.animState ? 'up' : 'down';
  }

  // start a new game
  startGame(stepper: MatStepper) {
    // calculate difficulty
    this.scoreService.getAllScores(this.currentUser.email, 'cm').then(scores =>{
      if (scores.size < 5) {
        this.difficulty = 'könnyű';
        this.sameRatio = 0.0625;
      } else if (scores.size < 10) {
        this.difficulty = 'közepes';
        this.sameRatio = 0.167;
      } else {
        this.difficulty = 'nehéz';
        this.sameRatio = 0.375;
      }
    });

    stepper.selected!.completed = true
    stepper.next();

    this.colourCardLeft = { colour:'black', text: ''};
    this.meaningCardLeft = { colour:'black', text: ''};
    this.colourCardRight = { colour:'black', text: ''};
    this.meaningCardRight = { colour:'black', text: ''};

    this.animState = true;
    this.started = false;
    this.right = 0;
    this.wrong = 0;
    this.score = 0;
    this.counter = 60;
    setTimeout(() =>{
      this.countDown = timer(0, 1000).pipe(take(this.counter)).subscribe(() => {--this.counter; if(this.counter<=0) {this.endGame(stepper)}} );
      this.started = true;
      let random;
      random = Math.floor(Math.random() * this.colours.length);
      this.colourCardLeft = this.colours[random];
      random = Math.floor(Math.random() * this.colours.length);
      this.meaningCardLeft = this.colours[random];
      random = Math.floor(Math.random() * this.colours.length);
      this.colourCardRight = this.colours[random];
      random = Math.floor(Math.random() * this.colours.length);
      this.meaningCardRight = this.colours[random];
      this.animState = !this.animState;
    },3000);
  }

  // determinate whether or not the player is right
  matches(isMatches: boolean) {
    this.animState = !this.animState;
    let matchesColour = (this.meaningCardLeft.colour === this.colourCardRight.colour);
    if (isMatches === matchesColour) {
      this.score += 100;
      this.right++;
    } else {
      this.score -= 100;
      this.wrong++;
    }

    let random;
    random = Math.floor(Math.random() * this.colours.length);
    this.colourCardLeft = this.colours[random];
    random = Math.floor(Math.random() * this.colours.length);
    this.meaningCardLeft = this.colours[random];
    if (Math.random() > this.sameRatio) {
      random = Math.floor(Math.random() * this.colours.length);
      this.colourCardRight = this.colours[random];
    } else {
      this.colourCardRight = this.colours[random];
    }
    random = Math.floor(Math.random() * this.colours.length);
    this.meaningCardRight = this.colours[random];
  }

  // end the game
  endGame(stepper: MatStepper) {
    const now = new Date();
    this.scoreService.create( { userEmail: this.currentUser.email, game: 'cm', score: this.score, difficulty: this.difficulty, date: now.toLocaleDateString() } );
    this.scoreService.getUserScores(this.currentUser.email, 'cm').then(scores =>{
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
    this.dialog.open(ColourMatchDialog);
  }

}


@Component({
  selector: 'colour-match-dialog',
  templateUrl: 'colour-match-dialog.html',
})
export class ColourMatchDialog {
  
  constructor(public dialog: MatDialog) {}

  // close rules dialog
  closeDialog() {
    this.dialog.closeAll();
  }
}