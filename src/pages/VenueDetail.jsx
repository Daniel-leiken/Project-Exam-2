import { useParams } from 'react-router-dom';
import { Placeholder } from '@/components/Placeholder';

function VenueDetail() {
  const { id } = useParams();

  return (
    <Placeholder title="Venue details">
      The full venue page and availability calendar arrive in phase 4 (venue id: {id}).
    </Placeholder>
  );
}

export default VenueDetail;
