import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import './NavBar.scss'
import { useDispatch } from 'react-redux'

export default function NavBar(): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className="">
      <div className="">Hello</div>
    </div>
  )
}
