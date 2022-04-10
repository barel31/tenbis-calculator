import { useState } from 'react';
import './App.css';

// TODO
// Add checkbox for Saturday and rain bonus

function App() {
    const [vehicle, setVehicle] = useState('Motorcycle');
    const [timeStart, setTimeStart] = useState('00:00');
    const [timeEnd, setTimeEnd] = useState('00:00');
    const [deliverysNoon, setDeliverysNoon] = useState(0);
    const [deliverysEvening, setDeliverysEvening] = useState(0);
    const [tips, setTips] = useState(0);

    const today = new Date();
    const currentDay = today.toLocaleString('he-IL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    });

    const calc = () => {
        let hour = 30; // base
        hour += vehicle === 'Motorcycle' ? 20 : 15; // vehicle bonus + noon bonus

        const timeStartDec = hoursToDec(timeStart); // start time
        const timeEndDec = hoursToDec(timeEnd); // end time

        const hours = timeEndDec - timeStartDec; // number of hours

        let NoBonus = 0; // reduce bonus after noon
        if (timeEndDec >= 15) {
            NoBonus = 5;
            NoBonus *= timeEndDec - 15;
        }
        // calc wage
        const wage = hours * hour + (tips | 0) - NoBonus + deliverysNoon * 8 + deliverysEvening * 5;

        return (
            <>
                <p>hours: {hours}</p>
                <p>per hour: {hour}</p>
                <p>wage: {hours * hour}</p>
                <p>dec start: {timeStartDec}</p>
                <p>dec end: {timeEndDec}</p>
                <h3>wage: {wage}₪</h3>
            </>
        );
    };

    const hoursToDec = (str) => {
        return (
            str.split(':').reduce((seconds, v) => {
                return +v + seconds * 60;
            }, 0) / 60
        );
    };

    return (
        <div className='App'>
            <h1>{currentDay}</h1>
            <label style={{ display: 'inline' }} htmlFor='saturdayCheckbox'>
                Saturday bonus: (disabled){' '}
            </label>
            <input style={{ display: 'inline' }} type='checkbox' name='saturday' id='saturdayCheckbox' disabled />
            <label style={{ display: 'inline' }} htmlFor='saturdayCheckbox'>
                {'  '}
                Rain Bonus: (disabled){' '}
            </label>
            <input style={{ display: 'inline' }} type='checkbox' name='rain' id='rainCheckbox' disabled />

            <label htmlFor='vehicle'>Vehicle: </label>
            <select name='vehicle' id='vehicle' onChange={(e) => setVehicle(e.target.value)}>
                <option value='Motorcycle'>Motorcycle</option>
                <option value='Bicyle'>Bicyle</option>
            </select>

            <label htmlFor='time_start'>Shift starts: </label>
            <input
                name='time_start'
                type='time'
                placeholder='Shift starts'
                onChange={(e) => setTimeStart(e.target.value)}
            />

            <label htmlFor='time_end'>Shift ends: </label>
            <input name='time_end' type='time' placeholder='Shift ends' onChange={(e) => setTimeEnd(e.target.value)} />

            <label>Deliveries peak: </label>
            <input
                name='deliverys_noon'
                type='number'
                placeholder='Peak noon (11:30-13:30)'
                onChange={(e) => setDeliverysNoon(e.target.value)}
            />
            <input
                name='deliverys_evening'
                type='number'
                placeholder='Peak evening (19:30-21:30)'
                onChange={(e) => setDeliverysEvening(e.target.value)}
            />

            <label htmlFor='tips'>Tips: </label>
            <input name='tips' type='number' placeholder='Tips' onChange={(e) => setTips(e.target.value)} />
            {calc()}
        </div>
    );
}

export default App;
