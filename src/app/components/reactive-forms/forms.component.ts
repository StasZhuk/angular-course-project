import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'forms-root',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  genders = ['male', 'female'];
  statuses = ['Stable', 'Critical', 'Finished'];
  signupForm: FormGroup;
  testForm: FormGroup;
  controlsArr: AbstractControl[];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      user: new FormGroup({
        name: new FormControl('null', Validators.required),
        email: new FormControl(
          'test@test.ru',
          [Validators.required, Validators.email],
          [this.isCorrectEmail]
        ),
      }),
      gender: new FormControl(this.genders[0], [
        Validators.required,
        this.isGenderMale.bind(this),
      ]),
      hobbies: new FormArray([]),
    });

    const hobbiesControl = <FormArray>this.signupForm.get('hobbies');
    this.controlsArr = hobbiesControl.controls;
    this.signupForm.statusChanges.subscribe((status) => {
      console.log('STATUS: ', status);
    });
    this.signupForm.valueChanges.subscribe((value) => {
      console.log('VALUE: ', value);
    });

    this.testForm = new FormGroup({
      project: new FormControl(
        null,
        [Validators.required],
        [this.isProjectNameAsync]
      ),
      email: new FormControl('test@test.ru', [
        Validators.required,
        Validators.email,
      ]),
      status: new FormControl(this.statuses[0], [Validators.required]),
    });
  }

  onSubmit() {
    this.signupForm.reset({
      gender: 'male',
    });
  }

  isShowError(name: string) {
    const control = this.signupForm.get(name);
    return control.invalid && control.touched;
  }

  onAddHobby() {
    const hobbiesControl = <FormArray>this.signupForm.get('hobbies');
    const newControl = new FormControl(null, Validators.required);
    hobbiesControl.push(newControl);
  }

  isGenderMale(control: FormControl): { [s: string]: boolean } {
    if (control.value !== 'male') {
      return { isGenderMale: true };
    }

    return null;
  }

  isCorrectEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((res, rej) => {
      setTimeout(() => {
        if (control.value === 'test1@test.ru') {
          res({ isEmailError: true });
        } else {
          res(null);
        }
      }, 1500);
    });

    return promise;
  }

  onTestSubmit() {
    console.log(this.testForm.value);
  }

  isProjectNameCorrect(control: FormControl): { [s: string]: boolean } {
    if (control.value && control.value.indexOf('Test') >= 0) {
      return { isProjectError: true };
    }

    return null;
  }

  isProjectNameAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((res) => {
      setTimeout(() => {
        if (control.value && control.value.indexOf('Test') >= 0) {
          res({ isProjectAsyncError: true });
        } else {
          res(null);
        }
      }, 1500);
    });

    return promise;
  }
}
