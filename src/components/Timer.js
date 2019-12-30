import React, { Component } from 'react'

export class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: new Date(),
            finishingTime: new Date(),
            remainingTime: 0,
            pomodoroTime: 15
        }

        this.updateTimer = this.updateTimer.bind(this);
        this.activatePomodoro = this.activatePomodoro.bind(this);
        this.millisToMinutesAndSeconds = this.millisToMinutesAndSeconds.bind(this);

    }
    
    // componentDidMount() {
    //     this.setState({
    //         finishingTime: new Date(this.state.timer.getTime() + (60000 * this.state.pomodoroTime))
    //     })
        
    //     this.timerID = setInterval(() => {
    //         this.updateTimer();
    //     }, 1000);
    // }

    // componentWillMount() {
    //     clearInterval(this.timerID);
    // }

    updateTimer() {
        this.setState({
            timer: new Date(),
            remainingTime: Math.abs(this.state.finishingTime - this.state.timer)
        });
    }

    activatePomodoro() {
        this.setState({
            timer: new Date(),
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
        return (
            <div>
                <p>
                    <input type="button" onClick={this.activatePomodoro}></input>
                </p>

                {this.state.timer.toLocaleTimeString()} 
                <p></p>
                {this.state.finishingTime.toLocaleTimeString()}
                <p></p>
                {this.millisToMinutesAndSeconds(this.state.remainingTime)}

            </div>
        )
    }
}

export default Timer;
