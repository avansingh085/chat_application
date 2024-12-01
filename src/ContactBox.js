import { useDispatch ,useSelector} from 'react-redux';
import { setCurrChat ,} from './globalSlice';

function ContactBox({ data }) {
    const dispatch = useDispatch();

    // Ensure data exists before using it
    if (!data) return null;

    return (
        <div
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-green-400 transition duration-300 rounded-lg"
            onClick={() => dispatch(setCurrChat({name:data.user,mobile:data.mobile,message:[]}))}
        >
            {/* Profile Image */}
            <img
                src="https://tse1.mm.bing.net/th?id=OIP.GHGGLYe7gDfZUzF_tElxiQHaHa&pid=Api&P=0&h=180"
                alt={`${data.user || 'User'}'s avatar`}
                className="h-14 w-14 rounded-full object-cover"
            />

            {/* Contact Details */}
            <div className="ml-4">
                <div className="text-lg font-semibold text-gray-800">{data.user || 'Unknown User'}</div>
                <div className="text-sm text-gray-600">{data.mobile || 'No Mobile'}</div>
            </div>
        </div>
    );
}

export default ContactBox;
