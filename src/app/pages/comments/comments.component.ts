import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment } from '../../shared/models/Comment';
import { CommentService } from '../../shared/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit{
  
  comments: Array<Comment> = [];

  commentsForm = this.createForm({
    id: '',
    username: '',
    comment: '',
    date: 0
  });

  constructor(private fb: FormBuilder,private router: Router, private commentService: CommentService) { }

  ngOnInit(): void {
    
  }

  createForm( model: Comment) {
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(10)]);
    return formGroup;
  }

  a!: Comment;

  addComment() {
    if (this.commentsForm.valid) {
      if (this.commentsForm.get('username') && this.commentsForm.get('comment')) {
        this.commentsForm.get('date')?.setValue(new Date().getTime());
        if(typeof this.commentsForm.get('username') == "string" && typeof  this.commentsForm.get('comment') === "string" && typeof this.commentsForm.get('date') === "number"){
          this.commentService.create(this.a).then(_ => {
            this.router.navigateByUrl('/gallery/successful/' + this.commentsForm.get('username')?.value);
          }).catch(error => {
            console.error(error);
          });
        }
        
      }
    }
  }
}
