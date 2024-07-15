import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
export default function RegisterForm3() {
  const [gender, setGender] = useState("");
  const [school, setSchool] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const currentUser = useSelector(
    (store) => store.registrationReducer.registrationReducer
  );
  const schools = useSelector(
    (store) => store.registrationReducer.schoolsReducer
  );
  const genders = useSelector(
    (store) => store.registrationReducer.genderReducer
  );

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "FETCH_SCHOOLS",
    });
  }, []);
  const nextPage = () => {
    history.push("/registration/4");
    event.preventDefault();
    dispatch({
      type: "ADD_THIRD_PAGE_INFO",
      payload: {
        gender: gender,
        school: school,
        linkedin: linkedin,
      },
    });
  };
  return (
    <>
      <h2>Register3</h2>
      <>
        <form onSubmit={nextPage} className="formPanel">
          <div>
            Gender
            <select onChange={(event) => setGender(event.target.value)}>
              {genders.map((gender) => (
                <option value={gender.gender}>{gender.gender}</option>
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
                  <option value={school.school}>{school.school}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            LinkedIn
            <input
              type="text"
              value={linkedin}
              onChange={(event) => setLinkedin(event.target.value)}
            />
          </div>
          <button type="submit">Next</button>
        </form>
      </>
    </>
  );
}
