import { useEffect, useState } from "react";
import {BASE_URL} from '../constraints/index.js';
import styled from 'styled-components/macro';

const StyledButton = styled.button`
font-size: 1rem;
border: 1px solid;
border-radius: 2px;
background-color: limegreen;
text-align: center;
`

function NewRegister({ customerId, onAddActivity }) {
  const [activityId, setActivityId] = useState("");
  const [activities, setActivities] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch(BASE_URL + "/activities")
      .then((r) => r.json())
      .then(setActivities);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      activity_id: Number(activityId),
      customer_id: customerId
    };
    fetch(BASE_URL + "/registers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((activity) => {
          setActivityId("");
          setErrors([]);
          onAddActivity(activity);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Activity</h2>
      <div>
        <label htmlFor="activity">Activity: </label>
        <select
          id="activity"
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
        >
          <option value="">Select activity...</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.species}
            </option>
          ))}
        </select>
        <span>  </span>
        <StyledButton type="submit">Submit</StyledButton>
      </div>

      {errors.map((err) => (
        <p key={err} style={{ color: "red" }}>
          {err}
        </p>
      ))}
      
    </form>
  );
}

export default NewRegister;