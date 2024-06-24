import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleComponent } from '../../components/console/console.component';
import { ProfileService } from '../../../services/profile.service';
import { AboutMe, Content } from '../../../interfaces/template/content';

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [CommonModule, ConsoleComponent ],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css'
})
export class AboutmeComponent {
  pageInfo: AboutMe | undefined
  profileService: ProfileService = inject(ProfileService)

  constructor() {
    this.profileService.contentInfo$.subscribe(value => {
      const contentData: Content | undefined = value
      this.pageInfo = contentData?.sections[0].section as AboutMe | undefined
    })
  }
}
