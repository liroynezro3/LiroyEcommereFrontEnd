import React, { useContext } from 'react'
import classes from "./Footer.module.css"
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link } from 'react-router-dom';
import SearchContext from '../../context/SearchContext';


function Footer() {
  const SearchCTX = useContext(SearchContext)
  return (
<React.Fragment>

    <footer className={classes.footerdistributed}>
    <div className={classes.footerright}>
      <a href={"https://www.facebook.com/liroy.nezri"} target="_blanked"><FacebookIcon sx={{color: "#2166e6"}}></FacebookIcon></a>
      <a href={"https://www.instagram.com/liroynezri/"} target="_blanked"><InstagramIcon style={{color: "white"}}></InstagramIcon></a>
      <a href={`https://api.whatsapp.com/send?phone=972502457449&text=Hi%20Liroy,%20I%20saw%20your%20site%20and%20wanted%20to%20give%20you%20a%20comment`} target="_blanked"><WhatsAppIcon  style={{color: "#39df18"}}></WhatsAppIcon></a>
    </div>
    <div className={classes.footerleft}>
      <p className={classes.footerlinks}>
        <Link to={"/products"} onClick={()=>{SearchCTX.SearchValueHandler('')}}>Home</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/registar"}>Registar</Link>
      </p>
      <p>Liroy ecommere &copy; 2022</p>
    </div>
  </footer>
  </React.Fragment>
  )
}

export default Footer