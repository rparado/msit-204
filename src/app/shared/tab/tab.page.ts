import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {
  tabActive: boolean = false;
  constructor() { }

  ngOnInit() {
    const profileUpdated =  localStorage.getItem('profileUpdated');
    if(profileUpdated === null || profileUpdated === 'false') {
        this.tabActive = false;
    } else {
      this.tabActive = true;
    }
  }

}
