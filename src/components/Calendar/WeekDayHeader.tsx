import "../../styles/WeekDayHeader.css";

const WeekDayHeader = () => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
        <div className="weekdays-header">
            {weekDays.map((day, index) => (
                <div key={index} className="weekday">
                    {day}
                </div>
            ))}
        </div>
    );
}
export default WeekDayHeader;