import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewCustomer from "./NewCustomer";
import styled from 'styled-components/macro';
import {BASE_URL} from '../constraints/index.js';

const StyledHeader = styled.h2`
font-size: 2rem;
border: 1px solid;
border-radius: 5px;
background-image: linear-gradient(to left, rgba(100,54,143,0), rgba(100,54,143,1));
text-align: center;
`

const ReverseStyledHeader = styled.h2`
font-size: 2rem;
border: 1px solid;
border-radius: 5px;
background-image: linear-gradient(to right, rgba(100,54,143,0), rgba(100,54,143,1));
text-align: center;
`

const ActivityButton = styled.button`
font-size: 1rem;
border: 1px solid;
border-radius: 2px;
background-color: yellow;
text-align: center;
margin-right: 10px;
margin-bottom: 5px;
&:hover {background-color: red; cursor: pointer};
`

const StyledLink = styled(Link)`
  color: limegreen;
  font-weight: bold;
  margin-bottom: 5px;
  &:hover {color: forestgreen; cursor: pointer};
`;

function Home() {
  const [customers, setCustomers] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(BASE_URL + "/activities")
      .then((r) => r.json())
      .then(setActivities);
  }, []);

  useEffect(() => {
    fetch(BASE_URL + "/customers")
      .then((r) => r.json())
      .then(setCustomers);
  }, []);

  function handleAddCustomer(newCustomer) {
    setCustomers((customers) => [...customers, newCustomer]);
  }

  function handleDeleteActivity(id) {
    fetch(BASE_URL + `/activities/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setActivities((activities) =>
          activities.filter((activity) => activity.id !== id)
        );
      }
    });
  }

  return (
    <div>
      <StyledHeader>Explorers</StyledHeader>
      <center><h5>(Click name to view user profile)</h5></center>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <StyledLink to={`/customers/${customer.id}`}>{customer.name}</StyledLink>
          </li>
        ))}
      </ul>
      <ReverseStyledHeader>Things To Do</ReverseStyledHeader>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <ActivityButton onClick={() => handleDeleteActivity(activity.id)}>
              Delete
            </ActivityButton>
            <span>{activity.name}</span>
          </li>
        ))}
      </ul>
      <hr />
      <NewCustomer onAddCustomer={handleAddCustomer} />
    </div>
  );
}

export default Home;