import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CharacterUpdatePage = () => {
  const { characterId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [occupation, setOccupation] = useState('')
  const [debt, setDebt] = useState(false)
  const [weapon, setWeapon] = useState('')

  const fetchCharacter = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/characters/${characterId}`
      )
      if (responseFromBackend.ok) {
        const parsedFromBackend = await responseFromBackend.json()
        console.log(parsedFromBackend)
        setName(parsedFromBackend.character.name)
        setOccupation(parsedFromBackend.character.occupation)
        setDebt(parsedFromBackend.character.debt)
        setWeapon(parsedFromBackend.character.weapon)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCharacter()
  }, [])

  const handleUpdate = async event => {
    event.preventDefault()
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/characters/${characterId}`,
        {
          method: 'PUT',
          body: JSON.stringify({ name, occupation, debt, weapon }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (responseFromBackend.ok) {
        const parsedFromBackend = await responseFromBackend.json()
        console.log(parsedFromBackend)
        navigate(`/characters/${characterId}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1>Update</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Name
          <input value={name} onChange={event => setName(event.target.value)} />
        </label>
        <label>
          Occupation
          <input value={occupation} onChange={event => setOccupation(event.target.value)} />
        </label>
        <label>
          Debt
          <input checked={debt} type='checkbox' onChange={event => setDebt(event.target.checked)} />
        </label>
        <label>
          Weapon
          <input value={weapon} onChange={event => setWeapon(event.target.value)} />
        </label>
        <button type='submit'>Update</button>
      </form>
    </>
  )
}

export default CharacterUpdatePage
