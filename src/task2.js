import React from 'react';
import axios from 'axios';

export default class PersonListTask2 extends React.Component {
    state = {
        persons: [],
        url: `https://randomuser.me/api/?page=3&results=` + 0,
        qanak: 1
    }


    componentDidUpdate() {
        axios.get(this.state.url)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
    }



    myChangeHandler = (event) => {

        this.setState({ qanak: + event.target.value });
        this.setState({
            url: `https://randomuser.me/api/?page=3&results=` + event.target.value
        });

    }



    add(elem) {


        if (elem !== undefined) {


            return (
                elem.map((person, index) => {

                    return <div
                        //   key={person.id.value}

                        key={index}
                    >


                        <h2>  firstname: {person.name.first}</h2>
                        <h2>  name: {person.name.last}</h2>
                        <h2>  cell: {person.cell}</h2>
                        <h2>  email: {person.email}</h2>
                        <img src={person.picture.large}></img>
                        <hr />


                    </div>

                })


            )
        }
        else {
            console.log("as")
        }


    }



    render() {
        return (<div>
            <input
                type='text'
                onChange={this.myChangeHandler}

            />
            <ul>
                {this.add(this.state.persons.results)}


            </ul>
            {this.state.qanak}
        </div>
        )
    }
}