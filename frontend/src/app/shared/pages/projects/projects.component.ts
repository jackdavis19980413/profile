import { Component, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';
import { Project, ProjectCard, Content } from '../../../interfaces/template/content';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChild('left_card') cardRef1!: ElementRef<HTMLLabelElement>;
  @ViewChild('center_card') cardRef2!: ElementRef<HTMLLabelElement>;
  @ViewChild('right_card') cardRef3!: ElementRef<HTMLLabelElement>;

  @ViewChild('left_slider') leftSliderRef!: ElementRef<HTMLInputElement>;
  @ViewChild('center_slider') centerSliderRef!: ElementRef<HTMLInputElement>;
  @ViewChild('right_slider') rightSliderRef!: ElementRef<HTMLInputElement>;

  profileService: ProfileService = inject(ProfileService)
  PageInfo: Project | undefined
  showPage: boolean = false

  currentIndex: number = 0

  card1: HTMLLabelElement | undefined
  card2: HTMLLabelElement | undefined
  card3: HTMLLabelElement | undefined

  leftSlider: HTMLInputElement | undefined
  centerSlider: HTMLInputElement | undefined
  rightSlider: HTMLInputElement | undefined

  cardsPosition: Array<any>  | undefined

  ngAfterViewInit() {
    this.profileService.contentInfo$.subscribe(value => {
      const contentData: Content | undefined = value
      this.PageInfo = contentData?.sections[4].section as Project | undefined

      if ((this.PageInfo !== undefined) && (this.cardsPosition !== undefined)) {
        this.updateCard(this.cardsPosition[0]['card'], this.PageInfo?.projects[this.prevIndex(this.currentIndex, this.PageInfo?.projects.length as number)] as ProjectCard);
        this.updateCard(this.cardsPosition[1]['card'], this.PageInfo?.projects[this.currentIndex] as ProjectCard);
        this.updateCard(this.cardsPosition[2]['card'], this.PageInfo?.projects[this.nextIndex(this.currentIndex, this.PageInfo?.projects.length as number)] as ProjectCard);
      }
    })
    if (this.cardRef1 && this.cardRef2 && this.cardRef3) {
      this.card1 = this.cardRef1.nativeElement
      this.card2 = this.cardRef2.nativeElement
      this.card3 = this.cardRef3.nativeElement
 
      this.cardsPosition = [
        { 'card': this.card1, 'slider': this.leftSlider },
        { 'card': this.card2, 'slider': this.centerSlider },
        { 'card': this.card3, 'slider': this.rightSlider }
      ];
    }
  }

  constructor() {
    this.profileService.consolePrinted$.subscribe(value => {
      this.showPage = value;
    });
  }

  updateCard(card : HTMLLabelElement, data: ProjectCard) {
    if (card !== undefined) {
      (card.children[0] as HTMLElement).textContent = data.title;
      (card.children[1] as HTMLImageElement).src = data.src;
      (card.children[2] as HTMLElement).textContent = data.description;
    }
  }

  checkClick(card: HTMLLabelElement) {
    if (this.cardsPosition !== undefined) {
      switch (card) {
        case this.cardsPosition[0]['card']:
          this.cardsPosition = this.rotateRight(this.cardsPosition);
          this.leftClick();
          break;
        case this.cardsPosition[2]['card']:
          this.cardsPosition = this.rotateLeft(this.cardsPosition);
          this.rightClick();
          break;
        default:
          break;
      }
    }
  }

  leftClick() {
    if (this.cardsPosition !== undefined) {
      this.currentIndex = this.prevIndex(this.currentIndex, this.PageInfo?.projects.length as number);
      this.updateCard(this.cardsPosition[0]['card'], this.PageInfo?.projects[this.prevIndex(this.currentIndex, this.PageInfo?.projects.length as number)] as ProjectCard);
    }
  }

  rightClick() {
    if (this.cardsPosition !== undefined) {
      this.currentIndex = this.nextIndex(this.currentIndex, this.PageInfo?.projects.length as number);
      this.updateCard(this.cardsPosition[2]['card'], this.PageInfo?.projects[this.nextIndex(this.currentIndex, this.PageInfo?.projects.length as number)] as ProjectCard);
    }
  }

  prevIndex(index: number, size: number) {
    if (index == 0) {
      return size - 1;
    } else {
      return index - 1;
    }
  }

  nextIndex(index: number, size: number) {
    if (index == size - 1) {
      return 0;
    } else {
      return index + 1;
    }
  }

  rotateLeft(arr: Array<any>) {
    let first = arr.shift();
    arr.push(first);
    return arr;
  }

  rotateRight(arr: Array<any>) {
    let last = arr.pop();
    arr.unshift(last);
    return arr;
  }
}
