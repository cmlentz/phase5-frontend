import { useState } from "react";
import {BASE_URL} from '../constraints/index.js';
import styled from 'styled-components/macro';

const StyledButton = styled.button`
font-size: 1rem;
border: 1px solid;
border-radius: 2px;
background-color: limegreen;
text-align: center;
margin-top: 10px;
&:hover {cursor: pointer};
`

const StyledForm = styled.form`
background-color: lightblue;
padding-right: "50px";
display: table;
`

function NewCustomer({ onAddCustomer }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setSt] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      name,
      age,
      email,
      city,
      state
    };
    fetch(BASE_URL + "/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((customer) => {
          setName("");
          setAge("");
          setEmail("");
          setCity("");
          setSt("");
          setErrors([]);
          onAddCustomer(customer);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
    <StyledForm onSubmit={handleSubmit}>
      <ul>
        <li><h2>New User?</h2></li>
        <li><h5>(sign up here)</h5></li>
        <li>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="age"> Age: </label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="email"> Email: </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="city"> City: </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="state"> State: </label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setSt(e.target.value)}
          />
        </li>
        {errors.map((err) => (
          <p key={err} style={{ color: "red" }}>
            {err}
          </p>
        ))}
        <li>
          <StyledButton type="submit">Submit</StyledButton>
        </li>
      </ul><br/>
    </StyledForm>
    </div>
  );
}

export default NewCustomer;