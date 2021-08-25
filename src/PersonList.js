import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {
    state = {
        persons: [],
        qanak: ''
    }

    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
    }

    myChangeHandler = (event) => {
        this.setState({ qanak: +event.target.value });
    }

    add(elem, qanak) {
        console.log(elem);
        let doc = []
        for(let i = 0; i <qanak;i++) {
            console.log(elem[i].id);
          doc[i] = <li key={i}>{elem[i].name}</li>
        }
        return doc
    }
    render() {
        return (<div>
            <input
                type='text'
                onChange={this.myChangeHandler}
            />
            <ul>
                {
                   this.add(this.state.persons, this.state.qanak)

    }
            </ul>
            {this.state.qanak}
            </div>
        )
    }
}