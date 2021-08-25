import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { connect, Provider, useDispatch } from 'react-redux'

import { createStore, bindActionCreators } from 'redux'
import HeadItem from './HeadItem';
import PersonList from './PersonList';
import PersonListTask2 from './task2';

class App extends React.Component {

  render() {

    const { changeActionInputValue, addActionItem } = this.props;

    return (
      <div>
        <h2>task2</h2>
        <PersonListTask2/>
        <hr/>
        {/* <PersonList/> */}
        <h1>eeee</h1>
        {/* <input type="text" value={this.props.inputValue} onChange={(e) => changeActionInputValue(e.target.value)} /> */}
        {/* <button onClick={() => addActionItem()}>Add</button> */}

        {
          (this.props.itemsArray) ? this.props.itemsArray.map((item, index) => {
            return <HeadItem
              item={item}
              index={index}
              {...this.props}
            />
          }) : ""
        }
      </div>
    )
  }
}

const changeActionInputValue = (inpValue) => {
  return {
    type: "ACTION_INPUTVALUE",
    inputValue: inpValue
  }
}


const addActionItem = () => {
  return {
    type: "ACTION_ADDITEM",

  }
}


const initialState = {
  inputValue: "",
  itemsArray: [],

}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACTION_INPUTVALUE":
      return { ...state, inputValue: action.inputValue }

      break;

    case "ACTION_ADDITEM":
      var itemsArray = state.itemsArray
      var obyekt = {
        text: state.inputValue,
        vichak: false,
      }
      itemsArray.push(obyekt);
      return { ...state, itemsArray: itemsArray, inputValue: "" }
      break;


    case "DELETE":
      var itemsArray = []

      state.itemsArray.forEach(element => {
        itemsArray.push(element)
      });

      itemsArray.splice(action.index, 1);


      return { ...state, itemsArray: itemsArray, inputValue: "" }
      break;

    case "EDIT":

      var itemsArray = [];
      //  var itemsArray = state.itemsArray;///arajadranq
      //arajadranq 2 darcnel aveli karch u <<graget>>
      state.itemsArray.forEach((element, index) => {
        if (index === action.index) {
          itemsArray.push({
            text: element.text,
            vichak: !element.vichak,
          })
        }
        else {
          itemsArray.push({
            text: element.text,
            vichak: element.vichak,
          })
        }
      });

      return { ...state, itemsArray: itemsArray, }

      break;

    case "EDIT_VALUE":
      var itemsArray = [];
      state.itemsArray.forEach((element, index) => {
        itemsArray.push(element)
      });
      itemsArray[action.payload.index].text = action.payload.newValue;
      return { ...state, itemsArray: itemsArray, }
      break;

    default:
      break;
  }
  return state
}

const store = createStore(mainReducer)


const stateToProps = (state) => {
  // console.log("state in stateToProps", state)
  return state
}
const actionsToProps = (dispatch) => {
  return {
    changeActionInputValue: bindActionCreators(changeActionInputValue, dispatch),
    addActionItem: bindActionCreators(addActionItem, dispatch),
    actionDelete: bindActionCreators(actionDelete, dispatch),
    actionEdit: bindActionCreators(actionEdit, dispatch),
    actionValueEdit: bindActionCreators(actionValueEdit, dispatch),
  }
}
const actionDelete = (index) => {
  console.log("actionDelete", index)
  return {
    type: "DELETE",
    index: index,
  }
}
const actionEdit = (index) => {
  return {
    type: "EDIT",
    index: index
  }
}

const actionValueEdit = (index, newValue) => {
  return {
    type: "EDIT_VALUE",
    payload: { index: index, newValue: newValue }
  }
}

/*const actionEditValue = (value , index) => {
  return{
    type : "EDIT_VALUE",
    index : index,
    value : value,
  }
}*/

const ConnectedApp = connect(stateToProps, actionsToProps)(App)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);


