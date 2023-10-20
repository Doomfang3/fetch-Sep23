import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewCharacterPage = () => {
  const navigate = useNavigate()
  // Handle states of the inputs
  const [name, setName] = useState('')
  const [occupation, setOccupation] = useState('')
  const [debt, setDebt] = useState(false)
  const [weapon, setWeapon] = useState('')
  // Handle submit of the form
  const onSubmit = async event => {
    event.preventDefault()
    const payload = {
      name,
      occupation,
      debt,
      weapon,
    }
    try {
      const response = await fetch('http://localhost:5005/api/characters/', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status === 201) {
        const currentCharacter = await response.json()
        navigate(`/characters/${currentCharacter.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <h1>New</h1>
      <form onSubmit={onSubmit}>
        <label>
          name
          <input value={name} onChange={event => setName(event.target.value)} />
        </label>
        <label>
          occupation
          <input value={occupation} onChange={event => setOccupation(event.target.value)} />
        </label>
        <label>
          debt
          <input type='checkbox' checked={debt} onChange={event => setDebt(event.target.checked)} />
        </label>
        <label>
          weapon
          <input value={weapon} onChange={event => setWeapon(event.target.value)} />
        </label>
        <button type='submit'>create!</button>
        {/* Have all the inputs and a way to submit */}
      </form>
    </>
  )
}

export default NewCharacterPage
