import { useDispatch, useSelector } from "react-redux";
import { useScript } from "../../hooks/useScript";
import React, { useEffect, useState } from "react";
import { Avatar, Stack, Typography } from "@mui/joy";
import Button from "@mui/joy/Button";
import Badge from "@mui/joy/Badge";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Textarea from "@mui/joy/Textarea";
import { TextField, Autocomplete } from "@mui/material";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.profileDetails);
  const schools = useSelector((store) => store.schoolsReducer);
  const genders = useSelector((store) => store.gendersReducer);
  const interestsStore = useSelector((store) => store.interestsReducer);
  const profileAvailability = useSelector(
    (store) => store.profileDetails.details.availability
  );
  const days = useSelector((store) => store.dayReducer);
  const times = useSelector((store) => store.timeReducer);
  const [interests, setInterests] = useState(profile?.details?.interests);

  const [editProfile, setEditProfile] = useState({ profile: {}, details: {} });
  console.log("Profile", profile, editProfile);

  useEffect(() => {
    dispatch({ type: "FETCH_PROFILE_DETAILS" });
    dispatch({ type: "FETCH_SCHOOLS" });
    dispatch({ type: "FETCH_GENDERS" });
    dispatch({ type: "FETCH_INTERESTS" });
    dispatch({ type: "FETCH_DAYS" });
    dispatch({ type: "FETCH_TIMES" });
  }, []);

  useEffect(() => {
    setEditProfile(profile);
  }, [profile]); // when profile in redux has finished loading, load into local state so we can edit it

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("clicked");
    console.log("editProfile", editProfile);
    dispatch({ type: "EDIT_PROFILE", payload: editProfile });
  };

  const handleInterestsChange = (event, newValue) => {
    console.log("The New Value", newValue);
    console.log("interests", interests);
    if (newValue.length <= 5) {
      setInterests(newValue);
      setEditProfile({
        ...editProfile,
        details: {
          ...editProfile.details,
          interests: newValue,
        },
      });
    }
  };
  const handleDayChange = (index, event) => {
    console.log("Day Change event", event);
    console.log("Day Change index", index);
    console.log("target.value", event.target.value);

    const updatedAvailability = [...editProfile.details.availability];
    updatedAvailability[index] = {
      ...updatedAvailability[index],
      day_id: Number(event.target.value),
    };

    setEditProfile({
      ...editProfile,
      details: {
        ...editProfile.details,
        availability: updatedAvailability,
      },
    });
  };

  const handleTimeChange = (index, event) => {
    console.log("Time Change event", event);
    console.log("Time Change index", index);
    console.log("target.value", event.target.value);

    const updatedAvailability = [...editProfile.details.availability];
    updatedAvailability[index] = {
      ...updatedAvailability[index],
      time_id: Number(event.target.value),
    };

    setEditProfile({
      ...editProfile,
      details: {
        ...editProfile.details,
        availability: updatedAvailability,
      },
    });
  };

  const openWidget = () => {
    !!window.cloudinary &&
      window.cloudinary
        .createUploadWidget(
          {
            sources: ["local", "url", "camera"],
            cloudName: "dz2bil44j",
            uploadPreset: "hl5wdxak",
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              setEditProfile({
                ...editProfile,
                profile: {
                  ...editProfile.profile,
                  avatar: result.info.secure_url,
                },
              });
            }
          }
        )
        .open();
  };

  // note: if user does not have a profile yet, will this prevent them from editing their empty profile?
  if (!profile.profile || !editProfile.profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={3}
        >
          {/* <Typography>Edit Profile Picture</Typography> */}
          <Badge
            onClick={openWidget}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="outlined"
            badgeContent={
              <CameraAltIcon
                sx={{
                  width: "35px",
                  height: "35px",
                  color: "#343A40",
                  cursor: "pointer",
                }}
              />
            }
            badgeInset="14%"
            sx={{ "--Badge-paddingX": "0px" }}
          >
            <Avatar
              variant="outlined"
              sx={{ width: 150, height: 150 }}
              src={editProfile?.profile.avatar}
            />
          </Badge>
          {useScript("https://widget.cloudinary.com/v2.0/global/all.js")}
        </Stack>
        <Stack direction="row" spacing={3}>
          <Typography>Bio</Typography>
          <Textarea
            placeholder="Bio"
            type="text"
            id="bio"
            value={editProfile?.profile?.bio}
            className="form-control"
            onChange={(event) =>
              setEditProfile({
                ...editProfile,
                profile: { ...editProfile.profile, bio: event.target.value },
              })
            }
          />
        </Stack>
        <Stack direction="row" spacing={3}>
          <Typography>Email</Typography>
          <Textarea
            placeholder="Email"
            type="text"
            id="email"
            className="form-control"
            value={editProfile?.profile?.email}
            onChange={(event) =>
              setEditProfile({
                ...editProfile,
                profile: { ...editProfile.profile, email: event.target.value },
              })
            }
          />
        </Stack>
        <Stack direction="row" spacing={3}>
          <Typography>LinkedIn</Typography>
          <Textarea
            placeholder="LinkedIn"
            className="form-control"
            type="text"
            id="linkedin"
            value={editProfile?.profile?.linkedin}
            onChange={(e) =>
              setEditProfile({
                ...editProfile,
                profile: {
                  ...editProfile.profile,
                  linkedin: e.target.value,
                },
              })
            }
          />
        </Stack>
        <Stack direction="row" spacing={3}>
          <Typography>Gender</Typography>
          <select
            value={editProfile?.profile.gender}
            onChange={(event) =>
              setEditProfile({
                ...editProfile,
                profile: {
                  ...editProfile.profile,
                  gender: Number(event.target.value),
                },
              })
            }
          >
            {genders.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.gender}
              </option>
            ))}
          </select>
        </Stack>
        <Stack direction="row" spacing={3}>
          <Typography>School</Typography>
          <select
            value={editProfile?.profile.school}
            onChange={(event) =>
              setEditProfile({
                ...editProfile,
                profile: { ...editProfile.profile, school: event.target.value },
              })
            }
          >
            {schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.school}
              </option>
            ))}
          </select>
        </Stack>
        <Typography>Interests</Typography>
        <Autocomplete
          multiple
          options={interestsStore}
          value={interests}
          getOptionLabel={(option) => option.interest}
          disableCloseOnSelect
          onChange={handleInterestsChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Add Up To 5 Interests"
              placeholder="Interests..."
            />
          )}
        />
        <div>
          <Typography>Availability</Typography>
          {/* <select>
            {days.map((day) => (
              <option>{day.day}</option>
            ))}
          </select>
          <select>
            {times.map((time) => (
              <option>{time.time}</option>
            ))}
          </select> */}
          {profileAvailability.map((availabilityItem, index) => (
            <div key={index}>
              <select
                value={availabilityItem.day_id}
                onChange={(event) => handleDayChange(index, event)}
              >
                {days.map((day) => (
                  <option key={day.id} value={day.id}>
                    {day.day}
                  </option>
                ))}
              </select>
              <select
                value={availabilityItem.time_id}
                onChange={(event) => handleTimeChange(index, event)}
              >
                {times.map((time) => (
                  <option key={time.id} value={time.id}>
                    {time.time}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <Button sx={{ bgcolor: "#1BAC5C" }} type="submit">
          Save Changes
        </Button>
      </form>
      {/* This just sets up the window.cloudinary widget */}
      {useScript("https://widget.cloudinary.com/v2.0/global/all.js")}
      <br />
    </div>
  );
}
