import { Component } from '@angular/core';
import { EnrollmentService } from './enrollment.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  topics = ['Angular','Vue','React'];
  topicHasError = true;
  submitted = false;
  errorMsg = '';
  userModel = new User('rob','rob@test.com',9177681333,'default','morning',true);

  constructor(private _enrollmentService: EnrollmentService){}

  validateTopic(value: string) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  onSubmit(){
    this.submitted = true;
    this._enrollmentService.enroll(this.userModel)
    .subscribe(
      data => console.log('Success', data),
      error => this.errorMsg = error.statusText
    )
  }

}
