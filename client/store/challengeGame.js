import firebase from 'firebase';
import {getAllWords, getHorizWord, getVertWord} from '../components/WordSearch'
import {challenge} from '../components/WordChallenge'

const SUBMIT_WORDS_FOR_CHALLENGE = 'SUBMIT_WORDS_FOR_CHALLENGE';

export const submitWordsForChallenge = id => {
  return {
    type: SUBMIT_WORDS_FOR_CHALLENGE,
    id
  }
}

//THUNK//
export const submitWordsForChallengeThunk = (gameId, playerNumber) =>
  dispatch => {
    const grid = [
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '']
    ];
    let player = 'Player ' + playerNumber;
    const submittedGrid = firebase.database().ref(`games/${gameId}/players/${player}/playerPot`).once('value', snapshot => {
      const letters = snapshot.val();
      return letters.map(tile => {
          let letter = tile.letter;
          let x = tile.x;
          let y = tile.y;
          console.log('letter    x   y  ', letter, x, y)
          grid[x].splice(y, 1, letter);
          console.log('   GRID   ', grid)
          var rr = getAllWords(grid);

            console.log('CHALLENGED', challenge(rr))

          return rr;
        });
    })
}

// Reducer
function challengeGame(state = [], action) {
  switch (action.type) {
    case SUBMIT_WORDS_FOR_CHALLENGE:
      return

  default:
    return state;
  }
}

export default challengeGame;
