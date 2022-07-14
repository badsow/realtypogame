import { Component, OnInit } from '@angular/core';
import { PlayerInfo } from '../models/playerInfo.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor() { }

  isStarted: boolean = false;
  firstName: string = "" ;
  lastName: string = "";
  username: string ="";
  time: string = "45";
  language: string="Fr";

  currentPlayer: PlayerInfo ={
    firstName:"anonymous",
    lastName:"anonymous",
    wpm:0,
    time:"30",
    username:"anonymous"
  };

  playerList: PlayerInfo [] = [
    {
    firstName:"Badara",
    lastName:"Sow",
    wpm:999,
    time:"30",
    username:"badarasow"

  },
    {
    firstName:"Sidi",
    lastName:"Diaby",
    wpm:29,
    time:"30",
    username:"sididiaby"

  }
];

  title = 'typo 200';

  showMessage = false

  ngOnInit(): void {
    
    const tempPlayerList =  localStorage.getItem("playerList");
    if(tempPlayerList !== null){
       this.playerList = JSON.parse(tempPlayerList);
       console.log("Info in storage", this.playerList);
       
    }else{
      localStorage.setItem("playerList",  JSON.stringify(this.playerList) );
    }

  }

  handleClick() {

    this.showMessage = !this.showMessage;
  }
  handleChange(){
    console.log("firstname = ", this.firstName);
    
  }



  generateUsername (){
    
    const temp = (this.firstName + this.lastName).replace(" ","").toLocaleLowerCase();
     let count =0
      for (let index = 0; index < this.playerList.length; index++) {
        const element = this.playerList[index];
     
        
        if(element.username=== temp + (count===0? "":count)){
          console.log(temp);
          count++;
        }
       
        
      } 
      this.username = temp + (count===0? "":count); 

  }


  startGame(){

      this.currentPlayer.firstName = this.firstName;
      this.currentPlayer.lastName = this.lastName;
      this.currentPlayer.time = this.time;
      this.currentPlayer.wpm = 0;
      this.currentPlayer.username= this.username;
      this.playerList.push(this.currentPlayer);
      localStorage.setItem("playerList", JSON.stringify(this.playerList))
      localStorage.setItem("language", JSON.stringify(this.language))
      localStorage.setItem("time", JSON.stringify(this.time))

      console.log("playerList", this.playerList);
      

    this.isStarted =true;

    localStorage.setItem("username", this.username)
    localStorage.setItem("currentPlayer", JSON.stringify(this.currentPlayer))

  }
  
  
}
