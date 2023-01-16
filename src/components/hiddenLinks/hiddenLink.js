import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectIsLoggedIn } from '../../redux/slice/authSlice'


const ShowOnLogin = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    // console.log(isLoggedIn);    
    if (isLoggedIn === true) {
        return children 
    } else {
        return null
    }
}

export const ShowOnLoginDash = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    // console.log(isLoggedIn);    
    if (isLoggedIn === true) {
        return children 
    } else {
        
        return (<>
            <h1 className='oops'>Please login first :)</h1>
            <Link to="/login" className='oops-link --flex-center'> Go to login</Link>
            </>);
    }
}

export const ShowOnLogout = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    // console.log(isLoggedIn);    
    if (isLoggedIn === false) {
        return  children 
    } else {
        return null
    }
}


export default ShowOnLogin;
