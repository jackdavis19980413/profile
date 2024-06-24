import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';
import { Skills, Content } from '../../../interfaces/template/content';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})

export class SkillsComponent {
  PageInfo : Skills | undefined
  profileService : ProfileService = inject(ProfileService)
  showPage: boolean  = false

  constructor(){
    this.profileService.contentInfo$.subscribe(value => {
      const contentData: Content | undefined = value
      this.PageInfo = contentData?.sections[1].section as Skills | undefined
    })
    this.profileService.consolePrinted$.subscribe(value => {
      this.showPage = value;
    });
  }

}
