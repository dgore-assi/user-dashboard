import { LoadingButton } from '@mui/lab';
import { Card, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { btnColor, errorBtnColor } from '../../shared/utils/color';
import useAuth from '../../hooks/useAuth';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));
const ErrorFlexBox = styled(Box)(() => ({ color: errorBtnColor.color }));
const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));
const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  email: '',
  password: '',
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});
const JwtLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [message, setMessage] = useState('')

  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (e) {
      setMessage("Invalid email and password.");
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }} >
              {/* <img src={Image} alt=" " height="100%" width="100%" /> */}
            </JustifyBox>
          </Grid>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Typography
                      variant='h5'
                      style={{
                        display: 'flex',
                        justifyContent: "center",
                        marginBottom: '12px',
                      }}>Sign In</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email || ""}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />
                    <FormControl fullWidth variant="outlined" size='small'>
                      <InputLabel error={Boolean(errors.password && touched.password)} id="password">Password</InputLabel>
                      <OutlinedInput
                        fullWidth
                        size="small"
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        autoComplete='false'
                        onBlur={handleBlur}
                        value={values.password || ""}
                        error={Boolean(errors.password && touched.password)}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {!!touched.password && errors.password && (
                        <FormHelperText
                          sx={{ position: 'absolute', bottom: '0rem' }}
                          error>
                          {touched.password && errors.password}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <ErrorFlexBox>
                      {message && (
                        <Typography >{message}</Typography>
                      )}
                    </ErrorFlexBox>
                    <FlexBox justifyContent="space-between">
                      <NavLink
                        to="/session/forgot-password"
                        style={{
                          borderColor: btnColor.color,
                          color: btnColor.color
                        }}>
                        Forgot password?
                      </NavLink>
                      <LoadingButton
                        style={{
                          background: btnColor.color,
                        }}
                        type="submit"
                        color="primary"
                        loading={loading}
                        variant="contained"
                        sx={{ my: 2 }}
                      >
                        Login
                      </LoadingButton>
                    </FlexBox>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;