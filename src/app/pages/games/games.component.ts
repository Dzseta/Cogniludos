import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games = [
    { title:'Memória Mátrix', subtitle: 'Memória', icon: '../../assets/mmBanner.png', route: '/memory-matrix'},
    { title:'Gyors Párosítás', subtitle: 'Gyors reakció', icon: '../../assets/smBanner.png', route: '/speed-match'},
    { title:'Kakukktojás', subtitle: 'Figyelem', icon: '../../assets/oooBanner.png', route: '/odd-one-out'},
    { title:'Szín Párosítás', subtitle: 'Alkalmazkodó képesség', icon: '../../assets/cmBanner.png', route: '/colour-match'},
    { title:'Sorozat', subtitle: 'Probléma megoldás', icon: '../../assets/sqBanner.png', route: '/sequence'},
    { title:'Folytonosság', subtitle: 'Nyelvfejlesztés', icon: '../../assets/coBanner.png', route: '/continuum'},
    { title:'Krétatábla', subtitle: 'Matematika', icon: '../../assets/cbBanner.png', route: '/chalkboard'}
  ];
  loggedInUser = (localStorage.getItem('user') !== 'null');

  constructor() { }

  ngOnInit(): void {
  }
}
