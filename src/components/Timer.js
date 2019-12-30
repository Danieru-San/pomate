import React, { Component } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


// Styles 

// const progressStyle = {
//     height: '100px'
// }


export class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: new Date(),
            startingTime: new Date(),
            finishingTime: new Date(),
            remainingTime: 0,
            elapsedTime: 0,
            pomodoroTime: 2,
            percentage: 0
        }

        this.updateTimer = this.updateTimer.bind(this);
        this.activatePomodoro = this.activatePomodoro.bind(this);
        this.millisToMinutesAndSeconds = this.millisToMinutesAndSeconds.bind(this);

    }
    
    componentDidMount() {
        console.log("Component mounted!");
    }

    componentWillMount() {
        console.log("Component will mount...");
    }

    updateTimer() {
        this.setState({
            timer: new Date(),
            remainingTime: Math.abs(this.state.finishingTime - this.state.timer),
            elapsedTime: Math.abs(this.state.timer - this.state.startingTime),
            percentage: (this.state.elapsedTime) / (this.state.pomodoroTime * 60000)
        });
    }

    activatePomodoro() {
        this.setState({
            timer: new Date(),
            startingTime: this.state.timer,
            finishingTime: new Date(this.state.timer.getTime() + (60000 * this.state.pomodoroTime))
        });

        setInterval(() => {
            this.updateTimer();
        }, 1000);
    }

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    render() {
        const progressBar = (
                <CircularProgressbar 
                value={this.state.percentage}
                maxValue={1} 
                text={`${this.state.percentage}%`}
                styles={buildStyles({
                    background: 'true',
                    textSize: '2px',
                })
                }
                style={{
                    width: '2px'
                }}
                />
        )

        return (
            <div>
                <p>
                    <input type="button" onClick={this.activatePomodoro}></input>
                </p>


                {/* {progressBar} */}
                {this.state.timer.toLocaleTimeString()} 
                <p></p>
                {this.state.finishingTime.toLocaleTimeString()}
                <p></p>
                {this.millisToMinutesAndSeconds(this.state.remainingTime)}
                <br></br>
                {(this.state.pomodoroTime * 60000)}
                <br></br>
                {(this.state.remainingTime)}
                <br></br>
                {this.state.percentage.toFixed(2)}
                {/* {(this.state.remainingTime)}</br> */}
                
            

            </div>
        )
    }
}

export default Timer;
