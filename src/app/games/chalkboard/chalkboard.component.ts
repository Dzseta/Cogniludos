import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Subscription, take, timer } from 'rxjs';
import { Score } from '../../models/score'
import { AuthService } from 'src/app/shared/services/auth.service';
import { ScoreService } from 'src/app/shared/services/score.service';

@Component({
  selector: 'app-chalkboard',
  templateUrl: './chalkboard.component.html',
  styleUrls: ['./chalkboard.component.css']
})
export class ChalkboardComponent implements OnInit {

  // helping variables
  currentUser!: any;
  difficulty!: string;
  harderOperations!: number;
  score!: number;
  started!: boolean;
  isCompleted!: boolean;
  operationCounter!: number;
  // equation variables
  a1!: number;
  b1!: number;
  c1!: number;
  a2!: number;
  b2!: number;
  c2!: number;
  operation1!: string;
  operation2!: string;
  // success rate counting
  right!: number;
  wrong!: number;
  // countdown
  countDown!: Subscription | null;
  counter!: number;
  // scores table
  scores!: Score[];

  constructor(public dialog: MatDialog, private authService: AuthService, private scoreService: ScoreService) { }

  ngOnInit() {
    this.scores = [];
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnDestroy() {
    this.countDown = null;
  }

  // start a new game
  startGame(stepper: MatStepper) {
    stepper.selected!.completed = true
    stepper.next();

    // calculate difficulty
    this.scoreService.getAllScores(this.currentUser.email, 'cb').then(scores =>{
      if (scores.size < 5) {
        this.difficulty = 'könnyű';
        this.harderOperations = 15
      } else if (scores.size < 10) {
        this.difficulty = 'közepes';
        this.harderOperations = 5;
      } else {
        this.difficulty = 'nehéz';
        this.harderOperations = 0;
      }
    });

    this.started = false;
    this.score = 0;
    this.right = 0;
    this.wrong = 0;
    this.counter = 60;
    this.isCompleted = false;
    this.operationCounter = 1;
    this.operation1 = '';
    this.operation2 = '';
    setTimeout(() =>{
      this.countDown = timer(0, 1000).pipe(take(this.counter)).subscribe(() => {--this.counter; if(this.counter<=0) {this.endGame(stepper)}} );
      this.started = true;
      this.operation1 = this.buildOperation(this.operationCounter);
      this.operation2 = this.buildOperation(this.operationCounter);
    },3000);
  }

  // determinate whether or not the player is right
  matches(larger: string) {
    if (eval(this.operation1) == eval(this.operation2) && larger == 'equal' || eval(this.operation1) > eval(this.operation2) && larger == 'left' || eval(this.operation1) < eval(this.operation2) && larger == 'right') {
      this.score += 100;
      this.right++;
    } else {
      this.score -= 100;
      this.wrong++;
    }
    this.operationCounter++;
    this.operation1 = this.buildOperation(this.operationCounter);
    this.operation2 = this.buildOperation(this.operationCounter);
  }

  // make operation
  buildOperation(operationCounter: number) {
    let operationType = Math.floor(Math.random() * 4);
    let operation = ''; 
    let a, b, c;
    if (operationCounter <= this.harderOperations) {
      switch(operationType) { 
        case 0: { 
          a = Math.floor(Math.random() * 30) + 1;
          b = Math.floor(Math.random() * 30) + 1;
          operation = a + ' + ' + b;
          break; 
        } 
        case 1: { 
          a = Math.floor(Math.random() * 20) + 10;
          b = Math.floor(Math.random() * 20);
          operation = a + ' - ' + b;
          break; 
        } 
        case 2: { 
          a = Math.floor(Math.random() * 10) + 1;
          b = Math.floor(Math.random() * 10) + 1;
          operation = a + ' * ' + b;
          break; 
        } 
        case 3: { 
          a = Math.floor(Math.random() * 50) + 5;
          b = Math.floor(Math.random() * 5) + 1;
          operation = a + ' / ' + b;
          break; 
        } 
      }
    } else {
      switch(operationType) { 
        case 0: { 
          a = Math.floor(Math.random() * 20) + 1;
          b = Math.floor(Math.random() * 20) + 1;
          operation = '( ' + a + ' + ' + b + ' ) ';
          break; 
        } 
        case 1: { 
          a = Math.floor(Math.random() * 15) + 10;
          b = Math.floor(Math.random() * 15);
          operation = '( ' + a + ' - ' + b + ' ) ';
          break; 
        } 
        case 2: { 
          a = Math.floor(Math.random() * 8) + 1;
          b = Math.floor(Math.random() * 8) + 1;
          operation = '( ' + a + ' * ' + b + ' ) ';
          break; 
        } 
        case 3: { 
          a = Math.floor(Math.random() * 35) + 5;
          b = Math.floor(Math.random() * 5) + 1;
          operation = '( ' + a + ' / ' + b + ' ) ';
          break; 
        } 
      }
      operationType = Math.floor(Math.random() * 4);
      c = Math.floor(Math.random() * 5) + 1;
      switch (operationType) {
        case 0:
          operation += ' + ' + c;
          break;
        case 1:
          operation += ' - ' + c;
          break;
        case 2:
          operation += ' * ' + c;
          break;
        case 3:
          operation += ' / ' + c;
          break;
      }
    }
    return operation;
  }

  // end the game
  endGame(stepper: MatStepper) {
    const now = new Date();
    this.scoreService.create( { userEmail: this.currentUser.email, game: 'cb', score: this.score, difficulty: this.difficulty, date: now.toLocaleDateString() } );
    this.scoreService.getUserScores(this.currentUser.email, 'cb').then(scores =>{
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
    this.dialog.open(ChalkboardDialog);
  }

}

@Component({
  selector: 'chalkboard-dialog',
  templateUrl: 'chalkboard-dialog.html',
})
export class ChalkboardDialog {
  
  constructor(public dialog: MatDialog) {}

  // close rules dialog
  closeDialog() {
    this.dialog.closeAll();
  }
}