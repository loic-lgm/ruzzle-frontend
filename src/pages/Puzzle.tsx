import { useParams } from 'react-router';

const Puzzle = () => {
  const { hashid } = useParams<{ hashid: string }>();
  console.log(hashid);
  return (
    <div className="bg-gray-50 pt-28 pb-16">
      <div>Hello</div>
    </div>
  );
};

export default Puzzle;
