import React, {useState, useEffect} from 'react';
import firebase from '../functions/firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Todo from './Todo';
import {addTodo} from '../functions/api';
import IconButton from '@material-ui/core/IconButton';
import "@material-tailwind/react/tailwind.css";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import getCurrentDate from '../utils/date_and_time';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function Hompage(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [update, setUpdate] = useState(false);


    const handleAddTodo = () => {
        addTodo({
            title : title, 
            isCompleted : isCompleted, 
            owner : props.user.displayName,
            createdAt : getCurrentDate()
        }).then(() => {
            console.log('Successfully added');
            setUpdate(true);
            handleClose();
        });
    };


    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            props.setUser(null);                                                                                
        });
    }

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <div className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    type="text"
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="isCompleted"
                    label="Status"
                    type="bool"
                    id="isCompleted"
                    value={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleAddTodo}
                >
                    Add
                </Button>
                </div>
        </div>
      );

        return (
            <div>
            <Navbar color="cyan" navbar>
                <NavbarContainer>
                    <NavbarWrapper>
                        <NavbarBrand>
                            <div className="text-lg font-weight-bold font-lg">
                                Welcome {props.user.displayName}
                            </div>
                        </NavbarBrand>
                    </NavbarWrapper>
        
                    <NavbarCollapse open={true}>
                        <Nav className="ml-5" right>
                            <Button color='inherit' onClick={() => handleOpen()} >Add</Button>
                        </Nav>
                        <Nav>
                        <Button color='inherit' onClick={() => handleLogout()} startIcon={<ExitToAppIcon/>} >Logout</Button>
                        </Nav>
                    </NavbarCollapse>
                </NavbarContainer>
            </Navbar>
            <React.Fragment>
            <CssBaseline/>
              <Container maxWidth="lg">
                  <Todo user={props.user} update={update} setUpdate={setUpdate}/>
              </Container>
            </React.Fragment>
            <div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
                </div>
            </div>
          </div>
        );
}