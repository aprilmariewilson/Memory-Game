import React, { Component } from "react";
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matchcards.json";
import "./App.css";
// score and changing messages on page
let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "click on a super cute puppy to earn points but don't click on image more than once or it's game over.";

class App extends Component {
    
//set up the state of your component
    state = {
        matches,
        correctGuesses,
        bestScore,
        clickMessage
    };
//click function
    setClicked = id => {


        const matches = this.state.matches;


        const clickedMatch = matches.filter(match => match.id === id);

//if you clicked on a previously clicked image the score/game will start over and the message will change

        if (clickedMatch[0].clicked){

            console.log ("Correct Guesses: " + correctGuesses);
            console.log ("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "you must love that puppy, you've already clicked that one."

            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({ correctGuesses });
            this.setState({matches});

//if you click on a new image your score will continue to rise and message will change
        } else if (correctGuesses < 11) {


            clickedMatch[0].clicked = true;


            correctGuesses++;
            
            clickMessage = "Keep your streak going!";

            if (correctGuesses > bestScore){
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

//will change the images array order after an image is clicked
            matches.sort(function(a, b){return 0.5 - Math.random()});


            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        } else {

//if you have clicked through entire array of images you win 
            clickedMatch[0].clicked = true;


            correctGuesses = 0;


					clickMessage = "WOW! You have correctly clicked on every puppy. I'm impressed!";
            bestScore = 24;
            this.setState({ bestScore });
            //game will start over
            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }


            matches.sort(function(a, b){return 0.5 - Math.random()});


            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});

        }
    };

    render() {
        return (
            <Wrapper>
                <Title>Click All The Puppies</Title>
        
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreSummary">
                    Correct Guesses: {this.state.correctGuesses} 
                    <br />
                    Best Score: {this.state.bestScore} 
                </h3>

                {this.state.matches.map(match => (
                    <MatchCard
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}
            </Wrapper>
        );
    }
}

export default App;
