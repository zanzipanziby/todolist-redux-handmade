import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Paper,
    TextField
} from "@material-ui/core";
import {useFormik} from "formik";
import s from './LoginPage.module.css'
import {LoginFormErrorType} from "../../Types/Types";
import {useAppDispatch, useAppSelector} from "../../CustomHooks/CustomHooks";
import {loginTC} from "../../Redux/Reducers/authReducer";
import {Navigate} from "react-router-dom";


export const LoginPage = () => {

    const dispatch = useAppDispatch()
    const isLogged = useAppSelector(state => state.auth.isLogged)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: LoginFormErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3) {
                errors.password = 'Password should be more 3 symbols'
            }
            console.log(errors)
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))

            formik.resetForm()
        }
    })

    if(isLogged) {
        return <Navigate to={'/'}/>
    }



    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'} style={{marginTop: "10vh"}}>
            <Paper elevation={5} style={{padding: "40px"}}>
                <FormControl>
                    <FormLabel>
                        <h2>Sign in</h2>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'} rel="noreferrer"> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: <span className={s.defaultLoginValue}>free@samuraijs.com</span></p>
                        <p>Password: <span className={s.defaultLoginValue}>free</span></p>
                    </FormLabel>


                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                autoComplete={"on"}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ?
                                <div className={s.error}>{formik.errors.email}</div> : null}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                autoComplete={"on"}
                                {...formik.getFieldProps('password')}

                            />
                            {formik.touched.password && formik.errors.password ?
                                <div className={s.error}>{formik.errors.password}</div> : null}
                            <FormControlLabel  label={'Remember me'} control={
                                <Checkbox
                                    color={"primary"}
                                    checked={formik.values.rememberMe}
                                    {...formik.getFieldProps('rememberMe')}
                                />
                            }/>
                            <Button style={{marginTop:"20px"}} type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Paper>
        </Grid>
    </Grid>
}