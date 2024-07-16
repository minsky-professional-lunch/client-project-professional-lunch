import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function RegisterForm2() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [school, setSchool] = useState("");
  const currentUser = useSelector(
    (store) => store.registrationReducer
  );
  const schools = useSelector(
    (store) => store.schoolsReducer
  );
  const genders = useSelector(
    (store) => store.gendersReducer
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_SCHOOLS",
    });
  }, []);

  const nextPage = () => {
    history.push("/registration/3");
    event.preventDefault();
    dispatch({
      type: "ADD_SECOND_PAGE_INFO",
      payload: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        school: school,
      },
    });
  };

  return (
    <>
      <h2>Register2</h2>

      <form onSubmit={nextPage} className="formPanel">
        {/* <div>
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
        </div> */}
        <div>
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
        </div>
        <div>
          Email
          <input onChange={(event) => setEmail(event.target.value)}></input>
        </div>
        <div>
          Gender
          <select onChange={(event) => setGender(event.target.value)}>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.gender}>
                {gender.gender}
              </option>
            ))}
          </select>
        </div>
        {currentUser.isMentor === "true" ? (
          ""
        ) : (
          <div>
            School
            <select onChange={(event) => setSchool(event.target.value)}>
              {schools.map((school) => (
                <option key={school.id} value={school.school}>
                  {school.school}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit">Next</button>
      </form>
    </>
  );
}
