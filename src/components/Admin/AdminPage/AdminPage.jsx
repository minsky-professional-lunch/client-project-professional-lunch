import GendersList from '../Genders/GendersList/GendersList';
import InterestsList from '../Interests/InterestsList/InterestsList';
import SchoolsList from '../Schools/SchoolsList/SchoolsList';


export default function AdminPage() {
  return (
    <div>
      <GendersList />
      <InterestsList />
      <SchoolsList />
    </div>
  )
}