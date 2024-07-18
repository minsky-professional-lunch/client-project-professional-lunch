import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  const [role, setRole] = useState(false);
  const errors = useSelector((store) => store.errors);
  const history = useHistory();
  const dispatch = useDispatch();

  // end registerUser

  const nextPage = () => {
    // history.push("/registration/2");
    event.preventDefault();
    // console.log(role);

    // dispatch({
    //   type: "ADD_FIRST_PAGE_INFO",

    //   payload: {
    //     username: username,
    //     password: password,
    //     isMentor: role,

    //     // email: email,
    //   },
    // });
    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        isMentor: Boolean(role)
      },
    });
  };

  return (
    <form className="formPanel" onSubmit={nextPage}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      {/* <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div> */}
      {/* <div>
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>
      <div>
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div> */}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      {/* <div>
        Email
        <input onChange={(event) => setEmail(event.target.value)}></input>
      </div> */}
      <div>
        <div>
          Mentor
          <input
            id="Mentor"
            type="radio"
            value={true}
            name="role"
            onChange={(event) => setRole(event.target.value)}
          />
        </div>
        <div>
          Mentee
          <input
            id="Mentee"
            type="radio"
            value={false}
            name="role"
            onChange={(event) => setRole(event.target.value)}
          />
        </div>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Next" />
      </div>
    </form>
  );
}

export default RegisterForm;
