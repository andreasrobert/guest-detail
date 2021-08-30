import React, { useState } from "react";
import { connect } from "react-redux";
import IntlMessages from '../../components/utility/intlMessages';
import { TimePicker, Button } from 'antd';
import { ContactCardWrapper } from '../../components/contacts/contactCard.style';
import actions from '../redux/guestDetails/actions';

const { getGuest, updateGuest, setStatus} = actions;



const GuestInfo = ({handleUpdate}) => {
  const [time, setTime] = useState(null);
  const [timeInput, setTimeInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const title = ["Booking code","Name", "Property name", "Check in date", "Check out date", "Arrival time", "Profile"]
  const keys = ["property_name", "check_in_date", "check_out_date", "arrival_time"]
  const fake = {"booking_code":"HIJ12345","guest_name":"Violet Well","property_name":"Canggu Villa","check_in_date":"26 April 2021","check_out_date":"30 April 2021","arrival_time":"","profile_picture":"https://picsum.photos/200/300?random=1"}

  const parsedData = Object.keys(fake).map((key) => {
    const value = fake[key];
    return { key, value };
  });

  async function handleOpenChange() {
    await setIsOpen(!isOpen);
    if (isOpen && timeInput !== "") {
      handleUpdate(timeInput);
    }
  }
  
  function handleTime(time, timeString) {
    setTime(time)
    setTimeInput(timeString)
  }
  

  return( <>
    <ContactCardWrapper className="isoContactCard">
     <div className="isoContactCardHead">
     <div className="isoPersonImage">
     <img alt="#" src={fake.profile_picture} /> 
     </div>
     <h1 className="isoPersonName">Hi, {fake.guest_name}!</h1>
     </div>
     <div className="isoContactInfoWrapper">
       <p><IntlMessages id="guestdetails.introduction" /></p>
    {parsedData.map((attr, index) =>{
      if(keys.includes(attr.key)){
       return(
         <div className="isoContactCardInfos" key={attr.key}>
           <p className="isoInfoLabel" style={{ minWidth: "110px" }}>{`${title[index]}`}</p>
           <p className="isoInfoDetails">{`${attr.value}`}{attr.key==="arrival_time" && attr.value===""? <> <TimePicker value={time} onChange={handleTime} onOpenChange={handleOpenChange} open={isOpen} format={'HH:mm'} addon={() => (
             <Button size="small" type="primary" onClick={handleOpenChange}>
               Ok
             </Button> 
           )}/> <IntlMessages id="forms.formsWithValidation.arrivalset" />  </>:"" }</p>
         </div>
       )
      }
      return <div key={attr.key}></div>;
      
    })}
    
    </div>
    </ContactCardWrapper>
    </>);
};

export default GuestInfo;