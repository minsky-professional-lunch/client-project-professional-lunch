import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
export default function RegisterForm3() {
  const [linkedin, setLinkedin] = useState("");

  const currentUser = useSelector(
    (store) => store.registrationReducer.registrationReducer
  );
  const schools = useSelector((store) => store.schoolsReducer);
  const genders = useSelector((store) => store.gendersReducer);

  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState([]);
  const [availability, setAvailability] = useState("");
  const interestsStore = useSelector((store) => store.interestsReducer);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_INTERESTS",
    });
  }, []);

  const nextPage = () => {
    history.push("/registration/4");
    event.preventDefault();
    dispatch({
      type: "ADD_THIRD_PAGE_INFO",
      payload: {
        linkedin: linkedin,
        interests: interests,
      },
    });
  };
  return (
    <>
      <h2>Register3</h2>
      <>
        <form onSubmit={nextPage} className="formPanel">
          <div>
            LinkedIn
            <input
              type="text"
              value={linkedin}
              onChange={(event) => setLinkedin(event.target.value)}
            />
          </div>
          <div>
            Add A Little About You
            <input
              type="text"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </div>
          <div>
            <Autocomplete
              multiple
              options={interestsStore}
              getOptionLabel={(option) => option.interest}
              disableCloseOnSelect
              onChange={(event, newValue) => setInterests(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Multiple Autocomplete"
                  placeholder="Multiple Autocomplete"
                />
              )}
            />
          </div>
          <button type="submit">Next</button>
        </form>
      </>
    </>
  );
}
