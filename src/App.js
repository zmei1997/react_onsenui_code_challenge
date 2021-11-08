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
        </div>
        <div className='center'>View Result</div>
      </Ons.Toolbar>
    );
  }

  return (
    <Ons.Page renderToolbar={toolBar}>
      <section style={{ textAlign: 'center' }}>
        <h3>Welcome {props.name}</h3>
        <h3>Platform: {props.radioVal}</h3>
        {console.log(set)}
        <h3>Categories: {props.checkboxVal}</h3>
        <h3>Games: {props.selectionVal}</h3>
      </section>
    </Ons.Page>
  );
}

function Home(props) {
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
          <label>Username: </label>
          <Ons.Input modifier='material' placeholder='Enter Your Name'></Ons.Input>
          <br></br>
          <label>Birth Date: </label>
          <Ons.Input modifier='material' type='Date'></Ons.Input>
        </div>
        <br></br>
        <div>
          <h1>Platform</h1>
          <label>Please choose one: </label>
          {platform.map((item) => <div key={item.id}><Ons.Radio modifier='material' value={item.name} /><label>{item.name}</label></div>)}
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
        <Ons.Button onClick={() => props.navigator.pushPage({component: ViewResult, props:{key:"viewResult"}})}>Submit</Ons.Button>
      </section>
    </Ons.Page>
  );
}

function App() {
  // const [name, setName] = useState("");
  // const navigate = useNavigate();
  // const [radioVal, setRadioVal] = useState("");
  // const [checkboxVal, setCheckboxVal] = useState(new Set());
  // const [selectionVal, setSelectionVal] = useState("");

  function renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;
    return React.createElement(route.component, route.props);
  }

  return (
    <div className='App'>
      <Ons.Navigator
        initialRoute={{ component: Home, props: { key: "home", navigator: navigator } }}
        renderPage={renderPage}
      />
      {/* <Home />
      <Routes>
        <Route path="/" element={<Home title="Home" navigate={navigate} name={name} setName={setName} radioVal={radioVal} setRadioVal={setRadioVal} checkboxVal={checkboxVal} setCheckboxVal={setCheckboxVal} selectionVal={selectionVal} setSelectionVal={setSelectionVal}/>} />
        <Route
          path="/review"
          element={<ViewResult title="Review" navigate={navigate} name={name} radioVal={radioVal} checkboxVal={checkboxVal} selectionVal={selectionVal} />} />
      </Routes> */}
    </div>
  );
}

export default App;
