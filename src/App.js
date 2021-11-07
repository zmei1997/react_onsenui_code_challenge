import './App.css';
import * as Ons from 'react-onsenui';
import ons from 'onsenui';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

// sample radio items
let platform = [
  {id:1, name:"Windows"},
  {id:2, name:"Mac"},
  {id:3, name:"Virtual Reality"}
];

// sample checkbox items
let categories = [
  {id:1, name:"First-Person Shooter"},
  {id:2, name:"Adventure RPG"},
  {id:3, name:"Sports"}
];

// sample selection items
let games = [
  {id:1, name:"Call of Duty: Black Ops"},
  {id:2, name:"Battlefield V"},
  {id:3, name:"Final Fantasy X"},
  {id:4, name:"FIFA 22"},
  {id:5, name:"Forza Horizon 5"}
];

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
          <h1>User Information</h1>
          <h3>Please verify your username and birtday:</h3>
          <label>Username: </label>
          <Ons.Input modifier='material' placeholder='Enter Your Name' onChange={(event) => props.setName(event.target.value)}></Ons.Input>
          <br></br>
          <label>Birth Date: </label>
          <Ons.Input modifier='material' type='Date'></Ons.Input>
        </div>
        <br></br>
        <div>
          <h1>Platform</h1>
          <label>Please choose one: </label>
          {platform.map((item) => <div key={item.id}><Ons.Radio modifier='material' value={item.name} onChange={event => props.setRadioVal(event.target.value)} /><label>{item.name}</label></div>)}
          {console.log(props.radioVal)}
        </div>
        <br></br>
        <div>
          <h2>Categories</h2>
          <label>Please check one or more: </label>
          {categories.map((item) => <div key={item.id}><Ons.Checkbox value={item.name} /><label>{item.name}</label></div>)}
        </div>
        <br></br>
        <div>
          <h2>Games</h2>
          <label>Please select one: </label>
          <br></br>
          <Ons.Select modifier='material'>
            {games.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
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
