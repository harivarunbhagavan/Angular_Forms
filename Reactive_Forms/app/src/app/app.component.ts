import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { PasswordValidator } from './shared/password-validator';
import { ForbiddenNameValidator } from './shared/userName.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  get userName(){
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  registrationForm : FormGroup | any; 

  constructor(private fb: FormBuilder, private _registrationService: RegistrationService){}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName : ['', [Validators.required, Validators.minLength(3), ForbiddenNameValidator(/password/)]],
      email : [''],
      subscribe: [false],
      password : [''],
      confirmPassword : [''],
      address : this.fb.group({
        city : [''],
        state : [''],
        postalCode : ['']
      }),
      alternateEmails: this.fb.array([''])
    },{validator: PasswordValidator});

    this.registrationForm.get('subscribe').valueChanges
        .subscribe((checkedValue: any) => {
          const email = this.registrationForm.get('email');
          if(checkedValue){
            email.setValidators(Validators.required);
          }else{
            email.clearValidators();
          }
          email.updateValueAndValidity();
        })
  }


  // registrationForm = new FormGroup({
  //   userName: new FormControl('Hari'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });
 
  loadAPIData(){
    this.registrationForm.setValue({
      userName: 'Bruce',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'guntur',
        state: 'AP',
        postalCode: '123456'
      }
    });

    this.registrationForm.patchValue({
      userName: 'Bruce11',
      password: 'test11',
      confirmPassword: 'tes12t'
    });
  }

  onSubmit(){
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
        .subscribe(
          (          response: any) => console.log('Success!', response),
    (          error: any) => console.error('Error!', error) 
        );
  }
}
