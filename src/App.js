import './App.css';
import * as Ons from 'react-onsenui';
import ons from 'onsenui';
import React, { useState } from 'react';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

// sample radio items
let platform = [
  { id: 1, name: "Windows" },
  { id: 2, name: "Mac" },
  { id: 3, name: "Virtual Reality" }
];

// sample checkbox items
let categories = [
  { id: 1, name: "First-Person Shooter" },
  { id: 2, name: "Adventure RPG" },
  { id: 3, name: "Sports" }
];

// sample selection items
let games = [
  { id: 0, name: "select a value" },
  { id: 1, name: "Call of Duty: Black Ops" },
  { id: 2, name: "Battlefield V" },
  { id: 3, name: "Final Fantasy X" },
  { id: 4, name: "FIFA 22" },
  { id: 5, name: "Forza Horizon 5" }
];

var set = new Set();

function ViewResult(props) {
  function toolBar() {
    return (
      <Ons.Toolbar>
        <div className="left">
          <Ons.BackButton>Back</Ons.BackButton>
          {/* TODO: if go back to home page, initialize all data */}
        </div>
        <div className='center'>View Result</div>
      </Ons.Toolbar>
    );
  }

  return (
    <Ons.Page renderToolbar={toolBar}>
        <Ons.Card style={{ textAlign: 'center' }}>
          <h3>Welcome {props.name}</h3>
          <h3>Birtday: {props.date}</h3>
          <h3>Platform: {props.radioVal}</h3>
          <h3>Categories: {props.checkboxVal}</h3>
          <h3>Games: {props.selectionVal}</h3>
        </Ons.Card>
    </Ons.Page>
  );
}

function Home(props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const [radioVal, setRadioVal] = useState("");
  const [checkboxVal, setCheckboxVal] = useState(new Set());
  const [selectionVal, setSelectionVal] = useState("select a value");

  function renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='center'>Home</div>
      </Ons.Toolbar>
    );
  }

  return (
    <Ons.Page renderToolbar={renderToolbar}>
      <section style={{ textAlign: 'center' }}>
        <div>
          <h1>User Information</h1>
          <h3>Please verify your username and birtday:</h3>
          <Ons.Card style={{ textAlign: 'center' }}>
            <label>Username: </label>
            <Ons.Input modifier='material' placeholder='Enter Your Name' onChange={(event) => setName(event.target.value)}></Ons.Input>
            <br></br>
            <label>Birth Date: </label>
            <Ons.Input modifier='material' type='Date' onChange={(event) => setDate(event.target.value)}></Ons.Input>
          </Ons.Card>
        </div>
        <div>
          <h1>Platform</h1>
          <Ons.Card style={{ textAlign: 'center' }}>
            <label>Please choose one: </label>
            {platform.map((item) => <div key={item.id}><Ons.Radio modifier='material' value={item.name} checked={item.name === radioVal} onChange={(event) => setRadioVal(event.target.value)} /><label>{item.name}</label></div>)}
          </Ons.Card>
        </div>
        <div>
          <h2>Categories</h2>
          <Ons.Card style={{ textAlign: 'center' }}>
            <label>Please check one or more: </label>
            {categories.map((item) => <div key={item.id}><Ons.Checkbox value={item.name} onChange={(event) => setCheckboxVal(set.add(event.target.value))} /><label>{item.name}</label></div>)}
          </Ons.Card>
        </div>
        <div>
          <h2>Games</h2>
          <Ons.Card style={{ textAlign: 'center' }}>
            <label>Please select one: </label>
            <br></br>
            <Ons.Select modifier='material' value={selectionVal} onChange={(event) => setSelectionVal(event.target.value)}>
              {games.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
            </Ons.Select>
          </Ons.Card>
        </div>
        <Ons.Button modifier="large--cta" onClick={() => props.navigator.pushPage({ component: ViewResult, props: { key: "viewResult", name: name, date: date, radioVal: radioVal, checkboxVal: checkboxVal, selectionVal: selectionVal } })}>Submit</Ons.Button>
      </section>
    </Ons.Page>
  );
}

function App() {

  function renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;
    return React.createElement(route.component, route.props);
  }

  return (
    <div className='App'>
      <Ons.Navigator
        swipeable
        initialRoute={{ component: Home, props: { key: "home", navigator: navigator } }}
        renderPage={renderPage}
      />
    </div>
  );
}

export default App;