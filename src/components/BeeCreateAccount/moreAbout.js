import React, { Fragment, useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Link from '@mui/material/Link';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-phone-number-input/style.css';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FFC629", // Replace with your desired border color
  },
}));

const MoreAbout = forwardRef((props, ref) => {
  // const {
  //     showNotification,
  //     setShowNotification,
  //     message,
  //     setMessage,
  //     severity,
  //     setSeverity,
  //     done,
  //     setDone
  // } = props;
  const classes = props.classes;
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);
  // State variables to track user interaction with each input field
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [genderTouched, setGenderTouched] = useState(false);
  const [birthdayTouched, setBirthdayTouched] = useState(false);
  const [value, setValue] = React.useState(null);
  const today = new Date(); // Get the current date

  useEffect(() => {
    // Show errors only if the fields have been touched and they are empty
    if (firstNameTouched && props.firstName.trim() === "") {
      setFirstNameError(true);
    }

    if (lastNameTouched && props.lastName.trim() === "") {
      setLastNameError(true);
    }

    if (genderTouched && props.gender === "") {
      setGenderError(true);
    }

    /*if (birthdayTouched && props.formattedBirthday !== "" && props.formattedBirthday !== null) {
      setBirthdayError(true);
    }*/

    handleNextClick();
  }, [props.firstName, props.lastName, props.gender, firstNameTouched, lastNameTouched, genderTouched]);

  /*useEffect(() => {
    const val = value == null ? 'null' : value.format();
    const formattedDate = dayjs(val).format('DD/MM/YYYY');
    if(formattedDate) {
      props.setBirthday(formattedDate);
      props.setFormattedBirthday(formattedDate);
    }
  }, [value]);*/

  const formattedBirthdayChange = (date) =>
    date instanceof Date
      ? date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      : null;


  const handleFirstnameChange = (event) => {
    props.setFirstName(event.target.value);
    setFirstNameTouched(true); // Set the field as touched when the user interacts with it
    setFirstNameError(event.target.value === "");
  };

  const handleLastnameChange = (event) => {
    props.setLastName(event.target.value);
    setLastNameTouched(true); // Set the field as touched when the user interacts with it
    setLastNameError(event.target.value === "");
  };

  const handleGenderChange = (event) => {
    props.setGender(event.target.value);
    setGenderTouched(true); // Set the field as touched when the user interacts with it
    setGenderError(event.target.value === "");
  };

  const handleBirthdayChange = (date) => {
    setBirthdayTouched(true);
    console.log("-->>>>> ", props.formattedBirthday);
    if (date !== "" && date !== null) {
      props.setBirthday(date);
      props.setFormattedBirthday(formattedBirthdayChange(date));
    } else {
      props.setBirthday('');
      props.setFormattedBirthday('');
    }
  };

  const validateForm = () => {
    const isFirstNameValid = props.firstName.trim() !== "";
    const isLastNameValid = props.lastName.trim() !== "";
    const isGenderValid = props.gender !== "";
    //onst isBirthdayValid = props.formattedBirthday !== "" && props.formattedBirthday !== null;
    setFirstNameError(!isFirstNameValid && firstNameTouched);
    setLastNameError(!isLastNameValid && lastNameTouched);
    setGenderError(!isGenderValid && genderTouched);
    //setBirthdayError(!isBirthdayValid && birthdayTouched);
    return isFirstNameValid && isLastNameValid && isGenderValid;
  };

  const handleNextClick = () => {
    const isFormValid = validateForm();
    console.log("IsFormValid = ", isFormValid);
    if (isFormValid) {
      // Handle form submission or next step navigation here
      props.setLoading(false);
      props.setDone(true);
      props.setIsNext(true);
    } else {
      props.setLoading(false);
      props.setDone(false);
      props.setIsNext(false);
    }
  };

  const moreAboutContent = (
    <Box className={classes.parentBox}>
      <Box>
        <Typography className={classes.title} variant="h4">
          What should we<br />call you?
        </Typography>
        <FormControl required sx={{ width: '100%' }}>
          <Box className={classes.inputBox}>
            <StyledTextField
              required
              fullWidth
              id="firstname-field"
              label=""
              placeholder="First name"
              defaultValue=""
              value={props.firstName}
              onChange={handleFirstnameChange}
              error={firstNameError}
              helperText={firstNameError ? "First name is required" : ""}
            />
            <StyledTextField
              required
              fullWidth
              id="lastname-field"
              label=""
              placeholder="Last name"
              defaultValue=""
              value={props.lastName}
              onChange={handleLastnameChange}
              error={lastNameError}
              helperText={lastNameError ? "Last name is required" : ""}
            />
          </Box>
        </FormControl>
      </Box>
      <Box>
        <Typography className={classes.title} variant="h4">
          Tell us more<br />about you.
        </Typography>
        <FormControl required sx={{ width: '100%' }}>
          <Box className={classes.inputBox}>
            <Select
              className={classes.selectStyle}
              id="bee-gender-select"
              value={props.gender}
              displayEmpty
              label=""
              onChange={handleGenderChange}
              error={genderError}
              renderValue={(selected) => {
                if (selected === "") {
                  return (
                    <span className={classes.placeHolderStyle}>Gender</span>
                  );
                } else {
                  return selected;
                }
              }}
            >
              <MenuItem disabled value="">
                <span className={classes.placeHolderStyle}>Gender</span>
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                value={value}
                onChange={(newValue) => setValue(newValue)}
                format="MM/DD/YYYY"
              />
            </LocalizationProvider> */}
          </Box>
        </FormControl>
      </Box>
    </Box>
  );

  return (
    <div>{moreAboutContent}</div>
  );
});

export default MoreAbout;
