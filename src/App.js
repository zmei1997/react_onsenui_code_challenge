import './App.css';
import * as Ons from 'react-onsenui';
import ons from 'onsenui';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

let checkboxItems = ["a", "b", "c"];
let radioItems = ["aa", "bb", "cc"];
let selectItems = ["aaa", "bbb", "ccc"];

function Toolbar(props) {
  return (
    <Ons.Toolbar>
      <div className="left">
        {props.goToBack === true ? <Ons.BackButton onClick={() => ons.notification.alert("Go back to the previous page will not save your data!").then(() => props.navigate("/"))}>Back</Ons.BackButton> : null}
      </div>
      <div className='center'>{props.title}</div>
    </Ons.Toolbar>
  );
}

function ViewResult(props) {
  return (
    <Ons.Page renderToolbar={() => <Toolbar title={props.title} goToBack={true} navigate={props.navigate} />}>
      <section style={{ textAlign: 'center' }}>
        <h3>Welcome {props.name}</h3>
        <h3>Radio value {props.radioVal}</h3>
      </section>
    </Ons.Page>
  );
}

function Home(props) {

  return (
    <Ons.Page renderToolbar={() => <Toolbar title={props.title} goToBack={false} />}>
      <section style={{ textAlign: 'center' }}>
        <div>
          <h2>User Information</h2>
          <label>Username: </label>
          <Ons.Input modifier='material' placeholder='Enter Your Name' onChange={(event) => props.setName(event.target.value)}></Ons.Input>
          <br></br>
          <label>Birth Date: </label>
          <Ons.Input modifier='material' type='Date'></Ons.Input>
        </div>
        <br></br>
        <div>
          <h2>Categories</h2>
          <label>Please check one or more: </label>
          {checkboxItems.map((item) => <div key={item.toString()}><Ons.Checkbox value={item} /><label>{item}</label></div>)}
        </div>
        <br></br>
        <div>
          <h2>Artists</h2>
          <label>Please choose one: </label>
          {radioItems.map((item) => <div key={item.toString()}><Ons.Radio modifier='material' value={item} onChange={event => props.setRadioVal(event.target.value)} /><label>{item}</label></div>)}
          {console.log(props.radioVal)}
        </div>
        <br></br>
        <div>
          <h2>Songs</h2>
          <label>Please select one: </label>
          <br></br>
          <Ons.Select modifier='material'>
            {selectItems.map((item) => <option key={item.toString()} value={item}>{item}</option>)}
          </Ons.Select>
          <br></br>
        </div>
        <br></br>
        <Ons.Button onClick={() => props.navigate("/review")}>Submit</Ons.Button>
      </section>
    </Ons.Page>
  );
}

function App() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [radioVal, setRadioVal] = useState("");

  return (
    <div className='App'>
      <Home />
      <Routes>
        <Route path="/" element={<Home title="Home" navigate={navigate} name={name} setName={setName} radioVal={radioVal} setRadioVal={setRadioVal} />} />
        <Route
          path="/review"
          element={<ViewResult title="Review" navigate={navigate} name={name} radioVal={radioVal} />} />
      </Routes>
    </div>
  );
}

export default App;
