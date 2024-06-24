import { Component } from '@angular/core';
import { AboutmeComponent } from '../shared/pages/aboutme/aboutme.component';
import { SkillsComponent } from '../shared/pages/skills/skills.component';
import { ExperienceComponent } from '../shared/pages/experience/experience.component';
import { EducationComponent } from '../shared/pages/education/education.component';
import { ProjectsComponent } from '../shared/pages/projects/projects.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [AboutmeComponent, SkillsComponent, ExperienceComponent, EducationComponent, ProjectsComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

}
