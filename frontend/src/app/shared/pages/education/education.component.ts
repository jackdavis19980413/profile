import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';
import { Timeline, Content } from '../../../interfaces/template/content';
@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  PageInfo: Timeline | undefined
  profileService: ProfileService = inject(ProfileService)
  showPage: boolean = false

  constructor() {
    this.profileService.contentInfo$.subscribe(value => {
      const contentData: Content | undefined = value
      this.PageInfo = contentData?.sections[3].section as Timeline | undefined
    })
    this.profileService.consolePrinted$.subscribe(value => {
      this.showPage = value;
    });
  }

}
