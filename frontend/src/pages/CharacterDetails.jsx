import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const CharacterDetails = () => {
  const navigate = useNavigate()

  const { characterId } = useParams()

  const [character, setCharacter] = useState()

  const fetchCharacter = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/characters/${characterId}`
      )
      if (responseFromBackend.ok) {
        const parsedFromBackend = await responseFromBackend.json()
        console.log(parsedFromBackend)
        setCharacter(parsedFromBackend.character)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCharacter()
  }, [])

  const deleteCharacter = async () => {
    try {
      const response = await fetch(`http://localhost:5005/api/characters/${character.id}`, {
        method: 'DELETE',
      })
      if (response.status === 204) {
        navigate('/characters')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return character ? (
    <>
      <h2>Details of {character.name}</h2>
      <h3>Occupation: {character.occupation}</h3>
      <p>Weapon: {character.weapon}</p>
      <Link to={`/characters/${character.id}/update`}>
        <button type='button'>Update</button>
      </Link>
      <button type='button' onClick={deleteCharacter}>
        Delete
      </button>
    </>
  ) : (
    <h1>Loading...</h1>
  )
}

export default CharacterDetails
