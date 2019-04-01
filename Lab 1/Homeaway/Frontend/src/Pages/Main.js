import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import TravellerLogin from './Login/TravellerLogin';
import OwnerLogin from './Login/OwnerLogin';
import SignUp from './SignUp/SignUp';
import TravelDash from './TravellerDash/TravelDash';
import OwnerDash from './Owners/OwnersDash';
import PropertyView from '../Modules/Headers/PropertyView';
import OwnerPropertyAdd from './Owners/OwnersAddProperty';
import ShowAllProperties from '../Modules/Headers/ShowProperties';
import ViewProfile from '../Modules/Headers/ViewProfile';

class Main extends Component {
    render(){
        return(
            <BrowserRouter>
            <Switch>
                <Route path="/" component={LandingPage} exact/>
                <Route path="/Login" component={TravellerLogin}/>
                <Route path="/SignUp" component={SignUp}/>
                <Route path="/TravelDash" component={TravelDash}/>
                <Route path="/OwnerPropertyAdd" component={OwnerPropertyAdd}/>
                <Route path="/OwnerLogin" component={OwnerLogin}/>
                <Route path="/OwnerDash" component={OwnerDash}/>
                <Route path="/PropertyView" component={PropertyView}/>
                <Route path="/Properties" component={ShowAllProperties}/>
                <Route path="/ViewProfile" component={ViewProfile}/>
                {/* <Route  component={Error}/> */}
            </Switch>
            </BrowserRouter>
        )
    }
}   
//Export The Main Component
export default Main;
