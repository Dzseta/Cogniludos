import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../shared/services/question.service';
import { Question } from '../../models/question';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  profile!: Question[];
  rules!: Question[];
  stats!: Question[];
  
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getCategoryQuestions('profile').then(questions =>{
      this.profile = questions.docs.map(doc => doc.data());
    });
    this.questionService.getCategoryQuestions('rules').then(questions =>{
      this.rules = questions.docs.map(doc => doc.data());
    });
    this.questionService.getCategoryQuestions('stats').then(questions =>{
      this.stats = questions.docs.map(doc => doc.data());
    });
  }

}
