import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-progress-circle',
  styleUrls: ['./progress-circle.component.scss'],
  templateUrl: './progress-circle.component.html',
})
export class ProgressCircleComponent implements AfterViewInit {
  @Input() progress: number = 0;
  @ViewChild('circle')
  circle!: ElementRef;

  ngAfterViewInit(): void {
    const value = this.progress;

    const property = 'stroke-dashoffset';
    this.circle.nativeElement.style.setProperty(`${property}`, '75');
    const progressValue = this.computeProgressValue(value);

    setTimeout(() => {
      this.circle.nativeElement.style.setProperty(
        `${property}`,
        progressValue.toString()
      );
    }, 100);
  }

  computeProgressValue(val: number) {
    if (val > 0.9) return 100 - 100 * val;
    else if (val == 0) return 75;
    return 80 + val * 18 - 100 * val;
  }
}
