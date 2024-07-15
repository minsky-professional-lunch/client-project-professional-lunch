import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useState } from "react";
export default function RegisterForm2() {
  const [role, setRole] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const nextPage = () => {
    history.push("/registration/3");
    event.preventDefault();
    dispatch({
      type: "ADD_SECOND_PAGE_INFO",
      payload: {
        isMentor: role,
      },
    });
  };

  return (
    <>
      <h2>Register2</h2>

      <form onSubmit={nextPage} className="formPanel">
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
        <button type="submit">Next</button>
      </form>
    </>
  );
}
