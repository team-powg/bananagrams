import firebase from 'firebase';
import {getAllWords, getHorizWord, getVertWord} from '../components/WordSearch'
import {challenge} from '../components/WordChallenge'

const SUBMIT_WORDS_FOR_CHALLENGE = 'SUBMIT_WORDS_FOR_CHALLENGE';
const RETURN_WORDS_ARRAY = 'RETURN_WORDS_ARRAY';

export const returnWordsArray = wordArray => {
  return {
    type: RETURN_WORDS_ARRAY,
    wordArray
  }
}

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
          grid[x].splice(y, 1, letter);
          var arrayOfFoundWords = getAllWords(grid);

            console.log('CHALLENGED', challenge(rr))

          dispatch(returnWordsArray(arrayOfFoundWords));
        });
    })
}

// Reducer
function challengeGame(state = [], action) {
  switch (action.type) {
    case RETURN_WORDS_ARRAY:
      return action.wordArray;
  default:
    return state;
  }
}

export default challengeGame;
