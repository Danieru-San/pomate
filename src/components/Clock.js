import React, { Component } from 'react'

export class Clock extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         date: new Date()
    //     }
    // }

    state = {
        date: new Date(),
    }

    componentDidMount() {
        // this.timerID = setInterval(
        //   () => this.tick(),
        //   1000
        // );

        this.timerID = setInterval(() => 
        {
            this.tick();
            // console.log("ticking away...")
        }, 1000);

      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      tick() {
        this.setState({
          date: new Date()
        });
      }
    
    
    render() {

        const name = "Dan";

        const welcomeMessage = (
            <h3>
                Welcome back, {name}
            </h3>
        );

        const displayTime = (
            <h3>
                It is {this.state.date.toLocaleTimeString()} now
            </h3>
        );

        return (
            <div>
                {/* {welcomeMessage} */}
                {displayTime}    
            </div>
        )
    }
}

export default Clock
