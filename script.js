//Variaveis
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')
let p1At = document.querySelector('#p1At')

//Principal função pra manipular DOM
const updateGame = (p1,p2,gameState) => {
  
    p1NameDiv.innerText = p1.name
    p2NameDiv.innerText = p2.name
    p1HealthDiv.innerText = p1.health
    p2HealthDiv.innerText = p2.health
  
    if(p1.health <= 0 || p2.health <= 0){
        game.isOver = true
        gameState = game.isOver
        resultDiv.innerText = game.declareWinner(game.isOver, p1, p2)
        return gameState
    }
}

//Classe dos jogadores
class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  
  //Metodo de ataque
  strike (player, enemy, attackDmg) {
    
    
    let damageAmount = Math.ceil(Math.random() * attackDmg) 
    
    enemy.health -= damageAmount
 
    updateGame(p1, p2, game.isOver)
    
    console.log(`${player.name} attacks ${enemy.name} for ${damageAmount}`)
    return `${player.name} attacks ${enemy.name} for ${damageAmount}`
    


  }
  
  //Metodo de cura
  heal (player) {
    
   let hpAmount = Math.ceil(Math.random() * 5)

   player.health += hpAmount

   updateGame(p1, p2, game.isOver)

   console.log(`${player.name} heals for ${hpAmount} HP`)
   return `${player.name} heals for ${hpAmount} HP`

  }
}

//Classe do jogo
class Game {
  constructor() {
    this.isOver = false;
  }

  //Metodo de vencedor
  declareWinner(isOver,p1, p2) {
    let message = "TIE";
    if(isOver == true && p1.health <= 0) {
        message = `${p2.name} WINS!`
    }
     else if(isOver == true && p2.health <= 0){
        message = `${p1.name} WINS!`
    }
    
    document.querySelector('#victory').play()
    
    return message

  }

  //Metodo de resetar
  reset(p1,p2) {
    p1.health = 100
    p2.health = 100
    this.isOver = false
    resultDiv.innerText = ''
    updateGame(p1,p2, this.isOver)
  }
  
 
  play(p1, p2) {
    
    this.reset(p1, p2);


    while (!this.isOver) {
        p1.strike(p1,p2,p1.attackDamage)
        p1.heal(p1)

        p2.strike(p2,p1,p2.attackDamage)
        p2.heal(p2)

    }
  
    return this.declareWinner(this.isOver, p1, p2)
    
  }

}

//Definição de nome, health e força de ataque dos jogadores
const player1 = new Player('Cleison', 100, 10)
const player2 = new Player('Amanda',100, 15)


const p1 = player1;
const p2 = player2;


let game = new Game();

updateGame(p1, p2, game.isOver)


let gameState;




//Eventos
document.addEventListener('keydown', function(e) {
    if(e.key == "q" && p2.health > 0 && game.isOver == false){
        p1.strike(p1,p2,p1.attackDmg)
        document.querySelector('#p1attack').play()
        
    }

});

document.addEventListener('keydown', function(e) {
    if(e.key == 'a' && p2.health > 0 && game.isOver == false){
        p1.heal(p1)
        document.querySelector('#p1heal').play()
        
    }
  
});


document.addEventListener('keydown', function(e) {
    if(e.key == "p" && p1.health > 0 && game.isOver == false){
        p2.strike(p2,p1,p2.attackDmg)
        document.querySelector('#p2attack').play()
    }
 
});

document.addEventListener('keydown', function(e) {
    if(e.key == 'l' && p1.health > 0 && game.isOver == false){
        p2.heal(p2)
        document.querySelector('#p2heal').play()
    }

});

