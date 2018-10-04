import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Subcripto = () => (
        <div>
            <h2>Subcripcion exitoso!</h2>
            <Link to="/">
                    <Button
                    >
                    Aceptar
                    </Button>
                  </Link>
        </div>


    );

export default  Subcripto;