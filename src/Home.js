import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewCustomer from "./NewCustomer";
import styled from 'styled-components/macro';
import { BASE_URL } from '../constraints/index.js';

const StyledHeader = styled.h2`
font-size: 2rem;
border: 1px solid;
border-radius: 5px;
background-image: linear-gradient(to left, rgba(255,0,0,0), rgba(255,0,0,1));
text-align: center;
`

const ReverseStyledHeader = styled.h2`
font-size: 2rem;
border: 1px solid;
border-radius: 5px;
background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
text-align: center;
`

const StyledButton = styled.button`
font-size: 1rem;
border: 1px solid;
border-radius: 2px;
background-color: red;
text-align: center;
`

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
      <StyledHeader>Customers</StyledHeader>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <span>{customer.name}  </span>
            <Link to={`/customers/${customer.id}`}>Visit Customer</Link>
          </li>
        ))}
      </ul>
      <ReverseStyledHeader>Activities</ReverseStyledHeader>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <span>{activity.species}  </span>
            <StyledButton onClick={() => handleDeleteActivity(activity.id)}>
              Delete
            </StyledButton>
          </li>
        ))}
      </ul>
      <hr />
      <NewCustomer onAddCustomer={handleAddCustomer} />
    </div>
  );
}

export default Home;