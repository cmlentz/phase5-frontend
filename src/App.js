import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Customer from "./components/Customer";
import Home from "./components/Home";
import GlobalStyles from "./components/GlobalStyles"
import styled from 'styled-components/macro';

const StyledHeader = styled.h2`
font-size: 4rem;
background-image: linear-gradient(180deg, green, lightblue);
text-align: center;
&:hover {cursor: pointer};
`

function App() {
  return (
    <>
    <GlobalStyles />
    <Router>
    <div className="App">
      <StyledHeader>
        <Link to="/" style={{ textDecoration: 'none' }}>Let's <i><sub>Get</sub></i> Out</Link>
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