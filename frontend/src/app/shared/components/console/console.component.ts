import { Component, Input, inject, OnInit, ChangeDetectorRef   } from '@angular/core';
import { AboutMe } from '../../../interfaces/template/content';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './console.component.html',
  styleUrl: './console.component.css'
})
export class ConsoleComponent implements OnInit {
  @Input() aboutMe!:AboutMe|undefined
  profileService: ProfileService = inject(ProfileService)

  aText: string[] = []  // console text content

  iSpeed = 10; // time delay of print out
  iIndex = 0; // start printing array at this posision
  iArrLength = 0; // the length of the text array
  iScrollAt = 20; // start scrolling up at this many lines
  
  iTextPos = 0; // initialise text position
  sContents = ''; // initialise contents
  iRow = 0; // initialise current row

  constructor(private cdr: ChangeDetectorRef) {
    
  }

  finished_typing = false;
  filled = false;

  ngOnInit(): void {
    let birthday = new Date('December 16, 1997 00:00:00')
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    let age = Math.abs(ageDate.getUTCFullYear() - 1970).toString();

    this.aText = new Array(
      "> Hello!", 
      "> My name is Ariel, I am " + age + " years old.", 
      "> I love programming and challenges.",
      "> I currently work as an Senior Android Platform Engineer at Volvo Construction Equipment.",
      "> If you want to know more about me, you are in the right place :) "
    );

    this.iArrLength = this.aText[0].length
    this.sContents = ''
  }


  onImageLoad(event: Event): void {
    this.typewriter()
  }
  
  
  typewriter = () => {
    let content_temp = '  '
    this.iRow = Math.max(0, this.iIndex-this.iScrollAt);

    while ( this.iRow < this.iIndex ) {
      content_temp += this.aText[this.iRow++].concat('<br />');
    }
    if (this.finished_typing == false) {
      content_temp += this.aText[this.iIndex].substring(0, this.iTextPos).concat("_")
    }

    if ( this.iTextPos++ == this.iArrLength ) {
      this.iTextPos = 0;
      this.iIndex++;
      if ( this.iIndex != this.aText.length ) {
        this.iArrLength = this.aText[this.iIndex].length;
        if (this.finished_typing == false) {
          this.sContents = content_temp
          this.cdr.detectChanges()
          setTimeout(this.typewriter, 500);
        }
      }
      else {
        this.finished_typing = true;
        this.filled = true;
        content_temp = content_temp.replace("_", "");
        this.sContents = content_temp
        this.profileService.updateConsolePrinted(true)
      }
    } 
    else {
      if (this.finished_typing == false) {
        this.sContents = content_temp
        this.cdr.detectChanges()
        setTimeout(this.typewriter, this.iSpeed);
      } 	
   	}

  }

}
