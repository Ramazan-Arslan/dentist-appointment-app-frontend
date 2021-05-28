
import React, { useState, useEffect } from 'react';
import "./create-appointment.css";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {  MuiPickersUtilsProvider,  KeyboardDatePicker} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import helpers from './create-appointment-helper';
import getTreatmentId from '../../helperFunctions/getTreatmentId';
import getDentistId from '../../helperFunctions/getDentistId';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function CreateAppointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [dentist, setDentist] = useState("");  
  const [typeOfTreatment, setTypeOfTreatment] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleNameChange = (name) => {
    setName(name);
  };

  const handleAgeChange = (age) => {
    setAge(age);
  };

  const handleDescriptionChange = (description) => {
    setDescription(description);
  };

  const handlePhoneNumberChange = (number) => {
    setPhoneNumber(number);
  };

  const handleTypeOfTreatmentChange = (type) => {
    setTypeOfTreatment(type);
  };

  const handleDentistChange = (dentist) => {
    setDentist(dentist);
  };


  function onClickSetAppointment()
  {
    var treatmentId = getTreatmentId.getId(typeOfTreatment);
    var dentistId = getDentistId.getId(dentist);
    var isInputOK = Boolean(selectedDate.getTime()) && Boolean(name) && Boolean(age) && Boolean(gender) 
    && Boolean(description) && (treatmentId != -1) && Boolean(phoneNumber) && (dentistId != -1);

    if (isInputOK)
    {
      var dateLong = selectedDate.getTime();
      var json = 
      {
        selectedDate : dateLong,
        patient_name : name,
        patient_gender : gender,
        hour : "12:00-13:00",
        doctor : dentistId,
        patient_phone : phoneNumber,
        patient_age : age,
        type : treatmentId,
        description : description
      }

      helpers.createAppointment(json);
    }
    else
    {
      alert("There exists empty inputs !");
    }
  }


  return (
    <div className="create-appointment">
      <div className="create-appointment-left">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={(date) => {handleDateChange(date)}}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <div className="avaible-time">
          <p className="form-titles">Available Time</p>
          <Button variant="outlined" color="primary">09.00-10.00 </Button>
          <Button variant="outlined" color="primary">10.00-11.00</Button>
          <Button variant="outlined" color="primary">11.00-12.00</Button>
          <Button variant="contained" color="secondary">13.00-14.00</Button>
          <Button variant="contained" color="secondary">14.00-15.00</Button>
          <Button variant="outlined" color="primary">15.00-16.00</Button>
          <Button variant="outlined" color="primary">16.00-17.00</Button>
        </div>

        <p className="form-titles form-titles-header">Patient Details</p>
        <p className="form-titles">Full Name</p>
        <TextField
          defaultValue={name}
          margin="normal"
          variant="outlined"
          onChange={(event) => { handleNameChange(event.target.value) }} />

        <p className="form-titles">Age</p>
        <TextField
          defaultValue={age}
          type="number"
          margin="normal"
          variant="outlined"
          onChange={(event) => { handleAgeChange(event.target.value) }} />
      </div>

      <div className="create-appointment-right">
        <FormControl component="fieldset">

          <p className="form-titles">Gender</p>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={gender}
            onChange={handleGenderChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>

        <p className="form-titles">Type of Treatment</p>

        <Select
        className="type-of-treatment"
          value={typeOfTreatment}
          margin="normal"
          variant="outlined"
          onChange={(event) => { handleTypeOfTreatmentChange(event.target.value) }}
        >
          <MenuItem value={"Kanal Tedavisi"}>Kanal tedavisi</MenuItem>
          <MenuItem value={"Diş beyazlatma"}>Diş beyazlatma</MenuItem>
          <MenuItem value={"Diş bakımı"}>Diş bakımı</MenuItem>
        </Select>

        <p className="form-titles">Dentist</p>
        <Select
        className="type-of-treatment"
          value={dentist}
          margin="normal"
          variant="outlined"
          onChange={(event) => { handleDentistChange(event.target.value) }}
        >
          <MenuItem value={"Doktor1"}>Doktor1</MenuItem>
          <MenuItem value={"Doktor2"}>Doktor2</MenuItem>
          <MenuItem value={"Doktor3"}>Doktor3</MenuItem>
        </Select>

        <p className="form-titles">Phone Number</p>
        <TextField
          defaultValue={phoneNumber}
          type="number"
          margin="normal"
          variant="outlined"
          onChange={(event) => { handlePhoneNumberChange(event.target.value) }} />

        <p className="form-titles">Description</p>
        <TextField
          defaultValue={description}
          multiline rows="3"
          margin="normal"
          variant="filled"
          onChange={(event) => { handleDescriptionChange(event.target.value) }} />

        <Button
          variant="contained"
          color="primary"
          onClick={() => {onClickSetAppointment()}}
          className="setButton">
          Set Appointment
        </Button>
      </div>
    </div>
  );
}
