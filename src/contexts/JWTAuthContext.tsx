import { jwtDecode } from 'jwt-decode'
import { createContext, useEffect, useReducer } from 'react'
import axios from 'axios';
import { BASE_API } from '../shared/constant/environment';
import { setSession } from '../api/axios';
import { getCurrentUserData } from '../api/api';
import Loading from '../components/MatxLoading';
export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false
  }
  const decodedToken = jwtDecode<any>(accessToken)
  const currentTime = Date.now() / 1000
  return decodedToken.exp > currentTime
}


const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      }
    }
    case 'LOGIN': {
      const { user, } = action.payload

      return {
        ...state,
        isAuthenticated: true,
        user,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    }
    default: {
      return { ...state }
    }
  }
}

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: (email: string, password: string) => Promise.resolve(),
  logout: () => { }
})

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email: string, password: string) => {

    const response = await axios.post(`${BASE_API}auth/login`, {
      email,
      password
    });

    const { accessToken, refreshToken } = response?.data?.data;
    setSession(accessToken, refreshToken)
    dispatch({
      type: 'LOGIN',
      payload: {
        user: {},
      },
    })
    await getCurrentUser();
  }

  const logout = () => {
    setSession("", "")
    dispatch({ type: 'LOGOUT' })
  }

  useEffect(() => {
    getCurrentUser()
  }, []);
  const getCurrentUser = async () => {
    try {
      const accessToken: any = window.localStorage.getItem('accessToken')
      const refreshToken: any = window.localStorage.getItem('refreshToken')
      if (refreshToken && isValidToken(refreshToken)) {
        setSession(accessToken, refreshToken)
        const userResponse = await getCurrentUserData();
        const user = userResponse?.data;
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: true,
            user: user,
          },
        })
      } else {
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: false,
          },
        })
      }
    } catch (err) {
      console.error(err)
      dispatch({
        type: 'INIT',
        payload: {
          isAuthenticated: false,
        },
      })
    }
  }

  if (!state.isInitialised) {
    return <Loading />
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
