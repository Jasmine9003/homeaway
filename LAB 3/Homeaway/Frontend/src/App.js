import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './Containers/Pages/LandingPage';
import TravellerLoginPage from './Containers/Pages/TravellerLoginPage';
import OwnerLoginPage from './Containers/Pages/OwnerLoginPage';
import SignUpPage from './Containers/Pages/SignUpPage';
import TravelDashboardPage from './Containers/Pages/TravelDashboardPage';
import OwnerDashboardPage from './Containers/Pages/OwnerDashboardPage';
import PropertyViewPage from './Containers/Pages/PropertyViewPage';
import ShowAllPropertiesPage from './Containers/Pages/ShowAllPropertiesPage';
import ViewProfilePage from './Containers/Pages/ViewProfilePage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGhost, faEnvelope, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import Test from "./Containers/Modules/Headers/Test";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql"
});


library.add(faEnvelope,faGhost, faLocationArrow)
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>

      <BrowserRouter>
      <Switch>
          <Route path="/" component={LandingPage} exact/>
          <Route path="/login" component={TravellerLoginPage}/>
          <Route path="/ownerLogin" component={OwnerLoginPage}/>
          <Route path="/signup" component={SignUpPage}/>
          <Route path="/viewprofile" component={ViewProfilePage}/>
          <Route path="/traveldash" component={TravelDashboardPage}/>
          <Route path="/ownerdash" component={OwnerDashboardPage}/>
          <Route path="/propertyview" component={PropertyViewPage}/>
          <Route path="/properties" component={ShowAllPropertiesPage}/>
          <Route path="/test" component={Test}/>


      </Switch>
      </BrowserRouter>
      </ApolloProvider>
    );
  }
}
export default App;
