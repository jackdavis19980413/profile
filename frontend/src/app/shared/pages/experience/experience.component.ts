import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';
import { Timeline, Content } from '../../../interfaces/template/content';
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  PageInfo : Timeline | undefined
  profileService : ProfileService = inject(ProfileService)
  showPage: boolean  = false

  constructor(){
    this.profileService.contentInfo$.subscribe(value => {
      const contentData: Content | undefined = value
      this.PageInfo = contentData?.sections[2].section as Timeline | undefined
    })
    this.profileService.consolePrinted$.subscribe(value => {
      this.showPage = value;
    });
  }
}
