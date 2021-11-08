import './App.css';
import * as Ons from 'react-onsenui';
import React, { useState } from 'react';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import sampleDataStore from './sampleData.json'

// a set used to store multiple checkbox values
let checkboxValues = new Set();

function ViewResult(props) {
  function toolBar() {
    return (
      <Ons.Toolbar>
        <div className="left">
          <Ons.BackButton>Back</Ons.BackButton>
        </div>
        <div className='center'>View Result</div>
      </Ons.Toolbar>
    );
  }

  return (
    <Ons.Page renderToolbar={toolBar}>
      <Ons.Card style={{ textAlign: 'center' }}>
        <h2>Welcome {props.name}</h2>
        <h3 className="result_label">Birtday: </h3>
        <p className="result_item">{props.date}</p>
        <h3 className="result_label">Platform: </h3>
        <p className="result_item">{props.radioVal}</p>
        <h3 className="result_label">Categories: </h3>
        <ul className="result_item">
          {[...checkboxValues].map(item => <li key={item.toString()}>{item}</li>)}
        </ul>
        <h3 className="result_label">Games: </h3>
        <p className="result_item">{props.selectionVal}</p>
      </Ons.Card>
    </Ons.Page>
  );
}

function RenderCheckbox(props) {
  const [checked, setChecked] = useState(false);

  function handleCheckbox(event) {
    setChecked(event.target.checked);
    if (event.target.checked === true) {
      checkboxValues.add(event.target.value)
      // console.log(checkboxValues)
    } else {
      checkboxValues.delete(event.target.value)
      // console.log(checkboxValues)
    }
  }

  return (
    <><Ons.Checkbox value={props.item.name} checked={checked} onChange={handleCheckbox} /><label>{props.item.name}</label></>
  );
}

function Home(props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const [radioVal, setRadioVal] = useState("Windows");
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
          <h2>User Information</h2>
          <Ons.Card style={{ textAlign: 'center' }}>
            <label>Please verify your username and birtday:</label><br></br>
            <label><b>Username: </b></label>
            <Ons.Input modifier='material' placeholder='Enter Your Name' onChange={(event) => setName(event.target.value)}></Ons.Input>
            <br></br>
            <label><b>Birth Date: </b></label>
            <Ons.Input modifier='material' type='Date' onChange={(event) => setDate(event.target.value)}></Ons.Input>
          </Ons.Card>
        </div>
        <div>
          <h2>Platform</h2>
          <Ons.Card style={{ textAlign: 'center' }}>
            <label>Please choose one: </label><br></br>
            <div className="platform">
              {sampleDataStore.platform.map((item) =>
                <div key={item.id}><Ons.Radio modifier='material' value={item.name} checked={item.name === radioVal} onChange={(event) => setRadioVal(event.target.value)} /><label>{item.name}</label></div>)}
            </div>
          </Ons.Card>
        </div>
        <div>
          <h2>Categories</h2>
          <Ons.Card style={{ textAlign: 'center' }}>
            <label>Please choose one or more: </label><br></br>
            <div className="catagories">
              {sampleDataStore.categories.map((item) => <div key={item.id}><RenderCheckbox item={item} /></div>)}
            </div>
          </Ons.Card>
        </div>
        <div>
          <h2>Games</h2>
          <Ons.Card style={{ textAlign: 'center' }}>
            <label>Please select one: </label><br></br>
            <Ons.Select modifier='material' value={selectionVal} onChange={(event) => setSelectionVal(event.target.value)}>
              {sampleDataStore.games.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
            </Ons.Select>
          </Ons.Card>
        </div>
        <Ons.Button modifier="large--cta" onClick={() => props.navigator.pushPage({ component: ViewResult, props: { key: "viewResult", name: name, date: date, radioVal: radioVal, selectionVal: selectionVal } })}>Submit</Ons.Button>
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
        initialRoute={{ component: Home, props: { key: "home" } }}
        renderPage={renderPage}
      />
    </div>
  );
}

export default App;