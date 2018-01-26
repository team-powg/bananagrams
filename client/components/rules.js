import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Rules extends Component {

    render() {
        return (
            <div className="giant-image">
                <img
                    src="bananagrams-glamour.png"
                    height="250"
                    width="250"
                    className="circle-logo"
                />
                <h1 className="landing-tagline josefin-font">How to play:</h1>
                <p>Place all 144 tiles face down in the center of the table. These tiles are called the BUNCH.</p>
                <p>Everyone then takes tiles from the bunch and puts them in front of them, face-down. The number of tiles you take depends on the number of people playing:
            2-4 People: each player takes 21 letters. 5-6 People: each player takes 15 letters. 7 People: each player takes 11 letters.</p>
                <p>Once everyone’s ready, any player can start the game by saying “SPLIT!” Everybody then turns their tiles face up and starts forming their own crossword collections of intersecting and connecting words.</p>
                <p>IMPORTANT: Words can be horizontal or vertical, going from left to right or top to bottom. Players can rearrange their own words as often as they want. There are no turns in Bananagrams, everyone works on their own crossword independently of each other. It’s a race to the finish!!!</p>
                <p>When a player successfully uses all their letters in a crossword, he or she says “PEEL!” and takes a tile from the bunch. When this happens, everybody has to take a tile and add it to their collection of letters.</p>
                <p>At any time (and as often as they like), a player can return a troublesome letter back to the bunch (face- down, of course). The catch is that they must take three letters in return. The player declares this by saying “DUMP!”. This doesn’t affect any of the other players.</p>
                <p>Play continues until there are fewer tiles in the bunch than there are players. At that point, the first player with no remaining letters shouts “BANANAS!” and is the winner!</p>
                <p>But it’s not home free for the winner yet! The other players now inspect his or her hand for misspelled or incorrect words. (You can’t use proper nouns like names, and we recommend using a print or online dictionary to keep things fair).</p>
                <p>If the words are acceptable, than that player is the WINNER.</p>
                <p>If any word is unacceptable, that player becomes the “ROTTEN BANANA” and is out of that hand. He or she returns all their letters face down to the bunch and the game resumes for the remaining players.</p>
                <Link to="/">
                    <h2>Home</h2>
                </Link>
            </div>
        )
    }
}

