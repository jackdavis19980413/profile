import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Nav } from '../interfaces/template/nav';
import { Page } from '../interfaces/layout/page';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent {
  navInfo: Nav | undefined
  pageLayout: Page | undefined
  profileService: ProfileService = inject(ProfileService)

  constructor() {
    this.profileService.navInfo$.subscribe(value => {
      this.navInfo = value
    })
    this.profileService.pageInfo$.subscribe(value => {
      this.pageLayout = value
    })
  }

  hyperLink(path: string) {
    location.href=path
  }

  selected(id: string) {
    const targetElement = document.querySelector(`#${id}`) as HTMLImageElement
    if (targetElement) {
      var pos = targetElement.src.lastIndexOf(".");
      var source = targetElement.src.slice(0, pos);
      source = source + "_selected.png";
      targetElement.src = source;
    }
  }
  
  unselected(id: string) {
    const targetElement = document.querySelector(`#${id}`) as HTMLImageElement
    if (targetElement) {
      var pos = targetElement.src.lastIndexOf("_");
      var source = targetElement.src.slice(0, pos);
      source = source + ".png";
      targetElement.src = source;
    }
  }

  navScroll(id: string) {
    this.profileService.updateConsolePrinted(true)

    let selector = this.pageLayout?.navbtns.reduce((a, x)=>{ 
      if (x.id == id) 
        a = x.selector; 
      return a
    }, '#about_me')

    const targetElement = document.querySelector(selector ? selector : '')  as HTMLElement
    targetElement.scrollIntoView({ behavior: "smooth" });
  }

}
