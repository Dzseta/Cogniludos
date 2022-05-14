import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Question } from 'src/app/models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private dbPath = 'questions';
  questionsRef: AngularFirestoreCollection<Question>;

  constructor(private afs: AngularFirestore) {
    this.questionsRef = afs.collection(this.dbPath);
  }

  // get all questions belonging to the category
  getCategoryQuestions(category: string) {
    return this.questionsRef.ref.where('category', '==', category).get();
  }

  // create new question
  addQuestion(question: Question): any {
    return this.questionsRef.add({ ...question });
  }
}
