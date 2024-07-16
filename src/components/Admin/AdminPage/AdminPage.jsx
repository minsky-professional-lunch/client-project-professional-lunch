import GendersList from '../Genders/GendersList/GendersList';
import InterestsList from '../Interests/InterestsList/InterestsList';
import MenteeList from '../Mentees/MenteeList/MenteeList';
import SchoolsList from '../Schools/SchoolsList/SchoolsList';


export default function AdminPage() {
  return (
    <div>
      <MenteeList />
      <GendersList />
      <InterestsList />
      <SchoolsList />
    </div>
  )
}