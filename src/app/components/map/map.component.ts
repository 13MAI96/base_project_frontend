import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  private columns: number = 7

  constructor(private elRef: ElementRef){

  }

  ngAfterViewInit(): void {
    this.updateContainerWidth();
  }



  @HostListener('window:resize', [])
  onWindowResize() {
    this.updateContainerWidth();
  }

  private updateContainerWidth(): void {
    const containerWidth = this.container.nativeElement.offsetWidth;
    const newHex = Math.round((containerWidth/this.columns)*1.1);
    this.elRef.nativeElement.style.setProperty('--hex-width', `${newHex > 40 ? newHex : 45}px`);
  }

}
