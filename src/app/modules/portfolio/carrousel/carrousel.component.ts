import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, NgZone, OnChanges, signal, SimpleChanges } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { ThemeService } from '../../../services/theme/theme.service';
import { LanguageService } from '../../../services/language/language.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

import {MatTooltipModule} from '@angular/material/tooltip';

const modulesToImport = [
  FormsModule, 
  ReactiveFormsModule,
  MatFormFieldModule, 
  MatInputModule, 
  MatButtonModule, 
  MatIconModule, 
  MatCheckboxModule,
  CommonModule,
  MatPaginatorModule,
  MatTooltipModule
]

@Component({
    selector: 'app-carrousel',
    imports: modulesToImport,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './carrousel.component.html',
    styleUrl: './carrousel.component.scss',
    standalone: true
})
export class CarrouselComponent implements OnChanges {
  public darkTheme!: boolean;
  @Input() technologies: any[] = [];
  public visibleTechnologies: any[] = [];
  private intervalId: any;
  
  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService,
    private tagService: GoogleTagManagerService,
    private cdr: ChangeDetectorRef
  ){
    this.themeService.subscribable().subscribe((value: boolean)=>{
      this.darkTheme = value
    });
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['technologies'] && this.technologies.length > 0) {
        this.getCarrousel();
    }
  }

  public changeTheme(){
    this.themeService.darkTheme = !this.themeService.darkTheme
  }

  public getText(key: string){
    return this.languageService.getTraduction(key)
  }

  public getCarrousel(){
    
    if(this.technologies.length <= 8){
      this.visibleTechnologies = this.technologies
    } else {
      this.visibleTechnologies = this.technologies.slice(0, 8)
      let index = 8
      setInterval(() => {
        if(index >= this.technologies.length){
          index = 0
        }
        this.visibleTechnologies.push(this.technologies[index])
        this.visibleTechnologies.shift()
        // this.zone.run(() => {
        //     this.visibleTechnologies.push(this.technologies[index]);
        //     this.visibleTechnologies.shift();
        //   });
        index++;
        this.cdr.markForCheck()
      }, 5000)
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
