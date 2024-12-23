import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from '../../services/theme/theme.service';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language/language.service';

const modulesToImport = [
  FormsModule, 
  ReactiveFormsModule,
  MatFormFieldModule, 
  MatInputModule, 
  MatButtonModule, 
  MatIconModule, 
  MatCheckboxModule,
  CommonModule
]

@Component({
    selector: 'app-portfolio',
    imports: modulesToImport,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  public loginForm!: FormGroup
  readonly dialog = inject(MatDialog);
  public darkTheme!: boolean;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private languageService: LanguageService
  ){
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    this.themeService.suscribable().subscribe((value)=>{
      this.darkTheme = value
    })
  }

  public changeTheme(){
    this.themeService.darkTheme = !this.themeService.darkTheme
  }

  public changeLang(lang: string){
    console.log(lang)
    this.languageService.language = lang
  }

  public getText(key: string){
    return this.languageService.getTraduction(key)
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    // event.stopPropagation();
    event.preventDefault()
  }

}
