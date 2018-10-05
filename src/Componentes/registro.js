import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Cards from 'react-credit-cards';
import CreditCardInput from 'react-credit-card-input';
import 'react-credit-cards/es/styles-compiled.css';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { TextField } from '@material-ui/core';
import * as EmailValidator from 'email-validator';
 
const estilo = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  grow: {
    flexGrow: 1,
  },
});

const listaPaises = require('country-list')();
const paises = listaPaises.getNames();
class Registro extends React.Component {
  constructor (props) {
		super(props);
		this.state = {
			tipo: '',
			nombre: '',
			email: '',
			pais: '',
			id: '',
			tarjetaNum: '',
			tarjetaExp: '',
			tarjetaCvv: '',
      activeStep: 0,
		};
  }
  handleNext = () => {
    if(this.comprobar()){
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    }else{
      alert('Verifique que todos los campos esten completo');    }
     }
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleChangeEmail = (event) => {
    const email = event.target.value;
    this.setState({ email });
  };
  handleChangeNombre = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  };
  handletarjetaCvvChange = (e) => {
  this.setState({ tarjetaCvv: e.target.value });
  };
  handletarjetaExpireChange = (e) => {
    this.setState({ tarjetaExp: e.target.value });
  };
  handletarjetaNumberChange = (e) => {
    this.setState({ tarjetaNum: e.target.value });
  };
  componentDidMount () {
      this.setState({ tipo: this.props.location.state })
      const url = 'https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones/';
      fetch(url)
        .then((res) => res.json())
        .then((json) => this.setState({ id: json.length }));
      ValidatorForm.addValidationRule('isNombreCompleto', (value) => {
        var regex = /[A-Za-z]+\s+[A-Za-z]/;
      if(regex.test(value)){
        return true
      }
      return false
    });
  }
  comprobar(){
    let verificar = false;
  
    if((this.state.nombre.length > 0) &&
     (this.state.email.length > 0 ) &&
     (this.state.pais.length > 0)){
       verificar = true;
     };
     if(this.state.activeStep === 1 && this.state.tipo === "premiun"){
       if((this.state.tarjetaNum.length > 0) &&
     (this.state.tarjetaExp.length > 0) &&
     (this.state.tarjetaCvv.length > 0)){
     }else{
       verificar = false;
     }
     }
     if(!EmailValidator.validate(this.state.email)){
      verificar= false;
    }
     return verificar;
   }
  enviarDato(){
    if(this.state.tipo === 'premiun'){
      var usuariop = {
        tipo: this.state.tipo.toLowerCase(),
				nombre: this.state.nombre.toLowerCase(),
				email: this.state.email.toLowerCase(),
				pais: this.state.pais.toLowerCase(),
        cardNum: this.state.tarjetaNum,
        cardExp: this.state.tarjetaExp,
        cardCvv: this.state.tarjetaCvv,
    };
      fetch('https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(usuariop, '\t')
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log('Objeto posteado:', data);
          this.props.history.push(`/subcripto`);
        })
        .catch((error) => {
          console.log(error, 'catch the hoop');
        });
    }else{
      var usuario = {
				tipo: this.state.tipo.toLowerCase(),
				nombre: this.state.nombre.toLowerCase(),
				email: this.state.email.toLowerCase(),
				pais: this.state.pais.toLowerCase(),
    };
      fetch('https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(usuario, '\t')
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log('Objeto posteado:', data);
          this.props.history.push(`/subcripto`);
        })
        .catch((error) => {
          console.log(error, 'catch the hoop');
        });

    };
	};
  getSteps = () => {
    return ['Datos de Subcripcion', 'Detalles de Tarjeta'];
  }
  getStepContent = (step) => {
    const { classes } = this.props;
    console.log(this.state.activeStep)
    switch (step) {
      case 0:
            return (
              <div>
                <span>
                <h4 variant="title">
                  Detalles de Cuenta
                </h4>
                  <ValidatorForm
                      ref="form"
                      onSubmit={this.comprobar}
                      onError={errors => console.log(errors)}
                  >
										<TextValidator
											label='Nombre y Apellido'
                      onChange={this.handleChangeNombre.bind(this)}
											name='nombre'
                      value={this.state.nombre}
											validators={[ 'required', 'isNombreCompleto' ]}
											errorMessages={[
												'campo requerido',
												'recuerde ingresar nombre y apellido'
                      ]}
                      pattern="[a-z0-9._%+-]+/ /+[a-z0-9.-]"
                      className={classes.textField}
                      fullWidth
                      variant="outlined"
										/>
                  </ValidatorForm>
                  <ValidatorForm
                      ref="form"
                      onSubmit={this.comprobar}
                      onError={errors => console.log(errors)}
                  >
									<TextValidator
                      required
                      label='Email'
                      className={classes.textField}
                      variant="outlined"
											onChange={this.handleChangeEmail}
                      name='email'
                      fullWidth
											value={this.state.email}
											validators={[ 'required', 'isEmail' ]}
											errorMessages={[ 
                        'campo requerido', 
                        'email inválido'
                       ]}
									/>
									</ValidatorForm>
                  <TextField
                      id="pais"
                      select
                      label="Pais"
                      className={classes.textField}
                      variant="outlined"
                      fullWidth
                      value={this.state.pais}
                      onChange={this.handleChange('pais')}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                          },
                      }}
                      helperText="Seleccione el Pais correspondiente"
                      margin="normal"
                  >
                  {paises.map((pais) => (
                    <MenuItem key={pais} value={pais}>
                      {pais}
                    </MenuItem>
                  ))}
                  </TextField>
                </span>
                <div>
                <Link to="/">
                  <Button
                    id='atras'
                    className={classes.button}
                  >
                  Atras
                  </Button>
                </Link>
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                  >
                  Continuar
                  </Button>
                </div> 
              </div>
            );
      case 1:
          if(this.state.tipo ==='free'){
            return(
            <div>
              <h4>Cuenta Free</h4>
                <div>
                  <Button
                    disabled={this.state.activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                  Atras
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                  Continuar
                  </Button>
                </div>
            </div>
            )
          }
          else if(this.state.tipo === 'premiun'){
            return(
              <div>
                <div>
                    <h4>USD 10,00</h4>
                </div>
                <CreditCardInput
                  cardNumberInputProps={{ value: this.state.handletarjetaNumberChange, onChange: this.handletarjetaNumberChange }}
                  cardExpiryInputProps={{ value: this.state.handletarjetaExpireChange, onChange: this.handletarjetaExpireChange }}
                  cardCVCInputProps={{ value:this.state.handletarjetaCvvChange, onChange: this.handletarjetaCvvChange }}
                  fieldClassName="input"
                />
                <Cards
                  number={this.state.tarjetaNum}
                  name={this.state.nombre}
                  expiry={this.state.tarjetaExp}
                  cvc={this.state.tarjetaCvv}
                  focused={''}
                />
                <div>
                  <Button
                    disabled={this.state.activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                  Atras
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                  Continuar
                  </Button>
                </div>
              </div>
            )
          }
          break
      default:
        return ;
    }
  }
  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    return (
      <div className={classes.root}>
      <div>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <h1>{this.getStepContent(index)}</h1>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
          <Button
            disabled={activeStep === 0}
            onClick={this.handleBack}
            className={classes.button}
          >
          Atras
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {this.enviarDato()}}
            className={classes.button}
          >
           Confirmar Subcripción
          </Button>
          </Paper>
        )}
        </div>
      </div>
    );
  }
}
Registro.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(estilo)(Registro);