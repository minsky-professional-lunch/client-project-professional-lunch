import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";

export default function RegisterForm4() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [availability, setAvailability] = useState([{ day: "", time: "" }]);
  const days = useSelector((store) => store.dayReducer);
  const times = useSelector((store) => store.timeReducer);
  const regInfo = useSelector((store) => store.registrationReducer.registrationReducer);

  useEffect(() => {
    dispatch({
      type: "FETCH_DAYS",
    });
  }, [dispatch]);

  const handleDayChange = (index, event) => {
    const newAvailability = [...availability];
    newAvailability[index].day = event.target.value;
    setAvailability(newAvailability);
  };

  const handleTimeChange = (index, event) => {
    const newAvailability = [...availability];
    newAvailability[index].time = event.target.value;
    setAvailability(newAvailability);
  };

  const handleAdd = () => {
    setAvailability([...availability, { day: "", time: "" }]);
  };

  const nextPage = (event) => {
    event.preventDefault();
    if (availability.every((a) => a.day && a.time)) {
      dispatch({
        type: "ADD_FOURTH_PAGE_INFO",
        payload: {
          availability: availability,
        },
      });
      history.push("/");
    } else {
      alert("Please select both a day and a time for all availabilities.");
    }
  };

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: regInfo.username,
        password: regInfo.password,
      },
    });
  };

  return (
    <>
      <h2>Register4</h2>
      {availability.map((avail, index) => (
        <form className="formPanel" key={index}>
          <select onChange={(e) => handleDayChange(index, e)} value={avail.day}>
            <option value="" disabled>
              Select a day
            </option>
            {days.map((day) => (
              <option value={day.id} key={day.id}>
                {day.day}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => handleTimeChange(index, e)}
            value={avail.time}
          >
            <option value="" disabled>
              Select a time
            </option>
            {times.map((time) => (
              <option key={time.id} value={time.id}>
                {time.time}
              </option>
            ))}
          </select>
          <button onClick={handleAdd}>+</button>
        </form>
      ))}

      <button onClick={() => registerUser(event)}>Bye</button>
    </>
  );
}
