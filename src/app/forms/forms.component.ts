import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'forms-root',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  @ViewChild('f') ngFormInst: NgForm;

  defaultSecret = 'pet'
  gender = ''
  genders = ['male', 'female']
  user = {
    name: '',
    email: ""
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.ngFormInst.form.patchValue({
      user: {
        name: suggestedName
      }
    })
  }

  onSubmit() {
    this.user.name = this.ngFormInst.value.user.name
    this.user.email = this.ngFormInst.value.user.email
    this.ngFormInst.reset()
  }

  getErrorClasses(name: string) {
    const control = this.ngFormInst ? this.ngFormInst.controls[name] : null

    if (control) {
      return { error: control.invalid }
    }

    return {}
  }
}
