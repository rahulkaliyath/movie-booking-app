import { Route, Switch} from 'react-router-dom';
import PrivateRoute from './routing/privateRoute';
import AdminRoute from './routing/adminRoute';
import NowShowing from './pages/now-showing/now-showing';
import Navbar from './components/navbar/navbar';
import MovieBooking from './pages/movie-with-shows/movie-with-shows';
import BookingPage from './pages/booking-page/booking-page';
import Login from './pages/login/login';
import UserBookings from './pages/user-bookings/user-bookings';
import UpcomingBookings from './pages/upcoming-booking/upcoming-booking';
import AdminPage from './pages/admin-page/admin-page';
import AddShowTime from './pages/add-show-time/add-show-time';
function App() {
  return (
    <div>
      <Navbar />
      <Switch >
        <Route exact path='/now_showing'component={NowShowing}/>
        <Route exact path='/movie/:movieId' component={MovieBooking}/>
        <Route exact path='/login' component={Login}/>
        <PrivateRoute exact path='/bookings'  component={UserBookings}/>
        <PrivateRoute exact path='/bookings/upcoming'  component={UpcomingBookings}/>
        <PrivateRoute exact path='/book/:movieId/:date/:time'  component={BookingPage}/>
        <AdminRoute exact path='/admin'  component={AdminPage}/>
        <AdminRoute exact path='/add-show-time'  component={AddShowTime}/>

      </Switch>

    </div>

  );
}

export default App;
