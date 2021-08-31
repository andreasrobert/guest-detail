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
    this.handleOpenChange = this.handleOpenChange.bind(this);
    this.handleTime = this.handleTime.bind(this);

    this.state = {
      input: "",
      time: null,
      timeInput: "",
      isOpen: false,
    };
  }

  async handleOpenChange() {
    const { isOpen, timeInput } = this.state;
    await this.setState({ isOpen: !isOpen });
    if (isOpen && timeInput !== "") {
      this.handleUpdate();
    }
  }

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

  handleTime(time, timeString) {
    this.setState({
      time: time,
      timeInput: timeString,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { input } = this.state;

    if (!/^[A-Z0-9]+$/i.test(input)) {
      this.props.setStatus("error");
      return;
    }
    this.props.getGuest(input);
  }

  handleUpdate(time) {
    this.props.updateGuest({
      bookingCode: this.props.guestData.booking_code,
      updatedData: time,
    });
  }

  render() {
    const { input } = this.state;
    const { isError, guestData } = this.props;

    return (
      <LayoutWrapper>

        <PageHeader>
          <IntlMessages id="guestdetails.header" />
        </PageHeader>

        <LayoutContentWrapper
          style={{ minHeight: "80vh", width: "100%", marginTop: "-40px" }}
        >
          <LayoutContent>
            <h2>
              <IntlMessages id="guestdetails.askbookingcode" />
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

            {guestData.booking_code ? (
              <GuestInfo
                handleUpdate={this.handleUpdate}
                guestData={guestData}
              />
            ) : (
              <div>nothing here, try HIJ12346</div>
            )}
          </LayoutContent>
        </LayoutContentWrapper>
      </LayoutWrapper>
    );
  }
}
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
