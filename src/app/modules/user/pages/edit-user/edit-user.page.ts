import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../models/userModel';
import { UsersService } from '../../services/users.service';
import { QuestionBase } from '../../../dynamic-form/models/question-base';
import { TextboxQuestion } from 'src/app/modules/item/models/question-textbox';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { DateModel } from '../../models/birthDateModel';
import { DropdownQuestion } from 'src/app/modules/dynamic-form/models/question-dropdown';
import { configs } from 'src/app/configs/configs';
import { RoleModel } from '../../models/privilegesLevelModel';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss']
})
export class EditUserPage implements OnInit {
  currentUser: UserModel;
  questions: any;
  submitText: string;
  options: any;
  text: string;
  title: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public service: UsersService
  ) { }

  ngOnInit() {
    const userKey = this.route.snapshot.paramMap.get('key');
    this.currentUser = new UserModel(undefined, userKey);
    this.currentUser.key = userKey;
    if (userKey) {
      this.currentUser
        .load()
        .then(() => console.log('loaded user', this.currentUser));
    }
    if (!this.currentUser.birthDate) {
      this.currentUser.birthDate = new DateModel({
        year: 1977,
        day: 16,
        month: 2
      });
      this.currentUser.birthDate.loadFromDate(new Date());
    }
    this.submitText = 'modifica';
    this.title =
      this.currentUser.firstName && this.currentUser.lastName
        ? `${this.currentUser.firstName} ${this.currentUser.lastName}`
        : this.currentUser.email;
    const questions: any[] = [
      new TextboxQuestion({
        key: 'firstName',
        label: 'nome',
        value: this.currentUser.firstName,
        order: 1,
        required: true
      }),
      new TextboxQuestion({
        key: 'lastName',
        label: 'cognome',
        value: this.currentUser.lastName,
        order: 2
      }),
      new SwitchQuestion({
        key: 'enabled',
        label: 'abilitato',
        value: this.currentUser.enabled,
        labelTrue: 'utente  abilitato',
        labelFalse: ' utente non abilitato ',
        iconTrue: 'happy',
        iconFalse: 'remove-circle',
        order: 3
      }),
      new DateQuestion({
        key: 'birthDate',
        label: 'Data di nascita',
        required: true,
        value: new DateModel(this.currentUser.birthDate).formatDate(), // "1977-03-16",
        order: 4
      }),
      new DropdownQuestion({
        key: 'level',
        label: 'Ruolo utente',
        options: configs.accessLevel,
        value: this.currentUser.level
      })
    ];
    this.questions = questions;
  }

  filter(ev) { }
  submit(ev) {
    console.log('submit', ev);
    ev.email = this.currentUser.email; // non modifico email
    const user = new UserModel(ev);
    user.key = this.currentUser.key;
    user.privileges = configs.accessLevel.filter((r: RoleModel) => {
      // tslint:disable: triple-equals
      // tslint:disable-next-line: no-unused-expression
      r.value == this.currentUser.level;
    })[0];
    console.log('updating user', user);
    user.privileges = configs.accessLevel.filter(
      (v: RoleModel) => v.value == ev.level
    )[0];
    /*admin.auth().setCustomUserClaims(this.currentUser.key, {
      role: this.currentUser.level
    });*/
    this.service
      .updateItem(user)
      .then(v => {
        console.log('updated', v);
        this.router.navigate(['/users']);
      })
      .catch(e => {
        console.log('error', e);
      });
  }
}
