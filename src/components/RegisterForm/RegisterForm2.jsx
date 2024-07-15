import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
export default function RegisterForm2() {
  const history = useHistory();
  const dispatch = useDispatch();
  const nextPage = () => {
    history.push("/registration/3");
    event.preventDefault();

    console.log();
    dispatch({
      type: "ADD_SECOND_PAGE_INFO",
    });
  };

  return (
    <>
      <h2>Register2</h2>
      <button onClick={nextPage}>Next</button>
    </>
  );
}
