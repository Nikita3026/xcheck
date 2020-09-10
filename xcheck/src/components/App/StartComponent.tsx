import React from 'react';
import NavBar from '../Navbar/Navbar'
import AuthorizationForm from '../AuthorizationComponent/AuthorizationForm'
import RegistrationForm from '../AuthorizationComponent/RegistrationForm'

export class StartComponent extends React.Component<{history:object},{currentForm:string}> {
    state={
        currentForm: 'auth'
    }
    changeCurrentForm = () => {
        let currentForm = this.state.currentForm;
        if(currentForm === 'auth') currentForm = 'reg';
        else currentForm = 'auth';
        this.setState({
            currentForm: currentForm
        })
    }
    render(){
        return(
            <div className = "start">
                {(this.state.currentForm === 'auth')
                    ?<RegistrationForm 
                        history = {this.props.history}
                        onClick={this.changeCurrentForm}/>
                    :<AuthorizationForm 
                        history = {this.props.history}
                        onClick={this.changeCurrentForm}/>
                }
            </div>
        )
    }
}


export default StartComponent;