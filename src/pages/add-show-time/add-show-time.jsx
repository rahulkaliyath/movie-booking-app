import React,{useState} from 'react';
import {connect} from 'react-redux';
import {addShowTime} from '../../redux/admin/admin.actions';

const AddShowTime = ({addShowTime,jwt_token}) => {

    const [formData, setFormData] = useState({
        movieId:'',
        date: '',
        time:'',
        seats:''
    })
    
   

    const handleChange = event => {
        const {name,value} = event.target;

        setFormData({...formData, [name]:value});
     }

    const handleSubmit = event => {
        event.preventDefault();
        addShowTime(movieId,date,time,seats,jwt_token)
       
        setFormData({
            movieId:'',
            date: '',
            time:'',
            seats:''
        })

    }

    const {movieId,date,time,seats} = formData;

    return(
        <div>
            <form className='booking-form' onSubmit={handleSubmit}>
                <h1>Add Show Time</h1>
        <label >Movie ID</label>
        <input type="text" name="movieId" id="name" value={movieId} onChange={handleChange}/>
        <label >Date</label>
        <input type="text" name="date" id="date" value={date} onChange={handleChange}/>
        <label >Time</label>
        <input type="text" name="time" id="time" value={time}  onChange={handleChange}/>
        <label >Seats</label>
        <input type="text" name="seats" id="email" value={seats}  onChange={handleChange}/>
        
        <label style={{marginBottom:0}}></label>
        <button type='submit'>Add Show Time </button>
</form>
        </div>
    )
}

const mapStateToProps = state => ({
    jwt_token : state.auth.jwt_token
})

export default connect(mapStateToProps,{addShowTime})(AddShowTime);