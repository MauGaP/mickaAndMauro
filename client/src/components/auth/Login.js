import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import classnames from 'classnames';
import {NoPhoneError, QueLeDoyError} from './LoginError';
import './Login.css'
import ImageFooter from '../layout/ImageFooter';

//This should be in landing

class Login extends Component {
  constructor() {
    super();
    this.state = {
      phone: '',
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({[e.target.id]: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      phone: this.state.phone
    };

    this.props.loginUser(userData);
  };

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }

  render() {
    const {errors} = this.state;

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='vertical-space'>
          </div>
          <h5 className='col-12 welcome-text center'>
            Toda <b>gran aventura</b> empieza con un
          </h5>
          <h5 className='col-12 welcome-text center'>
            “Si, quiero”.
          </h5>
          <div className='vertical-space'>
          </div>
        </div>
        <div className='row'>
          <div className='col-s10'>
            <form noValidate onSubmit={this.onSubmit}>
              <div className='input-field col-s10 offset-1'>
                {/*<i className="material-icons prefix">phone</i>*/}
                <input
                  onChange={this.onChange}
                  value={this.state.phone}
                  error={errors.phone}
                  id='phone'
                  type='tel'
                  maxLength='10'
                  onInput={this.maxLengthCheck}
                  className={classnames('', {
                    invalid: errors.phone || errors.phoneIncorrect
                  })}
                />
                <label htmlFor='phone'>INGRESA TU TELÉFONO:</label>
                <span className='red-text'>
                  {errors.phone}
                  {errors.phoneIncorrect}
                </span>
              </div>
              <div className='row error-image'>
                {errors.phone ?
                  <NoPhoneError/> : <></>}
                {errors.groupNotFound ?
                  <QueLeDoyError/> : <></>}
              </div>
              <span className='instructions col-12 offset-1'>
              Sin el 0 y sin el 15. Ej: 3513079896
            </span>
              <div className='row'>
                <div className='col-8 offset-2'>
                <button
                  type='submit'
                  className='right btn-large waves-effect'>
                  Ingresar
                </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ImageFooter/>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {loginUser}
)(Login);
