import React from "react";
import IntlMessages from "../../components/utility/intlMessages";
import { ContactCardWrapper } from "../../components/contacts/contactCard.style";
import GuestSpecification from "./guestSpecification";

const GuestInfo = ({ handleUpdate, guestData }) => {
  //list of the we'll want to see
  const wanted = [
    "property_name",
    "check_in_date",
    "check_out_date",
    "arrival_time",
  ];

  //convert the guestData from object to array
  const parsedData = Object.keys(guestData).map((key) => {
    const value = guestData[key];
    return { key, value };
  });

  return (
    <>
      <ContactCardWrapper className="isoContactCard">
        <div className="isoContactCardHead">
          <div className="isoPersonImage">
            <img alt="#" src={guestData.profile_picture} />
          </div>
          <h1 className="isoPersonName">Hi, {guestData.guest_name}!</h1>
        </div>
        <div className="isoContactInfoWrapper">
          <p>
            <IntlMessages id="guestdetails.introduction" />
          </p>

          {parsedData.map((attr, index) => {
              //if the attribute's key isn't in the wanted list return nothing
            if (wanted.includes(attr.key)) {
              return (
                <GuestSpecification
                  key={attr.key}
                  attr={attr}
                  index={index}
                  handleUpdate={handleUpdate}
                />
              );
            }
            return <div key={attr.key} />;
          })}
        </div>
      </ContactCardWrapper>
    </>
  );
};

export default GuestInfo;
