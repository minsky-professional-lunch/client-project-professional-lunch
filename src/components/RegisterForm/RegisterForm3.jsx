import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
export default function RegisterForm3() {
  const [gender, setGender] = useState("");
  const [school, setSchool] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const currentUser = useSelector((store) => store.registrationReducer);

  const history = useHistory();
  const dispatch = useDispatch();
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
              <option value={"----"}>----</option>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
              <option value={"Non-Binary"}>Non-Binary</option>
              <option value={"Prefer Not To Say"}>Prefer Not To Say</option>
            </select>
          </div>
          {currentUser.isMentor === "true" ? (
            ""
          ) : (
            <div>
              School
              <select onChange={(event) => setSchool(event.target.value)}>
                <option>----</option>
                <option value="1">Fargo Davies</option>
                <option value="2">Fargo North</option>
                <option value="3">Fargo Shanley</option>
                <option value="4">Fargo South</option>
                <option value="5">Horace High</option>
                <option value="6">Moorhead High</option>
                <option value="7">Oak Grove</option>
                <option value="8">Park Christian</option>
                <option value="9">West Fargo High</option>
                <option value="10">West Fargo Sheyenne</option>
                <option value="11">Concordia</option>
                <option value="12">MSCTC</option>
                <option value="13">MSUM</option>
                <option value="14">NDSU</option>
                <option value="15">Rasmussen</option>
                <option value="16">Other</option>
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
