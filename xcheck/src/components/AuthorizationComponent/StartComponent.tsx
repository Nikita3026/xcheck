import React from 'react';
import AuthorizationForm from './AuthorizationForm'
import RegistrationForm from './RegistrationForm'

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
                    ?<AuthorizationForm 
                        history = {this.props.history}
                        onClick={this.changeCurrentForm}/>
                    :<RegistrationForm 
                        history = {this.props.history}
                        onClick={this.changeCurrentForm}/>
                }
            </div>
        )
    }
}


export default StartComponent;