import React  from 'react'
// @ts-ignore
import WheelPicker from 'react-wheelpicker'

const TimePicker: React.FC<{onRequestClose: () => void}> = ({onRequestClose}) => {
  return (
    <div className='time-picker'>
    <div className='time-picker__content'>
      <WheelPicker
        className='time-picker__wheel time-picker__wheel time-picker__wheel_left'
        data={Array.from(Array(25).keys())}
        parentHeight={250}
        fontSize={13}
        defaultSelection={3}
        updateSelection={console.log}
        scrollerId='scroll-select-subject'
      />
      <WheelPicker
        className='time-picker__wheel time-picker__wheel_right'
        data={Array.from(Array(60).keys())}
        parentHeight={250}
        fontSize={13}
        defaultSelection={3}
        updateSelection={console.log}
        scrollerId='scroll-select-subject'
      />
      <button onClick={onRequestClose}>Выбрать</button>
    </div>
    </div>

  )
}

export default TimePicker
