import React, { useState } from "react";
import IntlMessages from "../../components/utility/intlMessages";
import { TimePicker, Button } from "antd";

const GuestSpecification = ({ attr, index, handleUpdate }) => {
  const [time, setTime] = useState(null);
  const [timeInput, setTimeInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //functions to connect the title and the attibute's key
  const title = {
    booking_code: "Booking code",
    guest_name: "Name",
    property_name: "Property name",
    check_in_date: "Check in date",
    check_out_date: "Check out date",
    arrival_time: "Arrival time",
    profile_picture: "Profile",
  };

  // handle the opening & closing of the time picker
  async function handleOpenChange() {
    await setIsOpen(!isOpen);
    if (isOpen && timeInput !== "") {
      handleUpdate(timeInput);
    }
  }

  //handle the value for the time picker
  function handleTime(time, timeString) {
    setTime(time);
    setTimeInput(timeString);
  }

  return (
    <div className="isoContactCardInfos">
      <p className="isoInfoLabel" style={{ minWidth: "110px" }}>
        {title[attr.key]}
      </p>
      <p className="isoInfoDetails">
        {`${attr.value}`}
        {/* the arrival time detail will be different from the rest of the guest details, it will have a time picker if arrival time is not specified beside it */}
        {attr.key === "arrival_time" ? (
          attr.value === "" ? (
            <>
              <TimePicker
                value={time}
                onChange={handleTime}
                onOpenChange={handleOpenChange}
                open={isOpen}
                format={"HH:mm"}
                addon={() => (
                  <Button
                    size="small"
                    type="primary"
                    onClick={handleOpenChange}
                  >
                    Ok
                  </Button>
                )}
              />{" "}
              <IntlMessages id="forms.formsWithValidation.arrivalnotset" />
            </>
          ) : (
            <IntlMessages id="forms.formsWithValidation.arrivalset" />
          )
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default GuestSpecification;
