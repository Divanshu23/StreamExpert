import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';
class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () =>{
            //init gives us a promis
            window.gapi.client.init({
                clientId: '756001586883-8bshufbe8etbh29n34r1747f3gqmqob0.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                //this below is chanign the auth state inside the store
                this.onAuthChange(this.auth.isSignedIn.get());
                //this is basically waiting for the result of whether the user is loged in or not 
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) =>{
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    //these were not important but we did it for better readability
    onSignInClick = () =>{
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };


    renderAuthButton() {
        if(this.props.isSignedIn === null){
            return null
        }
        else if (this.props.isSignedIn){
            return(
                <button onClick = {this.onSignOutClick} className ='ui red google button'>
                    <i className='google icon' />
                    Sign Out
                </button>
            );
        } else {
            return(
                <button onClick = {this.onSignInClick} className='ui red google button'>
                    <i className ='google icon' />
                        Sign In
                </button>
            );
        }
    }


    render() {
        return(
            <div>{this.renderAuthButton()}</div>
        );
    }
}


const mapStateToProps = state => {
    return {isSignedIn: state.auth.isSignedIn};
};


export default connect(mapStateToProps, {signIn,signOut})(GoogleAuth);