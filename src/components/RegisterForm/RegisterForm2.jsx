import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";

export default function RegisterForm2() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(0);
  const [school, setSchool] = useState(0);
  const currentUser = useSelector((store) => store.user);
  const schools = useSelector((store) => store.schoolsReducer);
  const genders = useSelector((store) => store.gendersReducer);
  console.log("genders", genders);
  console.log("schools", schools);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleAutoFill = () => {
    setFirstName('John');
    setLastName('Thompson');
    setEmail('mentee2024@gmail.com');
  };


  useEffect(() => {
    dispatch({
      type: "FETCH_SCHOOLS",
    });
    dispatch({
      type: "FETCH_GENDERS",
    });
    window.scrollTo(0, 0);
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
    <div className="container">
      <h2 onClick={handleAutoFill}>Create Profile (Page 1 of 3)</h2>
      <form onSubmit={nextPage} className="formPanel">
        <Box
          sx={{
            py: 2,
            display: "grid",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              label="First Name"
              placeholder="First Name"
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              label="Last Name"
              placeholder="Last Name"
              value={lastName}
              required
              onChange={(event) => setLastName(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              label="Email"
              placeholder="Email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
            <FormHelperText>
              Mentees: Please use a school email address.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select
              placeholder="Select a gender"
              onChange={(event, value) => setGender(value)}
              required
            >
              {genders.map((gender) => (
                <Option key={gender.id} value={gender.id}>
                  {gender.gender}
                </Option>
              ))}
            </Select>
          </FormControl>
          {currentUser.isMentor === true ? (
            ""
          ) : (
            <FormControl>
              <FormLabel>School</FormLabel>
              <Select
                placeholder="Select your school"
                onChange={(event, value) => setSchool(value)}
                required
              >
                {schools.map((school) => (
                  <Option key={school.id} value={school.id}>
                    {school.school}
                  </Option>
                ))}
              </Select>
            </FormControl>
          )}
          <ButtonGroup spacing="0.5rem" color="primary" variant="solid">
            <Button
              color="neutral"
              onClick={() => history.push("/registration")}
            >
              Back
            </Button>
            <Button color="neutral" className="btn" type="submit" name="submit">
              Next
            </Button>
          </ButtonGroup>
        </Box>
      </form>
    </div>
  );
}
