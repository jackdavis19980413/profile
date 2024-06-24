import { Injectable } from '@angular/core';
import { Nav } from '../interfaces/template/nav';
import { Content, AboutMe, Skills, Timeline, Project } from '../interfaces/template/content';
import { Page } from '../interfaces/layout/page';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  urls = {
    nav: 'http://127.0.0.1:8000/api/nav',
    content: 'http://127.0.0.1:8000/api/content',
    page: 'http://127.0.0.1:8000/api/page',
  };

  private _navData = new BehaviorSubject<Nav | undefined>(undefined)
  public navInfo$: Observable<Nav | undefined> = this._navData.asObservable()
  private _contentData = new BehaviorSubject<Content | undefined>(undefined)
  public contentInfo$: Observable<Content | undefined> = this._contentData.asObservable()
  private _pageData = new BehaviorSubject<Page | undefined>(undefined)
  public pageInfo$: Observable<Page | undefined> = this._pageData.asObservable()

  private _consolePrinted = new BehaviorSubject<boolean>(false);
  public consolePrinted$ = this._consolePrinted.asObservable();

  updateConsolePrinted(newValue: boolean) {
    this._consolePrinted.next(newValue);
  }

  constructor() {
    this.requestNavInfo()
    this.requestContentInfo()
    this.requestPageInfo()
  }

  async requestNavInfo() {
    const response = await fetch(this.urls.nav);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    this._navData.next(data)
  }

  async requestContentInfo() {
    const response = await fetch(this.urls.content);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    this._contentData.next(data)
  }

  async requestPageInfo() {
    const response = await fetch(this.urls.page);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    this._pageData.next(data)
  }

}
