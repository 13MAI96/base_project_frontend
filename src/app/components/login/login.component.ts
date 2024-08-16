import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../models/login';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { HttpErrorResponse } from '@angular/common/http';

const modulesToImport = [
  FormsModule, 
  ReactiveFormsModule,
  MatFormFieldModule, 
  MatInputModule, 
  MatButtonModule, 
  MatIconModule, 
  MatCheckboxModule
]

@Component({
  selector: 'app-login',
  standalone: true,
  imports: modulesToImport,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm!: FormGroup
  readonly dialog = inject(MatDialog);

  constructor(
    private loginService: LoginService,
    private router: Router
  ){
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    // event.stopPropagation();
    event.preventDefault()
  }

  public loginOrSign(sign: boolean){
    if(this.loginForm.valid){
      let request: LoginRequest = this.loginForm.getRawValue()
      if(sign){
        this.loginService.registerUser(request).subscribe({next: response => {
          this.openDialog(response.message)
        }, error: (err: HttpErrorResponse) => {
          this.openDialog(err.message)
        }})
      } else {
        this.loginService.login(request).subscribe({next: response => {
          if(response.body){
            console.log("Navigate", response)
            this.router.navigate(['/layout']).then((value) => console.log(value) ).catch(err => console.log(err))
              .finally( () => console.log("Finally"))
          } else {
            this.openDialog(response.message)
          }
        }, error: err => {
          this.openDialog(err)
        }
      })
      }
    }
  }

  openDialog(text: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
