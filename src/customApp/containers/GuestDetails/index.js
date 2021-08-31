import React, { Component } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper.js";
import LayoutContent from "../../../components/utility/layoutContent";
import actions from "../../redux/guestDetails/actions";
import PageHeader from "../../../components/utility/pageHeader";
import LayoutWrapper from "../../../components/utility/layoutWrapper.js";
import Form from "../../../components/uielements/form";
import Input2 from "../../../components/uielements/input";
import IntlMessages from "../../../components/utility/intlMessages";
import { connect } from "react-redux";
import GuestInfo from "../../components/guestInfo";

const { getGuest, updateGuest, setStatus } = actions;
const FormItem = Form.Item;

class GuestPortal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    
    this.state = {
      input: "",
      time: null,
      timeInput: "",
      isOpen: false,
    };
  }

  //handle the user 'booking code' input
  async handleChange(event) {
    event.preventDefault();
    await this.setState({
      input: event.target.value.toUpperCase().replace(/\s/g, ""),
    });
    if (!/^[A-Z0-9]+$/i.test(this.state.input) && this.state.input !== "") {
      this.props.setStatus("error");
    } else {
      this.props.setStatus(undefined);
    }
  }

  //handle the 'booking code' input submit
  handleSubmit(event) {
    event.preventDefault();
    const { input } = this.state;

    if (!/^[A-Z0-9]+$/i.test(input)) {
      this.props.setStatus("error");
      return;
    }
    this.props.getGuest(input);
  }

  //update arrival time data
  handleUpdate(time) {
    this.props.updateGuest({
      bookingCode: this.props.guestData.booking_code,
      updatedData: time,
    });
  }

  render() {
    const { input } = this.state;
    const { isError, guestData } = this.props; //global state

    return (
      <LayoutWrapper>

        <PageHeader>
          <IntlMessages id="guestdetails.header" />
        </PageHeader>

        <LayoutContentWrapper
          style={{ minHeight: "80vh", width: "100%", marginTop: "-40px" }}
        >
          <LayoutContent>
            <div style={{display:"flex", justifyContent:'center'}}>
            <h2 style={{margin:"3px 5px 0px 0px", }}>
              <IntlMessages id="guestdetails.askbookingcode" /> :
            </h2>

            <Form onSubmit={this.handleSubmit}>
              <FormItem
                hasFeedback
                validateStatus={isError}
                help={
                  isError === "error" ? (
                    <IntlMessages id="forms.formsWithValidation.failHelp" />
                  ) : isError === "warning" ? (
                    <IntlMessages id="forms.formsWithValidation.bookcodewarning" />
                  ) : (
                    ""
                  )
                }
              >
                <Input2
                  style={{ maxWidth: "150px" }}
                  placeholder="KJSH87HGDK"
                  value={input}
                  onChange={this.handleChange}
                />
              </FormItem>
            </Form>
            </div>
            {/* if guestData is null return nothing */}
            {guestData.booking_code ? (
              <GuestInfo
                handleUpdate={this.handleUpdate}
                guestData={guestData}
              />
            ) : (
              <div></div>
            )}
          </LayoutContent>
        </LayoutContentWrapper>
      </LayoutWrapper>
    );
  }
}

//connecting with the reducer file
function mapStateToProps(state) {
  return {
    isError: state.guestDetails.isError,
    guestData: state.guestDetails.guestData,
  };
}
export default connect(
  mapStateToProps,
  { setStatus, getGuest, updateGuest }
)(GuestPortal);
