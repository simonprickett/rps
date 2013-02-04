/* Rock Paper Scissors */

/* Rules:

   - Rock (0): beats Scissors
   - Paper (1): beats Rock
   - Scissors (2): beats Paper
   - Tie: when both select the same
*/

var rps = {
    computersHand : 0,
    playersHand : 0,
    wins: 0,
    streak: 0,
    
    init : function() {
    },
    
    startGame: function() {
        tactile.page.getComponent('headerview').elem.innerHTML = 'Rock Paper Scissors!<br/>Wins: 0, Streak: 0'
        tactile.page.getComponent('start').hide();
        tactile.page.getComponent('instructions').hide();
        tactile.page.getComponent('gameplay').show();
        rps.computersHand = 0;
        rps.playersHand = 0;
    },
    
    showInstructions: function() {
        tactile.page.getComponent('start').hide();
        tactile.page.getComponent('instructions').show();
    },

    playComputersHand : function() {
        rps.computersHand = Math.floor(Math.random() * 3);
        var opponentTurn = tactile.page.getComponent('gameviewopponentturn');


        if (rps.computersHand == 0) {
            tactile.page.getComponent('gameviewopponentrock').show();
        } else if (rps.computersHand == 1) {
            tactile.page.getComponent('gameviewopponentpaper').show();
        } else {
            tactile.page.getComponent('gameviewopponentscissors').show();
        }
        
        tactile.page.getComponent('gameviewyourturn').hide();
    },

    playRound : function(playersHand) {
        rps.playersHand = playersHand;
        rps.playComputersHand();
        tactile.page.getComponent('gamebutton' + playersHand + 'view').addClass('movebuttonselected');
        tactile.page.getComponent('buttonlock').show();
    },
    
    getResult : function() {
        if (rps.computersHand == rps.playersHand) {
            tactile.page.getComponent('gameviewresulttie').show();
        } else {
            if (rps.playersHand == 0) {
                /* Player played rock */
                if (rps.computersHand == 2) {
                    /* Rock beats scissors */
                    tactile.page.getComponent('gameviewresultwin').show();
                    rps.updateScores('win');
                } else {
                    /* Paper beats rock */
                    tactile.page.getComponent('gameviewresultlose').show();
                    rps.updateScores('lose');
                }
            } else if (rps.playersHand == 1) {
                /* Player played paper */
                if (rps.computersHand == 0) {
                    /* Paper beats rock */
                    tactile.page.getComponent('gameviewresultwin').show();
                    rps.updateScores('win');
                } else {
                    /* Scissors beats paper */
                    tactile.page.getComponent('gameviewresultlose').show();
                    rps.updateScores('lose');
               }
            } else {
                /* Player played scissors */
                if (rps.computersHand == 0) {
                    /* Rock beats scissors */
                    tactile.page.getComponent('gameviewresultlose').show();
                    rps.updateScores('lose');
                } else {
                    /* Scissors beats paper */
                    tactile.page.getComponent('gameviewresultwin').show();
                    rps.updateScores('win');
                }
            }
        }
        
        tactile.page.getComponent('gameviewopponentrock').hide();
        tactile.page.getComponent('gameviewopponentpaper').hide();
        tactile.page.getComponent('gameviewopponentscissors').hide();
    }, 
    
    startOver : function() {
        tactile.page.getComponent('gamebutton0view').removeClass('movebuttonselected');
        tactile.page.getComponent('gamebutton1view').removeClass('movebuttonselected');
        tactile.page.getComponent('gamebutton2view').removeClass('movebuttonselected');
        tactile.page.getComponent('gameviewyourturn').show();
        tactile.page.getComponent('gameviewresultwin').hide();
        tactile.page.getComponent('gameviewresultlose').hide();
        tactile.page.getComponent('gameviewresulttie').hide();
        tactile.page.getComponent('buttonlock').hide();
    },
    
    updateScores : function(gameResult) {
        if (gameResult == 'win') {
            // win! increment win count and streak
            rps.wins++;
            rps.streak++;
        } else if (gameResult == 'lose') {
            // lose - reset streak only
            rps.streak = 0;
        } 
        
        tactile.page.getComponent('headerview').elem.innerHTML = 'Rock Paper Scissors!<br/>Wins: ' + rps.wins + ', Streak: ' + rps.streak;
    }
};

tactile.page.onready(rps.init);
