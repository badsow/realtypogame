import { Component, OnInit } from '@angular/core';
import { PlayerInfo } from '../models/playerInfo.model';
import { BAMBARA_WORD_LIST, ENGLISH_WORD_LIST, FRENCH_WORD_LIST } from '../models/worldList.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  language: any;
  list: string[] = [];


  constructor() { }


  time: number = 60;
  gameDuration = 60;
  score: number = 0;
  currentWord: string = "";
  username: any;
  hasStarted: boolean = false;
  wpm: number = 0;
  playerList: PlayerInfo[] = [];
  currentPlayer: PlayerInfo = {
    firstName: "anonymous",
    lastName: "anonymous",
    wpm: 0,
    time: "30",
    username: "anonymous"
  };

  displayedWord: string = this.selectWord(this.list);

  bambaraWordList: String[] = BAMBARA_WORD_LIST;
  frenchWordList: String[] = FRENCH_WORD_LIST;
  englishWordList: String[] = ENGLISH_WORD_LIST;


  startTimer() {
    if (!this.hasStarted) {
      const id = setInterval(() => {
        if (this.time === 0) {
          this.endGame()

          clearInterval(id);
          return;
        }
        this.time = this.time - 1;
      }, 1000)

      this.hasStarted = true;
    }


  }

  ngOnInit(): void {

    const temp1 = localStorage.getItem('time');
    if (temp1) {

      this.time = JSON.parse(temp1);
    }

    this.gameDuration = this.time;

    const temp = localStorage.getItem('language');
    if (temp) {

      this.language = JSON.parse(temp);
    }


    console.log("language " + this.language);
    console.log("is<br", this.language === "Br");


    if (this.language === "Br") {
      this.list = BAMBARA_WORD_LIST
    }
    if (this.language === "Fr") {
      this.list = FRENCH_WORD_LIST
    }
    if (this.language === "En") {
      this.list = ENGLISH_WORD_LIST
    }
    console.log(this.list);

    this.displayedWord = this.selectWord(this.list);
    this.username = localStorage.getItem("username");
  }



  change(event: any) {

    console.log(event);

    console.log("currentw", this.currentWord);
    console.log("displayed word", this.displayedWord);

    if (this.currentWord === this.displayedWord) {
      this.score++
    }

    this.currentWord = "";

    this.displayedWord = this.selectWord(this.list)



  }

  selectWord(list: string[]) {

    const index = Math.floor(Math.random() * list.length);

    console.log("index ", index);

    return list[index]
  }
  endGame() {

    const tempPlayerList = localStorage.getItem('playerList');
    if (tempPlayerList !== null) {
      this.playerList = JSON.parse(tempPlayerList);
    }
    const tempCurrentPlayer = localStorage.getItem('currentPlayer');
    if (tempCurrentPlayer !== null) {
      this.currentPlayer = JSON.parse(tempCurrentPlayer);
    }
    this.currentPlayer.wpm = (this.score / this.gameDuration  ) * 60;



    for (var i = 0; i < this.playerList.length; i++) {
      if (this.playerList[i].username === this.currentPlayer.username) {

        console.log("curr", this.currentPlayer);
        console.log("p at index",this.playerList[i])
        
        this.playerList[i].wpm = this.currentPlayer.wpm;
      }

    }
    localStorage.setItem("playerList", JSON.stringify(this.playerList));

  }
}
