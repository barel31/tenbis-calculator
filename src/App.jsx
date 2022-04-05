import { useState } from 'react';
import './App.css';

// TODO
// Add checkbox for Saturday and rain bonus

function App() {
    const [vehicle, setVehicle] = useState('Motorcycle');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [deliverysNoon, setDeliverysNoon] = useState(0);
    const [deliverysEvening, setDeliverysEvening] = useState(0);
    const [tips, setTips] = useState(0);

    const [wage, setWage] = useState(0);

    const calc = () => {
        var hour = 30;
        hour += vehicle === 'Motorcycle' ? 15 : 10;

        const timeStartDec = hoursToDec(timeStart);
        const timeEndDec = hoursToDec(timeEnd);

        const hours = timeEndDec - timeStartDec;

        if (timeStartDec >= 10 && timeEndDec <= 15) {
            hour += 5;
        }

        const minutes = hours / 60;
        for (var i = 0; i < minutes; i++) {
            break;
        }

        var hoursDiff = Math.abs(timeStartDec - timeEndDec) * 60;
        console.log('hoursDiff: ' + hoursDiff);


        // for (var i = 0; i < timeStartDec*60; i++) {
        // }

        return (
            <>
                <p>hours: {hours}</p>
                <p>per hour: {hour}</p>
                <p>wage: {hours * hour}</p>
                <p>dec start: {timeStartDec}</p>
                <p>dec end: {timeEndDec}</p>
                <p>wage: {hours * hour + (tips | 0)}</p>
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

    const tests = () => {
        return (
            <>
                <p>{vehicle}</p>
                <p>start: {timeStart}</p>
                <p>end: {timeEnd}</p>
                <p>deliverys noon: {deliverysNoon}</p>
                <p>deliverys evening: {deliverysEvening}</p>
                <p>tips: {tips}</p>
            </>
        );
    };

    return (
        <div className='App'>
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

            <label htmlFor='deliverys_noon'>Delivery peak noon: </label>
            <input
                name='deliverys_noon'
                type='number'
                placeholder='Delivery peak noon'
                onChange={(e) => setDeliverysNoon(e.target.value)}
            />

            <label htmlFor='deliverys_evening'>Delivery peak noon: </label>
            <input
                name='deliverys_evening'
                type='number'
                placeholder='Delivery peak evening'
                onChange={(e) => setDeliverysEvening(e.target.value)}
            />

            <label htmlFor='tips'>Tips: </label>
            <input name='tips' type='number' placeholder='Tips' onChange={(e) => setTips(e.target.value)} />

            {tests()}
            {calc()}
        </div>
    );
}

export default App;
