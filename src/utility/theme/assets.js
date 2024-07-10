import Rectanglee from '../../assets/Rectanglee.png';
import googleicon from '../../assets/googleicon.png';
import cross from '../../assets/cross.png';
import church_logo from '../../assets/church_logo.png';
import church_logo_origianl from '../../assets/church_logo_origianl.png';
import birthday from '../../assets/birthday.png';
import dailyVerbsBanner from '../../assets/dailyVerbsBanner.jpg';
import SignIn from '../../assets/signIn.png';
import SignUp from '../../assets/signUp.png';
//Loader Animations

import WaveAnimation from '../../assets/animationLoader/wave-animation.json';

//Resources images
import missionary from '../../assets/resources/missionary.jpg';
import theology from '../../assets/resources/theology.png';
import gotquestion from '../../assets/resources/gotquestion.png';
import unity from '../../assets/resources/unity.png';
import ebook from '../../assets/resources/ebook.png';

//Admin
import members from '../../assets/admin/members.png';
import camera from '../../assets/admin/camera.png';
import DBible from '../../assets/admin/3DBible.png';
import pdf from '../../assets/admin/pdf.png';
import closeIcon from '../../assets/admin/closeIcon.png';
import deleteIcon from '../../assets/admin/deleteIcon.png';
import prayer from '../../assets/admin/prayer.png';
import contact from '../../assets/admin/contact.png';
import alert from '../../assets/admin/alert.png';
import adminManag from '../../assets/admin/adminManag.png';
import churchLocation from '../../assets/admin/churchLocation.png';

const resourcesImages = {
  missionary,
  theology,
  gotquestion,
  unity,
  ebook,
};

const authIcons = {
  SignIn,
  SignUp,
  Rectanglee,
  googleicon,
  WaveAnimation,
};
const homeIcons = {
  church_logo_origianl,
  cross,
  church_logo,
  dailyVerbsBanner,
  birthday,
  members,
  camera,
  DBible,
  pdf,
  prayer,
  closeIcon,
  deleteIcon,
  contact,
  alert,
  adminManag,
  churchLocation,
};
export default assets = {
  ...authIcons,
  ...homeIcons,
  ...resourcesImages,
};
