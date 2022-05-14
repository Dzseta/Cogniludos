import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Score } from '../../models/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private dbPath = 'scores';
  scoresRef: AngularFirestoreCollection<Score>;

  constructor(private afs: AngularFirestore) {
    this.scoresRef = afs.collection(this.dbPath);
  }

  get(id: string): any {
    return this.scoresRef.doc(id).get();
  }
  getAll(): AngularFirestoreCollection<Score> {
    return this.scoresRef;
  }

  getUserScores(email: string, game: string) {
    return this.scoresRef.ref.where('userEmail', '==', email).where('game', '==', game).orderBy('score', "desc").orderBy('date').limit(10).get();
  }

  getAllScores(email: string, game: string) {
    return this.scoresRef.ref.where('userEmail', '==', email).where('game', '==', game).get();
  }

  getBestScore(game: string) {
    return this.scoresRef.ref.where('game', '==', game).orderBy('score', "desc").limit(1).get();
  }

  create(score: Score): any {
    return this.scoresRef.add({ ...score });
  }

}
