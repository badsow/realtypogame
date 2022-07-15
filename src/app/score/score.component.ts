import { Component, OnInit } from '@angular/core';
import { PlayerInfo } from '../models/playerInfo.model';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})


export class ScoreComponent implements OnInit {
  
  constructor() { }
  score: number= 0;
  username: any ;
  playerList: PlayerInfo [] = []

  ngOnInit(): void {
    
    const tempPlayerList   = localStorage.getItem('playerList');
    if(tempPlayerList !== null){
      this.playerList=JSON.parse(tempPlayerList);
      this.playerList.sort((a,b)=>(b.wpm-a.wpm))
  }
  
}
}
