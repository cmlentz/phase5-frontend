import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Customer from "./components/Customer";
import Home from "./components/Home";
import GlobalStyles from "./components/GlobalStyles"
import styled from 'styled-components/macro';

const StyledHeader = styled.h2`
font-size: 3rem;
border: 1px solid;
border-radius: 5px;
background-image: linear-gradient(180deg, yellow, green);
text-align: center;
`

function App() {
  return (
    <>
    <GlobalStyles />
    <Router>
    <div className="App">
      <StyledHeader>
        <Link to="/">Let's Get Out</Link>
      </StyledHeader>
      <br />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/customers/:id">
          <Customer />
        </Route>
      </Switch>
    </div>
    </Router>
    </>
  );
}

export default App;