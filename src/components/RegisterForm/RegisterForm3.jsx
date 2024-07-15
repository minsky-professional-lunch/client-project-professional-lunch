import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
export default function RegisterForm3() {
  const [linkedin, setLinkedin] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [availability, setAvailability] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const nextPage = () => {
    history.push("/registration/4");
    event.preventDefault();
    dispatch({
      type: "ADD_THIRD_PAGE_INFO",
      payload: {
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
          <button type="submit">Next</button>
        </form>
      </>
    </>
  );
}
