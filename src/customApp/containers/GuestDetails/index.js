import React, { Component } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper.js";
import LayoutContent from "../../../components/utility/layoutContent";
// import   {InputSearch}  from '../../../components/uielements/input';
import { ContactCardWrapper } from '../../../components/contacts/contactCard.style';
import actions from '../../redux/guestDetails/actions';
import { TimePicker, Button } from 'antd';
import PageHeader from '../../../components/utility/pageHeader'
import LayoutWrapper from '../../../components/utility/layoutWrapper.js'
import Form from '../../../components/uielements/form'
import Input2 from '../../../components/uielements/input'
import IntlMessages from '../../../components/utility/intlMessages';
import { connect } from "react-redux";

const { getGuest, updateGuest, setStatus} = actions;
const FormItem = Form.Item;

class GuestPortal extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleOpenChange = this.handleOpenChange.bind(this);
    this.handleTime = this.handleTime.bind(this);

    this.state = {
      input:"",
      time: null,
      timeInput: "",
      isOpen: false
    }
  }

  async handleOpenChange(){
    const {isOpen, timeInput} = this.state
    await this.setState({isOpen: !isOpen})
    if(isOpen && timeInput!==""){
      this.handleUpdate();
    }

  }


  async handleChange(event) {
    event.preventDefault();
    await this.setState({
      input: event.target.value.toUpperCase().replace(/\s/g, ''),
    })
    if(!/^[A-Z0-9]+$/i.test(this.state.input)) {
      this.props.setStatus("error")
    }else{
      this.props.setStatus(undefined)
    }
  }
  
  handleTime(time,timeString){
    this.setState({
      time: time,
      timeInput: timeString
    })
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

  handleUpdate(){
    this.props.updateGuest({
      bookingCode: this.props.guestData.booking_code,
      updatedData: this.state.timeInput
    })
  }


  render() {
    const { input, time, isOpen } = this.state
    const { guestData, isError } = this.props
    // console.log(guestData)
    // console.log(timeInput)

    const parsedData = Object.keys(guestData).map(key => {
      const value = guestData[key];
      return { key, value };
    })

    // console.log(parsedData)

    const title = ["Booking code","Name", "Property name", "Check in date", "Check out date", "Arrival time", "Profile"]
    const keys = ["property_name", "check_in_date", "check_out_date", "arrival_time"]

    // const fake = {"booking_code":"HIJ12345","guest_name":"Violet Well","property_name":"Canggu Villa","check_in_date":"26 April 2021","check_out_date":"30 April 2021","arrival_time":"","profile_picture":"https://picsum.photos/200/300?random=1"}

    return (
      <LayoutWrapper>
        <PageHeader >
          <IntlMessages id="guestdetails.header" />
        </PageHeader>
      <LayoutContentWrapper style={{ minHeight: "80vh", width:"100%", marginTop:"-40px" }}>
        <LayoutContent >
          <h2><IntlMessages id="guestdetails.askbookingcode" /></h2>
          <Form onSubmit={this.handleSubmit}>
          <FormItem
          hasFeedback
          validateStatus={isError}
          help={isError==="error"? <IntlMessages id="forms.formsWithValidation.failHelp" /> : isError==="warning"? <IntlMessages id="forms.formsWithValidation.bookcodewarning"/> : "" }
          >
          {/* <input value={this.state.input} onChange={this.handleChange}></input> */}
          <Input2 style={{maxWidth:"150px"}} placeholder="KJSH87HGDK" value={input} onChange={this.handleChange}></Input2>
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
              <p><IntlMessages id="guestdetails.introduction" /></p>
           {parsedData.map((attr, index) =>{
             if(keys.includes(attr.key)){
              return(
                <div className="isoContactCardInfos" key={attr.key}>
                  <p className="isoInfoLabel" style={{ minWidth: "110px" }}>{`${title[index]}`}</p>
                  <p className="isoInfoDetails">{`${attr.value}`}{attr.key==="arrival_time"? <TimePicker value={time} onChange={this.handleTime} onOpenChange={this.handleOpenChange} open={isOpen} format={'HH:mm'} addon={() => (
                    <Button size="small" type="primary" onClick={this.handleOpenChange}>
                      Ok
                    </Button> 
                  )}/>:"" }</p>
                </div>
              )
             }
             return <div key={attr.key}></div>;
             
           })}
           
           </div>
           </ContactCardWrapper>
           </>
           : <div>nothing here, try HIJ12346</div>}

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
  { setStatus, getGuest, updateGuest }
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