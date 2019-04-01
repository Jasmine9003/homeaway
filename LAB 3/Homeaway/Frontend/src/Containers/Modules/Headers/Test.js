import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { stat } from "fs";
import { withApollo } from 'react-apollo'

const SEARCH_QUERY = gql`
  query propertiesWhere($startDate: String, $endDate: String, $where: String, $people: Int) {
    propertiesWhere(startDate: $startDate,endDate: $endDate, where: $where, people: $people) {
      addressline1
    }
  }
`;



class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate:"11/12/2018",
      endDate:"11/15/2018",
      where:"San",
      people:1

    };
  }

  componentWillMount() {}

  render() {
    const { startDate,endDate,where,people } = this.state

    return (
      <div>
        <Query query={SEARCH_QUERY} variables={{startDate,endDate,where,people}}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            console.log(data.propertiesWhere);
            return data.propertiesWhere.map(({ addressline1 }) => (
              <div key={addressline1}>
                <p>{`${addressline1}`}</p>
              </div>
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default withApollo(Test);




const QUERY_PROPERTY_VIEW = gql`
  query property($id: String) {
    property(id: $id) {
      headline
      addressline1
      addressline2
      city
      state
      country
      accomodates
      bedrooms
      bathrooms
      bathrooms
      minimumstay
      description
      phone
    }
  }
`;


const QUERY_TRAVELLER_BOOKINGS = gql`
  query travellerBookings($email: String) {
    travellerBookings(email: $email) {
      bookingfrom
      bookingto
      city
      propertyname
      cost
      currency
      propertyid
      _id
    }
  }
`;