import GendersList from '../Genders/GendersList/GendersList';
import InterestsList from '../Interests/InterestsList/InterestsList';
import MenteeList from '../Mentees/MenteeList/MenteeList';
import MentorList from '../Mentors/MentorList/MentorList';
import MentorshipList from '../Mentorships/MentorshipList/MentorshipList';
import SchoolsList from '../Schools/SchoolsList/SchoolsList';


export default function AdminPage() {
  return (
    <div>
      <MentorList />
      <MenteeList />
      <MentorshipList />
      <GendersList />
      <InterestsList />
      <SchoolsList />
    </div>
  )
}