import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    phone: new FormControl(''),
    adress: new FormControl('')
  });

  constructor(private location: Location, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    var abb = this.signUpForm.get('email')?.value;
    var bbb = this.signUpForm.get('password')?.value;
    if(typeof abb === "string" && typeof bbb === "string"){
      this.authService.signup(abb, bbb).then(cred => {
        console.log(cred);

        var a =this.signUpForm.get('email')?.value;
        var b =this.signUpForm.get('name.phone')?.value;
        var c =this.signUpForm.get('name.adress')?.value;
        if(typeof a === "string" && typeof b === "string" && typeof c === "string"){
          const user: User = {
            id: cred.user?.uid as string,
            email: a,
            username: a.split('@')[0],
            phone: b,
            adress: c
            
          };
          this.userService.create(user).then(_ => {
            console.log('User added successfully.');
          }).catch(error => {
            console.error(error);
          })
        }


      }).catch(error => {
        console.error(error);
      });
    }
    
  
  }

  goBack() {
    this.location.back();
  }

}
