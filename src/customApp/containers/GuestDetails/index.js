import React, { Component, useEffect } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper.js";
import LayoutContent from "../../../components/utility/layoutContent";
import   {InputSearch}  from '../../../components/uielements/input';
import { ContactCardWrapper } from '../../../components/contacts/contactCard.style';
import actions from '../../redux/guestDetails/actions';
import { TimePicker } from 'antd';
import PageHeader from '../../../components/utility/pageHeader'
import LayoutWrapper from '../../../components/utility/layoutWrapper.js'
import Form from '../../../components/uielements/form'
import Input2 from '../../../components/uielements/input'
import IntlMessages from '../../../components/utility/intlMessages';
import { connect } from "react-redux";

const { getGuest, getAllGuest, updateGuest, setStatus} = actions;
const FormItem = Form.Item;

class GuestPortal extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      input:""
    }
  }

  async handleChange(event) {
    event.preventDefault();
    await this.setState({
      input: event.target.value.toUpperCase().replace(/\s/g, ''),
    })
    if(!/^[A-Z0-9]+$/i.test(this.state.input)) {
      console.log("shshshshhsh", this.state.input)
      this.props.setStatus("error")
    }else{
      this.props.setStatus(undefined)
    }
  }

  handleSubmit (event) {
    event.preventDefault();
    const { input } = this.state

    if(!/^[A-Z0-9]+$/i.test(input)) {
      this.props.setStatus("error")
      return
    }

    this.props.getGuest(input)

  }


  render() {
    const { input } = this.state
    const { getGuest, guestData, isError } = this.props
    console.log(guestData)
    // console.log(input)

    const parsedData = Object.keys(guestData).map(key => {
      const value = guestData[key];
      return { key, value };
    })

    // console.log(parsedData)

    const title = ["Booking code","Name", "Property name", "Check in date", "Check out date", "Arrival time", "Profile"]

    return (
      <LayoutWrapper>
        <PageHeader >
          Booking Details
        </PageHeader>
      <LayoutContentWrapper style={{ minHeight: "80vh", width:"100%", marginTop:"-40px" }}>
        <LayoutContent >
          <h2>Your booking code</h2>
          <Form onSubmit={this.handleSubmit}>
          <FormItem
          hasFeedback
          validateStatus={isError}
          help={isError==="error"? <IntlMessages id="forms.formsWithValidation.failHelp" /> : isError==="warning"? "Booking code doen't exist" : "" }
          >
          {/* <input value={this.state.input} onChange={this.handleChange}></input> */}
          <Input2 style={{maxWidth:"150px"}} placeholder="KJSH87HGDK" value={this.state.input} onChange={this.handleChange}></Input2>
          </FormItem>
          </Form>

          {guestData.booking_code?
          <>
           <ContactCardWrapper className="isoContactCard">
            <div className="isoContactCardHead">
            <div className="isoPersonImage">
            <img alt="#" src={guestData.profile_picture} /> 
            </div>
            <h1 className="isoPersonName">Hi, {guestData.guest_name}!</h1>
            </div>
            <div className="isoContactInfoWrapper">
              <p>Thank you for booking with Bukit Vista. Here are the details of your current booking:</p>
           {parsedData.map((attr, index) =>{
             if(index>=2 && index<=5){
              return(
                <div className="isoContactCardInfos" key={attr.key}>
                  <p className="isoInfoLabel" style={{ minWidth: "110px" }}>{`${title[index]}`}</p>
                  <p className="isoInfoDetails">{`${attr.value}`}{attr.key==="arrival_time"? <TimePicker format={'HH:mm'} />:"" }</p>
                </div>
              )
             }
             
           })}
           
           </div>
           </ContactCardWrapper>
           </>
           : <div>nothing here, try HIJ12345</div>}

        </LayoutContent>
      </LayoutContentWrapper>
      </LayoutWrapper>
    );
  }
}
function mapStateToProps(state){
  return {isError: state.guestDetails.isError, guestData:state.guestDetails.guestData}
}

export default connect(
  mapStateToProps,
  { setStatus, getGuest }
)(GuestPortal)




// import { useEffect, useState } from "react";

// export default function test() {
//   const [data, setData] = useState([])

//   const handleSubmit = () => {
//     fetch('https://bv-online-assessment.herokuapp.com/api/bookings')
//     .then(res => console.log(res.json()))
//     .then(resJson => setData(resJson))
//   };

//   useEffect(() => {
//     console.log(data)
//   }, )

//   return (
//           <LayoutContentWrapper style={{ height: "100vh" }}>
//             <LayoutContent>
//               <h1>Your booking code</h1>
//               <form onSubmit={handleSubmit}>
//               <input></input>
//               </form>
//             </LayoutContent>
//           </LayoutContentWrapper>
//         );
// }