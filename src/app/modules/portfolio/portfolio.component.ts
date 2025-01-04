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
import { GoogleTagManagerService } from '../../services/tag-manager/tag-manager.service';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Experience, experience, WorkExperience } from '../../models/experience';

const modulesToImport = [
  FormsModule, 
  ReactiveFormsModule,
  MatFormFieldModule, 
  MatInputModule, 
  MatButtonModule, 
  MatIconModule, 
  MatCheckboxModule,
  CommonModule,
  MatPaginatorModule
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
  public experience: WorkExperience[] = experience.slice(0, 2)
  public pageIndex: number = 0
  public count_experience: number = experience.length

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private languageService: LanguageService,
    private tagService: GoogleTagManagerService
  ){
    this.themeService.subscribable().subscribe((value)=>{
      this.darkTheme = value
    })
  }

  public changeTheme(){
    this.themeService.darkTheme = !this.themeService.darkTheme
  }

  public changeLang(lang: string){
    this.tagService.trackButtonClick('language_change', 'language', 'Header button')
    this.languageService.language = lang
  }

  public getText(key: string){
    return this.languageService.getTraduction(key)
  }

  public getDateStr(date: Date | null): string{
    if(date){
      const month = date.getMonth()
      const fullYear = date.getFullYear()
      return `${this.getText(`month_${month}`)} ${fullYear}`
    } else {
      return this.getText('currently')
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    // event.stopPropagation();
    event.preventDefault()
  }

  public handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    const start_page = 2*this.pageIndex
    this.experience = experience.slice(start_page, start_page+2)
  }

}
