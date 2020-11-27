// 3rd party imports
import React from 'react'

// My imports
import styles from '../shared/Form.module.scss'

interface RadioButtonsProps {
  register: any
}

export const RadioButtons: React.FC<RadioButtonsProps> = ({ register }) => {
  return (
    <div className={styles.radio_container}>
      <label className={styles.radio}>
        <span className={styles.radio_input}>
          <input
            name="sex"
            type="radio"
            value="male"
            ref={register({ required: true })}
          />
          <span className={styles.radio_control}></span>
        </span>
        <span className={styles.radio_label}>male</span>
      </label>
      <label className={styles.radio}>
        <span className={styles.radio_input}>
          <input
            name="sex"
            type="radio"
            value="female"
            ref={register({ required: true })}
          />
          <span className={styles.radio_control}></span>
        </span>
        <span className={styles.radio_label}>female</span>
      </label>
      <label className={styles.radio}>
        <span className={styles.radio_input}>
          <input
            name="sex"
            type="radio"
            value="other"
            ref={register({ required: true })}
          />
          <span className={styles.radio_control}></span>
        </span>
        <span className={styles.radio_label}>other</span>
      </label>
    </div>
  )
}
