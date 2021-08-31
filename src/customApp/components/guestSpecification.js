import React, { useState } from "react";
import IntlMessages from "../../components/utility/intlMessages";
import { TimePicker, Button } from "antd";

const GuestSpecification = ({ attr, index, handleUpdate }) => {
  const [time, setTime] = useState(null);
  const [timeInput, setTimeInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const title = {
    booking_code: "Booking code",
    guest_name: "Name",
    property_name: "Property name",
    check_in_date: "Check in date",
    check_out_date: "Check out date",
    arrival_time: "Arrival time",
    profile_picture:"Profile"
  }

  async function handleOpenChange() {
    await setIsOpen(!isOpen);
    if (isOpen && timeInput !== "") {
      handleUpdate(timeInput);
    }
  }

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
